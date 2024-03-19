import React, { useState } from "react";
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
import { Modal, Portal, Button } from "react-native-paper";

export default function Profile({ navigation }) {
  const [profilePic, setProfilePic] = useState(icon.PROFILE_ICON);
  const [visible, setVisible] = React.useState(false);
  const [image, setImage] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("+91 1234567890");
  const [whatsappNumber, setWhatsappNumber] = useState("+91 1234567890");
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
  const [accountName, setAccountName] = useState("Vura Bau-Chemie LLP");
  const [accountType, setAccountType] = useState("Saving");
  const [accountNumber, setAccountNumber] = useState("1234567890123456");
  const [ifscCode, setIfscCode] = useState("IFSC00001234");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
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
          <View style={stylesCommon.profileCardView}>
            {/* Profile Information */}
            <View style={{ flexDirection: "row", gap: 24 }}>
              <TouchableOpacity onPress={showModal}>
                {/* <Image
                  source={profilePic}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 80,
                  }}
                ></Image> */}

                <Image
                  source={image ? { uri: image } : icon.PROFILE_PIC}
                  style={{ width: 50, height: 50, borderRadius: 80 }}
                />

                <Image
                  source={icon.CAMERA}
                  style={{
                    position: "absolute",
                    width: 24,
                    height: 24,
                    left: 30,
                    top: 25,
                  }}
                />
                {/* <Image
                  source={icon.PROFILE_ICON}
                  style={{ width: 52, height: 45 }}
                /> */}
              </TouchableOpacity>

              <View style={{ gap: 5, flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontFamily: font.INTER_MEDIUM, fontSize: 16 }}>
                    {accountName}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <Image
                      source={icon.CHECK_ICON}
                      style={{ width: 12, height: 12 }}
                    />
                    <Text
                      style={{ fontFamily: font.INTER_MEDIUM, fontSize: 10 }}
                    >
                      Artisan
                    </Text>
                  </View>
                </View>
                <View style={{ justifyContent: "center" }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EditProfile")}
                  >
                    <Image
                      source={icon.EDIT}
                      style={{ height: 24, width: 24 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={stylesCommon.lineStyle} />

            {/* Profile Details */}
            <View style={{ gap: 24 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={stylesCommon.profileView}>
                  <Text style={stylesCommon.profileText}>Mobile Number</Text>
                  <Text style={stylesCommon.profileSubText}>
                    {mobileNumber}
                  </Text>
                </View>
                <View style={stylesCommon.profileView}>
                  <Text style={stylesCommon.profileText}>Whatsapp Number</Text>
                  <Text style={stylesCommon.profileSubText}>
                    {whatsappNumber}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={stylesCommon.profileView}>
                  <Text style={stylesCommon.profileText}>Date of Birth</Text>
                  <Text style={stylesCommon.profileSubText}>{dob}</Text>
                </View>
                <View style={stylesCommon.profileView}>
                  <Text style={stylesCommon.profileText}>
                    Date of Anniversary
                  </Text>
                  <Text style={stylesCommon.profileSubText}>{doa}</Text>
                </View>
              </View>

              <View style={{ gap: 2 }}>
                <Text style={stylesCommon.profileText}>Email</Text>
                <Text style={stylesCommon.profileSubText}>{email}</Text>
              </View>

              <View style={{ gap: 2 }}>
                <Text style={stylesCommon.profileText}>Address</Text>
                <Text style={stylesCommon.profileSubText}>{address}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={stylesCommon.profileView}>
                  <Text style={stylesCommon.profileText}>City</Text>
                  <Text style={stylesCommon.profileSubText}>{city}</Text>
                </View>
                <View style={stylesCommon.profileView}>
                  <Text style={stylesCommon.profileText}>District</Text>
                  <Text style={stylesCommon.profileSubText}>{district}</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ gap: 2, flex: 1 }}>
                  <Text style={stylesCommon.profileText}>State</Text>
                  <Text style={stylesCommon.profileSubText}>{state}</Text>
                </View>
                <View style={{ gap: 2, flex: 1 }}>
                  <Text style={stylesCommon.profileText}>Pincode</Text>
                  <Text style={stylesCommon.profileSubText}>{pincode}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bank Details */}
          <View style={stylesCommon.profileCardView}>
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
