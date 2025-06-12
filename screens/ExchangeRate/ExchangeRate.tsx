import React, { useState } from "react";
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity } from "react-native";
import RateButton from "../../components/common/RateButton";
import CalculateCard from "../../components/common/CalculateCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from 'expo-constants';

type RootStackParamList = {
    [key: string]: undefined
}
type NavigationProp = StackNavigationProp<RootStackParamList>
export default function ExchangeRate() {
    const apiURL = Constants.expoConfig?.extra?.apiUrl ?? "";

    const [krw, setKrw] = useState('');
    const [Aud, setAud] = useState(null);

    const formNum = (num: string) => {
        const cleand = num.replace(/[^0-9]/g, '')
        return cleand.replace(/\B(?=(\d{3})+(?!\d))/g, ',')//3자리마다 ,
    }
    const handleExchangeRate = async () => {
        if (!krw.trim()) {
            alert('금액을 입력해주세요!')
        }
        try {
            const res = await fetch(`${apiURL}/exchange-rate`);
            const data = await res.json()
            const converted = (parseFloat(krw) * data.rate).toFixed(2);
            console.log('krw : ', typeof (krw))
            setAud(converted)
        } catch (err) {
            console.error(err)
            alert('환율 정보를 불러올 수 없습니다.')
        }
    }

    const navigation = useNavigation<NavigationProp>()

    function Prev() {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('SelectInformation')}>
                <Image source={require('../../assets/images/prev.png')}
                    style={{ width: 38, height: 38, marginLeft: 15 }} />
            </TouchableOpacity>
        )
    }

    function ResetBtn() {
        return (
            <>
                <TouchableOpacity onPress={() => { setAud(0); setKrw(''); }} style={styles.resetBtn}>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity >
            </>
        )
    }

    return (
        <View style={styles.krwInputContainer}>
            <View style={{ marginTop: 50, display: "flex", flexDirection: "row", alignItems: "center", gap: 13 }}>
                <Prev />
                <Text style={styles.mainText}>Exchange Rate Calculate</Text>
            </View>

            <Text style={styles.description}>Enter Korean money and press Calculate!</Text>

            <View style={{ paddingHorizontal: 20 }}>
                <View style={styles.rateContainer}>
                    <Text style={styles.showExchangeRateText}>{formNum(krw)} KRW = {Aud} AUD</Text>
                    <ResetBtn />
                </View>

                <View style={styles.calculateCardContainer}>
                    <CalculateCard
                        moneyTitle={"Amount"}
                        moneyValue={"KRD"}
                        placeholder={"Enter Korean money"}
                        num={1}
                        krw={krw}
                        setKrw={setKrw}
                    />
                    <View style={styles.line}></View>
                    <CalculateCard
                        moneyTitle={"Converted Amount"}
                        moneyValue={"AUD"}
                        placeholder={""}
                        num={2}
                        AudMoney={Aud}
                    />
                </View>
                <RateButton
                    onPress={handleExchangeRate}
                    title="Calculate"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    calculateCardContainer: {
        paddingHorizontal: 15, paddingVertical: 25,
        borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    rateContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 20
    },
    resetText: {
        fontFamily: "Pretendard-Regaular",
        fontSize: 12.5,
        color: "#FF9E00",
        textAlign: "center"
    },
    resetBtn: {
        width: 70,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: "#FFC32E",
        paddingVertical: 4
    },
    line: {
        backgroundColor: "#F0F0F0",
        width: 316,
        height: 1.5,
        marginVertical: 20
    },
    showExchangeRateText: {
        color: "#606060",
        fontSize: 15,
        fontWeight: "500"
    },
    description: {
        marginTop: 40,
        paddingLeft: 20,
        fontFamily: "Pretendard-Regaular",
        fontSize: 13,
        color: "#888"
    },
    mainText: {
        fontFamily: "Pretendard-Regaular",
        fontSize: 23,
        fontWeight: "600"
    },
    krwInputContainer: {
        backgroundColor: "#FFFF",
        flex: 1
    },
    TextInput: {
        height: 100,
        borderWidth: 1,
        borderColor: "red",
        marginVertical: 15,
        paddingHorizontal: 15
    }
})