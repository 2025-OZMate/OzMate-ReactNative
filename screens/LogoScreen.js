import React from "react";
import { Pressable, View, Image } from "react-native";
import logo from "../assets/images/logo.png";
import { useNavigation } from '@react-navigation/native';

export default function LogoScreen() {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Home');
    };

    return (
        <Pressable
            style={{ flex: 1, backgroundColor: '#FFF9C4', alignItems: 'center', justifyContent: 'center' }}
            onPress={handlePress}
        >
            <Image
                source={logo}
                style={{ width: 200, height: 200, resizeMode: 'contain' }}
            />
        </Pressable>
    );
}
