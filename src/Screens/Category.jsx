import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, font, icon } from "../constants";
import stylesCommon from "../Themes/stylesCommon";

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
  const [selectedItem, setSelectedItem] = useState(null);
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

  const renderItem = ({ item, index }) => {
    const isLast = index === data.length - 1;
    const disabled = !isLast;
    return (
      <TouchableOpacity
        onPress={() => setSelectedItem(item)}
        disabled={disabled}
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
                // backgroundColor: selectedItem === item ? "black" : "transparent",
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
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={{ flex: 1, gap: 30, backgroundColor: colors.YELLOW }}>
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
        <TouchableOpacity onPress={handleConfirm}>
          <View style={stylesCommon.preLoginButtonStyle}>
            <Text style={stylesCommon.preButtonLabelStyle}>CONFIRM</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
