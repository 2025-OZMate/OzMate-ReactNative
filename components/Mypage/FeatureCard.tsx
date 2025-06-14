import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

//화면
type RootStackParamList = {
  BookMarkScreen: undefined;
  LanguageScreen: undefined;
  FeedBack: undefined;
  Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
interface FeatureCardProps {
  title: string;
  imgSrc: string;
}

export default function FeatureCard({ title, imgSrc }: FeatureCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handleClick = () => {
    if (title === "BookmarkList") {
      navigation.navigate("BookMarkScreen");
    }
    if (title === "Send Feedback") {
      navigation.navigate("FeedBack");
    } else if (title === "Log Out") {
      setShowLogoutPopup(true);
    }
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  //로그아웃
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("userId");
      setShowLogoutPopup(false); //닫음
      console.log("로그아웃됨");
      navigation.navigate("Login");
    } catch (e) {
      console.error("오류 발생", e);
    }
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity style={styles.cardContainer} onPress={handleClick}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
          }}
        >
          <Image source={imgSrc} style={{ width: 20, height: 22 }} />
          <Text
            style={[styles.cardTitle, title === "Log Out" && { color: "red" }]}
          >
            {title}
          </Text>
        </View>

        {title !== "Log Out" && (
          <Image
            source={require("../../assets/images/next.png")}
            style={styles.icon}
          />
        )}
      </TouchableOpacity>

      {/* 로그아웃 팝업 */}
      <Modal transparent={true} visible={showLogoutPopup} animationType="fade">
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <View style={{ paddingHorizontal: 47, paddingVertical: 25 }}>
              <Text style={[styles.popupText1, styles.font]}>
                Do you want to log out?
              </Text>
              <Text style={[styles.popupText2, styles.font]}>
                You’ll need to log in again.
              </Text>
            </View>
            <View
              style={{ height: 0.5, width: 293, backgroundColor: "#777" }}
            ></View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={cancelLogout}
                style={{ paddingHorizontal: 42 }}
              >
                <Text style={styles.option}>Cancel</Text>
              </TouchableOpacity>

              <View
                style={{ height: 44, width: 0.5, backgroundColor: "#777" }}
              ></View>
              <TouchableOpacity
                onPress={handleLogout}
                style={{ paddingHorizontal: 55 }}
              >
                <Text style={styles.option}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  cardContainer: {
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    width: 120,
    fontFamily: "Pretendard-Bold",
    fontSize: 14,
    fontWeight: "500",
  },
  font: {
    fontFamily: "Pretendard-Bold",
  },
  option: {
    fontFamily: "Pretendard-Bold",
    color: "#1271ED",
    fontSize: 17,
    paddingTop: 11,
    fontWeight: "600",
  },
  icon: {
    width: 20,
    height: 20,
  },
  popupContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.28)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#FFF",
    borderRadius: 14,
  },
  popupText1: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 5,
  },
  popupText2: {
    textAlign: "center",
    fontSize: 13,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  cancelBtn: {
    fontSize: 30,
    color: "black",
  },
});
