import React from 'react';
import { config } from '@gluestack-ui/config';
import { Box, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native';
import Gradient from './assets/Icons/Gradient';
import DocumentData from './assets/Icons/DocumentData';
import LightBulbPerson from './assets/Icons/LightbulbPerson';
import Rocket from './assets/Icons/Rocket';
import Logo from './assets/Icons/Logo';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}

