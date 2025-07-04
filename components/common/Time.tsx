import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import moment from "moment";

export default function Time() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const getAusTime = () => {
    return dayjs().tz("Australia/Sydney").format("hh:mm a");
  };
  const currentTime = moment().add(1, "hours").format("hh:mm:a");

  const getAusDay = () => {
    return dayjs()
      .tz("Australia/Sydney")
      .format("MMMM D, YYYY (ddd)")
      .toUpperCase();
  };
  return (
    <View style={{ margin: "auto", paddingTop: 120, zIndex: 1000 }}>
      <Text style={[styles.font, styles.ausTime]}>{currentTime}</Text>
      <Text style={[styles.font, styles.ausDay]}>{getAusDay()}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  font: {
    fontFamily: "Pretendard-Regaular",
  },
  ausTime: {
    fontSize: 40,
    color: "#1E1E1E",
    fontWeight: "600",
  },
  ausDay: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 6,
    color: "#3F3F3F",
    textAlign: "center",
  },
});
