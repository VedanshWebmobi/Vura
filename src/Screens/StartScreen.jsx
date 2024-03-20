import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { colors, font, icon } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { SCREEN_HEIGHT } from "../Themes/stylesCommon";

export default function StartScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("PreLogin");
  }, 2000);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#000000", alignItems: "center" }}
    >
      <StatusBar backgroundColor={"black"} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: 20,
        }}
      >
        <Text
          style={{
            fontFamily: font.GoldPlay_Regular,
            color: "#ffffff",
            fontSize: 18,
          }}
        >
          {"    Welcome To \nBright Beginning!"}
        </Text>
        <Text
          style={{
            fontFamily: font.GoldPlay_SemiBold,
            color: "#ffdd00",
            fontSize: 18,
          }}
        >
          Welcome to Vura!
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <Image
          source={icon.SUNFLOWER}
          style={{
            resizeMode: "contain",
            height: SCREEN_HEIGHT / 1.5,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
