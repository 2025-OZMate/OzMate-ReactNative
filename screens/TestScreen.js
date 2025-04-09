import React from 'react';
import Card from '../components/Practice/Card';
import { View, Text, Image } from 'react-native';
import practiceImg from "../assets/images/practiceLogo.png"
import cultureImg from "../assets/images/cultureQuizImg.png"
import logoImg from "../assets/images/logo.png"
const titles = [
    { subject: "English Practice", title: " You can learn expressions", src: practiceImg },
    { subject: "Australia Culture Quiz", title: "You can take fun quizzes about Australia!", src: cultureImg },
]

export default function TestScreen() {
    return (
        <View style={{ backgroundColor: "#FFF9C4", flex: 1, }}>
            <View>
                <Image source={logoImg}
                    style={{
                        width: 100, height: 24, resizeMode: "contain",
                        marginTop: 66, marginBottom: 28, alignSelf: "center"
                    }} />
            </View>

            <View style={{ marginHorizontal: 20 }}>
                {titles.map((item, index) => (
                    <Card
                        key={index}
                        subject={item.subject}
                        title={item.title}
                        source={item.src}
                    />
                ))}
            </View>
        </View>
    );
}
