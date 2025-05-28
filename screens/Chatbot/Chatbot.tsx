import React from "react";
import { View, TextInput, Button, Text, ScrollView, Alert, StyleSheet, Image, TouchableOpacity, TextInputComponent } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PrevBtn from "../../components/common/PrevBtn";
import axios from "axios";
import AnswerVivian from "../../components/common/AnswerVivian";

type chatMsg = {
    from: 'me' | 'ai';
    text: string;
}

export default function ChatBot() {

    const [userInput, setUserInput] = useState<string>('')
    const [chatLog, setChatLog] = useState<chatMsg[]>([]) //이전 대화 내용 저장 배열


    const sendMessage = async () => {
        if (!userInput.trim()) {
            Alert.alert('메세지를 입력해주세요!')
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/chatbot', {
                message: userInput,
            })
            setChatLog([...chatLog, { from: 'me', text: userInput },
            { from: 'ai', text: response.data.reply }]);
            setUserInput('')

        } catch (err) {
            console.error('에러 발생 : ', err)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <View style={styles.headerContainer}>
                <PrevBtn address="Home" />
                <Text style={styles.chatBotTxt}>ChatBot</Text>
            </View>
            <ScrollView style={{ flex: 1, height: 500, marginBottom: 70 }}>
                <AnswerVivian
                    user={"Vivian"}
                    text={"Hello, I'm chatbot Vivian. Ask me what information you want!"}
                />
                {chatLog.map((msg, idx) => (
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: msg.from === "me" ? "flex-end" : "flex-start",
                        paddingLeft: msg.from === "me" ? 0 : 20,
                        paddingRight: msg.from === "me" ? 20 : 0,
                        gap: 13,
                    }}>
                        {msg.from === "ai" && (
                            <Image
                                style={styles.vivianImg}
                                source={require('../../assets/images/vivian.png')} />
                        )}
                        <View style={msg.from === 'me' && styles.meAllContainer}>
                            <Text style={styles.vivian}>{msg.from === 'me' ? "" : "Vivian"}</Text>
                            <View style={msg.from === 'me' ? styles.meContainer : styles.botContainer}>
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
                    placeholder="메세지를 입력하세요"
                    placeholderTextColor={"#B7B7B7"}
                    style={styles.inputQuestionContainer}
                />
                <TouchableOpacity onPress={sendMessage}>
                    <Image source={require('../../assets/images/send.png')}
                        style={styles.sendBtn} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    meAllContainer: { alignSelf: "flex-end" },
    vivianImg: { width: 44, height: 44 },
    vivian: { fontFamily: "Pretendard-Regaular", fontSize: 12, color: "#777", marginBottom: 7, marginTop: 6 },
    sendContainer: { display: "flex", flexDirection: "row", gap: 13, bottom: 30, margin: "auto" },
    sendBtn: { width: 36, height: 36 },
    inputQuestionContainer: {
        borderRadius: 95, borderWidth: 1, borderColor: "#D5D5D5", backgroundColor: "#FFF",
        width: 299, paddingVertical: 10, paddingLeft: 20, paddingRight: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 2,
    },
    text: { fontFamily: "Pretendard-Regaular", fontSize: 12, lineHeight: 15.5 },
    meContainer: {
        alignSelf: "flex-end", maxWidth: 257,
        marginVertical: 20,
        paddingVertical: 9, paddingHorizontal: 12, backgroundColor: "#FFEE7F",
        borderTopLeftRadius: 13, borderTopRightRadius: 0,
        borderBottomRightRadius: 13, borderBottomLeftRadius: 13,
    },
    botContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CFCFCF",
        backgroundColor: "#FFF",
        maxWidth: 257,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
        borderBottomLeftRadius: 13,
    },
    PrevLogo: { width: 40, height: 40, marginLeft: 20 },
    headerContainer: {
        display: "flex", flexDirection: "row", alignItems: "center", zIndex: -1
    },
    chatBotTxt: {
        flex: 1, textAlign: "center", fontWeight: "600", fontSize: 24, marginLeft: -30, marginTop: 53
    }
})