import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface JsonPlaceholder {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  id_user: number;  // Cambio a `id_user` que es el campo correcto
}

const fetchData = async () => {
  const url = `http://localhost/geingeemu/public/api/videogame_index`;
  const response = await fetch(url);
  const data = await response.json();
  console.log("Data from API:", data);  // Verificación de los datos recibidos
  return data;
}

const GamesView = ({ data, userId }: { data: JsonPlaceholder[], userId: string }) => {
  const navigation = useNavigation();

  // Convierte `userId` a número porque `id_user` en los datos es un número
  const userNumericId = parseInt(userId, 10);
  const filteredGames = data.filter(game => game.id_user === userNumericId);

  const renderGameItem = (game: JsonPlaceholder) => (
    <TouchableOpacity key={game.id} onPress={() => navigation.navigate('GameDetails', { game })}>
      <View style={styles.gameItem}>
        <Image source={{ uri: game.image }} style={styles.image} />
        <Text style={styles.name}>{game.name}</Text>
        <Text style={styles.price}>${game.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
        <Ionicons name="arrow-back" size={25} />
        <Text>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Your Games</Text>
      <ScrollView contentContainerStyle={styles.gamesContainer}>
        {filteredGames.length > 0 ? filteredGames.map(renderGameItem) : <Text>No games available for this user.</Text>}
      </ScrollView>
    </View>
  );
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

  return (
    <View style={{ flex: 1 }}>
      {userId && <GamesView data={games} userId={userId} />}
    </View>
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
  }
});

export default MainScreen;
