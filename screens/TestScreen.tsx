import React from 'react';
import NavBar from '../components/common/NavBar';
import Card from '../components/Practice/Card';
import { View, Image } from 'react-native';
const practiceImg = require('../assets/images/practiceLogo.png')
const cultureImg = require('../assets/images/cultureQuizImg.png')
const titles = [
    { subject: "English Practice", title: " You can learn expressions", src: practiceImg },
    { subject: "Australia Culture Quiz", title: "You can take fun quizzes about Australia!", src: cultureImg },
]

export default function TestScreen() {
    const logoImg = require('../assets/images/logo.png')
    return (
        <View style={{ backgroundColor: "#FFF9C4", flex: 1, position: "relative" }}>
            <View>
                <Image source={logoImg}
                    style={{
                        width: 100, height: 24, resizeMode: "contain",
                        marginTop: 66, marginBottom: 28, alignSelf: "center"
                    }} />
            </View>

            <View style={{ marginHorizontal: 20, flex: 1 }}>
                {titles.map((item, index) => (
                    <Card
                        key={index}
                        subject={item.subject}
                        title={item.title}
                        source={item.src}
                    />
                ))}
            </View>


            <NavBar />

        </View>
    );
}
