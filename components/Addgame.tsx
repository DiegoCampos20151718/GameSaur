import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, ScrollView, Picker, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

type FormData = {
  name: string;
  description: string;
  stock: number;
  price: number;
  physical: boolean;
  digital: boolean;
  image: string;
  id_category: string;
  id_genre: string;
  id_platform: string;
  id_brand: string;
};

type Category = { id: string; name: string };
type Genre = { id: string; name: string };
type Platform = { id: string; name: string };
type Brand = { id: string; name: string };

const VideoGameForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    stock: 0,
    price: 0,
    physical: false,
    digital: false,
    image: '',
    id_category: '',
    id_genre: '',
    id_platform: '',
    id_brand: '',
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost/geingeemu/public/api/categories');
        setCategories(categoryResponse.data);
        const genreResponse = await axios.get('http://localhost/geingeemu/public/api/genres');
        setGenres(genreResponse.data);
        const platformResponse = await axios.get('http://localhost/geingeemu/public/api/platforms');
        setPlatforms(platformResponse.data);
        const brandResponse = await axios.get('http://localhost/geingeemu/public/api/brands');
        setBrands(brandResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data from server.');
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (name: keyof FormData, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const endpoint = formData.name ? 'http://localhost/geingeemu/public/api/videogamestore' : `http://localhost/geingeemu/public/api/videogameedit/${formData.name}`;
    try {
      const response = await axios.post(endpoint, formData);
      Alert.alert('Success', 'Video game successfully submitted.');
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to submit form.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Form Inputs */}
      <TextInput placeholder="Name" value={formData.name} onChangeText={(text) => handleInputChange('name', text)} style={styles.input} />
      <TextInput placeholder="Description" value={formData.description} onChangeText={(text) => handleInputChange('description', text)} multiline style={styles.input} />
      <TextInput placeholder="Stock" value={formData.stock.toString()} onChangeText={(text) => handleInputChange('stock', parseInt(text))} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Price" value={formData.price.toString()} onChangeText={(text) => handleInputChange('price', parseFloat(text))} keyboardType="numeric" style={styles.input} />
      <View style={styles.switchContainer}>
        <Text>Physical:</Text>
        <Switch value={formData.physical} onValueChange={(value) => handleInputChange('physical', value)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Digital:</Text>
        <Switch value={formData.digital} onValueChange={(value) => handleInputChange('digital', value)} />
      </View>
      {/* Picker Components for Categories, Genres, Platforms, Brands */}
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default VideoGameForm;
