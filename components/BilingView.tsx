import React, { useState, useEffect } from 'react';
import { useToken } from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface UserData {
  firstname: string;
  lastname: string;
  birthdate: string;
  address: string;
  phone_number: string;
  email: string;
  role: string;
}

interface UserBiling {
  id: string;
  total: string;
  id_user: string;
  id_videogame: string;
  date: string;
}

interface VideoBiling {
  id: string;
  name: string;
  description: string;
  stock: string;
  price: string;
  physical: string;
  digital: string;
}

const Biling: React.FC = ({ navigation }) => {
  const token = useToken();
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [bilingData, setBilingData] = useState<UserBiling | null>(null);
  const [videoData, setVideoData] = useState<VideoBiling | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !token) return;

      try {
        const userD = axios.get(`http://192.168.76.127/geingeemu/public/api/userview/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const bilingD = axios.get(`http://192.168.76.127/geingeemu/public/api/bilingview/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const [userResponse, bilingResponse] = await Promise.all([userD, bilingD]);
        setUserData(userResponse.data);
        setBilingData(bilingResponse.data);
        if (bilingResponse.data.id_videogame) {
          const videoGD = await axios.get(`http://192.168.76.127/geingeemu/public/api/videogameview/${bilingResponse.data.id_videogame}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          setVideoData(videoGD.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Billing Details</Text>
          {userData && (
            <Text style={styles.text}>
              User: {userData.firstname} {userData.lastname}
            </Text>
          )}
          {bilingData && (
            <>
              <Text style={styles.text}>Billing ID: {bilingData.id}</Text>
              <Text style={styles.text}>Date of Purchase: {bilingData.date}</Text>
              <Text style={styles.text}>Total: {bilingData.total}</Text>
            </>
          )}
          {videoData && (
            <Text style={styles.text}>Game Purchased: {videoData.name}</Text>
          )}
        </View>
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

export default Biling;
