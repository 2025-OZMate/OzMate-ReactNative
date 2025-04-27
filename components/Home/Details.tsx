import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Details() {
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <Text style={[styles.font, styles.category]}>Category</Text>
            <View>
                <Text style={[styles.font, styles.title]}>title</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    font: {
        fontFamily: "Pretendard-bold",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 20
    },
    category: {
        marginVertical: 20,
        color: "#777",
        fontSize: 12,
    }
})