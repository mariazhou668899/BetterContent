import React, { useState } from 'react';
import { signOut } from 'firebase/auth'; // Import signOut directly from firebase/auth
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../components/firebase';
import MyImage from '../assets/walk_login2.gif';
import styles from "./CommonStyleSheet";


const SignupScreen = ({ navigation }) => {
  const [successful, setSuccessful] = useState('');
  const [errorState, setErrorState] = useState('');

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password too short! At least 6 characters.').required('Required'),
  });

  const handleSignup = async (values) => {
    const { email, password } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setSuccessful('Successfully Registered. Verification Email Sent.');
      navigation.navigate('Verification');
    } catch (error) {
      setErrorState(error.message);
    }
  };

  const handleLogout = (navigation) => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch((error) => console.log('Error logging out: ', error));
  };


  return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid={true} enableAutomaticScroll={true}>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={(values) => handleSignup(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
                
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
                
                {errorState ? <Text style={styles.errorText}>{errorState}</Text> : null}
                {successful ? <Text style={styles.successText}>{successful}</Text> : null}
                
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                
              </>
            )}
          </Formik>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.subtitle}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};


export default SignupScreen;
