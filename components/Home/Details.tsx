import React from "react";
import { StyleSheet, Text, View } from "react-native";

type DetailsProps = {
    category: string;
    detailTitle: string;
    detailContent: string;
}

export default function Details({ category, detailTitle, detailContent }: DetailsProps) {
    return (
        <View style={{ paddingHorizontal: 20 }}>
            <View>
                <Text style={[styles.font, styles.category]}>{category}</Text>
            </View>
            <View>
                <Text style={[styles.font, styles.title]}>{detailTitle}</Text>
                <Text style={[styles.font, styles.content]}>{detailContent}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        fontSize: 13,
    },
    font: {
        fontFamily: "Pretendard-bold",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 20,
        lineHeight: 28
    },
    category: {
        marginVertical: 20,
        color: "#777",
        fontSize: 12,
    }
})