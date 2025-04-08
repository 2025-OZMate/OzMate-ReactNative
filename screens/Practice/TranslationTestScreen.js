import { View, Text } from "react-native"
import PrevBtn from "../../components/common/PrevBtn"
import { colors } from "../../styles/colors"
export default function TranslationTestScreen() {
    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <PrevBtn />
            <Text>번역하기 화면</Text>
        </View>
    )
}