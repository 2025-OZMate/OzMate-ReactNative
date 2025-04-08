import React, { useState, useEffect } from 'react';
import { colors } from '../styles/colors';
import { View, Text } from 'react-native';
import ProfileCard from '../components/Mypage/ProfileCard';
export default function MyPageScreen() {
    const [user, setUser] = useState();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ProfileCard useName={user ? user.name : "Guest"} />
            <View style={{ height: "12", backgroundColor: "#FFF59D", marginVertical: "20" }} />
        </View>
    );
}
