import React from 'react';
import { Image } from 'react-native';
import { config } from '@gluestack-ui/config';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const Login = () => {
  return (
    
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.loginText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="e-mail"
        placeholderTextColor="#9B9B9B"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9B9B9B"
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.keepSessionContainer}>
        <TouchableOpacity>
          <Text style={styles.keepSessionText}>Keep open the session</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.signUpText}>Don't have an account? Click here</Text>
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
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  keepSessionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  keepSessionText: {
    color: '#007AFF',
  },
  signUpText: {
    color: '#007AFF',
  },
});

export default Login;