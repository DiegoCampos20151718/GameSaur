import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToken } from './AuthService';

interface ChatMessage {
  name: string;
  message: string;
  date: string;
}

const ChatDetailScreen: React.FC<{ route: any }> = ({ navigation, route }) => {
  const { chatId } = route.params;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const token = useToken(); 
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<{ chat: string }[]>(`http://192.168.76.127/geingeemu/public/api/loadmessages/${chatId}`);
        if (response.data.length > 0) {
          const chatData = response.data[0].chat;
          const parsedChatData: ChatMessage[] = JSON.parse(chatData);
          setMessages(parsedChatData);
        }
      } catch (error) {
        console.error('Error al cargar los mensajes:', error);
      }
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    const fetchUserId = async () => {
        const storedUserId = await AsyncStorage.getItem('userId');
        console.log("Stored UserID:", storedUserId); 
        setUserId(storedUserId);
        const response = await axios.get(`http://192.168.76.127/geingeemu/public/api/userview/${storedUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserData(response.data.firstname);
      console.log(response.data.firstname);
    };
    fetchUserId();
    console.log(userId);
  }, []);

  const handleSend = async () => {
    try {
      const newMessageData: ChatMessage = {
        name: userData,
        message: newMessage,
        date: new Date().toISOString(),
      };

      const updatedMessages = [...messages, newMessageData];
      setMessages(updatedMessages);

      await axios.post(`http://192.168.76.127/geingeemu/public/api/updatemessages/${chatId}`, { chat: JSON.stringify(updatedMessages) });

      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageTitle}>{item.name}</Text>
      <Text>{item.message}</Text>
      <Text style={styles.messageDate}>{item.date}</Text>
    </View>
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Ionicons name="arrow-undo-sharp" size={25} />
        <Text style={styles.goBackText}>Go back</Text>
      </TouchableOpacity>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Escribe un mensaje..."
        onSubmitEditing={handleSend}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  goBackText: {
    marginLeft: 5,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  messageTitle: {
    fontWeight: 'bold',
  },
  messageDate: {
    color: '#666',
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});

export default ChatDetailScreen;