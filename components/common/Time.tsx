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
        <View>
            <Text>{getAusTime()}</Text>
            <Text>{getAusDay()}</Text>
        </View>
    )
}