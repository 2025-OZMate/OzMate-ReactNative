import axios from "axios";
import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";

type RootStackParamList = {
  [key: string]: undefined;
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

const fields = [
  { name: "cardId", placeholder: "정보 카드 숫자 입력" },
  { name: "title", placeholder: "정보 카드 제목 입력" },
  { name: "subtitle", placeholder: "정보 카드 소개" },
  { name: "category", placeholder: "카테고리" },
  { name: "image", placeholder: "이미지 주소" },
  { name: "detailTitle", placeholder: "상세 제목" },
  { name: "detailContent", placeholder: "상세 내용" },
] as const;

type FormField = (typeof fields)[number]["name"];
type FormType = Record<FormField, string>; //Record : key, value

export default function WriteInformation() {
  const apiURL = Constants.expoConfig?.extra?.apiUrl ?? "";
  const navigation = useNavigation<NavigationProp>();
  const [form, setForm] = useState<FormType>({
    cardId: "",
    title: "",
    subtitle: "",
    category: "",
    image: "",
    detailTitle: "",
    detailContent: "",
  });

  const handleChange = (name: FormField, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const sendInformation = async () => {
    const isEmpty = Object.values(form).some((v) => v.trim() === "");
    if (isEmpty) {
      alert("모든 필드를 입력해주세요");
      return;
    }
    try {
      const res = await axios.post(`${apiURL}/infocard/add`, form);
      console.log("정보 입력 성공! : ", res.data);
      navigation.navigate("Home");
    } catch (err) {
      console.error("에러 발생: ", err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        {fields.map((field) => (
          <TextInput
            style={styles.textInput}
            key={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            multiline={true}
            onChangeText={(text) => handleChange(field.name, text)}
          />
        ))}
      </ScrollView>

      <Button title="입력 완료" onPress={sendInformation} />
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
    height: 100,
  },
  contentContainer: {
    height: 700,
  },
  container: {
    marginVertical: 20,
  },
});
