import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Button from "../common/Button";
import { useNavigation } from "@react-navigation/native";
export default function Result() {
    const navigation = useNavigation();
    return (
        <View>
            <Image source={require('../../assets/images/finish.png')}
                style={{ width: 80, height: 119, margin: "auto", marginTop: 32, marginBottom: 32 }} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>Good Job !</Text>
                <Text style={styles.description}>You know a lot of things
                    about Australia!</Text>
            </View>
            <View style={styles.ButtonContainer}>
                <Button title="Done" onPress={() => navigation.goBack()} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    ButtonContainer: {
        paddingTop: 250 //임시
    },
    textContainer: {
        backgroundColor: "#FFF",
        marginHorizontal: 20,
        borderRadius: 12,
        paddingHorizontal: 44,
        paddingVertical: 60
    },
    title: {
        textAlign: "center",
        fontFamily: "Pretendard-bold",
        fontWeight: "600", fontSize: 24,
    },
    description: {
        margin: "auto",
        fontFamily: "Pretendard-bold",
        fontWeight: "500",
        textAlign: "center",
        fontSize: 18, marginTop: 16,
        width: 247, height: 56,
        lineHeight: 28
    },
})