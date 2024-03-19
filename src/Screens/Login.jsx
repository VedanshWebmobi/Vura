import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Platform,
  ScrollView,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import stylesCommon from "../Themes/stylesCommon";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { OtpInput } from "react-native-otp-entry";
import * as Preference from "../StoreData/Preference";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import axios from "axios";
import { axiosCallAPI } from "../Api/Axios";
import { GET_PROFILE, LOGIN, VERIFY_OTP } from "../Api/Utils";
import { StackActions } from "@react-navigation/native";
import * as Progress from "react-native-progress";

export default function Login({ navigation }) {
  const [number, setNumber] = useState("");
  const [showotp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = (clickType) => {
    if (validateNumber()) {
      sendOTP(clickType);
    }
  };

  function verifyOTP() {
    if (ValidationOTP()) {
      Preference.clearPreferences();
      verifyOTP_API();
    }
  }

  function ValidationOTP() {
    if (otp == "" || otp == undefined || otp.length < 6) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "ERROR",
        textBody: "Enter the Valid OTP",
        button: "close",
      });
      return false;
    } else {
      return true;
    }
  }
  const validateNumber = () => {
    if (number.length != 10) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Enter a Valid Mobile Number!",
        button: "close",
      });
      return false;
    }
    return true;
  };

  const sendOTP = (clickType) => {
    let loginFormData = new FormData();

    loginFormData.append("mobileNo", number);
    let requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axiosCallAPI("post", LOGIN, loginFormData, requestOptions, true, navigation)
      .then((response) => {
        console.log("Response from server:", response);
        if (response && response.status) {
          setShowOtp(true);
          console.log("Response if success");
        } else {
          console.error("Invalid response data:", response);
        }
      })
      .catch((error) => {
        console.error("Error in login request:", error);
      });
  };

  const verifyOTP_API = () => {
    var loginFormData = new FormData();
    loginFormData.append("mobileNo", number);
    loginFormData.append("otp", otp);

    let requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axiosCallAPI(
      "post",
      VERIFY_OTP,
      loginFormData,
      requestOptions,
      false,
      navigation
    )
      .then((response) => {
        console.log("yeh res hai", response);

        if (response && response.status) {
          Preference.save(ExpoSecureKey.IS_LOGIN, true);
          Preference.save(
            ExpoSecureKey.TOKEN,
            "Bearer " + response.data.access_token
          );
          if (response.data.is_registered === "no") {
            Preference.save(ExpoSecureKey.IS_REGISTER, "false");

            navigation.dispatch(StackActions.replace("AddPhoto"));
          } else {
            Preference.save(ExpoSecureKey.IS_REGISTER, "true");
            getProfile();
            //  navigation.dispatch(StackActions.replace("Home"));
          }
        } else {
          console.log("idhar bhi aaraha hai ");
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: "Invalid OTP. Please enter the correct OTP.",
            button: "close",
          });
        }
      })
      .catch((error) => {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "Invalid OTP. Please enter the correct OTP.",
          button: "close",
        });
      });
  };

  const getProfile = async () => {
    console.log("====================================");
    console.log("GEt api called in login");
    console.log("====================================");
    setIsLoading(true);
    try {
      const requestOptions = {
        headers: {
          Accept: "application/json",
          Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
        },
      };

      const response = await axiosCallAPI(
        "get",
        GET_PROFILE,
        "",
        requestOptions,
        true,
        navigation
      );

      console.log("Bhai yeh method mai yeh mil raha", response);
      //  Extract relevant data from the API response
      const {
        name,
        mobileNo,
        address,
        state,
        city,
        aadharCardNo,
        panCardNo,
        accountHolderName,
        accountNumber,
        bankName,
        ifscCode,
        image,
      } = response;

      // Check for "null" and "undefined" strings and treat them as empty strings
      const formattedName = name === "null" ? "" : name;
      const formattedMobileNo = mobileNo === "null" ? "" : mobileNo;
      const formattedAddress = address === "null" ? "" : address;
      const formattedState = state === "null" ? "" : state;
      const formattedCity = city === "null" ? "" : city;
      const formattedAadharCardNo = aadharCardNo === "null" ? "" : aadharCardNo;
      const formattedPanCardNo = panCardNo === "null" ? "" : panCardNo;
      const formattedAccountHolderName =
        accountHolderName === "null" ? "" : accountHolderName;
      const formattedAccountNumber =
        accountNumber === "null" ? "" : accountNumber;
      const formattedBankName = bankName === "null" ? "" : bankName;
      const formattedIfscCode = ifscCode === "null" ? "" : ifscCode;
      const formattedImage = image || "";

      console.log("....", formattedImage);
      // Store non-setive profile data in AsyncStorage
      await Preference.storePreference("profile", {
        name: formattedName,
        image: formattedImage,
        mobileNo: formattedMobileNo,
        address: formattedAddress,
        state: formattedState,
        city: formattedCity,
        aadharCardNo: formattedAadharCardNo,
        panCardNo: formattedPanCardNo,
        accountHolderName: formattedAccountHolderName,
        accountNumber: formattedAccountNumber,
        bankName: formattedBankName,
        ifscCode: formattedIfscCode,
      });
    } catch (error) {
      console.error("Error fetching or storing profile data:", error);
    } finally {
      navigation.dispatch(StackActions.replace("Home"));
      setIsLoading(false);
      // Hide loader after fetching data
    }
  };

  return (
    <SafeAreaView style={stylesCommon.MainContainer}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.YELLOW }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -20}
        enabled
      >
        <View style={stylesCommon.yellowbg}>
          <View
            style={[stylesCommon.logoViewStyle, { justifyContent: "center" }]}
          >
            <Image source={icon.BLACK_ICON} style={stylesCommon.logoStyle} />
          </View>
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={stylesCommon.welcomeText}>
                {"LOGIN WITH MOBILE NUMBER"}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TextInput
                value={number}
                mode="outlined"
                outlineStyle={{
                  borderColor: "white",
                  backgroundColor: "transparent",
                  borderRadius: 20,
                }}
                inputMode="numeric"
                style={{
                  margin: 20,
                  width: "75%",
                }}
                placeholder="Enter your Number"
                contentStyle={{
                  fontFamily: font.GoldPlay_Medium,
                  marginLeft: 10,
                  fontSize: 20,
                }}
                onChangeText={(text) => setNumber(text)}
                maxLength={10}
                cursorColor="white"
              />
            </View>

            <View style={{ gap: 20, alignItems: "center" }}>
              <TouchableOpacity onPress={() => handleGenerate("Generate")}>
                <View
                  style={[stylesCommon.preLoginButtonStyle, { width: 150 }]}
                >
                  <Text style={stylesCommon.preButtonLabelStyle}>
                    GENERATE OTP
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleGenerate("OTP")}>
                <View
                  style={[stylesCommon.preLoginButtonStyle, { width: 150 }]}
                >
                  <Text style={stylesCommon.preButtonLabelStyle}>RESEND</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {showotp ? (
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                marginBottom: 60,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={stylesCommon.welcomeText}>
                  INSERT YOUR OTP HERE
                </Text>
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <OtpInput
                  numberOfDigits={6}
                  onTextChange={(text) => setOtp(text)}
                  secureTextEntry
                  theme={{
                    containerStyle: {
                      marginHorizontal: 35,
                      marginVertical: 25,
                    },
                    inputsContainerStyle: { width: 100 },
                    pinCodeContainerStyle: {
                      height: 40,
                      width: 40,
                      borderRadius: 10,
                      borderColor: "white",
                    },
                    focusedPinCodeContainerStyle: {
                      borderColor: colors.BLACK,
                    },
                    focusStickStyle: { backgroundColor: colors.BLACK },
                  }}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={() => verifyOTP()}>
                  <View
                    style={[stylesCommon.preLoginButtonStyle, { width: 150 }]}
                  >
                    <Text style={stylesCommon.preButtonLabelStyle}>
                      CONFIRM
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
