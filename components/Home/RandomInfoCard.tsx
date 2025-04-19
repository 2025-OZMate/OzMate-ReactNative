import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InfoCard from "./InfoCard";

export default function RandomInfoCard() {
    return (
        <View style={{ backgroundColor: "#FFF" }}>
            <View style={styles.contour}></View>
            <Text style={styles.text}>Other information</Text>

            <View style={{ marginBottom: 22 }}>
                {/* 임시 컴포넌트 정보 */}
                <InfoCard
                    ImgUrl={require('../../assets/images/dish.png')}
                    title='Types of Cards'
                    description='Information on various transportation cards used in Australia'
                    category='LIFE'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Pretendard-bold',
        fontWeight: "500",
        fontSize: 24,
        marginLeft: 20,
        marginVertical: 20
    },
    contour: {
        width: "100%",
        height: 12,
        backgroundColor: "#EEE",
        marginTop: 20
    }
})