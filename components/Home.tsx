import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ImageSourcePropType, StyleSheet, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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

const HomeView = ({ data }: { data: JsonPlaceholder[] }) => {
  const _buildImageWithText = (imagePath: ImageSourcePropType, text: string, textP: string) => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: imagePath }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.productName}>{text}</Text>
        <Text style={styles.price}>{textP}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <Text style={styles.sectionHeader}>Featured</Text>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row' }}>
            {data.map(item => (
              <View style={{ paddingRight: 16 }} key={item.id}>
                {_buildImageWithText(item.image, item.name, `$${item.price}`)}
              </View>
            ))}
          </View>
        </ScrollView>
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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        children={() => <HomeView data={data} />}
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
        component={HomeView}  // Assume this component similarly needs data
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetag" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
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
    width: 125,
  },
  image: {
    width: '100%',
    height: 190,
  },
  textContainer: {
    marginTop: 8,
    alignItems: 'baseline',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 12,
    marginBottom: 8,
  },
});

const Tab = createBottomTabNavigator();

export default MainScreen;
