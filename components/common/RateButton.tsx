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
    Container: { width: "100%", backgroundColor: "yellow" },
    text: { textAlign: "center" }
})