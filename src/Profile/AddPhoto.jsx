import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import CommonHeader from "../common/CommonHeader";
import { Modal, Portal, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import { BackHandler } from "react-native";
import * as Preference from "../StoreData/Preference";
import { StackActions } from "@react-navigation/native";
import { axiosCallAPI } from "../Api/Axios";
import { GET_PROFILE } from "../Api/Utils";
import * as Progress from "react-native-progress";

export default function AddPhoto({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [image, setImage] = useState("");
  const [isVisible, setisVisible] = useState("");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [showback, setshowback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const uploadImage = async (mode) => {
    let result = {};
    try {
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
      hideModal();
    }
  };

  const saveImage = async (image) => {
    try {
      setImage(image);
      hideModal();
    } catch (error) {
      throw error;
    }
  };

  const handleGoBack = () => {
    console.log("pressed Go Back");
    navigation.goBack();
  };

  const handleNext = () => {
    console.log(image);
    navigation.navigate("AddAdhar", { profilePhoto: image });
    // if (image) {
    //   navigation.navigate("AddAdhar", { profilePhoto: image });
    // } else {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "UPLOAD YOUR IMAGE FIRST",
    //     button: "close",
    //   });
    // }
  };
  // useEffect(() => {
  //   const backHandlerSubscription = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     handleBackButtonClick
  //   );

  //   return () => backHandlerSubscription.remove();
  // }, [navigation, showback]);

  useEffect(() => {
    const backHandlerSubscription = BackHandler.addEventListener(
      "hardwareBackPress",
      // Conditionally set the function based on showback
      showback ? handleGoBack : handleBackButtonClick
    );

    return () => backHandlerSubscription.remove();
  }, [navigation, showback]);

  const handleClose = () => {
    Dialog.hide();
    navigation.dispatch(StackActions.replace("Category")); // Navigate to login screen
    // Close the alert box
  };

  const handleProceed = () => {
    Dialog.hide(); // Close the alert box
  };
  function handleBackButtonClick() {
    // if (showback) {
    //   handleGoBack;
    //   //navigation.goBack();
    //   return true;
    // } else if (!showback) {

    if (!showback) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Close Registeration?",
        textBody: "Are you Sure You want to Exit ",
        button: "Close",
        onPressButton: handleClose,
      });
      return true;
    }
    return false;
    //   return true;
    // }
    // return false;
  }

  useEffect(() => {
    const showMenu = async () => {
      const isRegistered = await Preference.getValueFor(
        ExpoSecureKey.IS_REGISTER
      );

      console.log("Value of isRegistered:", isRegistered);
      if (isRegistered === "false") {
        console.log("Bhai register nai hai");
        setshowback(false);
      } else {
        console.log("Register hai");
        setshowback(true);
        getProfile();
      }
    };

    showMenu();
  }, []);

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

      setImage(formattedImage);
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
      //
      setIsLoading(false); // Hide loader after fetching data
    }
  };

  return (
    <View style={stylesCommon.yellowbg}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              icon={({ size, color }) => (
                <Image
                  source={icon.CAMERA}
                  style={{
                    width: 55,
                    height: 55,
                  }}
                />
              )}
              onPress={() => uploadImage("camera")}
            />
            <Button
              icon={({ size, color }) => (
                <Image
                  source={icon.GALLERY}
                  style={{
                    width: 55,
                    height: 55,
                  }}
                />
              )}
              onPress={() => uploadImage("gallery")}
            />
          </View>
        </Modal>
      </Portal>
      <CommonHeader
        handleGoBack={handleGoBack}
        navigation={navigation}
        screen={"addPhoto"}
        showBack={showback}
      />
      {isLoading ? (
        <View style={stylesCommon.loaderViewStyle}>
          <Progress.CircleSnail
            size={50}
            indeterminate={true}
            color={"black"}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 24,
            }}
          >
            <TouchableOpacity onPress={showModal}>
              <Image
                source={image ? { uri: image } : icon.PROFILE_PIC}
                style={{ width: 150, height: 150, borderRadius: 80 }}
              />

              <Image
                source={icon.CAMERA}
                style={{
                  position: "absolute",
                  width: 50,
                  height: 50,
                  left: 100,
                  top: 100,
                }}
              />
              {/* <Image
                  source={icon.PROFILE_ICON}
                  style={{ width: 52, height: 45 }}
                /> */}
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontFamily: font.GoldPlay_Medium,
              fontSize: 20,
              marginTop: 20,
              textAlign: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            UPLOAD YOUR PHOTO {"\n"} OR SELFIE
          </Text>
        </View>
      )}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={handleNext}>
          <View
            style={{
              paddingVertical: 8,
              backgroundColor: "black",
              borderColor: "white",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              width: SCREEN_WIDTH / 3,
            }}
          >
            <Text
              style={[
                stylesCommon.preButtonLabelStyle,
                { textAlign: "center", fontSize: 16 },
              ]}
            >
              NEXT
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
