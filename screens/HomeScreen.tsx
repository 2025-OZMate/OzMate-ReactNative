import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import InfoCard from '../components/Home/InfoCard';
import Category from '../components/Home/Category';
import axios from 'axios';
import NavBar from '../components/common/NavBar';
interface Card {
    _id: string,
    id: number,
    image: string,
    title: string,
    subtitle: string,
    category: string
}
export default function HomeScreen() {
    const [cards, setCards] = useState<Card[]>([])
    const [activeCategory, setActiveCategory] = useState<string>("ALL")
    const categories = ["ALL", "POLICY", "LIFE"]

    const screenHeight = Dimensions.get('window').height;

    const handleCategoryClick = async (category: string) => {
        setActiveCategory(category)
        try {
            const res = await axios.get(`http://localhost:5000/infocard/category?type=${category}`)
            setCards(res.data)
            console.log("불러온 data: ", res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        handleCategoryClick("ALL")
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Image source={require('../assets/images/banner-img.png')}
                style={{ height: 280, width: '100%' }} />

            <View style={styles.CategoryContainer}>
                {categories.map((category) => (
                    <Category
                        key={category}
                        type={category}
                        onPress={() => handleCategoryClick(category)}
                        isActive={category === activeCategory}
                    />
                ))}
            </View>

            <ScrollView style={{ marginBottom: 106 }}>
                {cards.map((card, idx) => (
                    <InfoCard
                        _id={card._id}
                        key={idx}
                        image={card.image}
                        title={card.title}
                        subtitle={card.subtitle}
                        category={card.category}
                    />
                ))}
            </ScrollView>

            <NavBar />
        </View>
    );
}
const styles = StyleSheet.create({
    CategoryContainer: {
        display: "flex", flexDirection: "row", gap: 8,
        paddingVertical: 20, paddingLeft: 20
    }
})