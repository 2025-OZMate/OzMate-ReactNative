import React from "react";
import {
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInputComponent,
} from "react-native";
import { useState } from "react";
import PrevBtn from "../../components/common/PrevBtn";
import axios from "axios";
import AnswerVivian from "../../components/common/AnswerVivian";
import Constants from "expo-constants";

type chatMsg = {
  from: "me" | "ai";
  text: string;
};

export default function ChatBot() {
  const [userInput, setUserInput] = useState<string>("");
  const [chatLog, setChatLog] = useState<chatMsg[]>([]); //이전 대화 내용 저장 배열

  const apiURL = Constants.expoConfig?.extra?.apiUrl ?? "";
  const sendMessage = async () => {
    if (!userInput.trim()) {
      Alert.alert("메세지를 입력해주세요!");
      return;
    }
    try {
      const response = await axios.post(`${apiURL}/chatbot`, {
        message: userInput,
      });
      setChatLog([
        ...chatLog,
        { from: "me", text: userInput },
        { from: "ai", text: response.data.reply },
      ]);
      setUserInput("");
    } catch (err) {
      console.error("에러 발생 : ", err);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white", zIndex: -1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={1}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={require("../../assets/images/chatbotBackgroundImg.png")}
          style={styles.backgroundImage}
          resizeMode="contain"
        />

        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <PrevBtn address="Home" />
            <Text style={styles.chatBotTxt}>ChatBot</Text>
          </View>
          <ScrollView style={{ flex: 1, height: 520, marginBottom: 70 }}>
            <AnswerVivian
              borderColor="#CFCFCF"
              user={"Vivian"}
              text={`Hello, I'm chatbot Vivian. \nAsk me what information you want!`}
              marginTop={60}
            />
            {chatLog.map((msg, idx) => (
              <View
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: msg.from === "me" ? "flex-end" : "flex-start",
                  paddingLeft: msg.from === "me" ? 0 : 20,
                  paddingRight: msg.from === "me" ? 20 : 0,
                  gap: 13,
                }}
              >
                {msg.from === "ai" && (
                  <Image
                    key={idx}
                    style={styles.vivianImg}
                    source={require("../../assets/images/vivian.png")}
                  />
                )}
                <View style={msg.from === "me" && styles.meAllContainer}>
                  <Text style={styles.vivian}>
                    {msg.from === "me" ? "" : "Vivian"}
                  </Text>
                  <View
                    style={
                      msg.from === "me"
                        ? styles.meContainer
                        : styles.botContainer
                    }
                  >
                    <Text key={idx} style={styles.text}>
                      {msg.text}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.sendContainer}>
            <TextInput
              value={userInput}
              onChangeText={setUserInput}
              placeholder="Please enter a message"
              placeholderTextColor={"#B7B7B7"}
              style={styles.inputQuestionContainer}
            />
            <TouchableOpacity onPress={sendMessage}>
              <Image
                source={require("../../assets/images/send.png")}
                style={styles.sendBtn}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: "5%",
    left: "5%",
    width: "90%",
    height: "90%",
    alignSelf: "center",
    zIndex: -1,
    backgroundColor: "#FFF",
  },
  meAllContainer: { alignSelf: "flex-end" },
  vivianImg: {
    width: 44,
    height: 44,
  },
  vivian: {
    fontFamily: "Pretendard-Regaular",
    fontSize: 13,
    color: "#777",
    marginBottom: 7,
    marginTop: 6,
  },
  sendContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 13,
    bottom: 30,
    margin: "auto",
  },
  sendBtn: { width: 36, height: 36 },
  inputQuestionContainer: {
    borderRadius: 95,
    borderWidth: 1,
    borderColor: "#D5D5D5",
    backgroundColor: "#FFF",
    width: 299,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,

    elevation: 2,
  },
  text: {
    fontFamily: "Pretendard-Regaular",
    fontSize: 13,
    lineHeight: 18.5,
  },
  meContainer: {
    alignSelf: "flex-end",
    maxWidth: 257,
    marginVertical: 20,
    paddingVertical: 9,
    paddingHorizontal: 12,
    backgroundColor: "#FFEE7F",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13,
  },
  botContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CFCFCF",
    backgroundColor: "#F9F9F9",
    maxWidth: 257,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    borderBottomLeftRadius: 13,
  },
  PrevLogo: {
    width: 40,
    height: 40,
    marginLeft: 20,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    zIndex: -1,
  },
  chatBotTxt: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 24,
    marginLeft: -40,
    marginTop: 53,
  },
});
