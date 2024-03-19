import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import stylesCommon, { SCREEN_WIDTH } from "../Themes/stylesCommon";
import Header from "../common/Header";
import CommonHeader from "../common/CommonHeader";
import { SliderBox } from "react-native-image-slider-box";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import { BackHandler } from "react-native";
import * as Preference from "../StoreData/Preference";

export default function Home({ navigation }) {
  const [showMenutoggle, setshowMenutoggle] = useState(false);

  const images = [
    icon.IMAGE1,
    icon.IMAGE2,
    icon.IMAGE3,
    icon.IMAGE4,
    icon.IMAGE5,
    icon.IMAGE6,
  ];

  useEffect(() => {
    const backHandlerSubscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonClick
    );

    return () => backHandlerSubscription.remove();
  }, []);

  function handleBackButtonClick() {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  }

  useEffect(() => {
    const showMenu = async () => {
      const token = await Preference.getValueFor(ExpoSecureKey.TOKEN);
      if (token) {
        console.log("Bhai token false gaya");
        setshowMenutoggle(true);
      } else {
        console.log("Idhar bhi");
        setshowMenutoggle(false);
      }
    };

    showMenu();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <CommonHeader
        screen={"Home"}
        navigation={navigation}
        showMenu={showMenutoggle}
      />

      <SliderBox
        images={images}
        sliderBoxHeight={300}
        activeOpacity={0.5}
        autoplay={true}
        circleLoop={true}
        autoplayInterval={4000}
      />

      <View style={{ flex: 1, margin: 20 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={stylesCommon.homeItemView}>
            <Image source={icon.PRODUCT} style={stylesCommon.homeImage} />
            <TouchableOpacity onPress={() => navigation.navigate("Product")}>
              <View style={stylesCommon.homeTextView}>
                <Text style={stylesCommon.homeText}>PRODUCTS</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={stylesCommon.homeItemView}>
            <Image source={icon.CASHBACK} style={stylesCommon.homeImage} />
            <TouchableOpacity onPress={() => navigation.navigate("CashBack")}>
              <View style={stylesCommon.homeTextView}>
                <Text style={stylesCommon.homeText}>CASH BACK CHART</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={stylesCommon.homeItemView}>
            <Image source={icon.OFFERS} style={stylesCommon.homeImage} />
            <TouchableOpacity onPress={() => navigation.navigate("Offers")}>
              <View style={stylesCommon.homeTextView}>
                <Text style={stylesCommon.homeText}>OFFERS</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            // backgroundColor: "blue",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <View style={stylesCommon.homeItemView}>
            <Image source={icon.SCAN} style={stylesCommon.homeImage} />
            <TouchableOpacity onPress={() => navigation.navigate("Scanner")}>
              <View style={stylesCommon.homeTextView}>
                <Text style={stylesCommon.homeText}>SCAN QR CODE</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={stylesCommon.homeItemView}>
            <Image source={icon.WALLET} style={stylesCommon.homeImage} />
            <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
              <View style={stylesCommon.homeTextView}>
                <Text style={stylesCommon.homeText}>WALLET</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
