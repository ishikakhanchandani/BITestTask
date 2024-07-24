import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import CustomButton from '../reusableComponents/CustomButton';
import CustomPasswordInput from '../reusableComponents/CustomPasswordInput';
import CustomTextInput from '../reusableComponents/CustomTextInput';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGenderSelection = (selectedGender) => {
    if (gender === selectedGender) {
      setGender('');
    } else {
      setGender(selectedGender);
    }
  };

  const validateAndRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    // Perform your registration logic here
    navigation.navigate('Phone Verification');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{`< Back`}</Text>
        </TouchableOpacity>
        <CustomTextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
        <CustomTextInput
          placeholder="Phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
        <CustomTextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[styles.genderOption, gender === 'Male' && styles.selected]}
              onPress={() => handleGenderSelection('Male')}>
              <View style={[styles.checkBox, gender === 'Male' && styles.checked]} />
              <Text style={styles.genderText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, gender === 'Female' && styles.selected]}
              onPress={() => handleGenderSelection('Female')}>
              <View style={[styles.checkBox, gender === 'Female' && styles.checked]} />
              <Text style={styles.genderText}>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, gender === 'Others' && styles.selected]}
              onPress={() => handleGenderSelection('Others')}>
              <View style={[styles.checkBox, gender === 'Others' && styles.checked]} />
              <Text style={styles.genderText}>Others</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomPasswordInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <CustomPasswordInput
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <CustomButton onPress={validateAndRegister} title="Sign Up" />
        <View style={styles.innerContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CustomerSigninScreen')}>
            <Text style={styles.loginBtn}>Sign in here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'black',
  },
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#F9BE21',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F9BE21',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#F9BE21',
    borderColor: '#F9BE21',
  },
  genderText: {
    fontSize: 16,
    color: '#F9BE21',
  },
  innerContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#F9BE21',
  },
  loginBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#F9BE21',
  },
});

export default SignUpScreen;