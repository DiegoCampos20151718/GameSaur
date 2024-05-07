import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './components/Login'; // Adjust the path as necessary
import Register from './components/Register'; // Adjust the path as necessary

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Register" component={Register} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
