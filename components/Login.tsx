import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Registration from './Register';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const authenticateUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost/geingeemu/public/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        console.error('HTTP error', response.status, await response.text());
        Alert.alert('Login Error', `Server responded with status: ${response.status}`);
        return;
      }
      const json = await response.json();
      console.log(json); // Check what the API returned
        navigation.navigate('Home');
      // } else {
      //   Alert.alert('Login Failed', json.message || 'Invalid credentials');
      // }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Error', 'Unable to connect to the server');
    }
    setLoading(false);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    authenticateUser(email, password);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.appName}>APP</Text>
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="e-mail"
        placeholderTextColor="#9B9B9B"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9B9B9B"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity>
        <Text style={styles.signUpText} onPress={() => navigation.navigate('Register')}>
          Don't have an account? Click here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Added padding for overall screen
  },
  logo: {
    width: 100, // Adjusted to larger size based on the image
    height: 100, // Adjusted to larger size based on the image
    marginBottom: 30,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 30,
  },
  loginText: {
    fontSize: 28, // Made larger based on the image
    fontWeight: 'bold',
    color: '#007AFF', // Assuming the color matches the logo
    marginBottom: 30,
  },
  input: {
    width: '100%', // Made full-width based on the image
    height: 50, // Increased height for better touch area
    borderColor: '#007AFF',
    borderWidth: 2, // Made border thicker
    borderRadius: 10, // Increased border radius
    paddingHorizontal: 15, // Increased padding for text inside input
    marginBottom: 20, // Increased space between inputs
    fontSize: 18, // Larger font for better readability
  },
  loginButton: {
    width: '100%', // Full-width button
    height: 50, // Increased height for a bigger touch area
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Matched border radius with inputs
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 20, // Increased font size
    fontWeight: 'bold',
  },
  keepSessionContainer: {
    flexDirection: 'row',
    marginBottom: 20, // Increased space before sign up option
  },
  keepSessionText: {
    color: '#007AFF',
    fontSize: 16, // Adjusted font size for readability
  },
  signUpText: {
    color: '#007AFF',
    fontSize: 16, // Adjusted font size for readability
    textDecorationLine: 'underline', // Added underline as is common for links
  },
});

export default LoginScreen;
