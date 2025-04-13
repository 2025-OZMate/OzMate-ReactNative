import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
export default function PrevBtn() {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.goBack();
    }
    return (
        <TouchableOpacity onPress={handlePress} style={{ marginTop: 54, marginLeft: 20 }}>
            <Image source={require('../../assets/images/prev.png')}
                style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
    )
}