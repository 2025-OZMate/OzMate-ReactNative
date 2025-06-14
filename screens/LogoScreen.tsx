import React from "react";
import { Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
};
type NavigationProp = StackNavigationProp<RootStackParamList>;
export default function LogoScreen() {
  const navigation = useNavigation<NavigationProp>();
  const handlePress = () => {
    navigation.navigate("Login");
  };

  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: "#FFF9C4",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={handlePress}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ width: 200, height: 200, resizeMode: "contain" }}
      />
    </Pressable>
  );
}
