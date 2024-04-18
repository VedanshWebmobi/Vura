import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, font, icon } from "../constants";
import stylesCommon from "../Themes/stylesCommon";
import CommonAlert from "../common/CommonAlert";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function Category({ navigation }) {
  const data = [
    "I Am An Employee",
    "I Am A Market Operator",
    "I Am A Distributer",
    "I Am A Dealer",
    "I Am A Retailer",
    "I Am A Contractor",
    "I Am An Architecht",
    "I Am An Artisan",
  ];
  const [selectedItem, setSelectedItem] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const Header = () => {
    return (
      <View
        style={{
          borderColor: "white",
          borderWidth: 1,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          backgroundColor: colors.BLACK,
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ color: "white", fontFamily: font.GoldPlay_SemiBold }}>
            SELECT REGISTRATION CATEGORY
          </Text>
        </View>
      </View>
    );
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      // Check if navigation can go back
      navigation.dispatch(NavigationActions.back()); // Go back if possible
      return true; // Prevent default back button behavior
    } else {
      // Handle exit on PreLogin or other logic for other screens
      // (This part will be addressed in a later step)
    }
  };
  const renderItem = ({ item, index }) => {
    const isLast = index === data.length - 1;

    const disabled = !isLast;
    return (
      <TouchableOpacity
        onPress={() => setSelectedItem(item)}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <View
          style={{
            borderColor: "white",
            padding: 10,
            borderWidth: 1,
            borderBottomLeftRadius: isLast ? 20 : 0,
            borderBottomRightRadius: isLast ? 20 : 0,
            // backgroundColor: selectedItem === item ? "black" : "transparent",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              marginStart: 15,
            }}
          >
            <View
              style={{
                borderRadius: 50,
                height: 15,
                width: 15,
                borderWidth: 1,
                borderColor: "#fff",
                backgroundColor:
                  selectedItem === item ? "black" : "transparent",
              }}
            ></View>

            <Text
              style={{
                // color: "white",
                fontFamily: font.GoldPlay_SemiBold,
                color: selectedItem === item ? "black" : "white",
              }}
            >
              {item}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleConfirm = () => {
    if (selectedItem !== "") {
      navigation.navigate("Login");
    } else {
      setshowAlert(true);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, gap: 30, backgroundColor: colors.YELLOW }}>
      <StatusBar backgroundColor={colors.YELLOW} />

      <CommonAlert
        visible={showAlert} // Pass visibility state to the CommonAlert component
        hideModal={() => setshowAlert(false)} // Pass function to hide the modal
        handleOkPress={() => setshowAlert(false)} // Pass function to handle Ok button press
        //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
        title="Error" // Pass title text
        iconName="error"
        bodyText={"Please Select Any Category"} // Pass body text
        // cancelButton={true} // Pass whether Cancel button should be displayed
      />
      <View
        style={{
          flex: 1,
          //backgroundColor: colors.GREY,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Image
          source={icon.BLACK_ICON}
          style={{ resizeMode: "contain", width: 120 }}
        ></Image>
      </View>

      <View
        style={{
          //backgroundColor: colors.BLACK,

          alignItems: "center",
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<Header />}
        />
      </View>

      <View
        style={{
          alignItems: "center",
          // backgroundColor: colors.GREY,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TouchableHighlight
          onPress={handleConfirm}
          underlayColor={"black"}
          style={{ borderRadius: 15 }}
        >
          <View
            style={[
              stylesCommon.preLoginButtonStyle,
              { backgroundColor: "transparent" },
            ]}
          >
            <Text style={stylesCommon.preButtonLabelStyle}>CONFIRM</Text>
          </View>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
