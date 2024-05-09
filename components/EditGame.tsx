import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Switch, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormData = {
    name: string;
    description: string;
    stock: number;
    price: number;
    type: number;
    physical: string;
    digital: string;
    image: string;
    id_category: string;
    id_genre: string;
    id_platform: string;
    id_brand: string;
    id_user: string;
};

type VideoGameEditScreenRouteParams = {
    gameId: string;
};

type VideoGameEditProps = {
    route: {
        params: VideoGameEditScreenRouteParams;
    };
};

type Category = { id: string; name: string };
type Genre = { id: string; name: string };
type Platform = { id: string; name: string };
type Brand = { id: string; name: string };

const VideoGameEdit: React.FC<VideoGameEditProps> = ({ navigation, route }) => {
    const { gameId } = route.params;
    const [userId, setUserId] = useState<string | null>(null);

    const fetchUserId = async () => {
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId);
    };
    console.log("Stored UserID:", userId);
    fetchUserId();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        stock: 0,
        price: 0,
        type: 1,
        physical: 'false',
        digital: 'false',
        image: '',
        id_category: '',
        id_genre: '',
        id_platform: '',
        id_brand: '',
        id_user: '',
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
                    axios.get('http://192.168.76.127/geingeemu/public/api/brands'),
                    axios.get(`http://192.168.76.127/geingeemu/public/api/ampp/${gameId}`),
                ]);
                setCategories(responses[0].data);
                setGenres(responses[1].data);
                setPlatforms(responses[2].data);
                setBrands(responses[3].data);
                const videoGameData = responses[4].data;
                setFormData({
                    name: videoGameData.name,
                    description: videoGameData.description,
                    stock: videoGameData.stock.toString(),
                    price: videoGameData.price.toString(),
                    type: videoGameData.type.toString(),
                    physical: videoGameData.physical.toString(),
                    digital: videoGameData.digital.toString(),
                    image: videoGameData.image,
                    id_category: videoGameData.id_category.toString(),
                    id_genre: videoGameData.id_genre.toString(),
                    id_platform: videoGameData.id_platform.toString(),
                    id_brand: videoGameData.id_brand.toString(),
                    id_user: videoGameData.id_user.toString(),
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                Alert.alert('Error', 'Failed to fetch data from server.');
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (name: keyof FormData, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            console.log('Datos enviados al servidor:', formData);
            await axios.post(`http://192.168.76.127/geingeemu/public/api/videogameedit/${gameId}`, formData);
            Alert.alert('Éxito', 'Videojuego editado correctamente');
        } catch (error) {
            console.error('Error al editar el videojuego:', error);
            Alert.alert('Error', 'Error al editar el videojuego');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={{
                    marginBottom: 10
                }}
            >
                <Ionicons name="arrow-undo-sharp" size={25} />
                <Text>Go back</Text>
            </TouchableOpacity>
            <TextInput placeholder="Name" value={formData.name} onChangeText={(text) => handleInputChange('name', text)} style={styles.input} />
            <TextInput placeholder="Description" value={formData.description} onChangeText={(text) => handleInputChange('description', text)} multiline style={styles.input} />
            <TextInput placeholder="Stock" value={formData.stock} onChangeText={(text) => handleInputChange('stock', text)} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Price" value={formData.price} onChangeText={(text) => handleInputChange('price', text)} keyboardType="numeric" style={styles.input} />
            <Picker selectedValue={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <Picker.Item label="Videogame" value="1" />
                <Picker.Item label="Console" value="0" />
            </Picker>
            <Text>Physical: <Switch value={formData.physical === 'true'} onValueChange={(value) => handleInputChange('physical', value.toString())} /></Text>
            <Text>Digital: <Switch value={formData.digital === 'true'} onValueChange={(value) => handleInputChange('digital', value.toString())} /></Text>
            <TextInput placeholder="Image URL" value={formData.image} onChangeText={(text) => handleInputChange('image', text)} style={styles.input} />
            <Picker selectedValue={formData.id_category} onValueChange={(value) => handleInputChange('id_category', value)}>
                {categories.map((category) => (
                    <Picker.Item key={category.id} label={category.name} value={category.id} />
                ))}
            </Picker>
            <Picker selectedValue={formData.id_genre} onValueChange={(value) => handleInputChange('id_genre', value)}>
                {genres.map((genre) => (
                    <Picker.Item key={genre.id} label={genre.name} value={genre.id} />
                ))}
            </Picker>
            <Picker selectedValue={formData.id_platform} onValueChange={(value) => handleInputChange('id_platform', value)}>
                {platforms.map((platform) => (
                    <Picker.Item key={platform.id} label={platform.name} value={platform.id} />
                ))}
            </Picker>
            <Picker selectedValue={formData.id_brand} onValueChange={(value) => handleInputChange('id_brand', value)}>
                {brands.map((brand) => (
                    <Picker.Item key={brand.id} label={brand.name} value={brand.id} />
                ))}
            </Picker>
            <Button title="Save" onPress={handleSubmit} />
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

export default VideoGameEdit;
