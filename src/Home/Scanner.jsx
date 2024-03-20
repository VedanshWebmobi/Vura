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
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { getValueFor, save } from "../StoreData/Preference";

export default function Scanner({ navigation }) {
  const height = useHeaderHeight();
  const [scannedData, setScannedData] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);

  const handleCodeScanned = (data) => {
    if (!qrCode) {
      console.log("Bhai le tera data", data.data);
      //setScannedData(data.data);
      setQrCode(data.data);
      setIsScanning(false);
    }
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
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: response.message,
          button: "close",
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: response.errors[0],
          button: "close",
        });
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
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Enter The Coupon Code",
        button: "close",
      });
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

                <TouchableOpacity onPress={handleScan}>
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
                </TouchableOpacity>
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
                <TouchableOpacity onPress={handleSubmit}>
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
                </TouchableOpacity>
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
