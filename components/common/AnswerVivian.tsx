import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
type infoProps = {
    user: string;
    text: string;
    marginTop: number;
    borderColor: string;
}
export default function AnswerVivian({ user, text, marginTop, borderColor }: infoProps) {
    return (
        <View style={{
            display: "flex", flexDirection: "row", gap: 13, paddingLeft: 20,
            marginTop: marginTop, borderBlockColor: borderColor,
        }}>
            <Image
                source={require('../../assets/images/vivian.png')}
                style={{ width: 44, height: 44 }} />

            <View>
                <Text style={styles.vivian}>{user}</Text>
                <View style={styles.botContainer}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: { fontFamily: "Pretendard-Regaular", fontSize: 13, lineHeight: 18.5 },
    vivian: { fontFamily: "Pretendard-Regaular", fontSize: 12, color: "#777", marginBottom: 7, marginTop: 6 },
    botContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CFCFCF",
        backgroundColor: "#F9F9F9",
        width: 257,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
        borderBottomLeftRadius: 13,
    },
})