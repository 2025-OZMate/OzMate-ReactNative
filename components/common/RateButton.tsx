import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type RateBtnProps = {
    title: string;
    onPress: (() => void)
}
export default function RateButton({ title, onPress }: RateBtnProps) {
    return (
        <View style={styles.Container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        marginTop: 260,
        width: "100%", backgroundColor: "#FFC32E", borderRadius: 16,
        paddingVertical: 15
    },
    text: { textAlign: "center", color: "#FFF", fontSize: 20, fontWeight: "600" }
})