import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../components/firebase';
import MyImage from '../assets/walk_login2.gif';
import styles from "./CommonStyleSheet";


const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent to your email.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid={true} enableAutomaticScroll={true}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Forget Password</Text>
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
          {message ? <Text style={styles.messageText}>{message}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.subtitle}>Go to Login</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};


export default ForgetPasswordScreen;
