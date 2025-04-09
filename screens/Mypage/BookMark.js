import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../styles/colors';
import PrevBtn from '../../components/common/PrevBtn';
export default function BookMarkScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <PrevBtn />
            <Text>Bookmark List</Text>
        </View>
    );
}
