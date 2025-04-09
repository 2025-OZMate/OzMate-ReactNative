import React, { useState, useEffect } from 'react';
import { colors } from '../styles/colors';
import { View, Text } from 'react-native';
import FeatureCard from '../components/Mypage/FeatureCard';
import ProfileCard from '../components/Mypage/ProfileCard';
export default function MyPageScreen() {
    const [user, setUser] = useState();
    const titles = ["BookmarkList", "Change Language", "Log Out"]
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ProfileCard useName={user ? user.name : "Guest"} />
            <View style={{ height: "12", backgroundColor: "#FFF59D", marginVertical: "20" }} />

            <View style={{ display: "flex", gap: "12" }}>
                {titles.map((item, idx) => (
                    <FeatureCard
                        title={item}
                        key={idx}
                    />
                ))}

            </View>
        </View>
    );
}
