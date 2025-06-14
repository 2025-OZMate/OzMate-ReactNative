import React from "react";
import { StyleSheet, View } from "react-native";
interface ProgressBarProps {
  currentQuestion: number;
  questionsLength: number;
}
export default function ProgressBar({
  currentQuestion,
  questionsLength,
}: ProgressBarProps) {
  const progress = ((currentQuestion + 1) / questionsLength) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress}%` }]}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 287,
    height: 16,
    backgroundColor: "#FFF59D",
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 3,
    marginTop: 50,
    marginLeft: 17,
  },
  progress: {
    height: 10,
    backgroundColor: "#FFB600",
    borderRadius: 10,
  },
});
