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

interface User {
  id: number;
  firstname: string;
  lastname: string;
}

const ChatList: React.FC = ({ navigation }) => {
  const token = useToken();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [games, setGames] = useState<{ [id: number]: string }>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const storedUserId = await AsyncStorage.getItem('userId');
        setUserId(storedUserId);
        if (storedUserId) {
          const userId = BigInt(storedUserId);
          const response = await axios.get<Chat[]>(`http://192.168.76.127/geingeemu/public/api/loadchats/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          setChats(response.data);

          
          const user1Requests = response.data.map(chat => axios.get<User>(`http://192.168.76.127/geingeemu/public/api/userview/${chat.id_user1}`));
          const usersData1 = await Promise.all(user1Requests);
          const user1Names = usersData1.map(userResponse => userResponse.data);

         
          const user2Requests = response.data.map(chat => axios.get<User>(`http://192.168.76.127/geingeemu/public/api/userview/${chat.id_user2}`));
          const usersData2 = await Promise.all(user2Requests);
          const user2Names = usersData2.map(userResponse => userResponse.data);

         
          const combinedUsers = response.data.map((chat, index) => ({
            id: chat.id,
            firstname1: user1Names[index]?.firstname,
            lastname1: user1Names[index]?.lastname,
            firstname2: user2Names[index]?.firstname,
            lastname2: user2Names[index]?.lastname,
          }));

          setUsers(combinedUsers);

          
          const gameRequests = response.data.map(chat => axios.get<{ name: string }>(`http://192.168.76.1277/geingeemu/public/api/ampp/${chat.id_videogame}`));
          const gamesData = await Promise.all(gameRequests);
          const gameNames = gamesData.reduce((acc, gameResponse) => {
            acc[gameResponse.data.id] = gameResponse.data.name;
            return acc;
          }, {} as { [id: number]: string });

          setGames(gameNames);
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

  const renderCard = ({ item, index }: { item: Chat; index: number }) => (
    <TouchableOpacity onPress={() => navigateToChatDetail(item.id)}>
      <View style={styles.card}>
        {/* <Text style={styles.cardText}>ID: {item.id}</Text> */}
        {!userId || item.id_user1.toString() !== userId ? (
          <Text style={styles.cardText}>{users[index]?.firstname1} {users[index]?.lastname1}</Text>
        ) : <Text style={styles.cardText}>{users[index]?.firstname2} {users[index]?.lastname2}</Text> }
        <Text style={styles.cardText}>Producto: {games[item.id_videogame]}</Text>
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
