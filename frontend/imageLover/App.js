// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View } from 'react-native';
import { signOut } from 'firebase/auth'; // Import signOut directly from firebase/auth
import { auth } from './components/firebase'; // Import the auth object

import VerificationScreen from './screens/VerificationScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import DecorateScreen from './screens/DecorateScreen';
import ContentCenter from './screens/ContentCenter';
import ViewContent from './screens/ViewContent';
import ViewStory from './screens/ViewStory';

const Stack = createStackNavigator();

const App = () => {
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
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />

          <Stack.Screen
            name="Make"
            component={DecorateScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.navigate('ContentCenter')}>
                    <Text style={{ color: '#333333', fontWeight: 'bold' }}>Center</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => handleLogout(navigation)}>
                    <Text style={{ color: '#333333', fontWeight: 'bold' }}>SignOut</Text>
                  </TouchableOpacity>
                </View>
              ),
            })}
          />

          <Stack.Screen
            name="ViewStory"
            component={ViewStory}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.navigate('ContentCenter')}>
                    <Text style={{ color: '#333333', fontWeight: 'bold' }}>Center</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => handleLogout(navigation)}>
                    <Text style={{ color: '#333333', fontWeight: 'bold' }}>SignOut</Text>
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="ViewContent"
            component={ViewContent}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.navigate('Make')}>
                    <Text style={{ color: '#333333', fontWeight: 'bold' }}>Make</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => handleLogout(navigation)}>
                    <Text style={{ color: '#333333', fontWeight: 'bold' }}>SignOut</Text>
                  </TouchableOpacity>
                </View>
              ),
            })}
          />

          <Stack.Screen
            name="ContentCenter"
            component={ContentCenter}
            options={({ navigation }) => ({
              headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.navigate('Make')}>
                    <Text style={{ color: '#333333', fontWeight: 'bold' }}>Make</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => handleLogout(navigation)}>
                    <Text style={{ color: '#333333', fontWeight: 'bold' }}>SignOut</Text>
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
