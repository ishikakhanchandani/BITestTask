import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, keyboardType, autoCapitalize }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#D3D3D3"
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 50,
        backgroundColor: '#333',
        borderColor: '#F9BE21',
        borderWidth: 1,
        fontSize: 18,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'white',
        marginBottom: 16,
    },
});

export default CustomTextInput;
