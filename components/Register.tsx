import React from 'react';
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const Register = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.registerText}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#9B9B9B"
      />
      <TextInput
        style={styles.input}
        placeholder="firstname"
        placeholderTextColor="#9B9B9B"
      />
      <TextInput
        style={styles.input}
        placeholder="Lastname"
        placeholderTextColor="#9B9B9B"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#9B9B9B"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#9B9B9B"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#9B9B9B"
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signInText}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  registerText: {
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
  registerButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#007AFF',
  },
});

export default Register;
