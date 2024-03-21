import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const AddVideoGameForm = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');

  const handleSubmit = () => {
    // Here, you can implement the logic to add the video game to your data store
    console.log('Title:', title);
    console.log('Genre:', genre);
    console.log('Platform:', platform);

    // Reset the form fields
    setTitle('');
    setGenre('');
    setPlatform('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Video Game</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the title"
        placeholderTextColor="#9B9B9B"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Genre</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the genre"
        placeholderTextColor="#9B9B9B"
        value={genre}
        onChangeText={setGenre}
      />

      <Text style={styles.label}>Platform</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the platform"
        placeholderTextColor="#9B9B9B"
        value={platform}
        onChangeText={setPlatform}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Video Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddVideoGameForm;