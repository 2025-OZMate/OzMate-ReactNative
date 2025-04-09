import { Image, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PrevBtnImg from "../../assets/images/prev.png"

export default function PrevBtn() {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.goBack();
    }
    return (
        <TouchableOpacity onPress={handlePress} style={{ marginTop: 54, marginLeft: 20 }}>
            <Image source={PrevBtnImg}
                style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
    )
}