import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './components/Login'; // Adjust the path as necessary
import Register from './components/Register'; // Adjust the path as necessary
import Home from './components/Home';
import Search from './components/Search';
import ProdInfo from './components/ProdInfo';
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="ProdInfo" component={ProdInfo} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
