import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import InfoCard from "./InfoCard";
import axios from "axios";
import { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

type RootStackParamList = {
  DetailInfo: { id: any };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface Card {
  _id: string;
  cardId: string;
  image: string;
  title: string;
  subtitle: string;
  category: string;
}

export default function RandomInfoCard() {
  const apiURL = Constants.expoConfig?.extra?.apiUrl ?? "";
  const navigation = useNavigation<NavigationProp>();
  const [randomCard, setRandomCard] = useState<Card[]>([]);

  useEffect(() => {
    const fetchRandomCard = async () => {
      const cardId = await AsyncStorage.getItem("cardId");
      try {
        const res = await axios.get(`${apiURL}/random/${cardId}`);
        setRandomCard(res.data);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRandomCard();
  }, []);

  return (
    <View style={{ backgroundColor: "#FFF", marginBottom: 20 }}>
      <View style={styles.contour}></View>
      <Text style={styles.text}>Other information</Text>

      {randomCard.map((item) => (
        <InfoCard
          key={item._id}
          _id={item._id}
          image={item.image}
          title={item.title}
          subtitle={item.subtitle}
          category={item.category}
          onPress={() => {
            navigation.push("DetailInfo", { id: item._id });
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Pretendard-bold",
    fontWeight: "500",
    fontSize: 24,
    marginLeft: 20,
    marginVertical: 20,
  },
  contour: {
    width: "100%",
    height: 12,
    backgroundColor: "#EEE",
    marginTop: 20,
  },
});
