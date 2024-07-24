import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const CheckoutScreen = ({ navigation }) => {
  const [animation] = useState(new Animated.Value(0));

  const handlePlaceOrder = () => {
    // Simulate order processing
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // Reset animation and navigate back to HomeScreen after the animation ends
      animation.setValue(0);
      navigation.navigate('HomeScreen');
    });
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.paymentMethod}>
        <Text style={styles.paymentMethodTitle}>Payment Method</Text>
        <Text style={styles.paymentMethodText}>Cash on Delivery (COD)</Text>
      </View>
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.animationView, { transform: [{ scale }] }]}>
        <Text style={styles.animationText}>Order Placed Successfully!</Text>
      </Animated.View>
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
  title: {
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
