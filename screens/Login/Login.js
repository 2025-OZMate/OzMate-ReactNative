import { View, TextInput, StyleSheet, Alert, Image } from "react-native";
import { colors } from "../../styles/colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Logo from "../../assets/images/logo.png"
import Button from "../../components/common/Button";
export default function Login() {
    const [form, setForm] = useState({ userid: "", password: "" });
    const navigation = useNavigation();
    const handleSignUp = () => {
        navigation.navigate("")
    }
    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            //const res = await axios.post("") //나중에 수정
            //setItem
            navigation.navigate("Home")
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logoImg}></Image>
            <View>
                <TextInput
                    placeholder="User ID"
                    style={styles.input}
                    value={form.userid}
                    onChangeText={(text) => handleChange("userid", text)}
                />

                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    value={form.password}
                    onChangeText={(text) => handleChange("password", text)}
                />
            </View>


            {/* 로그인, 회원가입 버튼들 */}
            <View style={styles.ButtonContainer}>
                <Button
                    title="SIGN IN"
                    onPress={handleSubmit}
                    styleProps={{
                        backColor: "#FFB600",
                        textColor: "#FFF"
                    }}
                />
                <Button
                    title="SIGN UP"
                    onPress={handleSignUp}
                    styleProps={{
                        backColor: "#FFF",
                        textColor: "#FFB600"
                    }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    ButtonContainer: {
        paddingBottom: 40,
        gap: 12,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1,
    },
    logoImg: {
        width: 184,
        height: 45
    }
})