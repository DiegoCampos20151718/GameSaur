import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, ScrollView, Picker, StyleSheet, Alert } from 'react-native';
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
    id_user: userId || '',
    id_category: '',
    id_genre: '',
    id_platform: '',
    id_brand: '',
  });

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log('Valores enviados a la API:', formData); // Agrega este console.log para imprimir los valores
    try {
      const response = await axios.post('http://localhost/geingeemu/public/api/videogamestore', {
        ...formData,
        stock: parseInt(formData.stock, 10),
        price: parseFloat(formData.price),
        type: formData.type === 'true',
        physical: formData.physical === 'true',
        digital: formData.digital === 'true',
      });

      Alert.alert('Éxito', 'Videojuego creado correctamente');
      // Aquí podrías redirigir a otra pantalla o hacer alguna acción adicional después de crear el videojuego
    } catch (error) {
      console.error('Error al crear el videojuego:', error);
      Alert.alert('Error', 'Error al crear el videojuego');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput placeholder="Nombre" value={formData.name} onChangeText={(text) => handleInputChange('name', text)} style={styles.input} />
      <TextInput placeholder="Descripción" value={formData.description} onChangeText={(text) => handleInputChange('description', text)} multiline style={styles.input} />
      <TextInput placeholder="Stock" value={formData.stock} onChangeText={(text) => handleInputChange('stock', text)} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Precio" value={formData.price} onChangeText={(text) => handleInputChange('price', text)} keyboardType="numeric" style={styles.input} />
      <Picker selectedValue={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
        <Picker.Item label="Físico" value="true" />
        <Picker.Item label="Digital" value="false" />
      </Picker>
      <Switch value={formData.physical === 'true'} onValueChange={(value) => handleInputChange('physical', value.toString())} />
      <Switch value={formData.digital === 'true'} onValueChange={(value) => handleInputChange('digital', value.toString())} />
      <TextInput placeholder="URL de la imagen" value={formData.image} onChangeText={(text) => handleInputChange('image', text)} style={styles.input} />
      <TextInput placeholder="ID del usuario" value={formData.id_user} onChangeText={(text) => handleInputChange('id_user', text)} style={styles.input} />
      <TextInput placeholder="ID de categoría" value={formData.id_category} onChangeText={(text) => handleInputChange('id_category', text)} style={styles.input} />
      <TextInput placeholder="ID de género" value={formData.id_genre} onChangeText={(text) => handleInputChange('id_genre', text)} style={styles.input} />
      <TextInput placeholder="ID de plataforma" value={formData.id_platform} onChangeText={(text) => handleInputChange('id_platform', text)} style={styles.input} />
      <TextInput placeholder="ID de marca" value={formData.id_brand} onChangeText={(text) => handleInputChange('id_brand', text)} style={styles.input} />
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
