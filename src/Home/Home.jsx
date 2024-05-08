import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import stylesCommon, { SCREEN_WIDTH, SCREEN_HEIGHT } from "../Themes/stylesCommon";
import Header from "../common/Header";
import CommonHeader from "../common/CommonHeader";
import CommonHeaderNew from "../common/CommonHeader_new";
import { SliderBox } from "react-native-image-slider-box";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import { BackHandler } from "react-native";
import * as Preference from "../StoreData/Preference";
import CommonAlert from "../common/CommonAlert";
import { useFocusEffect } from '@react-navigation/native';

export default function Home({ navigation }) {
  const [showMenutoggle, setshowMenutoggle] = useState(false);
  const [profileDetailsComplete, setProfileDetailsComplete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
useFocusEffect(React.useCallback(()=>{
  const retrieveProfile = async () => {
    try {
      const storedDetails = await Preference.getPreference("profile");
      if (storedDetails) {
        const {
          image,
          address,
          aadharCardNo,
          panCardNo,
          accountHolderName,
          accountNumber,
          bankName,
          ifscCode,
        } = storedDetails;
        console.log("Profile details retrieved:", {
          address,
        });

        if (
          image &&
          address &&
          aadharCardNo &&
          panCardNo &&
          accountHolderName &&
          accountNumber &&
          bankName &&
          ifscCode
        ) {
          console.log("Profile is Complete");
          setProfileDetailsComplete(true);
        } else {
          setProfileDetailsComplete(false);
        }
      }
    } catch (error) {
      console.error("Error retrieving details:", error);
    }
  };
  const showMenu = async () => {
    const token = await Preference.getValueFor(ExpoSecureKey.TOKEN);
    if (token) {
      console.log("Bhai token aaya");
      setshowMenutoggle(true);
    } else {
      console.log("Idhar bhi");
      setshowMenutoggle(false);
    }
  };
  retrieveProfile();
  showMenu();
},[navigation]))
 

  const handleWalletPress = () => {
    console.log("Handle wallet pressed");
    if (!profileDetailsComplete) {
      navigation.navigate("CompleteProfile");
     // setShowAlert(true);
     // setErrorMessage("Please Complete Your Profile!");
    } else {
      navigation.navigate("Wallet");
    }
  };

  const handleScanQRCodePress = () => {
    if (!profileDetailsComplete) {
      setShowAlert(true);
      setErrorMessage(`Please Complete Your Profile!`);
    } else {
      navigation.navigate("Scanner");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <StatusBar backgroundColor={colors.YELLOW} />
      {/* <CommonHeader
        screen={"Home"}
        navigation={navigation}
        showMenu={showMenutoggle}
      /> */}
    <CommonHeaderNew 
    navigation={navigation} 
    showBack={!showMenutoggle} 
    header_color={colors.YELLOW} 
    onWalletPress={handleWalletPress}/>
      <CommonAlert
        visible={showAlert} // Pass visibility state to the CommonAlert component
        hideModal={() => setShowAlert(false)} // Pass function to hide the modal
        handleOkPress={() => setShowAlert(false)} // Pass function to handle Ok button press
        //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
        title="Error" // Pass title text
        iconName="error"
        bodyText={errorMessage} // Pass body text
        // cancelButton={true} // Pass whether Cancel button should be displayed
      />

      <SliderBox
        images={images}
        sliderBoxHeight={SCREEN_HEIGHT-180}
        activeOpacity={0.5}
        autoplay={true}
        circleLoop={true}
        autoplayInterval={4000}
      />

      {/* <View style={{ flex: 1, margin: 20 }}>
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
            <TouchableOpacity onPress={handleScanQRCodePress}>
              <View style={stylesCommon.homeTextView}>
                <Text style={stylesCommon.homeText}>SCAN QR CODE</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={stylesCommon.homeItemView}>
            <Image source={icon.WALLET} style={stylesCommon.homeImage} />
            <TouchableOpacity onPress={handleWalletPress}>
              <View style={stylesCommon.homeTextView}>
                <Text style={stylesCommon.homeText}>WALLET</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({});
