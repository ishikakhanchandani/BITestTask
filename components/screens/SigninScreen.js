import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import CustomButton from '../reusableComponents/CustomButton';
import CustomPasswordInput from '../reusableComponents/CustomPasswordInput';
import CustomTextInput from '../reusableComponents/CustomTextInput';

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const verifyCredentials = () => {
    navigation.navigate('HomeScreen');
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
  imageContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 50,
    borderRadius: 10,
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
  socialLoginImge: {
    width: 30,
    height: 30,
  },
  socialLoginImgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialLoginBtn: {
    borderColor: '#F9BE21',
    borderWidth: 0.8,
    borderRadius: 2,
    margin: 10,
  },
});

export default SigninScreen;
