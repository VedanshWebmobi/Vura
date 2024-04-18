import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CommonHeader from "../common/CommonHeader";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import { colors, font } from "../constants";
import { TextInput, Button, Checkbox } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

import * as Preference from "../StoreData/Preference";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function BankDetails({ navigation }) {
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [reEnterAccountNumber, setReEnterAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
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
    currAddress,
  } = route.params;
  console.log("====================================");
  console.log("Bankdetails wala huin", aadharNo);
  console.log("====================================");
  const handleNext = () => {
    // if (!accountHolderName) {
    //   showAlert("ACCOUNT HOLDER'S NAME cannot be empty");
    // } else if (accountNumber.length < 9 || accountNumber.length > 16) {
    //   showAlert("Account number should be between 9 and 16 characters");
    // } else if (accountNumber !== reEnterAccountNumber) {
    //   showAlert("Account numbers do not match");
    // } else if (!bankName) {
    //   showAlert("BANK NAME cannot be empty");
    // } else if (ifscCode.length !== 11) {
    //   showAlert("ISFC CODE should be 11 digits");
    // } else {
    // All validations passed, navigate to the next screen
    console.log(name, phoneNo);
    navigation.navigate("ProfileDetails", {
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
    });
    //  }
  };

  useEffect(() => {
    const retrieveBankDetails = async () => {
      try {
        const storedDetails = await Preference.getPreference("profile");
        if (storedDetails) {
          const {
            accountHolderName,
            accountNumber,
            reEnterAccountNumber,
            bankName,
            ifscCode,
          } = storedDetails;
          setAccountHolderName(accountHolderName);
          setAccountNumber(accountNumber);
          setReEnterAccountNumber(reEnterAccountNumber);
          setBankName(bankName);
          setIfscCode(ifscCode);
        }
      } catch (error) {
        console.error("Error retrieving bank details:", error);
      }
    };

    retrieveBankDetails();
  }, []);

  return (
    <View style={stylesCommon.yellowbg}>
      <CommonHeader navigation={navigation} showBack />
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            marginTop: 30,
            gap: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={stylesCommon.welcomeText}>{"BANK DETAILS"}</Text>
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: font.GoldPlay_Medium,
                fontSize: 18,
                marginTop: 10,
                textAlign: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              ACCOUNT HOLDER'S NAME
            </Text>
            <TextInput
              value={accountHolderName}
              mode="outlined"
              outlineStyle={{
                borderColor: "white",
                backgroundColor: "transparent",
                borderRadius: 10,
              }}
              inputMode="text"
              style={{
                margin: 10,
                width: "75%",
              }}
              placeholderTextColor={colors.LIGHT_GREY}
              placeholder="JOHN DOE"
              contentStyle={{
                fontFamily: font.GoldPlay_Medium,
                marginLeft: 10,
                fontSize: 20,
              }}
              onChangeText={(text) => setAccountHolderName(text)}
              maxLength={14}
              cursorColor="white"
            />
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: font.GoldPlay_Medium,
                fontSize: 18,
                // marginTop: 20,
                textAlign: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              ACCOUNT NUMBER
            </Text>
            <TextInput
              value={accountNumber}
              mode="outlined"
              outlineStyle={{
                borderColor: "white",
                backgroundColor: "transparent",
                borderRadius: 10,
              }}
              inputMode="numeric"
              style={{
                marginVertical: 10,
                width: "75%",
              }}
              placeholder="1234567890123"
              placeholderTextColor={colors.LIGHT_GREY}
              contentStyle={{
                fontFamily: font.GoldPlay_Medium,
                marginLeft: 10,
                fontSize: 20,
              }}
              onChangeText={(text) => setAccountNumber(text)}
              minLength={9}
              maxLength={16}
              cursorColor="white"
            />
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: font.GoldPlay_Medium,
                fontSize: 18,
                // marginTop: 20,
                textAlign: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              RE-ENTER ACCOUNT NUMBER
            </Text>
            <TextInput
              value={reEnterAccountNumber}
              mode="outlined"
              outlineStyle={{
                borderColor: "white",
                backgroundColor: "transparent",
                borderRadius: 10,
              }}
              inputMode="numeric"
              style={{
                margin: 10,
                width: "75%",
              }}
              placeholder="1234567890123"
              placeholderTextColor={colors.LIGHT_GREY}
              contentStyle={{
                fontFamily: font.GoldPlay_Medium,
                marginLeft: 10,
                fontSize: 20,
              }}
              onChangeText={(text) => setReEnterAccountNumber(text)}
              minLength={9}
              maxLength={16}
              cursorColor="white"
            />
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: font.GoldPlay_Medium,
                fontSize: 18,
                //marginTop: 20,
                textAlign: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              BANK NAME
            </Text>
            <TextInput
              value={bankName}
              mode="outlined"
              outlineStyle={{
                borderColor: "white",
                backgroundColor: "transparent",
                borderRadius: 10,
              }}
              inputMode="text"
              style={{
                margin: 10,
                width: "75%",
              }}
              placeholderTextColor={colors.LIGHT_GREY}
              placeholder="SBI BANK"
              contentStyle={{
                fontFamily: font.GoldPlay_Medium,
                marginLeft: 10,
                fontSize: 20,
              }}
              onChangeText={(text) => setBankName(text)}
              maxLength={14}
              cursorColor="white"
            />
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: font.GoldPlay_Medium,
                fontSize: 18,
                // marginTop: 20,
                textAlign: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              ISFC CODE
            </Text>
            <TextInput
              value={ifscCode}
              mode="outlined"
              outlineStyle={{
                borderColor: "white",
                backgroundColor: "transparent",
                borderRadius: 10,
              }}
              inputMode="text"
              style={{
                margin: 10,
                width: "75%",
              }}
              placeholder="1234567890123"
              placeholderTextColor={colors.LIGHT_GREY}
              contentStyle={{
                fontFamily: font.GoldPlay_Medium,
                marginLeft: 10,
                fontSize: 20,
              }}
              onChangeText={(text) => setIfscCode(text)}
              maxLength={11}
              cursorColor="white"
              autoCapitalize="characters"
            />
            {/* <TouchableOpacity
              onPress={() => console.log("Verify Pressed")}
              style={{
                left: SCREEN_WIDTH / 3.5,
                bottom: SCREEN_HEIGHT / 13,
                flexWrap: "wrap",
                padding: 10,

                color: "white",
              }}
            >
              <Text
                style={{
                  fontFamily: font.GoldPlay_Medium,
                  fontSize: 15,
                  color: "white",
                }}
              >
                VERIFY
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 0,
            marginBottom: 30,
          }}
        >
          <TouchableHighlight
            onPress={handleNext}
            style={{ backgroundColor: "transparent", borderRadius: 10 }}
            underlayColor={"black"}
          >
            <View
              style={{
                paddingVertical: 8,
                // backgroundColor: "black",
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
                SUBMIT
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
