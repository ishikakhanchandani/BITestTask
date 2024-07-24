import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomPasswordInput = ({ placeholder, value, onChangeText }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.passwordInput}
                placeholder={placeholder}
                placeholderTextColor="#D3D3D3"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
                <Image
                    source={isPasswordVisible ? require('../assets/HideEyeImage.png') : require('../assets/EyeImage.png')}
                    style={styles.toggleImage}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    passwordInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#333',
        borderColor: '#F9BE21',
        borderWidth: 1,
        fontSize: 18,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'white',
    },
    toggleButton: {
        marginLeft: -40,
        padding: 10,
    },
    toggleImage: {
        width: 24,
        height: 24,
        tintColor: '#F9BE21',
    },
});

export default CustomPasswordInput;
