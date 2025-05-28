import React from "react";
import { View, TextInput, Dimensions, Text, StyleSheet, Image, TouchableOpacity, TextInputComponent } from "react-native";
import { useState } from "react";
import axios from "axios";
import AnswerVivian from "../../components/common/AnswerVivian";
import ButtonComponent from "../../components/common/Button";
import { useNavigation } from "@react-navigation/native";


export default function FeedBack() {
    const navigation = useNavigation()
    const [showPopup, setShowPopup] = useState(false)
    const [form, setForm] = useState({
        title: '',
        content: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post('', form)
            console.log('피드백 저장 성공: ', res)
            setShowPopup(true)
        } catch (err) {
            console.error(err)
        }
    }

    function FinishPopUp() {
        return (
            <View style={styles.popupContainer}>
                <View style={styles.popupCard}>
                    <Text style={{ textAlign: "center" }}>Thank you for your valuable opinion. We will reflect it
                        to provide better service!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}
                        style={styles.okBtn}
                    ><Text style={styles.ok}>Ok</Text></TouchableOpacity>
                </View>
            </View>
        )
    }

    function Prev() {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image source={require('../../assets/images/prev.png')}
                    style={{ width: 38, height: 38, marginLeft: 15 }} />
                <Text>Send FeedBack</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View>
            <Prev />

            <AnswerVivian
                user="OzMate"
                text="We look forward to your feedback to help us 
                    make the app better! Feel free to leave 
                    suggestions for new features or ideas for improve
                    ments."
            />

            <View>
                <Text>Title</Text>
                <TextInput
                    value={form.title}
                    onChangeText={handleChange}
                    placeholder="Please enter a title!"></TextInput>

                <Text>Detail</Text>
                <TextInput
                    value={form.content}
                    onChangeText={handleChange}
                    placeholder="Please enter details!"></TextInput>
            </View>

            <ButtonComponent title="Send" onPress={handleSubmit} />
            {showPopup && <FinishPopUp />}
        </View>
    )
}
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    popupContainer: {
        position: "absolute", top: 0, left: 0, width: "100%",
        bottom: 0, backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center", height: height
    },
    ok: { fontSize: 20, fontWeight: "600", textAlign: "center", color: "#FFF" },
    okBtn: {
        backgroundColor: "#FFC32E", width: 200, paddingVertical: 7, borderRadius: 10, marginTop: 15
    },
    popupCard: {
        width: 289, borderRadius: 14, backgroundColor: "#FFF",
        paddingHorizontal: 44, paddingVertical: 25, shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5
    }
})