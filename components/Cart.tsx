import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CartItem {
  nombre: string;
  imagen: any; // Use any for simplicity, replace it with the actual type of your image paths
  precio: number;
}

const ShoppingCartView: React.FC = () => {
  const cartItems: CartItem[] = [
    {
      nombre: 'Halo Infinite Xbox Collector Steelbook Edition',
      imagen: require('../assets/images/haloinfinite.jpg'),
      precio: 2500.00,
    },
    {
      nombre: 'Halo 5',
      imagen: require('../assets/images/halo5.jpg'),
      precio: 2500.00,
    },
    {
      nombre: 'Halo 4',
      imagen: require('../assets/images/halo4.jpg'),
      precio: 1999.99,
    },
  ];

  const calculateTotal = (): number => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.precio;
    });
    return total;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      <ScrollView>
        {cartItems.map((item, index) => (
          <ShoppingCartItem key={index} productName={item.nombre} price={item.precio} image={item.imagen} />
        ))}
      </ScrollView>
      <View style={styles.bottomBar}>
        <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
        <TouchableOpacity style={styles.proceedButton} onPress={() => {}}>
          <Text style={styles.buttonText}>Proceder al Pago</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ShoppingCartItem: React.FC<CartItem> = ({ productName, price, image }) => {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{productName}</Text>
        <Text style={styles.itemPrice}>${price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <Text>Cantidad: </Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Text>{quantity}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => {}}>
        <Text style={styles.buttonText}>Eliminar</Text>
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  proceedButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default ShoppingCartView;
