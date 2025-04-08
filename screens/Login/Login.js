import { View, TextInput, StyleSheet, Alert, Image } from "react-native";
import { colors } from "../../styles/colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Logo from "../../components/common/Logo";
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
        const { userid, password } = form;
        if (!userid.trim() && !password.trim()) {
            Alert.alert('아이디와 비밀번호를 입력해주세요!')
            return;
        } else if (!userid.trim()) {
            Alert.alert('아이디를 입력해주세요!')
            return;
        } else if (!password.trim()) {
            Alert.alert('비밀번호를 입력해주세요!')
            return;
        }
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

            <View style={styles.mainContainer}>
                <Logo />
                <View style={styles.inputsContainer}>
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
        backgroundColor: colors.background,
    },
    mainContainer: {

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
    },
    input: {
        height: 40,
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingVertical: 13,
        paddingLeft: 20,
        fontSize: 12,
        color: "#777",
        fontFamily: "Pretendard-Regular",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // Android에서 그림자
        borderRadius: 16,
    },
    inputsContainer: {
        display: "flex"
        , gap: 12,
        paddingHorizontal: 20
    }
})