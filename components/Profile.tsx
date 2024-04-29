import React, { useState, useEffect } from 'react';
import { useToken } from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Button, View, Text, StyleSheet } from 'react-native';

const Profile: React.FC = () => {
  const token = useToken();  // Token fetched using custom hook
  const [userId, setUserId] = useState<string | null>(null);  // State to hold the user ID

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');  // Retrieve the user ID from AsyncStorage
      setUserId(storedUserId);  // Update state with the retrieved ID
    };

    fetchUserId();  // Call the async function to fetch the user ID
  
  }, []);  // Empty dependency array means this effect runs once after the component mounts

  return (
    <div>
      {/* Render token and user ID */}
      <p>Your token is: {token}</p>
      <p>Your user ID is: {userId}</p>  // Display the user ID
    </div>
  );
};

export default Profile;
