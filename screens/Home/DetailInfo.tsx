import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import Details from "../../components/Home/Details";
import RandomInfoCard from "../../components/Home/RandomInfoCard";
import PrevBtn from "../../components/common/PrevBtn";
import axios from "axios";
import { RouteProp, useRoute } from "@react-navigation/native";

type RouteProps = {
    DetailInfo: { id: string };
}

export default function DetailInfo() {
    const route = useRoute<RouteProp<RouteProps, 'DetailInfo'>>()
    const { id } = route.params
    const [card, setCard] = useState<any>(null)

    useEffect(() => {
        axios.get(`http://localhost:5000/infocard/${id}`)
            .then((res) => setCard(res.data))
            .catch((err) => console.error(err))
    }, [id])

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            {card && (
                <Image source={{ uri: `http://localhost:5000/images/${card.image}` }}
                    style={styles.bannerImg} />
            )}

            <View style={{ position: "absolute" }}><PrevBtn address="Home" /></View>

            {card && (
                <Details
                    category={card.category}
                    detailTitle={card.detailTitle}
                    detailContent={card.detailContent}
                />
            )}
            <RandomInfoCard />
        </View>
    )
}

const styles = StyleSheet.create({
    bannerImg: { width: "100%", height: 280 }
})