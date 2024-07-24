import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../reusableComponents/CustomButton';
import CustomPasswordInput from '../reusableComponents/CustomPasswordInput';
import CustomTextInput from '../reusableComponents/CustomTextInput';

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const verifyCredentials = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        console.log('Stored user:', parsedUser); // Debugging log
        console.log('Entered email:', email); // Debugging log
        console.log('Entered password:', password); // Debugging log
        if (parsedUser.email === email && parsedUser.password === password) {
          await AsyncStorage.setItem('loggedInUser', JSON.stringify(parsedUser));
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Invalid credentials');
        }
      } else {
        Alert.alert('User not found');
      }
    } catch (error) {
      Alert.alert('An error occurred during login', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>
        <CustomTextInput
          placeholder="Enter your e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomPasswordInput
          placeholder="Enter your Password"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <CustomButton onPress={verifyCredentials} title="Sign in" />
        <View style={styles.orContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}> or </Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.registerBtn}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: '#F9BE21',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'black'
  },
  forgotPasswordText: {
    fontSize: 16,
    alignSelf: 'flex-end',
    color: '#F9BE21',
  },
  innerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  registerText: {
    fontSize: 16,
    color: '#F9BE21',
  },
  registerBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#F9BE21',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#F9BE21',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#F9BE21',
  },
});

export default SigninScreen;
