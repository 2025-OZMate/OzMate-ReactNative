import React, { useState } from "react";
import { View, TextInput, Text, Button, Alert, StyleSheet, Image } from "react-native";


function Result({ AudMoney }) {
    return (
        <View style={styles.moneyInput}>
            <Text style={{ marginTop: 10 }}>{AudMoney}</Text>
        </View>
    )
}

export default function CalculateCard({ AudMoney, num, moneyTitle, moneyValue, placeholder, krw, setKrw }) {
    const formNum = (num: string) => {
        const cleand = num.replace(/[^0-9]/g, '')
        return cleand.replace(/\B(?=(\d{3})+(?!\d))/g, ',')//3자리마다 ,
    }

    const images = {
        1: require('../../assets/images/korea.png'),
        2: require('../../assets/images/aud.png'),
    };

    return (
        <View>
            <Text style={styles.title}>{moneyTitle}</Text>
            <View style={styles.rateContainer}>
                <Image source={images[num]} style={{ width: 55, height: 55 }} />

                <Text style={styles.moneyValue}>{moneyValue}</Text>
                {moneyValue === "KRD" ? <TextInput
                    style={styles.moneyInput}
                    value={formNum(krw)}
                    onChangeText={setKrw}
                    placeholder={`${placeholder}`}
                    placeholderTextColor={"#777"}
                //keyboardType="numeric"
                /> :
                    <View  >
                        <Result AudMoney={AudMoney} />
                    </View>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    moneyInput: {
        paddingLeft: 10,
        width: 170, height: 40, borderRadius: 10,
        backgroundColor: 'rgba(239, 239, 239, 0.8)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: { fontSize: 12, fontWeight: "500", color: "#777", fontFamily: "Pretendard-Regaular", marginBottom: 13 },
    moneyValue: {
        fontSize: 12, fontWeight: "600", color: "#0065D7", fontFamily: "Pretendard-Regaular",
        marginLeft: 15, marginRight: 35
    },
    rateContainer: {
        display: "flex", flexDirection: "row", alignItems: "center"
    }
})

