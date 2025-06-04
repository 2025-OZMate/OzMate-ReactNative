import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import SelectInfoCard from "../../components/Weather/selectInfoCard";
import NavBar from "../../components/common/NavBar";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
type RootStackParamList = {
    [key: string]: undefined
}
type NavigationProp = StackNavigationProp<RootStackParamList>

export default function SelectInformation() {
    const navigation = useNavigation<NavigationProp>()
    const selectInfos = [
        { path: "ExchangeRate", title: "Exchange Rate Calculator", description: "You can check the exchange rate!", img: require('../../assets/images/calculator.png') },
        { path: "SelectTest", title: "English practice", description: "You can learn expressions!", img: require('../../assets/images/koreaEnglish.png') },
        { path: "TranslationTest", title: "Australia Culture Quiz", description: "You can take fun quizzes about Australia!", img: require('../../assets/images/message.png') },
    ]
    return (
        <View style={{ position: "relative", flex: 1, backgroundColor: "#FFF9C4" }}>
            <View style={{ marginTop: 80, marginBottom: 31 }}>
                <Image source={require('../../assets/images/logo.png')}
                    style={{ width: 100, height: 24, margin: "auto" }} />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <View style={{ gap: 14, marginTop: 32 }}>
                    {selectInfos.map((item) => (
                        <TouchableOpacity onPress={() => navigation.navigate(item.path)}>
                            <SelectInfoCard
                                title={item.title}
                                description={item.description}
                                img={item.img}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <NavBar />
        </View >
    )
}
const styles = StyleSheet.create({
})