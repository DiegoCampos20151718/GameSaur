import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthService';  // Importa useAuth para acceder a logout
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Button, View, Text, StyleSheet } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


interface UserData {
  firstname: string;
  lastname: string;
  birthdate: string;
  address: string;
  phone_number: string;
  email: string;
  role: string;
}

const Profile: React.FC = ({ }) => {
  const navigation = useNavigation();
  const { token, logout } = useAuth();  
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
    if (!userId || !token) return;

    const getUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost/geingeemu/public/api/userview/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
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
  }, [userId, token]);
  
  const handleLogout = async () => {
<<<<<<< HEAD
    await logout();  
    setUserId(null);  
    setUserData(null);  
    setLoading(true);  
    navigation.dispatch(StackActions.replace('Home'));  
=======
    await logout();  // Realiza la acción de logout.
    await AsyncStorage.clear();
    navigation.dispatch(
      StackActions.replace('Home')  // Usa StackActions.replace si está disponible.
    );
>>>>>>> aaa47f67129540f20723440a8ba7adc7bdff911e
  };
  

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
            <Button title="View Bilings" onPress={() => navigation.navigate('Biling', { userId })} color="#007bff" />
            <Button title="View Games" onPress={() => navigation.navigate('Games', { userId })} color="#007bff" />
            <Button title="Add Game Form" onPress={() => navigation.navigate('Addgame', { userId })} color="#007bff" />
            <Button title="Log out" onPress={handleLogout} color="#007bff" />
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
    backgroundColor: '#121212',
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
    fontSize: 18,
  },
  profileContainer: {
    padding: 20,
    backgroundColor: '#242424',
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileHeader: {
    fontSize: 24,
    color: '#00ff00',
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
