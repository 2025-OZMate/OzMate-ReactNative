import React from "react";
import {
  View,
  TextInput,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import AnswerVivian from "../../components/common/AnswerVivian";
import ButtonComponent from "../../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Constants from "expo-constants";

type RootStackParamList = {
  [key: string]: undefined;
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function FeedBack() {
  const apiURL = Constants.expoConfig?.extra?.apiUrl ?? "";
  const navigation = useNavigation<NavigationProp>();
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async () => {
    const { title, content } = form;
    if (!title.trim() && !content.trim()) {
      Alert.alert("제목과 내용을 입력해주세요.");
    } else if (!title.trim()) {
      Alert.alert("제목을 입력해주세요");
    }

    try {
      const res = await axios.post(`${apiURL}/feedback`, form);
      console.log("피드백 저장 성공: ", res);
      setShowPopup(true);
    } catch (err) {
      console.error(err);
    }
  };

  function FinishPopUp() {
    return (
      <View style={styles.popupContainer}>
        <View style={styles.popupCard}>
          <Image
            source={require("../../assets/images/check.png")}
            style={{ width: 28, height: 28, marginBottom: 10 }}
          />

          <Text style={[styles.text1, styles.commonText]}>
            Thank you for your valuable opinion.
          </Text>
          <Text style={[styles.text2, styles.commonText]}>
            We will reflect it{" "}
          </Text>
          <Text style={[styles.text2, styles.commonText]}>
            to provide better service!{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Mypage")}
            style={styles.okBtn}
          >
            <Text style={styles.ok}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function Prev() {
    return (
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => navigation.navigate("Mypage")}
      >
        <Image
          source={require("../../assets/images/prev.png")}
          style={{ width: 38, height: 38, marginLeft: 15 }}
        />
        <Text style={styles.headerText}>Send FeedBack</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Prev />

      <View style={{ marginBottom: 30 }}>
        <AnswerVivian
          user="OzMate"
          text="We look forward to your feedback to help us make the app better! Feel free to leave suggestions for new features or ideas for improve ments."
          marginTop={10}
          borderColor="#CCCCCC"
        />
      </View>

      <View style={{ marginHorizontal: 25 }}>
        <Text style={styles.titleText}>Title</Text>
        <TextInput
          style={styles.titleInput}
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
          placeholder="Please enter a title"
          placeholderTextColor={"#BFBFBF"}
        ></TextInput>

        <Text style={styles.titleText}>Detail</Text>
        <TextInput
          style={styles.detailInput}
          value={form.content}
          onChangeText={(text) => setForm({ ...form, content: text })}
          placeholder="Please enter details"
          placeholderTextColor={"#AAA"}
        ></TextInput>
      </View>

      <View style={{ marginTop: 30 }}>
        <ButtonComponent title="Send" onPress={handleSubmit} />
      </View>
      {showPopup && <FinishPopUp />}
    </View>
  );
}
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  text2: {
    color: "#505050",
    fontWeight: "500",
  },
  commonText: {
    fontSize: 15,
    fontFamily: "Pretendard-Regaular",
    marginBottom: 1,
  },
  text1: {
    textAlign: "center",
    lineHeight: 22,
    color: "#808080",
    fontWeight: "400",
  },
  detailInput: {
    width: "100%",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 7,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    paddingBottom: 200,
    marginBottom: 73,
  },
  titleInput: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    fontSize: 14,
    paddingVertical: 9,
    paddingLeft: 14,
    marginBottom: 29,
  },
  titleText: {
    fontWeight: "700",
    fontSize: 14,
    fontFamily: "Pretendard-Regaular",
    marginBottom: 8,
  },
  headerContainer: {
    marginTop: 60, //임시
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 73,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    paddingVertical: 16,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 20,
    fontFamily: "Pretendard-Regaular",
    marginTop: 5.5,
  },
  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    justifyContent: "center",
    alignItems: "center",
    height: height,
  },
  ok: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#FFF",
  },
  okBtn: {
    backgroundColor: "#FFC32E",
    width: 200,
    paddingVertical: 5,
    borderRadius: 6,
    marginTop: 28,
  },
  popupCard: {
    borderRadius: 14,
    backgroundColor: "#FFF",
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});
