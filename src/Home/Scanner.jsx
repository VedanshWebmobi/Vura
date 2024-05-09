import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import CommonHeader from "../common/CommonHeader";
import stylesCommon from "../Themes/stylesCommon";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import { axiosCallAPI } from "../Api/Axios";
import { COUPON } from "../Api/Utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

import { getValueFor, save } from "../StoreData/Preference";
import { TouchableHighlight } from "react-native-gesture-handler";
import CommonAlert from "../common/CommonAlert";
import CommonHeaderNew from "../common/CommonHeader_new";
import { useFocusEffect } from '@react-navigation/native';
import * as Preference from "../StoreData/Preference";
import CompleteProfileScreen from "../Screens/CompleteProfileScreen";



export default function Scanner({ navigation }) {
  const height = useHeaderHeight();
  const [scannedData, setScannedData] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [profileDetailsComplete, setProfileDetailsComplete] = useState(false);

  const handleCodeScanned = (data) => {
    console.log("Bhai le tera data", data.data);
    //setScannedData(data.data);
    setQrCode(data.data);
    setIsScanning(false);
  };

  const handleBackPress =() =>{
    if(isScanning){
      setIsScanning(false)
    }
    else{
      navigation.goBack()
    }
  }

  useFocusEffect(
    React.useCallback(() => {

        setIsScanning(false);
        setQrCode("");
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
                console.log("Getting Profile false");
                setProfileDetailsComplete(false);
              
              }
            }
            else{
              console.log("StoreDetail is null",storedDetails);
              setProfileDetailsComplete(false);
            }
          } catch (error) {
            console.error("Error retrieving details:", error);
          }
        };
        requestPermission();
        retrieveProfile(); 
      return () => {


      };
    
    }, []));

    useEffect(() =>{
      if(qrCode.length >= 20){
        setIsButtonVisible(true);
      }
      else{
        setIsButtonVisible(false);
      }
    },[qrCode])
  const sendCoupon = async () => {
    var couponFormData = new FormData();

    couponFormData.append("coupon_code", qrCode);

    let requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: await getValueFor(ExpoSecureKey.TOKEN),
      },
    };

    axiosCallAPI(
      "post",
      COUPON,
      couponFormData,
      requestOptions,
      true,
      navigation
    ).then((response) => {
      if (response && response.status) {
        setIconColor("green");
        setTitle("Success");
        setShowAlert(true);
        setErrorMessage(response.message);
        setQrCode("");
        // Dialog.show({
        //   type: ALERT_TYPE.SUCCESS,
        //   title: "Success",
        //   textBody: response.message,
        //   button: "close",
        // });
      } else {
        setIconColor("red");
        setTitle("Error");
        setShowAlert(true);
        setErrorMessage(response[0]);
        // Dialog.show({
        //   type: ALERT_TYPE.DANGER,
        //   title: "Error",
        //   textBody: response.errors[0],
        //   button: "close",
        // });
      }
    });
  };

  if (!permission?.granted) {
    return null;
  }

  const handleScan = () => {
    setIsScanning(true);
  };

  const verifyCoupon = () => {
    if (qrCode) return true;
    return false;
  };

  const handleSubmit = () => {
    if (verifyCoupon()) {
      sendCoupon();
    } else {
      console.log("Yeh yaha pe aarha hai ");
      setIconColor("red");
      setTitle("Error");
      setShowAlert(true);
      setErrorMessage("Enter The Coupon Code");
      // Dialog.show({
      //   type: ALERT_TYPE.DANGER,
      //   title: "Error",
      //   textBody: "Enter The Coupon Code",
      //   button: "close",
      // });
    }
  };

  return (
    
     
      
      <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
         <StatusBar backgroundColor={colors.YELLOW} />
      {
        profileDetailsComplete ? 
        <KeyboardAvoidingView
          style={{ backgroundColor: "#f2f2f2" }}
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          keyboardVerticalOffset={100}
          enabled
        >
          <CommonHeaderNew header_title={"SCAN QR CODE"} header_color={colors.YELLOW} navigation={navigation} onHandleBackPress={handleBackPress}/>
          {/* <CommonHeader navigation={navigation} showBack /> */}
  
          <CommonAlert
            visible={showAlert} // Pass visibility state to the CommonAlert component
            hideModal={() => setShowAlert(false)} // Pass function to hide the modal
            handleOkPress={() => setShowAlert(false)} // Pass function to handle Ok button press
            //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
            title={title} // Pass title text
            iconName="error"
            iconColor={iconColor}
            bodyText={errorMessage} // Pass body text
            // cancelButton={true} // Pass whether Cancel button should be displayed
          />
          <View
            style={{
              marginTop: 50,
              justifyContent: "center",
            }}
          >
            {isScanning ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CameraView
                  style={{
                    height: 300,
                    width: 300,
                  }}
                  barcodeScannerSettings={{ barCodeTypes: ["qr"]}}
                  onBarcodeScanned={handleCodeScanned}
                  onPointerCancel={() => setIsScanning(false)}
                />
              </View>
            ) : (
              <View style={{ alignItems: "center", gap:20 }}>
                <View style={{ gap: 25, alignItems: "center" }}>
                  <Image source={require('../../assets/scan_fram.png')} style={{ height:120, width: 120 }} />
  
                  <TouchableOpacity
                    onPress={handleScan}
                    style={{ backgroundColor: "transparent", borderRadius: 15 }}
                    underlayColor={colors.YELLOW}
                  >
            
                      <Text
                        style={[
                          stylesCommon.homeText,
                          { color: "#000000", fontSize: 15, textDecorationLine:'underline' },
                        ]}
                      >
                        CLICK HERE FOR SCAN
                      </Text>
                    
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                
                  <Text
                    style={{
                      fontFamily: font.GoldPlay_SemiBold,
                      fontSize: 18,
                      color: colors.BLACK,
                    }}
                  >
                    OR
                  </Text>
                 
                </View>
  
                <View
                  style={{
                    gap: 45,
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                 
                  <View
                    style={{
                      width: "100%",
                      gap: 15,
                      alignItems:'center'
                    }}
                  >
                    <Text
                      style={{
                        color: colors.BLACK,
                        fontFamily: font.GoldPlay_Medium,
                        fontSize: 18,
                      }}
                    >
                      Enter Coupon Code
                    </Text>
                    <TextInput
                      style={{
                        height: 50,
                        borderWidth: 1,
                        padding: 10,
                        borderColor: "black",
                        borderRadius: 15,
                        color: "black",
                        fontFamily: font.GoldPlay_SemiBold,
                        width:'90%',
                        textAlign:'center',
                        backgroundColor:'#fff'
                      }}
                      onChangeText={(t) =>{ 
                        if(t.length >= 20){
                          setIsButtonVisible(true);
                        }
                        else{
                          setIsButtonVisible(false);
                        }
                        setQrCode(t)
                      } }
                      value={qrCode}
                      placeholder="GESGR-3134-FEWG"
                      keyboardType="default"
                      placeholderTextColor={colors.GREY}
                    />
                  </View>
                </View>
  
               {
                 isButtonVisible && 
                 <TouchableOpacity
                 onPress={handleSubmit}
                 style={{ backgroundColor: "transparent", borderRadius: 15 }}
               
               >
                 <View
                   style={[
                     stylesCommon.homeTextView,
                     {
                      borderColor:'#f2f2f2',
                       width: 140,
                       height: 40,
                       borderRadius: 15,
                     },
                   ]}
                 >
                   <Text
                     style={[
                       stylesCommon.homeText,
                       { color: "black", fontSize: 15, textDecorationLine:'underline' },
                     ]}
                   >
                     CONFORM
                   </Text>
                 </View>
               </TouchableOpacity>
               }
                 
               
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      :
        
          <CompleteProfileScreen navigation={navigation} statusColor={colors.YELLOW}/>
       } 
     
    </View>

    
  );
}

const styles = StyleSheet.create({});

//  {
//    scannedData ? (
//      <View>
//        {/* Display the scanned data */}
//        <Text>{scannedData}</Text>
//      </View>
//    ) : (
//      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//        {/* <CameraView
//             style={{
//               height: 100,
//               width: 100,
//             }}
//             barcodeScannerSettings={{ barCodeTypes: ["qr"] }}
//             onBarcodeScanned={handleCodeScanned}
//           /> */}
//      </View>
//    );
//  }
