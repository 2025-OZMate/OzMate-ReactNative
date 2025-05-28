import React from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    [key: string]: undefined;  // 어떤 화면이든 string으로 navigate할 수 있게 설정
};
type NavigationProp = StackNavigationProp<RootStackParamList>;


type addressProps = {
    address?: string;
}
export default function PrevBtn({ address }: addressProps) {
    const navigation = useNavigation<NavigationProp>();

    const handlePress = () => {
        if (address) {
            navigation.navigate(address);
        } else {
            navigation.goBack();
        }
    }
    return (
        <TouchableOpacity onPress={handlePress} style={{ marginTop: 54, marginLeft: 20 }}>
            <Image source={require('../../assets/images/prev.png')}
                style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
    )
}