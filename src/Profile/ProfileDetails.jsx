import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import CommonHeader from "../common/CommonHeader";
import { useRoute } from "@react-navigation/native";
import { axiosCallAPI } from "../Api/Axios";
import { ADD_PROFILE, GET_PROFILE } from "../Api/Utils";
import * as Preference from "../StoreData/Preference";
import * as Progress from "react-native-progress";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function ProfileDetails({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const {
    profilePhoto,
    name,
    phoneNo,
    aadharNo,
    address,
    panNo,
    sameAddress,
    city,
    state,
    accountHolderName,
    accountNumber,
    bankName,
    ifscCode,
  } = route.params;
  console.log("====================================");
  console.log(aadharNo);
  console.log("====================================");

  const handleNavigateToPersonalDetails = () => {
    // navigation.navigate("PersonalDetails", {
    //   profilePhoto,
    //   name,
    //   phoneNo,
    //   aadharNo,
    //   address,
    //   panNo,
    //   sameAddress,
    //   accountHolderName,
    //   accountNumber,
    //   bankName,
    //   ifscCode,
    // });

    navigation.navigate("PersonalDetails", { profilePhoto, aadharNo });
  };

  const handleNavigateToBankDetails = () => {
    navigation.goBack("BankDetails");
  };

  const submitProfile = async () => {
    console.log("yeh ja raha hia ander.....", profilePhoto);
    setIsLoading(true);
    try {
      let profileFormData = new FormData();
      console.log("====================================");
      console.log("Apiiiii callled...", profilePhoto);
      console.log("====================================");
      profileFormData.append("name", name);
      // profileFormData.append(
      //   "image",
      //   profilePhoto
      //     ? {
      //         uri: profilePhoto,
      //         type: "image/jpeg", // Or appropriate mime type based on image format
      //         // name: "profile_image.jpg", // Optional filename for server-side reference
      //       }
      //     : ""
      // );

      if (profilePhoto.includes("http") || profilePhoto.includes("https")) {
        // profileFormData.append("image", profilePhoto);
      } else {
        console.log("====================================");
        console.log("yess huin bhai", profilePhoto);
        console.log("====================================");
        profileFormData.append("image", {
          uri: profilePhoto,
          type: "image/jpeg",
          name: "profile_image.jpg",
        });
      }

      profileFormData.append("address", address);
      profileFormData.append("state", state);
      profileFormData.append("city", city);
      profileFormData.append("aadharCardNo", aadharNo);
      profileFormData.append("panCardNo", panNo);
      profileFormData.append("accountHolderName", accountHolderName);
      profileFormData.append("accountNumber", accountNumber);
      profileFormData.append("bankName", bankName);
      profileFormData.append("ifscCode", ifscCode);

      console.log("====================================");
      console.log("yeh hai bhai", profilePhoto);
      console.log("====================================");
      let requestOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
        },
      };

      const response = await axiosCallAPI(
        "post",
        ADD_PROFILE,
        profileFormData,
        requestOptions,
        true,
        navigation
      );

      console.log("LE Bhai", response);

      if (response && response.status) {
        Preference.save(ExpoSecureKey.IS_REGISTER, "true");
        await getProfile();
        // navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    } finally {
      setIsLoading(true);
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
      navigation.navigate("Home");
      setIsLoading(false);
      // Hide loader after fetching data
    }
  };
  const handleSubmit = async () => {
    await submitProfile();

    //
  };
  return (
    <View style={stylesCommon.yellowbg}>
      <CommonHeader
        screen={"ProfileDetails"}
        navigation={navigation}
        showBack
      />

      <View
        style={{
          justifyContent: "flex-start",
          marginTop: 20,
          gap: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={profilePhoto ? { uri: profilePhoto } : icon.PROFILE_PIC}
            style={{ width: 100, height: 100, borderRadius: 80 }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: SCREEN_WIDTH / 2.1,
              paddingVertical: 8,
              backgroundColor: "black",
              borderColor: "white",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <Text
              style={[
                stylesCommon.preButtonLabelStyle,
                { textAlign: "center" },
              ]}
            >
              {name}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: "center", marginTop: 30, gap: 25 }}>
        <TouchableHighlight
          onPress={handleNavigateToPersonalDetails}
          style={{ backgroundColor: "transparent", borderRadius: 10 }}
          underlayColor={"black"}
        >
          <View
            style={{
              width: SCREEN_WIDTH / 1.8,
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "space-evenly",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <Image
              source={icon.PERSONAL_DETAILS}
              style={{ width: 20, height: 20 }}
            />

            <Text style={{ fontFamily: font.GoldPlay_Medium, color: "white" }}>
              PERSONAL DETAILS
            </Text>
            <Image source={icon.ARROW} style={{ width: 18, height: 18 }} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={handleNavigateToBankDetails}
          style={{ backgroundColor: "transparent", borderRadius: 10 }}
          underlayColor={"black"}
        >
          <View
            style={{
              width: SCREEN_WIDTH / 1.8,
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "center",
              gap: 25,
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <Image
              source={icon.BANK_DETAILS}
              style={{
                width: 16,
                height: 18,
                // right: 10,
              }}
            />

            <Text style={{ fontFamily: font.GoldPlay_Medium, color: "white" }}>
              BANK DETAILS
            </Text>
            <Image source={icon.ARROW} style={{ width: 18, height: 18 }} />
          </View>
        </TouchableHighlight>
      </View>

      {isLoading ? (
        <View style={stylesCommon.loaderViewStyle}>
          <Progress.CircleSnail
            size={50}
            indeterminate={true}
            color={"black"}
          />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableHighlight
            onPress={handleSubmit}
            style={{ backgroundColor: "transparent", borderRadius: 10 }}
            underlayColor={"black"}
          >
            <View
              style={{
                width: SCREEN_WIDTH / 2.5,
                paddingVertical: 10,
                flexDirection: "row",
                justifyContent: "center",
                gap: 25,
                borderColor: "white",
                borderWidth: 1,
                borderRadius: 10,
                //backgroundColor: "black",
              }}
            >
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, color: "white" }}
              >
                Submit
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
