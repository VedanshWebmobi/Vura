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

  const handleCodeScanned = (data) => {
    console.log("Bhai le tera data", data.data);
    //setScannedData(data.data);
    setQrCode(data.data);
    setIsScanning(false);
  };

  useEffect(() => {
    requestPermission();
  }, []);

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
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <KeyboardAvoidingView
        style={{ backgroundColor: "black" }}
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        keyboardVerticalOffset={100}
        enabled
      >
        <CommonHeader navigation={navigation} showBack />

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
                barcodeScannerSettings={{ barCodeTypes: ["qr"] }}
                onBarcodeScanned={handleCodeScanned}
                onPointerCancel={() => setIsScanning(false)}
              />
            </View>
          ) : (
            <View style={{ alignItems: "center", gap: 40 }}>
              <View style={{ gap: 25, alignItems: "center" }}>
                <Image source={icon.SCAN} style={{ height: 80, width: 80 }} />

                <TouchableHighlight
                  onPress={handleScan}
                  style={{ backgroundColor: "transparent", borderRadius: 15 }}
                  underlayColor={colors.YELLOW}
                >
                  <View
                    style={[
                      stylesCommon.homeTextView,
                      {
                        borderColor: "white",
                        width: 140,
                        height: 40,
                        borderRadius: 15,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        stylesCommon.homeText,
                        { color: "white", fontSize: 15 },
                      ]}
                    >
                      SCAN QR CODE
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{ backgroundColor: colors.GREY, height: 1, width: 50 }}
                ></View>
                <Text
                  style={{
                    fontFamily: font.GoldPlay_SemiBold,
                    fontSize: 18,
                    color: colors.GREY,
                  }}
                >
                  OR
                </Text>
                <View
                  style={{ backgroundColor: colors.GREY, height: 1, width: 50 }}
                ></View>
              </View>

              <View
                style={{
                  gap: 45,
                  alignItems: "center",
                  width: "90%",
                }}
              >
                <Image
                  source={icon.CASHBACK}
                  style={{ height: 80, width: 80 }}
                ></Image>
                <View
                  style={{
                    width: "100%",
                    gap: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: font.GoldPlay_SemiBold,
                      fontSize: 18,
                    }}
                  >
                    Enter Coupon Code
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: "white",
                      borderRadius: 15,
                      color: "white",
                      fontFamily: font.GoldPlay_SemiBold,
                    }}
                    onChangeText={(t) => setQrCode(t)}
                    value={qrCode}
                    placeholder="GESGR-3134-FEWG"
                    keyboardType="default"
                    placeholderTextColor={colors.GREY}
                  />
                </View>
              </View>

              <View>
                <TouchableHighlight
                  onPress={handleSubmit}
                  style={{ backgroundColor: "transparent", borderRadius: 15 }}
                  underlayColor={colors.YELLOW}
                >
                  <View
                    style={[
                      stylesCommon.homeTextView,
                      {
                        borderColor: "white",
                        width: 140,
                        height: 40,
                        borderRadius: 15,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        stylesCommon.homeText,
                        { color: "white", fontSize: 15 },
                      ]}
                    >
                      SUBMIT
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
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
