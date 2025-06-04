import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
type infoCardProps = {
    img: string;
    title: string;
    description: string;
}
export default function SelectInfoCard({ img, title, description }: infoCardProps) {

    return (
        <View style={styles.container}>
            <Image source={img} style={{ width: 60, height: 60 }} />
            <View style={styles.textContainer}>
                <Text style={[styles.font, styles.title]}>{title}</Text>
                <Text style={[styles.font, styles.description]}>{description}</Text>
            </View>
            <Image source={require('../../assets/images/thinPrev.png')} style={{ width: 17, height: 17 }} />
        </View>
    )
}
const styles = StyleSheet.create({
    font: { fontFamily: "Pretendard-bold", }, description: { color: "#777", fontSize: 12 },
    title: { fontSize: 18, fontWeight: "500", width: 216 },
    textContainer: { paddingLeft: 13, paddingRight: 10, gap: 10 },
    container: {
        display: "flex", flexDirection: "row", alignItems: "center",
        backgroundColor: "#FFF", width: "100%", borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4, paddingVertical: 24, paddingHorizontal: 10
    }
})