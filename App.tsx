import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
/*import AppLoading from 'expo-app-loading';*/
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./screens/Login/SignUp";
import Login from "./screens/Login/Login";
import LogoScreen from "./screens/LogoScreen";
import HomeScreen from "./screens/HomeScreen";
import SelectTestScreen from "./screens/Practice/SelectTestScreen";
import TranslationTestScreen from "./screens/Practice/TranslationTestScreen";
import BookMarkScreen from "./screens/Mypage/BookMark";
import RandomInfoCard from "./components/Home/RandomInfoCard";
import DetailInfo from "./screens/Home/DetailInfo";
import MyPageScreen from "./screens/MyPageScreen";
import ChatBot from "./screens/Chatbot/Chatbot";
import ExchangeRate from "./screens/ExchangeRate/ExchangeRate";
import WriteInformation from "./screens/Admin/WriteInformation";
import FeedBack from "./screens/Mypage/FeedBack";
import Weather from "./screens/WeatherScreen";
import SelectInformation from "./screens/ExchangeRate/SelectInformation";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Pretendard-Regular": require("../OzMate-ReactNative/assets/fonts/pretendard-regular.otf"),
  });
  /*
    if (!fontsLoaded) {
      return <AppLoading />;
    }
  */
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SelectInformation">
          <Stack.Screen
            name="LogoScreen"
            component={LogoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Mypage"
            component={MyPageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectTest"
            component={SelectTestScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TranslationTest"
            component={TranslationTestScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookMarkScreen"
            component={BookMarkScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RandomInfoCard"
            component={RandomInfoCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailInfo"
            component={DetailInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatBot"
            component={ChatBot}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExchangeRate"
            component={ExchangeRate}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WriteInformation"
            component={WriteInformation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FeedBack"
            component={FeedBack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Weather"
            component={Weather}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectInformation"
            component={SelectInformation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
