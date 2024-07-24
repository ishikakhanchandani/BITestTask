import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions/CartActions';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Group items by ID and calculate quantities
  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const groupedItemsArray = Object.values(groupedItems);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemContent}>
        <View style={styles.itemDetails}>
          <View>
          <Text style={styles.title}>
            {item.title}
          </Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <Text style={styles.quantity}>{item.quantity}</Text>
          </View>
        </View>
        </View>
        <View>
        <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
        <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)} style={styles.deleteButton}>
          <Image
            source={require('../assets/DeleteIcon.png')} 
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.cartTitle}>Cart</Text>
      <FlatList
        data={groupedItemsArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('CheckoutScreen')}>
        <Text style={styles.checkoutButtonText}>{'Checkout'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  backButton: {
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: '#F9BE21',
  },
  cartTitle: {
    fontSize: 20,
    color: '#F9BE21',
    alignSelf: 'center',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
  },
  cartItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  },
  quantity: {
    fontSize: 16,
    color: '#F9BE21',
  },
  price: {
    fontSize: 16,
    color: '#F9BE21',
    marginTop: 5,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    width: 24,
    height: 24,
    tintColor: '#F9BE21',
  },
  checkoutButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F9BE21',
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
