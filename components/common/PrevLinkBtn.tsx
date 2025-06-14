import React from "react";
import { Image, TouchableOpacity } from "react-native";

interface PrevBtnProps {
  onPress: () => void;
}

export default function PrevLinkBtn({ onPress }: PrevBtnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginTop: 54, marginLeft: 20 }}
    >
      <Image
        source={require("../../assets/images/prev.png")}
        style={{ width: 40, height: 40 }}
      />
    </TouchableOpacity>
  );
}
