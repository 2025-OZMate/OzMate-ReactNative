import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export default function Time() {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const getAusTime = () => {
        return dayjs().tz("Australia/Sydney").format("hh:mm a")
    }
    const getAusDay = () => {
        return dayjs().tz("Australia/Sydney").format("MMMM D, YYYY (ddd)");
    }
    return (
        <View style={{ margin: "auto" }}>
            <Text style={[styles.font, styles.ausTime]}>{getAusTime()}</Text>
            <Text style={[styles.font, styles.ausDay]}>{getAusDay()}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    font: { fontFamily: "Pretendard-Regaular" },
    ausTime: { fontSize: 36, color: "#1E1E1E", fontWeight: "500" },
    ausDay: { fontSize: 18, fontWeight: "400", marginTop: 4 },
})