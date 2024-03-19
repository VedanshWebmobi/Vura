import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import stylesCommon from "../Themes/stylesCommon";
import CommonHeader from "../common/CommonHeader";
import { colors, font, icon } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";

export default function Product({ navigation }) {
  const data = [
    {
      name: "Product 1",
      image: icon.CEMENT,
      price: "21000",
      size: "20",
      categoery: "Ceramic",
      ProductCode: "C2Te",
    },
    {
      name: "Product 2",
      image: icon.CEMENT,
      price: "21000",
      size: "20",
      categoery: "Ceramic",
      ProductCode: "C2Ted",
    },
    {
      name: "Product 3",
      image: icon.CEMENT,
      price: "21000",
      size: "20",
      categoery: "Ceramic",
      ProductCode: "C2Tef",
    },
    {
      name: "Product 4",
      image: icon.CEMENT,
      price: "21000",
      size: "20",
      categoery: "Ceramic",
      ProductCode: "C2Teg",
    },
    {
      name: "Product 5",
      image: icon.CEMENT,
      price: "21000",
      size: "20",
      categoery: "Ceramic",
      ProductCode: "C2Teh",
    },
    {
      name: "Product 6",
      image: icon.CEMENT,
      price: "21000",
      size: "20",
      categoery: "Ceramic",
      ProductCode: "C2Tei",
    },
  ];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "All", value: "All" },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Pear", value: "pear" },
  ]);

  console.log("Product ka navigation", navigation);
  return (
    <SafeAreaView style={stylesCommon.whitebg}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <CommonHeader screen={"Product"} navigation={navigation} showBack />
      <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: font.GoldPlay_SemiBold,
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              Our Prdoucts
            </Text>
          </View>
          <View style={{}}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              containerStyle={{}}
              placeholder={"Category"}
              textStyle={{ fontSize: 15, fontFamily: font.GoldPlay_Medium }}
              style={{
                width: 120,
                height: 50,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.GREY_TXT,
            height: 1,
            width: "100%",
            marginVertical: 10,
          }}
        />
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  elevation: 3,
                  padding: 15,
                  backgroundColor: "white",
                  alignItems: "center",
                  borderRadius: 10,
                  margin: 10,
                }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => navigation.navigate("ProductDetail", item)}
                >
                  <View style={{}}>
                    <Image
                      source={item.image}
                      style={{ height: 150, width: 100, resizeMode: "cover" }}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.GREY,
                      height: 1,
                      width: "100%",
                      marginVertical: 10,
                    }}
                  />
                  <Text style={{ fontFamily: font.GoldPlay_Medium }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => item.ProductCode}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
