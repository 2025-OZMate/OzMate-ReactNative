import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import Details from "../../components/Home/Details";
import RandomInfoCard from "../../components/Home/RandomInfoCard";
import axios from "axios";
import { RouteProp, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

const bookmarkImg = require("../../assets/images/bookmark.png");
const bookmarkClickedImg = require("../../assets/images/bookmark-clicked.png");

type RouteProps = {
  DetailInfo: { id: string };
};

export default function DetailInfo() {
  const apiURL = Constants.expoConfig?.extra?.apiUrl ?? "";
  console.log(apiURL);
  const route = useRoute<RouteProp<RouteProps, "DetailInfo">>();
  const id = route?.params?.id;
  const [card, setCard] = useState<any>(null);
  const [isBookmark, setIsBookmark] = useState(false);
  if (!id) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>잘못된 접근입니다.</Text>
      </View>
    );
  }
  //id별로 상세 페이지 내용 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiURL}/infocard/${id}`);
        setCard(res.data);

        // 북마크 상태 확인
        const userId = await AsyncStorage.getItem("userId");
        const bookmarkRes = await axios.get(`${apiURL}/bookmark/${userId}`);
        const viewList = bookmarkRes?.data?.viewList || [];

        const isBookmarked = viewList.some((item: any) => item?._id === id);
        setIsBookmark(isBookmarked);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  console.log(id);

  //북마크 추가/삭제
  const handleBookmark = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const cardId = id;

    try {
      if (!isBookmark) {
        await axios.post(`${apiURL}/bookmark`, { userId, cardId });
        setIsBookmark(true);
        console.log("북마크 등록됨");
      } else {
        await axios.delete(`${apiURL}/bookmark`, {
          data: { userId, cardId },
        });
        setIsBookmark(false);
        console.log("북마크 해제됨");
      }
    } catch (err) {
      console.error("북마크 처리 중 오류", err);
    }
  };

  const navigation = useNavigation();
  function PrevButton() {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{ marginTop: 54, marginLeft: 20 }}
      >
        <Image
          source={require("../../assets/images/prev.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    );
  }

  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );
  return (
    <ScrollView ref={scrollRef} style={{ backgroundColor: "#FFF", flex: 1 }}>
      {card && (
        <Image
          source={{ uri: `${apiURL}/images/${card.image}` }}
          style={styles.bannerImg}
        />
      )}

      <View style={{ position: "absolute" }}>
        <PrevButton />
      </View>

      {card && (
        <>
          {/*북마크 버튼*/}
          <TouchableOpacity onPress={handleBookmark}>
            <Image
              source={isBookmark ? bookmarkClickedImg : bookmarkImg}
              style={styles.bookmarkIcon}
            />
          </TouchableOpacity>

          <Details
            category={card.category}
            detailTitle={card.detailTitle}
            detailContent={card.detailContent}
          />
        </>
      )}
      <RandomInfoCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bannerImg: { width: "100%", height: 280 },
  bookmarkIcon: {
    width: 40,
    height: 40,
    paddingRight: 20,
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1000,
  },
});
