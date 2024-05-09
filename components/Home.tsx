import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ImageSourcePropType, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WishList from '../components/WishList';
import ShoppingCartView from '../components/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search';
import ProdInfo from './ProdInfo';
import AddGame from './Addgame';



export type RootStackParamList = {
  ProdInfo: { item: Product };
};

const Stack = createStackNavigator();

type JsonPlaceholder = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  type: number;
  id_user: number;
}

const fetchData = async () => {
  // await AsyncStorage.clear();
  const response = await fetch('http://192.168.76.127/geingeemu/public/api/videogame_index');
  return await response.json();
}

const HomeView = ({ data }: { data: JsonPlaceholder[] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('Search'); 
  };

  const _buildImageWithText = (imagePath: ImageSourcePropType, text: string, textP: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imagePath }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">{text}</Text>
          <Text style={styles.price}>{textP.length > 8 ? textP.substring(0, 8) : textP}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredGames = data.filter(item =>
    item.type === 1 && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredConsoles = data.filter(item =>
    item.type === 0 && item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={handleSearchPress} style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            editable={false}
          />
        </TouchableOpacity>

        <Image source={require('../assets/images/banner.png')} style={{ width: '100%', height: 125 }} />

        <Image source={require('../assets/images/brands.png')} style={{ width: '100%', height: 100, marginTop: 20 }} />

        <Text style={styles.sectionHeader}>Video Games</Text>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row' }}>
            {filteredGames.map(item => (
              <View style={{ paddingRight: 16 }} key={item.id}>
                {_buildImageWithText(item.image, item.name, `$${item.price}`, () => {
                  navigation.navigate('ProdInfo', { item });
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        <Text style={styles.sectionHeader}>Consoles</Text>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row' }}>
            {filteredConsoles.map(item => (
              <View style={{ paddingRight: 16 }} key={item.id}>
                {_buildImageWithText(item.image, item.name, `$${item.price}`, () => {
                  navigation.navigate('ProdInfo', { item });
                })}
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
  const [role, setRole] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserRole = await AsyncStorage.getItem('role');
      if (storedUserRole == 1) {
        setRole(true);
      }
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
      console.log("Stored UserID:", userId);
    };
    fetchUserData();
  }, []);

  const Tab = createBottomTabNavigator();

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
      {/* {role ? (
        <Tab.Screen
          name="Sell Products"
          component={AddGame}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pricetag" color={color} size={25} />
            ),
          }}
        />
      ) :
        <></>
      } */}
    </Tab.Navigator>
  );
}

const StackScreen = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProdInfo" component={ProdInfo} />
    </Stack.Navigator>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  searchBarContainer: {
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 10
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    height: 35  // Optional: Adjust the height to suit your design
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

export default StackScreen;