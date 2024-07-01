import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../components/firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "./CommonStyleSheet";

import MyImage from '../assets/walk_login2.gif';

// Validation schema using Yup
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Enter a valid email'),
  password: Yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
});

const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');


  const handleLogin = async (values) => {
    const { email, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        setErrorState('Please verify your email before logging in.');
        return;
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'Make' }],
      });
    } catch (error) {
      setErrorState(error.message);
    }
  };


  return (

    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid={true} enableAutomaticScroll={true}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Login</Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => handleLogin(values)}
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
                
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.subtitle}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={styles.subtitle}>Forget Password</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};


export default LoginScreen;
