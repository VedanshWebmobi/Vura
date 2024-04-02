import { View, Text, TouchableOpacity, Image } from "react-native";
import { colors, font, icon } from "../constants";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import { DrawerItem } from "@react-navigation/drawer";
import CommonHeader from "./CommonHeader";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function CustomDrawerComponent({ navigation, ...props }) {
  console.log("Here ", props);
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

  const renderItem = (item, index) => {
    const handleItemPress = () => {
      // Navigation logic based on the selected item
      if (item === "Home") {
        console.log("Home is pressed");
        navigation.navigate("Home");
      } else if (item === "Products") {
        console.log("hiii", navigation.navigate("Product"));
        console.log("Product Pressed");
        navigation.navigate("Product");
      } else if (item === "Log Out") {
        // navigation.navigate("Home");
      }
    };

    //const isDisabled = item !== "Home"; // Disable all except Home and Log Out

    return (
      <View key={index}>
        <View style={{ height: 1, backgroundColor: "white" }} />
        <TouchableOpacity
          style={{ padding: 15 }}
          //  onPress={isDisabled ? null : handleItemPress} // Disable onPress if item is disabled
          onPress={handleItemPress}
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
                backgroundColor: "white",
                alignItems: "center",
              }}
            />
            <Text
              style={{
                fontFamily: font.GoldPlay_SemiBold,
                // color: isDisabled ? "gray" : "white",
                color: "white",
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
  console.log("mkc navigation ki", navigation);
  return (
    <View
      style={{ flex: 1, backgroundColor: colors.YELLOW, height: SCREEN_HEIGHT }}
    >
      <DrawerContentScrollView {...props}>
        <CommonHeader navigation={navigation} screen={"Custom"} />
        <View style={{ justifyContent: "flex-start", marginTop: 20, gap: 20 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={icon.PROFILE_PIC}
              style={{ width: 100, height: 100, borderRadius: 80 }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableHighlight
              onPress={() => navigation.navigate("AddPhoto")}
              style={{ backgroundColor: "red" }}
              underlayColor={"black"}
            >
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
                  CREATE YOUR PROFILE
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ marginTop: 40 }}>
          {menuItems.map((item, index) => (
            <View key={index}>{renderItem(item, index, props)}</View>
          ))}
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
