import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToken } from './AuthService';
import { createStackNavigator } from '@react-navigation/stack';
import ChatDetailScreen from './Chat';

const Stack = createStackNavigator();

interface Chat {
  id: number;
  id_user1: number;
  id_user2: number;
  id_videogame: number;
  chat: string;
  date: string;
}

const ChatList: React.FC = ({ navigation }) => {
  const token = useToken();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          const userId = BigInt(storedUserId);
          const response = await axios.get<Chat[]>(`http://localhost/geingeemu/public/api/loadchats/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          // console.log('Chats recibidos:', response.data);
          setChats(response.data);
        }
      } catch (error) {
        console.error('Error al cargar los chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [token]);

  const navigateToChatDetail = (chatId: number) => {
    navigation.navigate('ChatDetails', { chatId });
  };

  const renderCard = ({ item }: { item: Chat }) => (
    <TouchableOpacity onPress={() => navigateToChatDetail(item.id)}>
      <View style={styles.card}>
        <Text style={styles.cardText}>ID: {item.id}</Text>
        <Text style={styles.cardText}>User 1: {item.id_user1}</Text>
        <Text style={styles.cardText}>User 2: {item.id_user2}</Text>
        <Text style={styles.cardText}>Videojuego: {item.id_videogame}</Text>
        <Text style={styles.cardText}>Fecha: {item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView>
      <FlatList
        data={chats}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};

const ChatScreen = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Chats" component={ChatList} />
      <Stack.Screen name="ChatDetails" component={ChatDetailScreen} />
    </Stack.Navigator>
  );

}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ChatScreen;