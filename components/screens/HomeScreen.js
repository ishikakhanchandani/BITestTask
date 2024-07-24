import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import  {addToCart}  from '../redux/actions/CartActions';
import productsData from '../data/products.json';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const dispatch = useDispatch();

  useEffect(() => {
    loadMoreItems();
  }, []);

  const loadMoreItems = () => {
    if (loading) return;

    setLoading(true);
    const newItems = productsData.products.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    setProducts((prevProducts) => [...prevProducts, ...newItems]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    console.log(`Added ${item.title} to cart`);
    Alert.alert(`Added ${item.title} to Cart`);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.productDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={styles.cartButton}>
          <Image
            source={require('../assets/trolley.png')} // Adjust path to your cart image
            style={styles.cartImage}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent} // Add contentContainerStyle to adjust padding
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <Text style={styles.loadingText}>Loading...</Text> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16, // Adds space between header and FlatList
  },
  backButton: {
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: '#F9BE21',
  },
  cartButton: {
    zIndex: 1,
  },
  cartImage: {
    width: 34,
    height: 34,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 4,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'space-between',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#F9BE21',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F9BE21',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#F9BE21',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingTop: 30, 
  },
  loadingText: {
    color: '#F9BE21',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default HomeScreen;
