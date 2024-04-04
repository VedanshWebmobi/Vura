import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import CommonHeader from "./CommonHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Preference from "../StoreData/Preference";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import CommonAlert from "./CommonAlert";

export default function CustomDrawer({ navigation }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setprofile] = useState("");
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [profileDetailsComplete, setProfileDetailsComplete] = useState(false);
  const menuItems = [
    "Home",
    "Products",
    "Cash Back Charts",
    "Offers",
    "Catalogues",
    "Wallet History",
    "FAQ's",
    "Log Out",
  ];
  const Logout = () => {
    Preference.deleteItem(ExpoSecureKey.IS_LOGIN);
    Preference.deleteItem(ExpoSecureKey.IS_REGISTER);
    Preference.deleteItem(ExpoSecureKey.TOKEN);
    Preference.clearPreferences();
    // Clear user data or perform any necessary logout actions
    // Reset the navigation stack to navigate to the "LoginScreen"
    navigation.reset({
      //  index: 0, // Reset to the first screen in the stack
      routes: [{ name: "Category" }], // Set the route to navigate to
    });
  };

  useEffect(() => {
    const showUpdateButton = async () => {
      const isRegistered = await Preference.getValueFor(
        ExpoSecureKey.IS_REGISTER
      );

      console.log("Value of isRegistered:", isRegistered);
      if (isRegistered === "false") {
        console.log("Bhai register nai hai Custom drawer wala bol raha huin");
        setShowUpdate(false);
      } else {
        console.log("Register hai");
        setShowUpdate(true);
      }
    };

    showUpdateButton();
  }, []);

  useEffect(() => {
    const retrieveProfile = async () => {
      try {
        const storedDetails = await Preference.getPreference("profile");
        if (storedDetails) {
          const {
            image,
            address,
            aadharCardNo,
            panCardNo,
            accountHolderName,
            accountNumber,
            bankName,
            ifscCode,
          } = storedDetails;
          console.log("Profile details retrieved:", {
            address,
          });

          if (
            image &&
            address &&
            aadharCardNo &&
            panCardNo &&
            accountHolderName &&
            accountNumber &&
            bankName &&
            ifscCode
          ) {
            console.log("Profile is Complete");
            setProfileDetailsComplete(true);
          } else {
            setProfileDetailsComplete(false);
          }
        }
      } catch (error) {
        console.error("Error retrieving details:", error);
      }
    };
    retrieveProfile();
  }, [navigation]);

  const renderItem = (item, index) => {
    const handleItemPress = () => {
      // Navigation logic based on the selected item
      if (item === "Home") {
        console.log("Home is pressed");
        navigation.navigate("Home");
      } else if (item === "Products") {
        console.log("Product Pressed");
        navigation.navigate("Product");
      } else if (item === "Cash Back Charts") {
        console.log("CashBack Pressed");
        navigation.navigate("CashBack");
      } else if (item === "Offers") {
        console.log("Offers Pressed");
        navigation.navigate("Offers");
      } else if (item === "Wallet History") {
        if (!profileDetailsComplete) {
          setShowAlert(true);
          setErrorMessage("Please Complete Your Profile!");
        } else {
          navigation.navigate("Wallet");
        }
      } else if (item === "Log Out") {
        Logout();
      }
    };

    const isDisabled = item === "Catalogues" || item === "FAQ's"; // Disable all except Home and Log Out

    useEffect(() => {
      const retrieveProfile = async () => {
        try {
          const storedDetails = await Preference.getPreference("profile");
          if (storedDetails) {
            const { image, name } = storedDetails;
            console.log("====================================");
            console.log("Image customDrawer mai yeh aaraha hai", image);
            console.log("====================================");
            setprofile(image);
            setName(name);
          }
        } catch (error) {
          console.error("Error retrieving bank details:", error);
        }
      };
      retrieveProfile();
    }, []);

    return (
      <View key={index}>
        <View style={{ height: 1, backgroundColor: "white" }} />
        <TouchableOpacity
          style={{ padding: 15 }}
          activeOpacity={0.5}
          onPress={isDisabled ? null : handleItemPress}
          // Disable onPress if item is disabled
          // onPress={handleItemPress}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginStart: "20%", // Adjusted for better alignment
              gap: 10,
            }}
          >
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 50,
                // backgroundColor: "white",
                backgroundColor: isDisabled ? colors.GREY_TXT : "white",
                alignItems: "center",
              }}
            />
            <Text
              style={{
                fontFamily: font.GoldPlay_SemiBold,
                color: isDisabled ? colors.LIGHT_GREY : "white",
                // color: "white",
                fontSize: 18,
                padding: 0,
              }}
            >
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.YELLOW, height: SCREEN_HEIGHT }}
    >
      <CommonHeader navigation={navigation} screen={"Custom"} showBack />
      <CommonAlert
        visible={showAlert} // Pass visibility state to the CommonAlert component
        hideModal={() => setShowAlert(false)} // Pass function to hide the modal
        handleOkPress={() => setShowAlert(false)} // Pass function to handle Ok button press
        //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
        title="Error" // Pass title text
        iconName="error"
        bodyText={errorMessage} // Pass body text
        // cancelButton={true} // Pass whether Cancel button should be displayed
      />
      <View style={{ justifyContent: "flex-start", marginTop: 20, gap: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={profile ? { uri: profile } : icon.PROFILE_PIC}
            style={{ width: 100, height: 100, borderRadius: 80 }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableHighlight
            onPress={() => navigation.navigate("AddPhoto")}
            style={{ backgroundColor: "transparent", borderRadius: 10 }}
            underlayColor={"black"}
          >
            <View
              style={{
                width: SCREEN_WIDTH / 2.1,
                paddingVertical: 8,
                //backgroundColor: "black",
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
                {showUpdate ? name : "CREATE YOUR PROFILE"}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        {menuItems.map((item, index) => (
          <View key={index}>{renderItem(item, index)}</View>
        ))}
      </View>
    </SafeAreaView>
  );
}
