import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface ChatMessage {
  nombre: string;
  mensaje: string;
  fecha: string;
}

const ChatDetailScreen: React.FC<{ route: any }> = ({ navigation, route }) => {
  const { chatId } = route.params;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<{ chat: string }[]>(`http://localhost/geingeemu/public/api/loadmessages/${chatId}`);
        if (response.data.length > 0) {
          const chatData = response.data[0].chat;
          const parsedChatData: ChatMessage[] = JSON.parse(chatData);
        //   console.log('Mensajes del chat:', parsedChatData);
          setMessages(parsedChatData);
        }
      } catch (error) {
        console.error('Error al cargar los mensajes:', error);
      }
    };

    fetchMessages();
  }, [chatId]);

  const handleSend = async () => {
    try {
      const newMessageData: ChatMessage = {
        nombre: 'Usuario',
        mensaje: newMessage,
        fecha: new Date().toISOString(),
      };

      const updatedMessages = [...messages, newMessageData];
      setMessages(updatedMessages);

      await axios.post(`http://localhost/geingeemu/public/api/updatemessages/${chatId}`, { chat: JSON.stringify(updatedMessages) });

      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageTitle}>{item.nombre}</Text>
      <Text>{item.mensaje}</Text>
      <Text style={styles.messageDate}>{item.fecha}</Text>
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