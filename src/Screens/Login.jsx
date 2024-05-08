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
  Dimensions,
  Keyboard
} from "react-native";
import React, { useEffect, useState } from "react";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import stylesCommon, { SCREEN_HEIGHT } from "../Themes/stylesCommon";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { OtpInput } from "react-native-otp-entry";
import * as Preference from "../StoreData/Preference";
import PhoneInput from "react-native-international-phone-number";

import axios from "axios";

import { GET_PROFILE, LOGIN, VERIFY_OTP } from "../Api/Utils";
import { StackActions } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { useHeaderHeight } from "@react-navigation/elements";
import { axiosCallAPI } from "../Api/Axios";
import CommonAlert from "../common/CommonAlert";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const height = useHeaderHeight();
  const SCREEN_DIMENSIONS = Dimensions.get('window');
  const [number, setNumber] = useState("");
  const [showotp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [isValidNumber, setIsValidNumber] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);

useEffect(() =>{
  const unsubscribe = navigation.addListener('focus', () => {
    console.log("Phone Number",number);
  

});

// Return the function to unsubscribe from the event so it gets removed on unmount
return unsubscribe;
},[])
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      // Check if navigation can go back
      navigation.dispatch(NavigationActions.back()); // Go back if possible
      return true; // Prevent default back button behavior
    }
  };

  const handleGenerate = (buttonName) => {
    if (validateNumber()) {
      Keyboard.dismiss();
      sendOTP(buttonName);
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
      setIconColor("red");
      setAlertTitle("Error");
      setAlertMessage("Enter a Valid OTP");
      setShowAlert(true);
      return false;
    } else {
      return true;
    }
  }
  const validateNumber = () => {
    const p_number = number.replace(" ",'');
    console.log(number)
    if (p_number.length != 10) {
      setIconColor("red");
      setAlertTitle("Error");
      setAlertMessage("Enter a Valid Number");
      setShowAlert(true);
      return false;
    }
    return true;
  };

  const sendOTP = (button) => {
    let loginFormData = new FormData();

    loginFormData.append("mobileNo", number.replace(" ",""));
    let requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axiosCallAPI("post", LOGIN, loginFormData, requestOptions, true, navigation)
      .then((response) => {
        // console.log("Response from server:", response);
        if (response && response.status) {
          setIconColor("green");
          setShowAlert(true);
          setAlertTitle("Success");
          setAlertMessage(response.message);
         // setShowOtp(true);
        } else {
          setIconColor("red");
          setShowAlert(true);
          setAlertTitle("Error");
          setAlertMessage(response.error[0]);
         // setShowOtp(true);
          console.error("Invalid response data:", response);
        }
      })
      .catch((error) => {
        console.error("Error in login request:", error);
      });
  };

  const verifyOTP_API = () => {
    if (validateNumber() && ValidationOTP()) {
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
            setIconColor("red");
            setShowAlert(true);
            setAlertTitle("Error");
            setAlertMessage(response);
            setShowOtp(true);
          }
        })
        .catch((error) => {
          setIconColor("red");
          setShowAlert(true);
          setAlertTitle("Error");
          setAlertMessage(error);
          setShowOtp(true);
        });
    }
  };

  const getProfile = async () => {
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

      //  console.log("Bhai yeh method mai yeh mil raha", response);
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
  function handleSelectedCountry(country) {
    setSelectedCountry(country);
    console.log(country.callingCode);
  }

  function handleInputValue(phoneNumber){
    const tempNumber = phoneNumber.replace(" ","");
    if(tempNumber.length == 10){
      setIsValidNumber(true);
    }
    else{
      setIsValidNumber(false);
    }
    setNumber(phoneNumber);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.BLACK }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      //keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -60}
      //keyboardVerticalOffset={}
    >
      <SafeAreaView style={{ flex: 1,  }}>
        <StatusBar backgroundColor={colors.BLACK} />

        <CommonAlert
          visible={showAlert} // Pass visibility state to the CommonAlert component
          hideModal={() => {
            setShowAlert(false)
            navigation.navigate("OTPScreen",{f_phone : number, n_phone:number.replace(" ",""), code:selectedCountry.callingCode});  
          }} // Pass function to hide the modal
          handleOkPress={() =>{
         
            setShowAlert(false)
            navigation.navigate("OTPScreen",{f_phone : number, n_phone:number.replace(" ",""), code:selectedCountry.callingCode});  
          } } // Pass function to handle Ok button press
          //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
          title={alertTitle} // Pass title text
          iconColor={iconColor}
          bodyText={alertMessage} // Pass body text
          // cancelButton={true} // Pass whether Cancel button should be displayed
        />

        <View style={{marginStart:16, marginEnd:16}}>
        {
          !showotp ? 
       
        <View>
        <View style={{height:(SCREEN_DIMENSIONS.height/5), alignItems:'center', justifyContent:'center', alignContent:'center',}}>
           <Text style={{width:40, height:10, backgroundColor:colors.YELLOW,borderRadius:2}}/>
        </View>
          <View style={[stylesCommon.logoViewStyle]}>
         
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text style={[stylesCommon.welcomeText,{color:"#fff"}]}>
                {"LOGIN WITH MOBILE NUMBER"}
              </Text>
              <Text style={[stylesCommon.welcomeText,{color:"#fff", fontSize:14, textAlign:"center",padding:10, fontFamily:font.GoldPlay_Medium}]}>
                {"We Will Send You An One-Time-Password(OTP) To Your Mobile Number"}
              </Text>
           <View     style={{
               width:SCREEN_DIMENSIONS.width-50,
               marginTop:60
              }}>
              <PhoneInput
      phoneInputStyles={{
        flag:{fontSize:15},
        caret:{fontSize:10},
        callingCode:{fontSize:15},
        flagContainer:{
         backgroundColor: 'rgba(52, 52, 52, 0)',
         
        },
        container:{
          height:60,
          borderRadius:10,
          backgroundColor:'#fff'
        }
      }}
        placeholder={"00000 00000"}
        customMask={['##### #####']}
        defaultCountry="IN"
        value={number}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
      />
      </View> 
          <Text style={{color:'#fff', fontFamily:font.GoldPlay_Regular,fontSize:12, marginTop:10}}>By Clicking Send OTP You Will Agree To Our <Text style={{color:'#fff', fontFamily:font.GoldPlay_SemiBold}}>Terms & Conditions</Text></Text>  
              <View style={{ marginTop: 60, alignItems: "center" }}>
            <TouchableHighlight
              onPress={() => handleGenerate("Generate")}
              underlayColor={"black"}
              style={{ borderRadius: 15 }}
            >
              <View
                // style={[stylesCommon.preLoginButtonStyle, { width: 150 }]}
              
              >
                <Text style={[stylesCommon.preButtonLabelStyle,{textDecorationLine:'underline',color:isValidNumber? colors.YELLOW : "#666666" }]}>
                  GENERATE OTP
                </Text>
              </View>
            </TouchableHighlight>

            {/* <TouchableHighlight
              onPress={() => handleGenerate("OTP")}
              underlayColor={"black"}
              style={{ borderRadius: 15, marginTop: 20 }}
            >
              <View
                style={[
                  stylesCommon.preLoginButtonStyle,
                  { width: 150, backgroundColor: "transparent" },
                ]}
              >
                <Text style={stylesCommon.preButtonLabelStyle}>RESEND</Text>
              </View>
            </TouchableHighlight> */}
          </View>
            </View>
          </View>
          <Ionicons name="arrow-back" size={24} color="white" style={{position:'absolute',marginTop:20}} onPress={()=>{console.log(navigation.goBack())}} /> 
          </View>       
          :

          <View
          style={{
          }}
        >
      
            <View style={{height:(SCREEN_DIMENSIONS.height/5),width:SCREEN_DIMENSIONS.width,  alignItems:'center', justifyContent:'center', alignContent:'center',}}>
           
        <Text style={{width:40, height:10, backgroundColor:colors.YELLOW,borderRadius:2}}/>
        </View>
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
            <TouchableHighlight
              onPress={() => verifyOTP()}
              underlayColor={"black"}
              style={{ borderRadius: 15, marginTop: 20 }}
            >
              <View
                style={[
                  stylesCommon.preLoginButtonStyle,
                  { backgroundColor: "transparent", width: 150 },
                ]}
              >
                <Text style={stylesCommon.preButtonLabelStyle}>
                  CONFIRM
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      } 
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
