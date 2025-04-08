import { Image, View, StyleSheet } from "react-native";
import Logo from "../../assets/images/logo.png"
export default function LogoMain() {
    return (
        <View style={{ margin: "auto", paddingTop: "175", paddingBottom: "80" }}>
            <Image source={Logo} style={styles.Logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    Logo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 184,
        height: 45
    }
})