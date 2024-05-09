import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ImageSourcePropType, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type JsonPlaceholder = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

const fetchData = async () => {
  const response = await fetch('http://192.168.76.127/geingeemu/public/api/videogame_index');
  return await response.json();
}

const SearchView = ({ data }: { data: JsonPlaceholder[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const _buildImageWithText = (imagePath: ImageSourcePropType, text: string, textP: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={imagePath} style={styles.image} />
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
      <View style={styles.horizontalContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Ionicons name="arrow-undo-sharp" size={25} />
          <Text>Go back</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.searchInput, { marginLeft: 10 }]}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <Text style={styles.sectionHeader}>All Products</Text>
      <ScrollView contentContainerStyle={styles.productsContainer}>
        {filteredData.map(item => (
          <View style={styles.productItem} key={item.id}>
            {_buildImageWithText(item.image, item.name, `$${item.price}`, () => {
              navigation.navigate('ProdInfo', { item });
            })}
          </View>
        ))}
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
    <View style={{ flex: 1 }}>
      <SearchView data={data} />
    </View>
  );
}

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
    width: '100%'
  },
  imageContainer: {
    marginBottom: 8,
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
    flexGrow: 1,
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
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5,
  },  
});

export default MainScreen;
