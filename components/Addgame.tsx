import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, ScrollView, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

type FormData = {
  name: string;
  description: string;
  stock: number;
  price: number;
  type: number;
  physical: string;
  digital: string;
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
  const { userId } = route.params;

  const navigation = useNavigation();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    stock: 0,
    price: 0,
    type: 1,
    physical: 'false',
    digital: 'false',
    image: '',
    id_user: userId,
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
          axios.get('http://192.168.76.127/geingeemu/public/api/categories'),
          axios.get('http://192.168.76.127/geingeemu/public/api/genres'),
          axios.get('http://192.168.76.127/geingeemu/public/api/platforms'),
          axios.get('http://192.168.76.127/geingeemu/public/api/brands')
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

  const handleInputChange = (name: keyof FormData, value: string) => {
    if (name === 'stock' || name === 'price') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    console.log('Valores enviados a la API:', formData); 
    try {
      const response = await axios.post('http://192.168.76.127/geingeemu/public/api/videogamestore', {
        ...formData,
        stock: parseInt(formData.stock, 10),
        price: parseFloat(formData.price),
        type: formData.type === 'true',
        physical: formData.physical === 'true',
        digital: formData.digital === 'true',
      });

      Alert.alert('Éxito', 'Videojuego creado correctamente');
      
    } catch (error) {
      console.error('Error al crear el videojuego:', error);
      Alert.alert('Error', 'Error al crear el videojuego');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Name" value={formData.name} onChangeText={(text) => handleInputChange('name', text)} style={styles.input} />
      <TextInput placeholder="Description" value={formData.description} onChangeText={(text) => handleInputChange('description', text)} multiline style={styles.input} />
      <TextInput placeholder="Stock" value={formData.stock} onChangeText={(text) => handleInputChange('stock', text)} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Price" value={formData.price} onChangeText={(text) => handleInputChange('price', text)} keyboardType="numeric" style={styles.input} />
      <Picker selectedValue={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
        <Picker.Item label="Videogame" value="true" />
        <Picker.Item label="Console" value="false" />
      </Picker>
      <Text>
        Physical: <Switch value={formData.physical === 'true'} onValueChange={(value) => handleInputChange('physical', value.toString())} />
      </Text>
      <Text>
        Digital: <Switch value={formData.digital === 'true'} onValueChange={(value) => handleInputChange('digital', value.toString())} />
      </Text>
      <TextInput placeholder="Image URL" value={formData.image} onChangeText={(text) => handleInputChange('image', text)} style={styles.input} />
      {/* <TextInput placeholder="ID del usuario" value={formData.id_user} onChangeText={(text) => handleInputChange('id_user', text)} style={styles.input} /> */}
      <Picker
        selectedValue={formData.id_category}
        onValueChange={(value) => handleInputChange('id_category', value.toString())}>
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={category.id} />
        ))}
      </Picker>
      <Text>Genre:</Text>
      <Picker
        selectedValue={formData.id_genre}
        onValueChange={(value) => handleInputChange('id_genre', value.toString())}>
        {genres.map((genre) => (
          <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
        ))}
      </Picker>
      <Text>Platform:</Text>
      <Picker
        selectedValue={formData.id_platform}
        onValueChange={(value) => handleInputChange('id_platform', value.toString())}>
        {platforms.map((platform) => (
          <Picker.Item key={platform.id} label={platform.name} value={platform.id} />
        ))}
      </Picker>
      <Text>Brand:</Text>
      <Picker
        selectedValue={formData.id_brand}
        onValueChange={(value) => handleInputChange('id_brand', value.toString())}>
        {brands.map((brand) => (
          <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
        ))}
      </Picker>
      <Button title="Crear Videojuego" onPress={handleSubmit} />
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
});

export default VideoGameForm;
