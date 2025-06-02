import React from "react";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/common/NavBar";

type RootStackParamList = {
    [key: string]: undefined
}
type NavigationProp = StackNavigationProp<RootStackParamList>

interface Weatherinfo {
    city: string;
    mainWeather: string;
    icon: string;
    temp: number;
    maxTemp: number;
    minTemp: number;
}

const cities = ['Sydney', 'South Melbourne', 'Brisbane', 'Perth'];
const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY

export default function Weather() {
    const navigation = useNavigation<NavigationProp>()
    function Prev() {
        return (
            <TouchableOpacity style={styles.headerContainer} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../assets/images/prev.png')} style={{ width: 30, height: 30 }} />

                <Text style={styles.headerText}>Weather</Text>
            </TouchableOpacity>
        )
    }

    const [weatherData, setWeatherData] = useState<Weatherinfo[]>([])
    useEffect(() => {
        //절대 온도 -> 섭씨온도로 변환
        const Celsius = (k: number): number => Math.round(k - 273.15)

        const fetchWeather = async (city: string): Promise<Weatherinfo> => {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`)
            const data = await res.json();
            //console.log(data.weather[0].icon)
            return {
                city: data.name,
                mainWeather: data.weather[0].main,
                temp: Celsius(data.main.temp),
                maxTemp: Celsius(data.main.temp_max),
                minTemp: Celsius(data.main.temp_min),
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            }
        }

        const load = async () => {
            const results = await Promise.all(cities.map(fetchWeather))
            setWeatherData(results)
        }
        load()
    }, [])

    return (
        <View style={{ position: "relative", flex: 1 }}>
            <Prev />
            <View style={{ flex: 1 }}>
                {weatherData.map((item) => (
                    <ScrollView>
                        <Text>{item.city}</Text>
                        <Text>{item.temp}°C</Text>
                        <Text>{item.mainWeather}</Text>
                        <Text>{`MaxTemp: ${item.maxTemp} | MinTemp: ${item.minTemp}`}</Text>
                        <Image source={{ uri: item.icon }} style={{ width: 50, height: 50 }} />
                    </ScrollView>
                ))}
            </View>
            <NavBar />
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex", flexDirection: "row", width: "100%", gap: 73,
        shadowColor: '#000', shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4, elevation: 4, paddingVertical: 16
    },
    headerText: { fontWeight: "500", fontSize: 20, fontFamily: "Pretendard-Regaular" },
})