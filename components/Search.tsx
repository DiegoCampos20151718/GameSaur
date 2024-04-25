import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ImageSourcePropType, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WishList from '../components/WishList';
import ShoppingCartView from '../components/Cart';

type JsonPlaceholder = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

const fetchData = async () => {
  const response = await fetch('http://localhost/geingeemu/public/api/videogame_index');
  return await response.json();
}

const SearchView = ({ data }: { data: JsonPlaceholder[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const _buildImageWithText = (imagePath: ImageSourcePropType, text: string, textP: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={`http://localhost/geingeemu/public/${imagePath}`} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">{text}</Text>
          <Text style={styles.price}>{textP.length > 8 ? textP.substring(0, 8) : textP}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />

        <Text style={styles.sectionHeader}>All Products</Text>
        <View style={styles.productsContainer}>
            {filteredData.map(item => (
              <View style={styles.productItem} key={item.id}>
                {_buildImageWithText(item.image, item.name, `$${item.price}`, () => {
                  navigation.navigate('ProdInfo', { item });
                })}
              </View>
            ))}
          </View>
      </ScrollView>
    </View>
  );
}

const MainScreen = () => {
  const [data, setData] = useState<JsonPlaceholder[]>([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <View>
      <SearchView data={data}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: '#fff'
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,

  },
  imageContainer: {
    marginRight: 16,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 250,
  },
  textContainer: {
    marginTop: 8,
    alignItems: 'baseline',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginLeft: 8,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 8,
  },
});

export default MainScreen;
