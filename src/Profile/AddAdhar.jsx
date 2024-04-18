import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import stylesCommon, { SCREEN_WIDTH } from "../Themes/stylesCommon";
import CommonHeader from "../common/CommonHeader";
import { TextInput } from "react-native-paper";
import { colors, font } from "../constants";
import { useRoute } from "@react-navigation/native";
import * as Preference from "../StoreData/Preference";

import { TouchableHighlight } from "react-native-gesture-handler";

export default function AddAdhar({ navigation }) {
  const [aadharNumber, setAadharNumber] = useState("");
  const route = useRoute();
  const { profilePhoto } = route.params;

  const inputRefs = useRef([]);

  useEffect(() => {
    // Retrieve Aadhaar number from AsyncStorage (if implemented)
    const getAadharNumber = async () => {
      try {
        const storedDetails = await Preference.getPreference("profile");

        if (storedDetails) {
          const { aadharCardNo } = storedDetails;
          if (aadharCardNo !== "") {
            setAadharNumber(aadharCardNo);
          }
        }
      } catch (error) {
        console.error("Error retrieving personal details:", error);
      }
    };

    getAadharNumber();
  }, []);

  useEffect(() => {
    if (aadharNumber) {
      // Automatically focus the next TextInput when one is filled
      if (aadharNumber.length === 4 || aadharNumber.length === 8) {
        // Focus the next TextInput
        inputRefs.current[aadharNumber.length / 4].focus();
      }
    }
  }, [aadharNumber]);

  const handleNext = () => {
    // if (aadharNumber.length !== 12) {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "ENTER A VALID AADHAR NO",
    //     button: "close",
    //   });
    //   return;
    // }
    console.log("Yeh ja raha tha bhai", aadharNumber);
    console.log(profilePhoto);
    navigation.navigate("PersonalDetails", {
      aadharNo: aadharNumber,
      profilePhoto: profilePhoto,
    });
  };

  return (
    <View style={stylesCommon.yellowbg}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <CommonHeader navigation={navigation} showBack />
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            fontFamily: font.GoldPlay_SemiBold,
            fontSize: 18,
            marginTop: 20,
            color: "white",
          }}
        >
          ENTER YOUR AADHAR CARD NUMBER
        </Text>
        <View style={styles.inputRow}>
          {[...Array(3)].map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={aadharNumber ? aadharNumber.substr(index * 4, 4) : ""}
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
                marginStart: 10,
              }}
              onChangeText={(text) => {
                // Handle the case where aadharNumber is null or empty
                if (!aadharNumber) {
                  setAadharNumber(text);
                  return; // Exit the function if aadharNumber is null or empty
                }

                const newAadharNumber =
                  aadharNumber.substr(0, index * 4) +
                  text +
                  aadharNumber.substr((index + 1) * 4);

                console.log("====================================");
                console.log(newAadharNumber);
                console.log("====================================");
                setAadharNumber(newAadharNumber);
              }}
              maxLength={4}
              cursorColor="white"
            />
          ))}
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    marginHorizontal: 5,
    flex: 1,
  },
});
