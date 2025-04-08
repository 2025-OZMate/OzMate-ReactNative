import React from 'react';
import { colors } from '../styles/colors';
import { View, Text } from 'react-native';

export default function MyPageScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
            <Text>mypage</Text>
        </View>
    );
}
