import React, { useState } from "react";
import { View, TextInput, Text, Button, Alert, StyleSheet } from "react-native";
import RateButton from "../../components/common/RateButton";

export default function ExchangeRate() {
    const [krw, setKrw] = useState('');
    const [Aud, setAud] = useState(null);

    const handleExchangeRate = async () => {
        if (!krw.trim()) {
            alert('금액을 입력해주세요!')
        }
        try {
            const res = await fetch('http://localhost:5000/exchange-rate');
            const data = await res.json()
            const converted = (parseFloat(krw) * data.rate).toFixed(2);
            setAud(converted)
        } catch (err) {
            console.error(err)
            alert('환율 정보를 불러올 수 없습니다.')
        }
    }
    return (
        <View style={styles.krwInputContainer}>
            <Text>환율 계산기(￦->aud)</Text>
            <TextInput
                style={styles.TextInput}
                placeholder="krw 입력"
                keyboardType="numeric" //ios에서 계산기 형태로 나오게 함
                value={krw}
                onChangeText={setKrw}
            />
            <View>
                <RateButton
                    onPress={handleExchangeRate}
                    title="계산하기"
                />
            </View>


            {/*결과*/}
            <View>
                {Aud && <Text>계산한 호주 돈 : {Aud}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    krwInputContainer: { height: 100, borderColor: "yellow" },
    TextInput: {
        height: 100, borderWidth: 1, borderColor: "red",
        marginVertical: 15, paddingHorizontal: 15
    }
})