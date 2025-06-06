import React from "react";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/common/NavBar";
import Time from "../components/common/Time";

interface Weatherinfo {
    city: string;
    mainWeather: string;
    icon: string;
    temp: number;
    maxTemp: number;
    minTemp: number;
}

const cities = ['Sydney', 'South Melbourne', 'Brisbane', 'Perth', 'Candelo', 'Hobart'];
const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY

const sunny = require('../assets/images/sunny.png')
const rain = require('../assets/images/rain.png')
const cloud = require('../assets/images/cloud.png')

export default function Weather() {

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
        <View style={{ position: "relative", flex: 1, backgroundColor: "#FFFDF0" }}>
            <Image source={require('../assets/images/linearBackGround.png')} style={styles.backgroundImg} />
            <View style={{ flex: 1 }}>
                <Time />
                <ScrollView style={{ marginBottom: 100, marginTop: 33 }} >
                    {weatherData.map((item, index) => (
                        <View key={index} style={{ alignItems: 'center', marginBottom: 30 }}>
                            <View style={{ position: 'relative', width: 342, height: 190 }}>

                                <Image source={require('../assets/images/weather-widget.png')} style={styles.widget} />

                                {item.mainWeather === 'Rain' && <Image source={rain} style={styles.weatherIcon} />}
                                {item.mainWeather === 'Clouds' && <Image source={cloud} style={styles.weatherIcon} />}
                                {item.mainWeather === 'Clear' && <Image source={sunny} style={styles.weatherIcon} />}

                                <Text style={[styles.temp, styles.font, { position: 'absolute', top: 39, left: 23 }]}>
                                    {item.temp}°C
                                </Text>

                                <Text style={[styles.maxMinTemp, styles.font, { position: 'absolute', top: 130, }]}>
                                    MaxTemp: {item.maxTemp} | MinTemp: {item.minTemp}
                                </Text>

                                {/* 도시 + 날씨 텍스트 */}
                                <View style={{
                                    position: 'absolute',
                                    bottom: 20,
                                    right: 23,
                                    gap: 137,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Text numberOfLines={1}
                                        ellipsizeMode="tail" style={[styles.city, styles.font]}>{item.city}</Text>
                                    <Text style={[styles.weather, styles.font]}>{item.mainWeather}</Text>
                                </View>

                            </View>
                        </View>
                    ))}


                </ScrollView>
            </View >
            <NavBar />
        </View >
    )
}

const styles = StyleSheet.create({
    widget: {
        width: 342, height: 190,
        zIndex: -1, position: "absolute", top: 0, left: 0
    },
    font: { fontFamily: "Pretendard-Regaular" },
    maxMinTemp: { fontSize: 13, color: "#2D2D2D", marginLeft: 20 },
    backgroundImg: {
        height: 297, width: "100%",
        zIndex: -1, position: "absolute", top: 0, left: 0
    },
    temp: { fontSize: 64, color: "#FFF", },
    weather: { fontSize: 13, color: "#FFF" },
    city: {
        fontSize: 17, color: "#FFF",
        width: 125, marginLeft: 20,
    },
    weatherIcon: {
        width: 130,
        height: 130,
        position: 'absolute',
        right: 10,
        zIndex: 1
    },

    headerText: {
        fontWeight: "500", fontSize: 20,
        fontFamily: "Pretendard-Regaular"
    },
})