import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NextButton from "../../assets/images/next.png"

interface FeatureCardProps {
    title: string;
}

export default function FeatureCard({ title }: FeatureCardProps) {
    const navigation = useNavigation();
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const handleClick = () => {
        if (title === "BookmarkList") {
            navigation.navigate("BookMarkScreen")
        } else if (title === "Change Language") {
            navigation.navigate("LanguageScreen")
        } else if (title === "Log Out") {
            setShowLogoutPopup(true)
        }

    }

    const cancelLogout = () => {
        setShowLogoutPopup(false)
    }

    const handleLogout = () => {
        //나중에 removeItem해주기
        setShowLogoutPopup(false) //닫음
        navigation.navigate("Login")
    }

    return (
        <View style={styles.cardWrapper}>
            <TouchableOpacity style={styles.cardContainer} onPress={handleClick}>
                <Text style={[styles.cardTitle, title === "Log Out" && { color: "red" }]}>{title}</Text>

                {title !== "Log Out" && (
                    <Image source={NextButton} style={styles.icon} />
                )}
            </TouchableOpacity>

            {/* 로그아웃 팝업 */}
            <Modal transparent={true} visible={showLogoutPopup} animationType="fade">
                <View style={styles.popupContainer}>
                    <View style={styles.popup}>
                        <View style={{ paddingHorizontal: 47, paddingVertical: 25 }}>
                            <Text style={[styles.popupText1, styles.font]}>Do you want to log out?</Text>
                            <Text style={[styles.popupText2, styles.font]}>You’ll need to log in again.</Text>
                        </View>
                        <View style={{ height: 0.5, width: 293, backgroundColor: "#777" }}></View>


                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={cancelLogout} style={{ paddingHorizontal: 42 }}>
                                <Text style={styles.option}>Cancel</Text>
                            </TouchableOpacity>

                            <View style={{ height: 44, width: 0.5, backgroundColor: "#777" }}></View>
                            <TouchableOpacity onPress={handleLogout} style={{ paddingHorizontal: 55 }}>
                                <Text style={styles.option}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        backgroundColor: "#FFF",
        marginHorizontal: 20,
        borderRadius: 10,
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 25,
        paddingLeft: 20,
        paddingRight: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,

    },
    cardTitle: {
        width: 120,
        fontFamily: "Pretendard-Bold",
        fontSize: 14,
        fontWeight: 500,
    },
    font: {
        fontFamily: "Pretendard-Bold",
    },
    option: {
        fontFamily: "Pretendard-Bold",
        color: "#1271ED",
        fontSize: 17,
        paddingTop: 11,
        fontWeight: 600
    },
    icon: {
        width: 20,
        height: 20
    },
    popupContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.28)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: "#FFF",
        borderRadius: 14,
    },
    popupText1: {
        textAlign: "center",
        fontSize: 17,
        fontWeight: 600,
        marginBottom: 5
    },
    popupText2: {
        textAlign: "center",
        fontSize: 13,
    },
    buttonContainer: {
        flexDirection: "row",

    },
    cancelBtn: {
        fontSize: 30,
        color: "black"
    }


})