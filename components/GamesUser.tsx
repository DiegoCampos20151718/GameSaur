import React, { useState, useEffect } from 'react';
import { useToken } from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView, View, Text, StyleSheet, Image, ActivityIndicator, Button, Alert } from 'react-native';

const GamesUser: React.FC = ({ navigation }) => {
  const token = useToken();
  const [userId, setUserId] = useState<BigInteger | null>(null);
  const [videoGame, setVideoGame] = useState<VideoGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(BigInt(storedUserId));
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !token) return;

      try {
        const response = await axios.get<VideoGame[]>(`http://localhost/geingeemu/public/api/loadgame/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setVideoGame({
          ...response.data,
          digital: response.data?.digital === 0,
          physical: response.data?.physical === 1,
        });
        setLoading(false);
      } catch (error: any) {
        console.error('Fetch error:', error);
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(`Error: ${error.response.status} - ${error.response.statusText}`);
          } else if (error.request) {
            setError("No response received from server. Please check your network connection.");
          } else {
            setError("Error setting up request. Please try again.");
          }
        } else {
          setError('An unexpected error occurred.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  const deleteGame = async () => {
    try {
      if (!videoGame) return;
      await axios.delete(`http://localhost/geingeemu/public/api/destroy/${videoGame.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      Alert.alert('Game Deleted', 'The game has been successfully deleted.');
      // Optionally, you can update the state or navigate to another screen after deleting the game.
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Failed to delete the game. Please try again.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : videoGame ? (
        <View style={styles.card}>
          <Text style={styles.title}>{videoGame.name}</Text><Text style={styles.text}>id game: {videoGame.id}</Text>
          <Image style={styles.image} source={{ uri: videoGame.image }} />
          <Text style={styles.text}>Description: {videoGame.description}</Text>
          <Text style={styles.text}>Price: {videoGame.price}</Text>
          <Text style={styles.text}>Stock: {videoGame.stock}</Text>
          <Text style={styles.text}>{videoGame.physical ? 'Physical Copy Available' : 'Digital Only'}</Text>
          <Button title="Delete Game" onPress={deleteGame} />
        </View>
      ) : (
        <Text>No game data available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginBottom: 20,
  }
});

export default GamesUser;