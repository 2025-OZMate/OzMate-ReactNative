import { View, Text } from "react-native"
import PrevBtn from "../../components/common/PrevBtn"
import { colors } from "../../styles/colors"
export default function SelectTestScreen() {
    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <PrevBtn />
            <Text>select test page</Text>
        </View>
    )
}