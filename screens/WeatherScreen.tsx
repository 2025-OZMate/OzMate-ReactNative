import React from "react";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
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

const cities = [
  "Sydney",
  "South Melbourne",
  "Brisbane",
  "Perth",
  "Candelo",
  "Hobart",
];
const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const sunny = require("../assets/images/sunny.png");
const rain = require("../assets/images/rain.png");
const cloud = require("../assets/images/cloud.png");

export default function Weather() {
  const [weatherData, setWeatherData] = useState<Weatherinfo[]>([]);
  useEffect(() => {
    //절대 온도 -> 섭씨온도로 변환
    const Celsius = (k: number): number => Math.round(k - 273.15);

    const fetchWeather = async (city: string): Promise<Weatherinfo> => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`
      );
      const data = await res.json();
      //console.log(data.weather[0].icon)
      return {
        city: data.name,
        mainWeather: data.weather[0].main,
        temp: Celsius(data.main.temp),
        maxTemp: Celsius(data.main.temp_max),
        minTemp: Celsius(data.main.temp_min),
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      };
    };

    const load = async () => {
      const results = await Promise.all(cities.map(fetchWeather));
      setWeatherData(results);
    };
    load();
  }, []);

  return (
    <View style={{ position: "relative", flex: 1, backgroundColor: "#FFFDF0" }}>
      <Image
        source={require("../assets/images/linearBackGround.png")}
        style={styles.backgroundImg}
      />
      <View style={{ flex: 1 }}>
        <Time />
        <ScrollView style={{ marginBottom: 100, marginTop: 33, zIndex: 10000 }}>
          {weatherData.map((item, index) => (
            <View
              key={index}
              style={{ alignItems: "center", marginBottom: 30 }}
            >
              <View style={{ position: "relative", width: 342, height: 190 }}>
                <Image
                  source={require("../assets/images/weather-widget.png")}
                  style={styles.widget}
                />

                {item.mainWeather === "Rain" && (
                  <Image source={rain} style={styles.weatherIcon} />
                )}
                {item.mainWeather === "Clouds" && (
                  <Image source={cloud} style={styles.weatherIcon} />
                )}
                {item.mainWeather === "Clear" && (
                  <Image source={sunny} style={styles.weatherIcon} />
                )}
                <View style={{ paddingLeft: 20, paddingTop: 35 }}>
                  <Text style={[styles.temp, styles.font]}>{item.temp}°C</Text>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                      gap: 120,
                    }}
                  >
                    <View style={{ width: 142, marginTop: 2.6 }}>
                      <Text style={[styles.maxMinTemp, styles.font]}>
                        Max: {item.maxTemp} | Min: {item.minTemp}
                      </Text>

                      <Text style={[styles.city, styles.font]}>
                        {item.city}
                      </Text>
                    </View>
                    <Text style={[styles.weather, styles.font]}>
                      {item.mainWeather}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  widget: {
    width: 342,
    height: 190,
    zIndex: -1,
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 22,
  },
  font: {
    fontFamily: "Pretendard-Regaular",
  },
  maxMinTemp: {
    fontSize: 13,
    color: "#2D2D2D",
  },
  backgroundImg: {
    height: 297,
    width: "100%",
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
  temp: {
    fontWeight: 500,
    fontSize: 60,
    color: "#FFF",
    marginTop: 20, //임시
  },
  weather: {
    fontSize: 13,
    color: "#FFF",
  },
  city: {
    fontWeight: 500,
    fontSize: 17,
    color: "#000",
    marginTop: 2,
  },
  weatherIcon: {
    width: 130,
    height: 130,
    position: "absolute",
    right: 10,
    zIndex: 1,
  },

  headerText: {
    fontWeight: "500",
    fontSize: 20,
    fontFamily: "Pretendard-Regaular",
  },
});
