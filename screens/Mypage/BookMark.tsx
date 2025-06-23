import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "../../styles/colors";
import PrevBtn from "../../components/common/PrevBtn";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import InfoCard from "../../components/Home/InfoCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
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

export default function BookMarkScreen() {
  const apiURL = Constants.expoConfig?.extra?.apiUrl ?? "";
  const navigation = useNavigation<NavigationProp>();
  const [bookmarkedCard, setBookmarkedCard] = useState<Card[]>([]);

  const cardId = AsyncStorage.getItem("cardId");
  console.log("카드 아이디", cardId);

  useEffect(() => {
    const fetchBookmarks = async () => {
      const userId = await AsyncStorage.getItem("userId");

      try {
        const res = await axios.get(`${apiURL}/bookmark/${userId}`);
        setBookmarkedCard(res.data["viewList"]);
        console.log("북마크 된 데이터", res.data["viewList"]);
      } catch (err) {
        console.error("북마크 확인 실패 : ", err);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ marginLeft: -8 }}>
        <PrevBtn address="Mypage" />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "500",
          paddingLeft: 20,
          fontFamily: "Pretendard-bold",
          marginVertical: 20,
        }}
      >
        Bookmark List
      </Text>

      <ScrollView style={{ marginBottom: 30, marginTop: 10 }}>
        {bookmarkedCard
          .filter(
            (item): item is Card =>
              item !== null && item !== undefined && typeof item === "object"
          )
          .map((item) => (
            <View key={item.cardId}>
              <InfoCard
                _id={item.cardId}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                category={item.category}
                onPress={() => {
                  navigation.navigate("DetailInfo", { id: item._id });
                }}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
}
