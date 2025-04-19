import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { shadows } from '../../styles/designsystem';
interface InfoCardProps {
    ImgUrl: string | undefined;
    title: string;
    description: string;
    category: string;
}
export default function InfoCard({ ImgUrl, title, description, category }: InfoCardProps) {
    return (
        <View style={[styles.allContainer, shadows.shadow1]}>
            <Image source={ImgUrl} style={styles.bannerImg} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.category}>{category}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    allContainer: {
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
        height: 28
    },
    category: {
        fontFamily: 'Pretendard-bold',
        fontWeight: "500",
        fontSize: 10,
        color: "#777",
    }
})