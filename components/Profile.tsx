import React, { useState, useEffect } from 'react';
import { useToken } from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Button, View, Text, StyleSheet } from 'react-native';

interface UserData {
  firstname: string;
  lastname: string;
  birthdate: string;
  address: string;
  phone_number: string;
  email: string;
  role: string;
}

const Profile: React.FC = ({ navigation }) => {
  const token = useToken();  // Token fetched using custom hook
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');  // Retrieve the user ID from AsyncStorage
      setUserId(storedUserId);
    };

    fetchUserId();  // Call the async function to fetch the user ID
  }, []);

  useEffect(() => {
    if (!userId || !token) return; // Only proceed if both userId and token are available

    const getUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost/geingeemu/public/api/userview/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Error fetching user details.');
        setLoading(false);
      }
    };

    getUserDetails();
  }, [userId, token]);  // React when userId or token changes



  const ViewBilings = () => {
    navigation.navigate('Biling', { userId });
  };

  const ViewGamesStore = () => {
    navigation.navigate('Games', { userId });
  };



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <View style={styles.placeholder}>
          <Text>Loading...</Text>
        </View>
      ) : error ? (
        <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>
      ) : userData ? (
        <View style={styles.container}>
          <Text style={{ fontSize: 24 }}>User Profile</Text>
          <Text>Name: {userData.firstname} {userData.lastname}</Text>
          <Text>address: {userData.address}</Text>
          <Text>birthdate: {userData.birthdate}</Text>
          <Text>email: {userData.email}</Text>
          <Text>role: {userData.role}</Text>

          <Button title="View Bilings" onPress={ViewBilings} color="#007bff" /> 
          <Button title="View Games" onPress={ViewGamesStore} color="#007bff" />
        </View>
      ) : (
        <Text>No user data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 800,
    width: '100%',
    padding: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 20,
    borderRadius: 8,
  }
});

export default Profile;
