import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigation.navigate('IntroScreen1');
    //     }, 3000);
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/trolley.png')} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'gold',
        marginTop: 20
    },
    image: {
        width: 150,
        height: 150
    }
});

export default SplashScreen;
