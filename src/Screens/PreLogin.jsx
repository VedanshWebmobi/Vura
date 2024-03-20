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

export default function PreLogin({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);

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
  const handleLogin = (buttonName) => {
    navigation.navigate("Category");
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
        <TouchableOpacity onPress={() => navigation.navigate("Product")}>
          <View style={stylesCommon.preLoginButtonStyle}>
            <Text style={stylesCommon.preButtonLabelStyle}>PRODUCTS</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={stylesCommon.preLoginContainerView}>
        <Image source={icon.CASHBACK} style={{}}></Image>
        <TouchableOpacity onPress={() => navigation.navigate("CashBack")}>
          <View style={[stylesCommon.preLoginButtonStyle]}>
            <Text style={stylesCommon.preButtonLabelStyle}>CASH BACK</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={stylesCommon.preLoginContainerView}>
        <Image source={icon.OFFERS}></Image>
        <TouchableOpacity onPress={() => navigation.navigate("Offers")}>
          <View style={stylesCommon.preLoginButtonStyle}>
            <Text style={stylesCommon.preButtonLabelStyle}>OFFERS</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={stylesCommon.preLoginContainerView}>
        <TouchableOpacity onPress={() => handleLogin()}>
          <View style={[stylesCommon.preLoginButtonStyle]}>
            <Text style={stylesCommon.preButtonLabelStyle}>
              GO TO LOGIN PAGE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
