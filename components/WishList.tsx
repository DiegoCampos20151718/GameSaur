import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

// Define Videojuego interface
interface Videojuego {
  nombre: string;
  precio: number;
  imagenPath: any; // Use any for simplicity, replace it with the actual type of your image paths
}

// Define WishlistView component
const WishlistView: React.FC = () => {
  // Lista de videojuegos deseados
  const [videojuegosDeseados, setVideojuegosDeseados] = useState<Videojuego[]>([
    { nombre: 'The Legend of Zelda: Breath of the Wild', precio: 1999.99, imagenPath: require('../assets/images/zelda.jpg') },
    { nombre: 'Halo Infinite Xbox Collector Steelbook Edition', precio: 2500.00, imagenPath: require('../assets/images/haloinfinite.jpg') },
    { nombre: 'Halo 5', precio: 2500.00, imagenPath: require('../assets/images/halo5.jpg') },
    // Puedes agregar más videojuegos según sea necesario
  ]);

  // Función para remover un videojuego de la lista de deseos
  const removerDeWishlist = (videojuego: Videojuego) => {
    const updatedList = videojuegosDeseados.filter(item => item !== videojuego);
    setVideojuegosDeseados(updatedList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de deseos</Text>
      <ScrollView>
        {videojuegosDeseados.map((videojuego, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={videojuego.imagenPath}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.details}>
              <Text style={styles.name}>{videojuego.nombre}</Text>
              <Text style={styles.price}>${videojuego.precio}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => removerDeWishlist(videojuego)}>
              <Text style={styles.removeButtonText}>Quitar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
  details: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#FFFFFF',
  },
});

export default WishlistView;
