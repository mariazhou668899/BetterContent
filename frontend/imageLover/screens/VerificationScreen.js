// VerificationScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet,TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import MyImage from '../assets/walk_login1.gif';

const VerificationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>A verification email has been sent to your email address. Please verify your email to continue.</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default VerificationScreen;
