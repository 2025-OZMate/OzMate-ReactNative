import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, GestureResponderEvent } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface StyleProps {
    backColor?: string;
    textColor?: string;
}

interface ButtonProps {
    title: string;
    onPress: (() => void) | string;
    styleProps?: StyleProps;
}

export default function Button({ title, onPress, styleProps }: ButtonProps) {
    const navigation = useNavigation<NavigationProp<any>>();

    const handlePress = () => {
        if (typeof onPress === "function") {
            onPress();
        } else if (typeof onPress === "string") {
            navigation.navigate(onPress);
        }
    };

    return (
        <View style={styles.buttonWrapper}>
            <TouchableOpacity
                onPress={handlePress}
                style={[
                    styles.button,
                    {
                        backgroundColor: styleProps?.backColor || "#FFB600",
                    },
                ]}
            >
                <Text
                    style={[
                        styles.buttonText,
                        {
                            color: styleProps?.textColor || "#FFF",
                        },
                    ]}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        paddingHorizontal: 20,
    },
    button: {
        borderRadius: 16,
        paddingVertical: 13,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        fontWeight: "600",
        fontSize: 20,
        textAlign: "center",
    },
});
