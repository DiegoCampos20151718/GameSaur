import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './components/Login'; // Adjust the path as necessary
import Register from './components/Register'; // Adjust the path as necessary
import Home from './components/Home';
import Profile from './components/Profile';
import BilingView from './components/BilingView';
import GamesUser from './components/GamesUser';
import Addgame from './components/Addgame';
import { AuthProvider } from './components/AuthService';
const Drawer = createDrawerNavigator();
// export type RootStackParamList = {
//   ProdInfo: { item: Product };
//   Wishlist: undefined;
// };

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={Register} 
          options={{
            drawerItemStyle: { height: 0 }
          }}
          />
          <Drawer.Screen name="Biling" component={BilingView} 
          options={{
            drawerItemStyle: { height: 0 }
          }}
          />
          <Drawer.Screen name="Games" component={GamesUser}
          options={{
            drawerItemStyle: { height: 0 }
          }}
          />
          <Drawer.Screen name="Addgame" component={Addgame}
          options={{
            drawerItemStyle: { height: 0 }
          }}
          />
        </Drawer.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
