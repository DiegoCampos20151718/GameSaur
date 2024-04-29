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

const Profile: React.FC = () => {
  const token = useToken();  // Token fetched using custom hook
  const [userId, setUserId] = useState<string | null>(null);  // State to hold the user ID
  const [userData, setUserData] = useState<UserData>({
    firstname: '',
    lastname: '',
    birthdate: '',
    address: '',
    phone_number: '',
    email: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');  // Retrieve the user ID from AsyncStorage
      setUserId(storedUserId);  // Update state with the retrieved ID
    };

    fetchUserId();  // Call the async function to fetch the user ID

    const getUserDetails = async () => {
      try {
        console.log('Data: ');
        const response = await axios.get(`http://localhost/geingeemu/public/api/userview/${userId}`, {
          headers: {
            'Token': `${token}`,
            'Authorization': `Bearer ${useToken()}`,
          },
        });
        console.log('Data: ', response.data);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Error fetching user details.');
        setLoading(false);
      }
    };

    getUserDetails();
  
  }, [userId, token]);  // Empty dependency array means this effect runs once after the component mounts

  const handleEditProfile = () => {
    // Navigate to the EditProfile screen with userId
    navigation.navigate('EditProfile', { userId });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <View style={styles.placeholder}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {error ? (
            <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>
          ) : null}
          <Text style={{ fontSize: 24 }}>User Profile</Text>
          <Text>Token: {useToken()}</Text>
          <Text>Email: {userData.email}</Text>
          <Button title="Edit Profile" onPress={handleEditProfile} color="#007bff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 800,
    width: '100%',
    padding: 20,
    backgroundColor: '#000',
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