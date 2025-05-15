import React from "react";
import { View, TextInput, Button, Text, ScrollView } from "react-native";
import { useState } from "react";
import axios from "axios";

type chatMsg = {
    from: 'me' | 'ai';
    text: string;
}

export default function ChatBot() {
    const [userInput, setUserInput] = useState<string>('')
    const [chatLog, setChatLog] = useState<chatMsg[]>([]) //이전 대화 내용 저장 배열

    const sendMessage = async () => {
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
        <View style={{ flex: 1, padding: 16 }}>
            <ScrollView style={{ flex: 1, height: 500 }}>
                {chatLog.map((msg, idx) => (
                    <Text key={idx} style={{ marginVertical: 5, color: msg.from === 'me' ? 'blue' : 'green' }}>
                        {msg.from === 'me' ? '👤' : '🤖'} {msg.text}
                    </Text>
                ))}
            </ScrollView>

            <TextInput
                value={userInput}
                onChangeText={setUserInput}
                placeholder="메세지를 입력하세요"
                style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, marginVertical: 10 }}
            />
            <Button title="보내기" onPress={sendMessage} />
        </View>
    )
}