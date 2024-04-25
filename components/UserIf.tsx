import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useToken } from './AuthService'; // Import your authentication service

function Profile({ route, navigation }) {
  // Adding a log to see what's inside route.params
  console.log('Route parameters:', route.params);

  // Safely access userId using optional chaining and provide a default value
  const { userId = 'defaultUserId' } = route.params || {};

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    birthdate: '',
    address: '',
    phone_number: '',
    email: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost/geingeemu/public/api/user/${userId}`, { // Ensure API endpoint includes userId
          headers: {
            'Token': `${useToken()}`,
            'Authorization': `Bearer ${useToken()}`,
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
  }, [userId]);

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
}

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
