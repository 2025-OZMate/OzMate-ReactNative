import React, { useState, useEffect } from 'react';
import { colors } from '../styles/colors';
import { View, Text } from 'react-native';
import FeatureCard from '../components/Mypage/FeatureCard';
import ProfileCard from '../components/Mypage/ProfileCard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from '../components/common/NavBar';

type User = {
    name: string;
}
export default function MyPageScreen() {
    //const [user, setUser] = useState<User | undefined>(undefined);
    const titles = ["BookmarkList", "Send FeedBack", "Log Out"]
    const [username, setUsername] = useState("");

    useEffect(() => {
        const getUsername = async () => {
            try {
                const savedUsername = await AsyncStorage.getItem("username");
                if (savedUsername) {
                    setUsername(savedUsername)
                } else { console.log('로그인 필요함') }
            } catch (err) {
                console.error();
            }
        }
        getUsername()
    }, [])

    const images = {
        1: require('../assets/images/bookmarkIcon.png'),
        2: require('../assets/images/feedBackIcon.png'),
        3: require('../assets/images/logoutIcon.png'),
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, position: "relative" }}>
            {username ? <ProfileCard useName={username} /> : "Guest"}
            <View style={{ height: 12, backgroundColor: "#FFF59D", marginVertical: 20, }} />

            <View style={{ display: "flex", gap: 12, flex: 1 }}>
                {titles.map((item, idx) => (
                    <FeatureCard
                        title={item}
                        key={idx}
                        imgSrc={images[idx + 1]}
                    />
                ))}

            </View>

            <NavBar />

        </View>
    );
}
