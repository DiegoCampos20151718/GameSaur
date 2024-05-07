import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface wishItems {
  name: string;
  image: any; // Utiliza el tipo adecuado para las imágenes
  price: number;
}

const wishlistview: React.FC = () => {
  const [wishItems, setwishItems] = useState<wishItems[]>([]);

  useEffect(() => {
    const fetchwishItems = async () => {
      try {
        const items = await AsyncStorage.getItem('wishItems');
        if (items !== null) {
          setwishItems(JSON.parse(items));
        }
      } catch (error) {
        console.error('Error fetching wishlist items: ', error);
      }
    };

    fetchwishItems();
  }, []);

  useEffect(() => {
    const updatewishItems = async () => {
      await AsyncStorage.setItem('wishItems', JSON.stringify(wishItems));
    };

    updatewishItems();
  }, [wishItems]);

  const removeFromwish = async (index: number) => {
    const newwishItemss = [...wishItems];
    newwishItemss.splice(index, 1);
    setwishItems(newwishItemss);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WishList</Text>
      <ScrollView>
        {wishItems.map((item, index) => (
          <CartItemView key={index} item={item} onRemove={() => removeFromwish(index)} />
        ))}
      </ScrollView>
    </View>
  );
};

interface WishItemProps {
  item: wishItems;
  onRemove: () => void;
}

const CartItemView: React.FC<WishItemProps> = ({ item, onRemove }) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

export default wishlistview;
