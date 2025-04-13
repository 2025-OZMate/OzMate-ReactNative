import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ProfileImg from "../../assets/images/profile.png";

interface useNameProps {
    useName: string;
}
export default function ProfileCard({ useName }: useNameProps) {
    return (
        <View style={styles.container}>
            <Image source={ProfileImg}
                style={{ width: 80, height: 80 }} />
            <Text style={styles.useNameText}>{useName}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 87,
        paddingLeft: 20,
        columnGap: 20,
    },
    useNameText: {
        fontFamily: "Pretendard-Regaular",
        fontSize: 17,
        fontWeight: 500,
    }
})