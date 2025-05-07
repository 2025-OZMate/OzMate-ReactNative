import React from "react";
import { View, Text, StyleSheet } from "react-native-web";

type Word = { word: string };
export default function WordPiece({ word }: Word) {
    return (
        <View style={styles.WordPieceContainer}>
            <Text style={styles.wordText}>{word}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    WordPieceContainer: {
        backgroundColor: "#FFF59D",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignSelf: 'flex-start',
    },
    wordText: {
        fontFamily: "Pretendard-bold",
        fontSize: 12,
        textAlign: "center"
    },
})
