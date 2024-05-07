import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, ScrollView, Picker, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

type FormData = {
  name: string;
  description: string;
  stock: number;
  price: number;
  type: boolean;
  physical: boolean;
  digital: boolean;
  image: string;
  id_user: string;
  id_category: string;
  id_genre: string;
  id_platform: string;
  id_brand: string;
};

type VideoGameFormScreenRouteParams = {
  userId: string;
};

type VideoGameFormProps = {
  route: {
    params: VideoGameFormScreenRouteParams;
  };
};

type Category = { id: string; name: string };
type Genre = { id: string; name: string };
type Platform = { id: string; name: string };
type Brand = { id: string; name: string };

const VideoGameForm: React.FC<VideoGameFormProps> = ({ route }) => {
  const { userId } = route.params; // Now correctly typed, and TypeScript knows userId is a string

  const navigation = useNavigation();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    stock: 0,
    price: 0,
    type: false,
    physical: false,
    digital: false,
    image: '',
    id_user: userId || '', // Initialize id_user with the userId passed through navigation
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
        const responses = await Promise.all([
          axios.get('http://localhost/geingeemu/public/api/categories'),
          axios.get('http://localhost/geingeemu/public/api/genres'),
          axios.get('http://localhost/geingeemu/public/api/platforms'),
          axios.get('http://localhost/geingeemu/public/api/brands')
        ]);
        setCategories(responses[0].data);
        setGenres(responses[1].data);
        setPlatforms(responses[2].data);
        setBrands(responses[3].data);
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
    const endpoint = formData.id_user ? `http://localhost/geingeemu/public/api/videogamestore/${formData.id_user}` : 'http://localhost/geingeemu/public/api/videogamestore';
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
      <View style={styles.switchContainer}>
        <Text>Type:</Text>
        <Switch value={formData.type} onValueChange={(value) => handleInputChange('type', value)} />
      </View>
      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={formData.image}
        onChangeText={(text) => handleInputChange('image', text)}
      />
      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={formData.id_category}
        onValueChange={(itemValue) => handleInputChange('id_category', itemValue.toString())}>
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Genre:</Text>
      <Picker
        selectedValue={formData.id_genre}
        onValueChange={(itemValue) => handleInputChange('id_genre', itemValue.toString())}>
        {genres.map((genre) => (
          <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Platform:</Text>
      <Picker
        selectedValue={formData.id_platform}
        onValueChange={(itemValue) => handleInputChange('id_platform', itemValue.toString())}>
        {platforms.map((platform) => (
          <Picker.Item key={platform.id} label={platform.name} value={platform.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Brand:</Text>
      <Picker
        selectedValue={formData.id_brand}
        onValueChange={(itemValue) => handleInputChange('id_brand', itemValue.toString())}>
        {brands.map((brand) => (
          <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
        ))}
      </Picker>
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default VideoGameForm;
