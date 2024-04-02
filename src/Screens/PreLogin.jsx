import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, font, icon } from "../constants";
import { Button } from "react-native-paper";
import stylesCommon from "../Themes/stylesCommon";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function PreLogin({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [buttonState, setButtonState] = useState({
    Products: false,
    CashBack: false,
    Offers: false,
    Login: false,
  });

  useEffect(() => {
    if (navigation.routeName === "PreLogin") {
      // Check for routeName
      const backHandlerSubscription = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => backHandlerSubscription.remove();
    }
  }, [navigation]); //

  function handleBackPress() {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  }
  const handleOnPress = (buttonName) => {
    setButtonState({
      ...buttonState,
      [buttonName]: true,
    });
    if (buttonName === "Login") {
      // setButtonPressed(true);
      setTimeout(() => {
        navigation.navigate("Category");
        setButtonState({
          Products: false,
          CashBack: false,
          Offers: false,
          Login: false,
        });
      }, 200);
    }
    if (buttonName === "Offers") {
      navigation.navigate("Offers");
    }

    if (buttonName === "CashBack") {
      navigation.navigate("CashBack");
    }

    if (buttonName === "Products") {
      navigation.navigate("Product");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
      }}
    >
      <StatusBar backgroundColor={"black"} />
      <View style={stylesCommon.preLoginContainerView}>
        <Image source={icon.PRODUCT}></Image>
        <TouchableHighlight
          onPress={() => handleOnPress("Products")}
          underlayColor={colors.YELLOW}
          style={{ borderRadius: 15 }}
        >
          <View
            style={[
              stylesCommon.preLoginButtonStyle,
              { backgroundColor: "transparent" },
            ]}
          >
            <Text style={stylesCommon.preButtonLabelStyle}>PRODUCTS</Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={stylesCommon.preLoginContainerView}>
        <Image source={icon.CASHBACK} style={{}}></Image>
        <TouchableHighlight
          onPress={() => handleOnPress("CashBack")}
          underlayColor={colors.YELLOW}
          style={{ borderRadius: 15 }}
        >
          <View
            style={[
              stylesCommon.preLoginButtonStyle,
              { backgroundColor: "transparent" },
            ]}
          >
            <Text style={stylesCommon.preButtonLabelStyle}>CASH BACK</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={stylesCommon.preLoginContainerView}>
        <Image source={icon.OFFERS}></Image>
        <TouchableHighlight
          onPress={() => handleOnPress("Offers")}
          underlayColor={colors.YELLOW}
          style={{ borderRadius: 15 }}
        >
          <View
            style={[
              stylesCommon.preLoginButtonStyle,
              { backgroundColor: "transparent" },
            ]}
          >
            <Text style={stylesCommon.preButtonLabelStyle}>OFFERS</Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={stylesCommon.preLoginContainerView}>
        <TouchableHighlight
          onPress={() => handleOnPress("Login")}
          underlayColor={colors.YELLOW}
          style={{ borderRadius: 15 }}
        >
          <View
            style={[
              stylesCommon.preLoginButtonStyle,
              { backgroundColor: "transparent" },
            ]}
          >
            <Text style={stylesCommon.preButtonLabelStyle}>
              GO TO LOGIN PAGE
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}
