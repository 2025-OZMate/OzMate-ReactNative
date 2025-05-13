import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface PrevBtnProps {
    onPress: () => void
}

export default function PrevLinkBtn({ onPress }: PrevBtnProps) {

    return (
        <TouchableOpacity onPress={onPress} style={{ marginTop: 54, marginLeft: 20 }}>
            <Image source={require('../../assets/images/prev.png')}
                style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
    )
}