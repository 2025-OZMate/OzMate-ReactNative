import React from "react";
import { Image, View, StyleSheet } from "react-native";
export default function LogoMain() {
    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 175, paddingBottom: 80 }}>
            <Image source={require('../../assets/images/logo.png')} style={styles.Logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    Logo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 184,
        height: 45
    }
})