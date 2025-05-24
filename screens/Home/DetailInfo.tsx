import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Details from "../../components/Home/Details";
import RandomInfoCard from "../../components/Home/RandomInfoCard";
import PrevBtn from "../../components/common/PrevBtn";
import axios from "axios";
import { RouteProp, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const bookmarkImg = require('../../assets/images/bookmark.png')
const bookmarkClickedImg = require('../../assets/images/bookmark-clicked.png')

type RouteProps = {
    DetailInfo: { id: string };
}

export default function DetailInfo() {
    const route = useRoute<RouteProp<RouteProps, 'DetailInfo'>>()
    const { id } = route.params
    const [card, setCard] = useState<any>(null)
    const [isBookmark, setIsBookmark] = useState(false)

    //id별로 상세 페이지 내용 가져오기
    useEffect(() => {
        axios.get(`http://localhost:5000/infocard/${id}`)
            .then((res) => setCard(res.data))
            .catch((err) => console.error(err))
    }, [id])

    console.log(id)
    const handleBookmark = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId")
            const cardId = id

            const res = await axios.post('http://localhost:5000/bookmark',
                {
                    userId, cardId
                })

            if (res.data.success) {
                setIsBookmark(true)
                console.log('북마크 성공')
            } else {
                console.log('북마크 실패', res.data.message)
            }
        } catch (err) {
            console.error("북마크 실패", err)
        }
    }


    const navigation = useNavigation();
    function PrevButton() {
        return (
            <TouchableOpacity
                onPress={() => { navigation.goBack() }}
                style={{ marginTop: 54, marginLeft: 20 }}>
                <Image source={require('../../assets/images/prev.png')}
                    style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView style={{ backgroundColor: "#FFF", flex: 1, }}>
            {card && (
                <Image source={{ uri: `http://localhost:5000/images/${card.image}` }}
                    style={styles.bannerImg} />
            )}

            <View style={{ position: "absolute" }}><PrevButton /></View>

            {card && (

                <>
                    {/*북마크 버튼*/}
                    <TouchableOpacity onPress={handleBookmark}>
                        {isBookmark ? <Image source={bookmarkImg} style={styles.bookmarkIcon} /> :
                            <Image source={bookmarkClickedImg} style={styles.bookmarkIcon} />}
                    </TouchableOpacity>


                    <Details
                        category={card.category}
                        detailTitle={card.detailTitle}
                        detailContent={card.detailContent}
                    />
                </>
            )}
            <RandomInfoCard />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bannerImg: { width: "100%", height: 280 },
    bookmarkIcon: {
        width: 40, height: 40,
        paddingRight: 20,
        position: "absolute", right: 10, top: 10
    }

})