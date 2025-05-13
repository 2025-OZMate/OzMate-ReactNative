import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import InfoCard from '../components/Home/InfoCard';
import axios from 'axios';

interface Card {
    id: number,
    ImgUrl: string,
    title: string,
    description: string,
    category: string
}
export default function HomeScreen() {
    const [cards, setCards] = useState<Card[]>([])
    useEffect(() => {

        axios.get(`http://192.168.0.9:5000/api/info-cards`)
            .then(response => {
                setCards(response.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, []);
    return (
        <View style={{ flex: 1, }}>
            <Image source={require('../assets/images/banner-img.png')}
                style={{ height: 280, width: '100%' }} />
            <ScrollView>
                {cards.map((card) => (
                    <InfoCard
                        key={card.id}
                        ImgUrl={card.ImgUrl}
                        title={card.title}
                        description={card.description}
                        category={card.category}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
