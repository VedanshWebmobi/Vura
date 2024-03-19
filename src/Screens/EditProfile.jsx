import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Header from "../common/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, font, icon } from "../constants";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import * as ImagePicker from "expo-image-picker";
import { Modal, Portal, Button, TextInput } from "react-native-paper";
import CustomTextInput from "../common/CustomTextInput";

export default function Profile({ navigation }) {
  const [name, setName] = useState("");

  const [mobileNumber, setMobileNumber] = useState("+91 1234567890");

  const [dob, setDob] = useState("29-10-1989");
  const [doa, setDoa] = useState("29-10-2089");
  const [email, setEmail] = useState("hello@vure.ae");
  const [address, setAddress] = useState(
    "Lorem ipsum dolor sit amet consectetur. sit amet consectetur."
  );
  const [city, setCity] = useState("Ahmedabad");
  const [district, setDistrict] = useState("Ahmedabad");
  const [state, setState] = useState("Gujarat");
  const [pincode, setPincode] = useState("123456");

  const data = [
    { id: 1, label: "Name", state: setName, placeholder: "Enter Name" },
    {
      id: 2,
      label: "Mobile Number",
      state: setMobileNumber,
      placeholder: "+91 1234567890",
    },
    { id: 3, label: "Email", state: setEmail, placeholder: "hello@vure.ae" },
    { id: 4, label: "Date of Birth", state: setDob, placeholder: "DD-MM-YYYY" },
    {
      id: 5,
      label: "Date of Anniversary",
      state: setDoa,
      placeholder: "DD-MM-YYYY",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        showBackButton
        navigation={navigation}
        showSignOut
        headerText="Profile"
      />
      <ScrollView>
        <View>
          <View style={stylesCommon.profileCardView}>
            {/* Profile Information */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontFamily: font.INTER_SEMIBOLD, fontSize: 20 }}>
                Basic Information
              </Text>
            </View>
            {/* Profile Information */}
            {data.map((item) => (
              <CustomTextInput
                key={item.id}
                label={item.label}
                value={item[0]} // Dynamically access state using state setter
                onChangeText={item.state} // Dynamically call state setter
                placeholder={item.placeholder} // Set placeholder text
              />
            ))}
          </View>

          {/* Bank Details */}
          {/* <View style={stylesCommon.profileCardView}>
            <View style={{ flexDirection: "row", gap: 24 }}>
              <View style={{ gap: 5, flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontFamily: font.INTER_MEDIUM, fontSize: 16 }}>
                    Bank Details
                  </Text>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <Image
                      source={icon.CHECK_ICON}
                      style={{ width: 12, height: 12 }}
                    />
                    <Text
                      style={{ fontFamily: font.INTER_MEDIUM, fontSize: 10 }}
                    >
                      Verified
                    </Text>
                  </View>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Image source={icon.EDIT} style={{ height: 24, width: 24 }} />
                </View>
              </View>
            </View>
            <View style={stylesCommon.lineStyle} />
            <View style={{ gap: 24 }}>
              <View style={{ gap: 2 }}>
                <Text style={stylesCommon.profileText}>Account Name</Text>
                <Text style={stylesCommon.profileSubText}>{accountName}</Text>
              </View>

              <View style={{ gap: 2 }}>
                <Text style={stylesCommon.profileText}>Account Type</Text>
                <Text style={stylesCommon.profileSubText}>{accountType}</Text>
              </View>

              <View style={{ gap: 2 }}>
                <Text style={stylesCommon.profileText}>Account No.</Text>
                <Text style={stylesCommon.profileSubText}>{accountNumber}</Text>
              </View>

              <View style={{ gap: 2 }}>
                <Text style={stylesCommon.profileText}>ISFC Code</Text>
                <Text style={stylesCommon.profileSubText}>{ifscCode}</Text>
              </View>
            </View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
