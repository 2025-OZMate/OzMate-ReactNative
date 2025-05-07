import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, TextInput, StyleSheet, Alert, Image } from "react-native";
import LogoMain from "../../components/common/Logo";
import Button from "../../components/common/Button";
import axios from "axios";
import { colors } from "../../styles/colors";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Login: undefined;
}
export default function SignUp() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [form, setForm] = useState({
        username: "",
        userid: "",
        password: "",
        passwordConfirm: ""
    });
    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async () => {
        const { username, userid, password, passwordConfirm } = form;
        if (!username || !userid || !password || !passwordConfirm) {
            Alert.alert('모든 항목을 입력해주세요.');
            return;
        }
        if (form.password !== form.passwordConfirm) {
            Alert.alert('비밀번호가 일치하지 않습니다.')
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/auth/signup", form);//연결
            Alert.alert('회원가입 성공')
            navigation.navigate('Login')

        } catch (error) {
            if (error.response) {
                Alert.alert('회원가입 실패')
            } else if (error.request) {
                Alert.alert('서버 연결 실패')
            } else {
                Alert.alert('오류발생', error.message)
            }
        }
    }
    return (
        <View style={styles.allContainer}>
            <LogoMain />
            <View style={styles.inputsContainer}>
                {/* 사용자 이름 입력 */}
                <TextInput
                    placeholder="User Name"
                    value={form.username}
                    onChangeText={(text) => handleChange("username", text)}
                    style={styles.input}
                />

                {/* 유저 아이디 */}
                <TextInput
                    placeholder="User ID"
                    value={form.userid}
                    onChangeText={(text) => handleChange("userid", text)}
                    style={styles.input}
                />

                {/* 비밀번호 */}
                <TextInput
                    placeholder="Password"
                    value={form.password}
                    onChangeText={(text) => handleChange("password", text)}
                    style={styles.input}
                    secureTextEntry
                />
                {/* 비번 확인 */}
                <TextInput
                    placeholder="Confirm Password"
                    value={form.passwordConfirm}
                    onChangeText={(text) => handleChange("passwordConfirm", text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.ButtonContainer}>
                <Button
                    title="SIGN UP"
                    onPress={handleSubmit}
                    styleProps={{
                        backColor: "#FFB600",
                        textColor: "#FFF"
                    }}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    allContainer: {
        flex: 1,
        backgroundColor: colors.background
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
        elevation: 2
    },
    inputsContainer: {
        display: "flex"
        , gap: 12,
        paddingHorizontal: 20
    },
    ButtonContainer: {
        paddingBottom: 40,
        gap: 12,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flex: 1,
    }
})