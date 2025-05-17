import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { shadows } from "../../styles/designSystem"
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    DetailInfo: { id: string };
}
type NavigationProp = StackNavigationProp<RootStackParamList>

interface InfoCardProps {
    _id: string;
    image: string | { uri: string };
    title: string;
    subtitle: string;
    category: string;
    onPress: () => void;
}
export default function InfoCard({ _id, image, title, subtitle, category, onPress }: InfoCardProps) {
    const navigation = useNavigation<NavigationProp>()

    const handleClick = async () => {
        try {
            await AsyncStorage.setItem("cardId", _id)
            console.log('cardId 저장 완료 :', _id)
            navigation.navigate('DetailInfo', { id: _id })

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <TouchableOpacity
            onPress={typeof onPress === 'function' ? onPress : handleClick}
            style={[styles.allContainer, shadows.shadow1]}>

            <Image style={styles.bannerImg} source={{ uri: `http://localhost:5000/images/${image}` }} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{subtitle}</Text>
                <Text style={styles.category}>{category}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    allContainer: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: "row",
        marginHorizontal: 20,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginTop: 12
    },
    contentContainer: {
        borderRadius: 10,
        marginLeft: 16,
        marginVertical: 12
    },
    bannerImg: {
        height: "100%",
        width: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    title: {
        fontFamily: 'Pretendard-bold',
        fontWeight: "500",
        fontSize: 16,
    },
    description: {
        fontFamily: 'Pretendard-bold',
        fontWeight: "500",
        fontSize: 10,
        lineHeight: 14,
        marginVertical: 4,
        width: 200,
        height: 28,
        color: "#444",
    },
    category: {
        fontFamily: 'Pretendard-bold',
        fontWeight: "500",
        fontSize: 10,
        color: "#777",
    }
})