import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from './components/common/BottomNav';
import SignUp from './screens/Login/SignUp';
import Login from './screens/Login/Login';
import LogoScreen from './screens/LogoScreen';
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import SelectTestScreen from './screens/Practice/SelectTestScreen';
import TranslationTestScreen from './screens/Practice/TranslationTestScreen';
import BookMarkScreen from './screens/Mypage/BookMark';
import LanguageScreen from './screens/Mypage/Language';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Pretendard-Regular': require('../OzMate-ReactNative/assets/fonts/pretendard-regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LogoScreen">
          <Stack.Screen name="LogoScreen" component={LogoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={BottomNav} options={{ headerShown: false }} />
          <Stack.Screen name="Mypage" component={BottomNav} options={{ headerShown: false }} />
          <Stack.Screen name="Test" component={BottomNav} options={{ headerShown: false }} />
          <Stack.Screen name="SelectTest" component={SelectTestScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TranslationTest" component={TranslationTestScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="BookMarkScreen" component={BookMarkScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
