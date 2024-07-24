import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

const CheckoutScreen = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Group items by ID and calculate quantities
  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += 1;
    return acc;
  }, {});

  const groupedItemsArray = Object.values(groupedItems);

  // Calculate the total amount
  const totalAmount = groupedItemsArray.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
      navigation.navigate('HomeScreen');
    });
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Quantity:</Text>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
      <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.screenTitle}>Checkout</Text>
      <View style={styles.paymentMethod}>
        <Text style={styles.paymentMethodTitle}>Payment Method</Text>
        <Text style={styles.paymentMethodText}>Cash on Delivery (COD)</Text>
      </View>
      <FlatList
        data={groupedItemsArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalTitle}>Total Amount:</Text>
        <Text style={styles.totalAmount}>${totalAmount}</Text>
      </View>
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
      {orderPlaced ? (
        <Animated.View style={[styles.animationView, { transform: [{ scale }] }]}>
          <Text style={styles.animationText}>Order Placed Successfully!</Text>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  backButton: {
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: '#F9BE21',
  },
  screenTitle: {
    fontSize: 24,
    color: '#F9BE21',
    alignSelf: 'center',
    marginBottom: 20,
  },
  paymentMethod: {
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  paymentMethodTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  paymentMethodText: {
    fontSize: 16,
    color: '#F9BE21',
  },
  cartList: {
    marginBottom: 20,
  },
  cartItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
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
  totalContainer: {
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  totalTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 24,
    color: '#F9BE21',
    fontWeight: 'bold',
  },
  placeOrderButton: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F9BE21',
    borderRadius: 5,
    marginBottom: 20,
  },
  placeOrderButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  animationView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationText: {
    color: '#F9BE21',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
