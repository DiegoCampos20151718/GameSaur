import React from 'react';
import { View, Text, ScrollView, Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import WishList from '../components/WishList';
import ShoppingCartView from '../components/Cart';

interface Props { }

interface State { }

class HomeView extends React.Component<Props, State> {
  _buildImageWithText(imagePath: ImageSourcePropType, text: string, textP: string) {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={imagePath}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{text}</Text>
          <Text style={styles.price}>{textP}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/images/banner.png')}
              style={{ width: '100%', height: 130 }}
              resizeMode="cover"
            />
          </View>
          
          <Text style={styles.sectionHeader}>Marcas</Text>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/images/brands.png')}
              style={{ width: '100%', height: 110 }}
              resizeMode="cover"
            />
          </View>
          
          <Text style={styles.sectionHeader}>Destacados</Text>
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/halo4.jpg'), 'Halo 4', '$1000.00')}
              </View>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/halo5.jpg'), 'Halo 5', '$1000.00')}
              </View>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/haloinfinite.jpg'), 'Halo Infinite', '$1000.00')}
              </View>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/kirby.jpg'), 'Kirby and the forgotten lands', '$1000.00')}
              </View>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/zelda.jpg'), 'Zelda: TOTK', '$1000.00')}
              </View>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/pokemon.jpg'), 'Pokemon Scarlet', '$1000.00')}
              </View>
            </View>
          </ScrollView>
          <Text style={styles.sectionHeader}>Ofertas</Text>
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/kirby.jpg'), 'Kirby and the forgotten lands', '$1000.00')}
              </View>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/zelda.jpg'), 'Zelda: TOTK', '$1000.00')}
              </View>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/pokemon.jpg'), 'Pokemon Scarlet', '$1000.00')}
              </View>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/halo4.jpg'), 'Halo 4', '$1000.00')}
              </View>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/halo5.jpg'), 'Halo 5', '$1000.00')}
              </View>
              <View style={{ paddingRight: 16 }}>
                {this._buildImageWithText(require('../assets/images/haloinfinite.jpg'), 'Halo Infinite', '$1000.00')}
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
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