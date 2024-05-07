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
  const token = useToken();
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
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
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log("Retrieved userId:", storedUserId); // Debug: Verificar el valor de userId obtenido
      if (storedUserId !== null) {
        setUserId(storedUserId);
      } else {
        console.log("No userId found in storage."); // Informar si no hay userId
        setLoading(false); // Detener el indicador de carga si no hay userId
      }
    };
  
    fetchUserId();
  }, []);
  
  useEffect(() => {
    // Only proceed if both userId and token are valid and not null
    if (!userId || !token) {
      console.log("Waiting for userId or token:", userId, token); // Debug: Check if either is missing
      return;
    }
  
    console.log("Proceeding with userId and token:", userId, token); // Debug: Confirm both are present
  
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost/geingeemu/public/api/userview/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("API response:", response.data); // Debug: View API response
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Error fetching user details.');
        setLoading(false);
      }
    };
  
    getUserDetails();
  }, [userId, token]); // Depend on userId and token
    

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : userData ? (
        <View style={styles.profileContainer}>
          <Text style={styles.profileHeader}>User Profile</Text>
          <Text style={styles.profileText}>Name: {userData.firstname} {userData.lastname}</Text>
          <Text style={styles.profileText}>Address: {userData.address}</Text>
          <Text style={styles.profileText}>Birthdate: {userData.birthdate}</Text>
          <Text style={styles.profileText}>Email: {userData.email}</Text>
          <Text style={styles.profileText}>Role: {userData.role}</Text>
          <View style={styles.buttonContainer}>
            <Button title="View Billings" onPress={() => navigation.navigate('Billing', { userId })} color="#007bff" />
            <Button title="View Games" onPress={() => navigation.navigate('Games', { userId })} color="#007bff" />
            <Button title="Add Game" onPress={() => navigation.navigate('AddGame', { userId })} color="#007bff" />
          </View>
        </View>
      ) : (
        <Text style={styles.noDataText}>No user data available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',  // Dark background for a gaming vibe
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 20,
    color: '#ffffff',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  profileContainer: {
    padding: 20,
    backgroundColor: '#242424',  // Slightly lighter background for content cards
    borderRadius: 10,
    width: '90%',  // Use a percentage of width for better responsiveness
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileHeader: {
    fontSize: 24,
    color: '#00ff00',  // Bright accent color
    marginBottom: 10,
  },
  profileText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 16,
    color: '#ffffff',
  },
  buttonContainer: {
    marginTop: 20,
  }
});

export default Profile;
