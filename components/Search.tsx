import React from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
    id: number;
    title: string;
    price: number;
    image: any;
  }
const data = [
  {
    id: 1,
    title: 'Halo Infinite Xbox Series X Limited Edition Steelbook Edition',
    price: 3750.0,
    image: require('../assets/images/haloinfinite.jpg'),
  },
  {
    id: 2,
    title: 'Pokemon',
    price: 3199.0,
    image: require('../assets/images/pokemon.jpg'),
  },
  {
    id: 3,
    title: 'Kirby',
    price: 10199.0,
    image: require('../assets/images/kirby.jpg'),
  },
  {
    id: 4,
    title: 'Spiderman',
    price: 3750.0,
    image: require('../assets/images/spiderman.jpg'),
  },
];

const App = () => {
    const renderItem = ({ item }: { item: Product }) => (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price.toFixed(2)} MXN</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  itemContainer: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    width: '50%',
  },
  itemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
});

export default App;