import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import VideoGameEdit from './EditGame';
import { EditIcon } from '@gluestack-ui/themed';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

interface JsonPlaceholder {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  id_user: number;
}

const deleteGame = async (game: JsonPlaceholder, setGames: React.Dispatch<React.SetStateAction<JsonPlaceholder[]>>, token: string) => {
  try {
    await axios.delete(`http://192.168.76.127/geingeemu/public/api/destroy/${game.id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    Alert.alert('Game Deleted', 'The game has been successfully deleted.');
    setGames((prevGames) => prevGames.filter(g => g.id !== game.id)); 
  } catch (error) {
    console.error('Delete error:', error);
    Alert.alert('Error', 'Failed to delete the game. Please try again.');
  }
};

const fetchData = async () => {
  const url = `http://192.168.76.127/geingeemu/public/api/videogame_index`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("Data from API:", data);
  return data;
}

const MainScreen = () => {
  const [games, setGames] = useState<JsonPlaceholder[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log("Stored UserID:", storedUserId);
      setUserId(storedUserId);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    fetchData().then(setGames);
  }, []);

  const navigation = useNavigation();

  const navigateToEditGame = (gameId: string) => {
    navigation.navigate('EditGame', { gameId });
  };

  const renderGameItem = (game: JsonPlaceholder, token: string) => (
    <View key={game.id} style={styles.gameItem}>
      <TouchableOpacity onPress={() => navigateToEditGame(game.id)}>
      <Image source={{ uri: game.image }} style={styles.image} />
        <Text style={styles.name}>{game.name}</Text>
        <Text style={styles.price}>${game.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => deleteGame(game, setGames, token)}
        style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={25} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {userId && 
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
            <Ionicons name="arrow-back" size={25} />
            <Text>Back</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Your Products</Text>
          <ScrollView contentContainerStyle={styles.gamesContainer}>
            {games.filter(game => game.id_user === parseInt(userId, 10)).length > 0 ? 
              games.filter(game => game.id_user === parseInt(userId, 10)).map(game => renderGameItem(game, 'YOUR_TOKEN_HERE')) : 
              <Text>No games available for this user.</Text>
            }
          </ScrollView>
        </View>
      }
    </View>
  );
}

const UserGamesScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Games" component={MainScreen} />
      <Stack.Screen name="EditGame" component={VideoGameEdit} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gameItem: {
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginTop: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  gamesContainer: {
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default UserGamesScreen;
