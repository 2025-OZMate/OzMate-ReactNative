import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../../screens/HomeScreen";
import MyPageScreen from "../../screens/MyPageScreen";
import TestScreen from "../../screens/TestScreen";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Test') {
                        return (
                            <MaterialCommunityIcons
                                name="note-edit-outline"
                                size={25}
                                color={focused ? '#FFB600' : 'black'}
                            />
                        );
                    } else if (route.name === 'Home') {
                        return (
                            <Feather
                                name="home"
                                size={25}
                                color={focused ? '#FFB600' : 'black'}
                            />
                        );
                    } else if (route.name === 'Mypage') {
                        return (
                            <Feather
                                name="user"
                                size={25}
                                color={focused ? '#FFB600' : 'black'}
                            />
                        );
                    }
                },
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    borderRadius: 20,
                    backgroundColor: '#FFF',
                    height: 72,
                    paddingHorizontal: 30,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 4,
                    elevation: 4,

                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarItemStyle: {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
            })}
        >
            <Tab.Screen name="Test" component={TestScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Mypage" component={MyPageScreen} />
        </Tab.Navigator>
    );
}
