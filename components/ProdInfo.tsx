import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import WishList from '../components/WishList';
import ShoppingCartView from '../components/Cart';
interface Props { }

interface State { }

class HomeView extends React.Component<Props, State> {
    render() {
        
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Halo Infinite: Xbox Collection Steelbook Edition</Text>
        <Text style={styles.price}>$2500.00 MXN</Text>
      </View>

      <View style={styles.videoContainer}>
        <Image source={require('../assets/images/haloinfinite.jpg')} style={styles.videoThumbnail} />
        {/* Aquí puedes agregar un componente de reproducción de video */}
      </View>

      <View style={styles.gameInfo}>
        <Text style={styles.infoText}>• Game ratado BTS 15 Years</Text>
        <Text style={styles.infoText}>• Halo Infinite continúes the story of Halo 5</Text>
        <Text style={styles.infoText}>• Grappleshot adds a new level of traversal</Text>
        <Text style={styles.infoText}>• The Master Chief returns with Halo Infinite.</Text>
        <Text style={styles.infoText}>• Powered by the new Slipspace engine</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  videoContainer: {
    marginBottom: 16,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  gameInfo: {
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const Tab = createBottomTabNavigator();

// Main component containing bottom tab navigator
class MainScreen extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Home"
          component={HomeView}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={ShoppingCartView}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="WishList"
          component={WishList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Sell Games"
          component={HomeView}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pricetag" color={color} size={25} />
            ),
          }}
        />
        
      </Tab.Navigator>
    );
  }
}

export default MainScreen;