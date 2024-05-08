import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import CommonHeader from "../common/CommonHeader";
import CommonHeaderNew from "../common/CommonHeader_new";
import { Modal, Portal, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import { BackHandler } from "react-native";
import * as Preference from "../StoreData/Preference";
import { StackActions } from "@react-navigation/native";
import { axiosCallAPI } from "../Api/Axios";
import { GET_PROFILE } from "../Api/Utils";
import * as Progress from "react-native-progress";
import CommonAlert from "../common/CommonAlert";
import { TouchableHighlight } from "react-native-gesture-handler";
import {Fontisto } from '@expo/vector-icons';

export default function AddPhoto({ navigation }) {
  const [visible, setVisible] = React.useState(false);
  const [image, setImage] = useState("");
  const [isVisible, setisVisible] = useState("");

  const [showback, setshowback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [showAlert, setShowAlert] = useState(false);
  const containerStyle = { backgroundColor: "#F2F2F2", padding: 20, borderRadius:20 };
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
      setTimeout(() =>{navigation.navigate("AddAdhar", { profilePhoto: image });},1000)
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
      //handleGoBack()
    );

    return () => backHandlerSubscription.remove();
  }, [navigation, showback]);

  const handleClose = () => {
    setShowAlert(false);
    navigation.dispatch(StackActions.replace("Category")); // Navigate to login screen
    // Close the alert box
  };

  function handleBackButtonClick() {
    // if (showback) {
    //   handleGoBack;
    //   //navigation.goBack();
    //   return true;
    // } else if (!showback) {

    if (!showback) {
      // Dialog.show({
      //   type: ALERT_TYPE.WARNING,
      //   title: "Close Registeration?",
      //   textBody: "Are you Sure You want to Exit ",
      //   button: "Close",
      //   onPressButton: handleClose,
      // });
      setShowAlert(true);

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
        setshowback(true);
      } else {
        console.log("Register hai");
        setshowback(true);
      }
      getProfile();
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
      const formattedName = name === null ? "" : name;
      const formattedMobileNo = mobileNo === null ? "" : mobileNo;
      const formattedAddress = address === null ? "" : address;
      const formattedState = state === null ? "" : state;
      const formattedCity = city === null ? "" : city;
      const formattedAadharCardNo = aadharCardNo === null ? "" : aadharCardNo;
      const formattedPanCardNo = panCardNo === null ? "" : panCardNo;
      const formattedAccountHolderName =
        accountHolderName === null ? "" : accountHolderName;
      const formattedAccountNumber =
        accountNumber === null ? "" : accountNumber;
      const formattedBankName = bankName === null ? "" : bankName;
      const formattedIfscCode = ifscCode === null ? "" : ifscCode;
      const formattedImage = image || "";

      setImage(formattedImage);
      console.log("....", formattedAadharCardNo);
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
    <View style={[stylesCommon.yellowbg,{backgroundColor:'#fff',  justifyContent:"center", alignItems:"center"}]}>
      <StatusBar backgroundColor={colors.YELLOW} />

      <CommonAlert
        visible={showAlert} // Pass visibility state to the CommonAlert component
        hideModal={() => setShowAlert(false)} // Pass function to hide the modal
        handleOkPress={handleClose} // Pass function to handle Ok button press
        handleCancelPress={() => setShowAlert(false)} // Pass function to handle Cancel button press
        title="Close Registeration?" // Pass title text
        iconName="error"
        bodyText="Are you Sure You want to Exit" // Pass body text
        cancelButton={true} // Pass whether Cancel button should be displayed
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <View >
            <Fontisto name="close" size={24} color={"#999999"} style={{alignSelf:'flex-end'}} onPress={()=>hideModal()}/>
            <Text style={{color:colors.BLACK, fontSize:20, fontFamily:font.GoldPlay_SemiBold, alignSelf:"center", marginBottom:30}}>UPLOAD PHOTO</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingBottom:20
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Button
                icon={({ size, color }) => (
                  <Image
                    source={require('../../assets/take_from_camera.png')}
                    style={{
                      width: 65,
                      height: 65,
                      marginStart: 10,
                      resizeMode:'contain'
                    }}

                  />
                )}
                onPress={() => uploadImage("camera")}
              />
              <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize:16, textDecorationLine:'underline' }}>Camera</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Button
                icon={({ size, color }) => (
                  <Image
                    source={require('../../assets/take_from_gallery.png')}
                    style={{
                      width: 65,
                      height: 65,
                      marginStart: 10,
                      resizeMode:'contain'
                    }}
                  />
                )}
                onPress={() => uploadImage("gallery")}
              />
              <Text style={{ fontFamily: font.GoldPlay_SemiBold,fontSize:16, textDecorationLine:'underline' }}>
                Gallery
              </Text>
            </View>
          </View>
          </View>
        </Modal>
      </Portal>
      <CommonHeaderNew header_title={"CREATE PROFILE"}
      header_color={colors.YELLOW} 
      navigation ={navigation}
      />
      {/* <CommonHeader
        handleGoBack={handleGoBack}
        navigation={navigation}
        screen={"addPhoto"}
        showBack={showback}
      /> */}
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
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
         
          }}
        >
        
            <TouchableOpacity onPress={showModal()} >
              <Image
                source={image ? { uri: image } : icon.PROFILE_CIRCLE}
                style={{ width: 150, height: 150, borderRadius: 80, backgroundColor:'#cccccc' }}
              />

              <Image
                source={icon.CAMERA_NEW}
                style={{
                  position: "absolute",
                  width: 100,
                  height: 100,
                  left: 85,
                  top: 80,
                  
                }}
              />
              {/* <Image
                  source={icon.PROFILE_ICON}
                  style={{ width: 52, height: 45 }}
                /> */}
            </TouchableOpacity>
         

          {/* <Text
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
          </Text> */}
        </View>
      )}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
        <TouchableHighlight
          onPress={handleNext}
          style={{ backgroundColor: "transparent", borderRadius: 10 }}
          underlayColor={"black"}
        >
          <View
            style={{
              paddingVertical: 8,
              //backgroundColor: "black",
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
        </TouchableHighlight>
      </View>
      <View style={{position:"absolute", bottom:30}}>
            <Text style={{fontFamily:font.GoldPlay_Regular, color:colors.BLACK, fontSize:12}}>If you Want To Set Your Profile Later, You Can <Text style={{fontFamily:font.GoldPlay_SemiBold, color:colors.BLACK, fontSize:13, textDecorationLine:'underline'}} onPress={()=>{navigation.navigate("HomeTab")}} >SKIP</Text></Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({});
