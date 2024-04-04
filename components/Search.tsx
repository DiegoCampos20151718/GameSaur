import React from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
  }
const data = [
  {
    id: 1,
    title: 'Halo Infinite Xbox Series X Limited Edition Steelbook Edition',
    price: 3750.0,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com.mx%2FHalo-Infinite-Standard-Xbox-X%2Fdp%2FB09DRCGDJD&psig=AOvVaw1q59P3yKkrILEDUF0fBHND&ust=1712275287373000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJCZ_9Ogp4UDFQAAAAAdAAAAABAE',
  },
  {
    id: 2,
    title: 'God of war Ragnarok',
    price: 3199.0,
    image: 'https://example.com/god-of-war.jpg',
  },
  {
    id: 3,
    title: 'Consola PlayStation5 version estandar',
    price: 10199.0,
    image: 'https://example.com/playstation5.jpg',
  },
  {
    id: 4,
    title: 'Halo Infinite Xbox Series X Limited Edition Steelbook Edition',
    price: 3750.0,
    image: 'https://example.com/halo-infinite.jpg',
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
        <TextInput style={styles.searchInput} placeholder="Buscar" />
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