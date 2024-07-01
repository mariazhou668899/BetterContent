// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { auth } from '../components/firebase';
import { signOut } from 'firebase/auth'; // Import signOut directly from firebase/auth

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch((error) => console.log("Error logging out: ", error));
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#f57c00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  subtitle: {
    color: '#039be5',
    marginTop: 10,
    textAlign: 'center',
  },
});


export default HomeScreen;
