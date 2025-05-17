import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import PrevBtn from '../../components/common/PrevBtn';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import InfoCard from '../../components/Home/InfoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    DetailInfo: { id: any }
}
type NavigationProp = StackNavigationProp<RootStackParamList>

interface Card {
    _id: string,
    cardId: string,
    image: string,
    title: string,
    subtitle: string,
    category: string
}

export default function BookMarkScreen() {
    const navigation = useNavigation<NavigationProp>()
    const [bookmarkedCard, setBookmarkedCard] = useState<Card[]>([])

    const cardId = AsyncStorage.getItem("cardId")
    console.log(cardId);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const userId = await AsyncStorage.getItem("userId")

            try {
                const res = await axios.get(`http://localhost:5000/bookmark/${userId}`)
                setBookmarkedCard(res.data['viewList'])
                console.log('북마크 된 데이터', res.data['viewList'])
            } catch (err) {
                console.error(err)
            }
        }
        fetchBookmarks();
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <PrevBtn address='Mypage' />
            <Text
                style={{
                    fontSize: 24, fontWeight: "500",
                    paddingLeft: 20, fontFamily: "Pretendard-bold",
                    marginVertical: 20
                }}>Bookmark List</Text>

            <ScrollView>
                {bookmarkedCard.map((item) => {
                    console.log('id확인', item._id)
                    return (
                        <View>
                            <InfoCard
                                _id={item.cardId}
                                image={item.image}
                                title={item.title}
                                subtitle={item.subtitle}
                                category={item.category}
                                onPress={() => {
                                    navigation.navigate('DetailInfo', { id: item._id });
                                }}
                            />
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}
