import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, ImageSourcePropType, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useToken } from './AuthService';

type ProdInfoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProdInfo'>;
type ProdInfoScreenRouteProp = RouteProp<RootStackParamList, 'ProdInfo'>;

type Props = {
  navigation: ProdInfoScreenNavigationProp;
  route: ProdInfoScreenRouteProp;
};

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: ImageSourcePropType;
};

const ProdInfo: React.FC<Props> = ({ navigation, route }) => {
  const { item } = route.params;
  const [key, setKey] = useState(Date.now().toString());
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const token = useToken(); 
  const [userData, setUserData] = useState<UserData | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const toggleWishlist = async (item: Product) => {
    try {
      const existingItems = await AsyncStorage.getItem('wishItems');
      let items: Product[] = [];
      if (existingItems !== null) {
        items = JSON.parse(existingItems);
      }
      items.push(item);
      await AsyncStorage.setItem('wishItems', JSON.stringify(items));
      setKey(Date.now().toString());
      navigation.navigate('Wishlist');
    } catch (error) {
      console.error('Error adding to wishlist: ', error);
    }
  };

  const addToCart = async (item: Product) => {
    try {
      const existingItems = await AsyncStorage.getItem('cartItems');
      let items: Product[] = [];
      if (existingItems !== null) {
        items = JSON.parse(existingItems);
      }
      items.push(item);
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
      setKey(Date.now().toString());
      setCartItems(items);
      navigation.navigate('Cart');
    } catch (error) {
      console.error('Error adding to cart: ', error);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log("Stored UserID:", storedUserId);
      if (storedUserId !== null) {
        setUserId(storedUserId);
        console.log("Updating userId to:", storedUserId);
        
        const response = await axios.get(`http://192.168.76.127/geingeemu/public/api/userview/${storedUserId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserData(response.data.firstname);
        console.log(response.data.firstname);
      }
    };
    fetchUserId();
  }, [token]);


  const createChat = async () => {
    try {
      const newChat = {
        id_user1: userId,
        id_user2: item.id_user,
        id_videogame: item.id,
        chat: `[{"name":"${userData}","message":"Hola","date":"2024-05-06T12:00:00Z"}]`,
        date: '2024-07-05',
        // date: new Date().toISOString(),
      };

      await axios.post('http://192.168.76.127/geingeemu/public/api/newchat', newChat);


      setKey(Date.now().toString());
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };
  const addBilling = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const total = cartItems.reduce((acc, curr) => acc + curr.price, 0);
      
      const currentDate = new Date();

      const formattedDate = currentDate.toISOString().split('T')[0];
  
      const newBilling = {
        total: item.price,
        id_user: userId,
        id_videogame: item.id,
        date: formattedDate 
      };
  
      await axios.post('http://192.168.76.127/geingeemu/public/api/bilingstore', newBilling);
      console.log('Billing stored successfully');
    } catch (error) {
      console.error('Error storing billing:', error);
    }
  };
  

  return (
    <ScrollView key={key} contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}
        style={{
          marginBottom: 10
        }}
      >
        <Ionicons name="arrow-undo-sharp" size={25} />
        <Text>Go back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>{item.na}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button]} onPress={() => toggleWishlist(item)}>
          <Text style={styles.buttonText}>Add to Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}
          style={{
            marginBottom: 10,
            alignItems: 'center'
          }}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={25} onPress={createChat} />
          <Text>Start Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton} onPress={addBilling}>
        <Text style={styles.buttonText}>Buy</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 18,
    color: '#2a9d8f',
    marginTop: 8,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '50%',
    height: 250,
    resizeMode: 'cover',
    alignSelf: 'center'
  },
  descriptionContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#e76f51',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProdInfo;