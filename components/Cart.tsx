import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface CartItem {
  name: string;
  image: any;
  price: number;
}

const CartView: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await AsyncStorage.getItem('cartItems');
        if (items !== null) {
          setCartItems(JSON.parse(items));
        }
      } catch (error) {
        console.error('Error fetching cart items: ', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const updateCartItems = async () => {
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    updateCartItems();
  }, [cartItems]);

  const removeFromCart = async (index: number) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  // Calculate the total price of the cart items
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const addBilling = async (item: CartItem) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const total = cartItems.reduce((acc, curr) => acc + curr.price, 0);
      
      
      const currentDate = new Date();
      
      const formattedDate = currentDate.toISOString().split('T')[0];
  
      const newBilling = {
        total,
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
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <ScrollView>
        {cartItems.map((item, index) => (
          <CartItemView key={index} item={item} onRemove={() => removeFromCart(index)} addBilling={() => addBilling(item)} />
        ))}
      </ScrollView>
      <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
    </View>
  );
};

interface CartItemProps {
  item: CartItem;
  onRemove: () => void;
  addBilling: () => void;
}

const CartItemView: React.FC<CartItemProps> = ({ item, onRemove, addBilling }) => {
  return (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeButtonText}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyButton} onPress={addBilling}>
        <Text style={styles.buttonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: 'white',
  },
});

export default CartView;
