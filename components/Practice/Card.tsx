import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
type RootStackParamList = {
    SelectTest: undefined;
    TranslationTest: undefined;
}
export default function ({ subject, title, source }) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const handlePress = () => {
        if (subject === "English Practice") {
            navigation.navigate('SelectTest')
        }
        if (subject === "Australia Culture Quiz") {
            navigation.navigate('TranslationTest')
        }
    }
    return (
        <TouchableOpacity onPress={handlePress}
            style={{
                backgroundColor: "white", marginBottom: 16,
                height: 120, borderRadius: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
            }}>
            <View style={{ flexDirection: "row", paddingLeft: 20, paddingVertical: 37 }}>
                <Image
                    source={source}
                    style={{ width: 60, height: 60, marginTop: -10 }}
                />

                <View style={{ marginLeft: 13 }}>
                    <Text
                        style={{
                            fontSize: 20, fontWeight: "600", fontFamily: "Pretendard-Bold",
                        }}>{subject}</Text>
                    <Text style={{ fontSize: 12, color: "#777", marginTop: 8, fontFamily: "Pretendard-Regular" }}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );


}