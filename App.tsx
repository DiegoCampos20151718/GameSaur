import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './components/Login'; // Adjust the path as necessary
import Register from './components/Register'; // Adjust the path as necessary
import Home from './components/Home';
import Search from './components/Search';
import ProdInfo from './components/ProdInfo';
import Profile from './components/Profile';
import BilingView from './components/BilingView';
import GamesUser from './components/GamesUser';
import Addgame from './components/Addgame';
import Wishlist from './components/WishList';
import { AuthProvider } from './components/AuthService';
const Drawer = createDrawerNavigator();
export type RootStackParamList = {
  ProdInfo: { item: Product };
  Wishlist: undefined;
};

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Register" component={Register} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="ProdInfo" component={ProdInfo} />
        <Drawer.Screen name="Biling" component={BilingView} />
        <Drawer.Screen name="Games" component={GamesUser} />
        <Drawer.Screen name="Addgame" component={Addgame} />
        <Drawer.Screen name="Wishlist" component={Wishlist} />
      </Drawer.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
