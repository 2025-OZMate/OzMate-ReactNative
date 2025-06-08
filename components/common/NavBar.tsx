import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    [key: string]: undefined
}
type NavigationProp = StackNavigationProp<RootStackParamList>

export default function NavBar() {
    const icons = [
        { name: "exchange", path: "SelectInformation", defaultImg: require('../../assets/images/exchangeIcon.png'), clickedImg: require('../../assets/images/exchangeClickedIcon.png') },
        { name: "weather", path: "Weather", defaultImg: require('../../assets/images/test.png'), clickedImg: require('../../assets/images/test-clicked.png') },
        { name: "home", path: "Home", defaultImg: require('../../assets/images/home.png'), clickedImg: require('../../assets/images/home-clicked.png') },
        { name: "chatbot", path: "ChatBot", defaultImg: require('../../assets/images/chatBotIcon.png'), clickedImg: require('../../assets/images/chatBotClickedIcon.png') },
        { name: "mypage", path: "Mypage", defaultImg: require('../../assets/images/mypage.png'), clickedImg: require('../../assets/images/mypage-clicked.png') }
    ]

    const navigation = useNavigation<NavigationProp>()
    const route = useRoute()

    return (
        <View style={styles.Container}>
            <View style={styles.navContainer}>
                <View style={styles.iconImgContainer}>
                    {icons.map((icon) => {
                        const isActive = route.name === icon.path
                        return (
                            <TouchableOpacity
                                key={icon.name}
                                onPress={() => navigation.navigate(icon.path)}

                            >
                                <Image
                                    source={isActive ? icon.clickedImg : icon.defaultImg}
                                    style={styles.iconImg}
                                />

                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: { marginHorizontal: 12 },
    navContainer: {
        backgroundColor: "#FFF", borderRadius: 30, paddingVertical: 20,
        shadowColor: '#000', shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4, elevation: 4,
        position: "absolute", bottom: 22, width: "100%"
    },
    iconImgContainer: {
        display: "flex", flexDirection: "row", gap: 25, alignItems: "center",
        margin: "auto"
    },
    iconImg: { width: 40, height: 40 }
})