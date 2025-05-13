import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useState } from "react";
import Details from "../../components/Home/Details";
import RandomInfoCard from "../../components/Home/RandomInfoCard";
import PrevBtn from "../../components/common/PrevBtn";

export default function DetailInfo() {
    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>

            <Image source={require("../../assets/images/card.png")} style={{ width: "100%", height: 280 }} />
            <View style={{ position: "absolute" }}><PrevBtn /></View>
            <Details />
            <RandomInfoCard />
        </View>
    )
}