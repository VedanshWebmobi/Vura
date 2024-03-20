import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import CommonHeader from "../common/CommonHeader";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import { colors, font } from "../constants";
import { TextInput, Button, Checkbox } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import * as Preference from "../StoreData/Preference";
import * as Progress from "react-native-progress";

export default function PersonalDetails({ navigation }) {
  const inputRefs = useRef([]);
  const [aadharNumber, setAadharNumber] = useState("");
  const [name, setname] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [address, setAddress] = useState("");
  const [sameAddress, setSameAddress] = useState(false);
  const [panNo, setPanNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();

  const { profilePhoto, aadharNo } = route.params;
  console.log(route.params);
  // useEffect(() => {
  //   setAadharNumber(aadharNo);
  // address = route.params.address ? route.params.address : "";
  // panNo = route.params.panNo ? route.params.panNo : "";
  // sameAddress =
  //   route.params.sameAddress !== undefined ? route.params.sameAddress : true;
  // currAddress = route.params.currAddress ? route.params.currAddress : "";
  // }, []);
  const handleNext = () => {
    // Aadhar card number validation
    if (validation()) {
      console.log(profilePhoto);
      // All validations passed, navigate to BankDetails screen
      navigation.navigate("BankDetails", {
        profilePhoto,
        name,
        phoneNo,
        aadharNo: aadharNumber,
        address,
        panNo,
        sameAddress,
        city,
        state,
      });
    }
  };

  const validation = () => {
    if (name.trim() === "") {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "ERROR",
        textBody: "ENTER A VALID NAME",
        button: "close",
      });
      return;
    }

    // Mobile number validation
    if (phoneNo.length !== 10) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "ERROR",
        textBody: "ENTER A VALID MOBILE NUMBER",
        button: "close",
      });
      return;
    }

    // if (aadharNumber.length !== 12) {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "ENTER A VALID AADHAR NO",
    //     button: "close",
    //   });
    //   return false;
    // }

    // Address validation
    // if (address.trim() === "") {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "ENTER A VALID ADDRESS",
    //     button: "close",
    //   });
    //   return false;
    // }

    // // PAN card number validation
    // if (panNo.length !== 10) {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "ENTER A VALID PAN NO",
    //     button: "close",
    //   });
    //   return false;
    // }

    // // Current address validation if checkbox is unchecked
    // if (!sameAddress && currAddress.trim() === "") {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "ENTER A VALID CURRENT ADDRESS",
    //     button: "close",
    //   });
    //   return false;
    // }
    return true;
  };

  useEffect(() => {
    const retrievePersonalDetails = async () => {
      setIsLoading(true);
      try {
        const storedDetails = await Preference.getPreference("profile");

        if (storedDetails) {
          const { name, mobileNo, address, state, city, panCardNo } =
            storedDetails;
          console.log(
            "Bhai personal details mai yeh mil raha hai ",
            name,
            mobileNo
          );

          console.log("Yeh raha ", name, mobileNo, address, panCardNo);
          setname(name || "");
          setphoneNo(mobileNo || "");
          setAddress(address || "");
          setstate(state || "");
          setAadharNumber(aadharNo || "");
          setcity(city || "");
          setPanNo(panCardNo || "");
        }
      } catch (error) {
        console.error("Error retrieving personal details:", error);
      } finally {
        //
        setIsLoading(false); // Hide loader after fetching data
      }
    };

    retrievePersonalDetails();
  }, []);
  return (
    <View style={stylesCommon.yellowbg}>
      <CommonHeader navigation={navigation} showBack />

      {isLoading ? (
        <View style={stylesCommon.loaderViewStyle}>
          <Progress.CircleSnail
            size={50}
            indeterminate={true}
            color={"black"}
          />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={stylesCommon.welcomeText}>{"PERSONAL DETAILS"}</Text>
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
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
                NAME
              </Text>
              <TextInput
                value={name}
                mode="outlined"
                outlineStyle={{
                  borderColor: "white",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                }}
                inputMode="text"
                style={{
                  marginTop: 10,
                  //marginBottom: 20,
                  width: "75%",
                }}
                placeholder="Joe Doe"
                placeholderTextColor={colors.LIGHT_GREY}
                contentStyle={{
                  fontFamily: font.GoldPlay_Medium,
                  marginLeft: 10,
                  fontSize: 20,
                }}
                onChangeText={(text) => setname(text)}
                cursorColor="white"
              />
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
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
                MOBILE NUMBER
              </Text>
              <TextInput
                value={phoneNo}
                mode="outlined"
                outlineStyle={{
                  borderColor: "white",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                }}
                inputMode="numeric"
                style={{
                  marginTop: 10,
                  //marginBottom: 20,
                  width: "75%",
                }}
                placeholder="1234567890"
                placeholderTextColor={colors.LIGHT_GREY}
                contentStyle={{
                  fontFamily: font.GoldPlay_Medium,
                  marginLeft: 10,
                  fontSize: 20,
                }}
                onChangeText={(text) => setphoneNo(text)}
                maxLength={10}
                cursorColor="white"
              />
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: font.GoldPlay_Medium,
                  fontSize: 18,
                  marginTop: 20,
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                AADHAR CARD NUMBER
              </Text>
              <View style={styles.inputRow}>
                {[...Array(3)].map((_, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    value={aadharNo.substr(index * 4, 4)}
                    mode="outlined"
                    outlineStyle={{
                      borderColor: "white",
                      backgroundColor: "transparent",
                      borderRadius: 15,
                    }}
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder="1234"
                    placeholderTextColor={colors.LIGHT_GREY}
                    contentStyle={{
                      fontFamily: font.GoldPlay_Medium,
                      fontSize: 25,
                    }}
                    // onChangeText={(text) => {
                    //   const newAadharNumber =
                    //     aadharNumber.substr(0, index * 4) +
                    //     text +
                    //     aadharNumber.substr((index + 1) * 4);
                    //   setAadharNumber(newAadharNumber);
                    // }}
                    editable={false}
                    maxLength={4}
                    cursorColor="white"
                  />
                ))}
              </View>
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
                ADDRESS AS PER AADHAR CARD
              </Text>
              <TextInput
                value={address}
                mode="outlined"
                outlineStyle={{
                  borderColor: "white",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                }}
                inputMode="text"
                style={{
                  margin: 10,
                  marginBottom: 20,
                  width: SCREEN_WIDTH / 1.3,
                  height: SCREEN_HEIGHT / 6,
                }}
                placeholder="Building Number : 27
                          Street Name : Malpani Street
                          State : Goa"
                placeholderTextColor={colors.LIGHT_GREY}
                contentStyle={{
                  fontFamily: font.GoldPlay_Medium,
                  marginLeft: 10,
                  //marginTop: 20,
                  fontSize: 20,
                  textAlign: "left",
                }}
                onChangeText={(text) => setAddress(text)}
                numberOfLines={5}
                multiline={true}
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
                PAN CARD NUMBER
              </Text>
              <TextInput
                value={panNo}
                mode="outlined"
                outlineStyle={{
                  borderColor: "white",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                }}
                inputMode="text"
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  width: "75%",
                }}
                placeholder="ABCDEG1234"
                placeholderTextColor={colors.LIGHT_GREY}
                contentStyle={{
                  fontFamily: font.GoldPlay_Medium,
                  marginLeft: 10,
                  fontSize: 20,
                }}
                onChangeText={(text) => setPanNo(text)}
                maxLength={10}
                cursorColor="white"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Text
                style={{
                  fontFamily: font.GoldPlay_SemiBold,
                  fontSize: 18,
                  //marginTop: 20,
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                CURRENT ADDRESS
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  gap: 0,
                  marginTop: 15,
                  alignItems: "center",
                }}
              >
                <View style={{ marginTop: 2 }}>
                  <Checkbox
                    status={sameAddress ? "checked" : "unchecked"}
                    onPress={() => {
                      setSameAddress(!sameAddress);
                    }}
                    color="#000000"
                  />
                </View>

                <Text
                  style={{
                    fontFamily: font.GoldPlay_Medium,
                    fontSize: 16,

                    color: "white",
                  }}
                >
                  SAME AS PERMANENT
                </Text>
              </View>
            </View>

            {sameAddress ? null : (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: font.GoldPlay_Medium,
                    fontSize: 16,
                    //marginTop: 20,
                    textAlign: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  IF NOT AS PER PERMANENT ADDRESS
                </Text>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
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
                    CURRENT CITY
                  </Text>
                  <TextInput
                    value={city}
                    mode="outlined"
                    outlineStyle={{
                      borderColor: "white",
                      backgroundColor: "transparent",
                      borderRadius: 15,
                    }}
                    inputMode="text"
                    style={{
                      marginTop: 10,
                      marginBottom: 20,
                      width: "75%",
                    }}
                    placeholder="VADODARA"
                    placeholderTextColor={colors.LIGHT_GREY}
                    contentStyle={{
                      fontFamily: font.GoldPlay_Medium,
                      marginLeft: 10,
                      fontSize: 20,
                    }}
                    onChangeText={(text) => setcity(text)}
                    maxLength={10}
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
                    CURRENT STATE
                  </Text>
                  <TextInput
                    value={state}
                    mode="outlined"
                    outlineStyle={{
                      borderColor: "white",
                      backgroundColor: "transparent",
                      borderRadius: 15,
                    }}
                    inputMode="text"
                    style={{
                      marginTop: 10,
                      marginBottom: 20,
                      width: "75%",
                    }}
                    placeholder="GUJARAT"
                    placeholderTextColor={colors.LIGHT_GREY}
                    contentStyle={{
                      fontFamily: font.GoldPlay_Medium,
                      marginLeft: 10,
                      fontSize: 20,
                    }}
                    onChangeText={(text) => setstate(text)}
                    maxLength={10}
                    cursorColor="white"
                  />
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
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
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    marginHorizontal: 5,
    flex: 1,
  },
});
