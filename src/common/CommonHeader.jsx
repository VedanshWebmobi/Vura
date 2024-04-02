import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { colors, icon } from "../constants";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";

export default function CommonHeader({
  screen,
  navigation,
  showMenu,
  showBack,
}) {
  const handleMenu = () => {
    navigation.navigate("CustomDrawer");
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: colors.YELLOW }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 20,
          marginEnd: 30,
          marginTop: 20,
        }}
      >
        <View style={{ marginStart: 20 }}>
          <Image
            source={icon.BLACK_ICON}
            style={{
              height: SCREEN_HEIGHT / 20,
              width: SCREEN_WIDTH / 4,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ justifyContent: "center" }}>
          {showMenu ? (
            <TouchableHighlight
              onPress={handleMenu}
              underlayColor={"transparent"}
            >
              <Image source={icon.MENU} style={{ height: 25, width: 25 }} />
            </TouchableHighlight>
          ) : showBack ? (
            <TouchableHighlight
              onPress={handleGoBack}
              style={{ borderRadius: 10 }}
              underlayColor={"black"}
            >
              <View
                style={{
                  width: 80,
                  paddingVertical: 5,
                  backgroundColor: "transparent",
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={[
                    stylesCommon.preButtonLabelStyle,
                    { textAlign: "center" },
                  ]}
                >
                  GO BACK
                </Text>
              </View>
            </TouchableHighlight>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
