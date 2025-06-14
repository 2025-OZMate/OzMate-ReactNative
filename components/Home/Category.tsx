import { View, Text, StyleSheet } from "react-native";
import React from "react";

type CategoryProps = {
  type: string;
  onPress: () => void;
  isActive: boolean;
};
export default function Category({ type, onPress, isActive }: CategoryProps) {
  return (
    <View style={[styles.Container, isActive && styles.activeBg]}>
      <Text
        onPress={onPress}
        style={[styles.category, isActive && styles.activeCategory]}
      >
        {type}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  activeBg: { backgroundColor: "#FFF9C4" },
  Container: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 17,
    paddingVertical: 5.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  category: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    fontWeight: "400",
    fontFamily: "Pretendard-bold",
  },
  activeCategory: { color: "#FFB600", fontWeight: "600" },
});
