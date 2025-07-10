import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import DatePicker from "react-native-date-picker";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CommonHeaderNew from "../common/CommonHeader_new";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateOrder from "./CreateOrder";
import RetailerHistory from "./RetailerHistory";

import CustomViewRetailer from "./CustomViewRetailer";
import { useRoute } from "@react-navigation/native";
import { Modal, Portal, Button } from "react-native-paper";
import Feather from "@expo/vector-icons/Feather";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import crashlytics from "@react-native-firebase/crashlytics";
import CommonAlert from "../common/CommonAlert";
import {
  RETAILER_ORDER_ACTION,
  RETAILER_CREATE_INVOICE,
  RETAILER_COMPLETE_ORDER,
} from "../Api/Utils";
import moment from "moment";
import { Loader } from "../common/Loader";
import * as Preference from "../StoreData/Preference";
import { axiosCallAPI } from "../Api/Axios";

export default function InvoiceDetails({ navigation }) {
  const route = useRoute();
  const { data, category } = route.params;

  useEffect(() => {}, []);
  const ProductCollectionView = ({ item, index }) => {
    return (
      <View key={index}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 35,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 16 }}
          >{`${index + 1}) Product`}</Text>
          <TouchableOpacity
            onPress={() => {
              RemoveProduct(index);
            }}
          ></TouchableOpacity>
        </View>
        {item.category_name && (
          <CustomViewRetailer
            isTextInput
            titleText={"Product Category"}
            mainContainerStyle={{ marginTop: 10 }}
            value={item.category_name}
            placeHolderText={"Select Product Category"}
            editable={false}
          />
        )}
        <CustomViewRetailer
          isTextInput
          titleText={"Product Name"}
          mainContainerStyle={{ marginTop: 15 }}
          value={item.product_name}
          placeHolderText={"Select Product"}
          editable={false}
        />

        <CustomViewRetailer
          isTextInput
          titleText={"Quantity"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Add Quantity"}
          value={`${item.qty}`}
          setValue={(text) => {
            handleInputChange(index, "qty", text);
          }}
          editable={false}
          inputType={"numeric"}
        />

        <CustomViewRetailer
          isTextInput
          titleText={"Price"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Add Price."}
          value={item.price}
          setValue={(text) => {}}
          editable={false}
          inputType={"decimal-pad"}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.GREY_TXT,
              marginTop: 5,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <SafeAreaView style={{ flex: 1 }}>
        <CommonHeaderNew
          header_title={"INVOICE"}
          header_color={colors.YELLOW}
          navigation={navigation}
        />
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <View style={{ flex: 1, padding: 16 }}>
            <CustomViewRetailer
              isDate
              icon={require("../../assets/calendar.png")}
              placeHolderText={moment(data.invoice_date, "YYYY-MM-DD").format(
                "DD-MM-YYYY"
              )}
              titleText={"Invoice Date"}
              onClickCalendar={() => null}
            />
            <CustomViewRetailer
              isTextInput
              titleText={"Invoice No."}
              mainContainerStyle={{ marginTop: 10 }}
              placeHolderText={"Invoice No."}
              value={data.invoice_no}
              editable={false}
            />
            <CustomViewRetailer
              isTextInput
              titleText={"Invoice Total"}
              mainContainerStyle={{ marginTop: 10 }}
              placeHolderText={"Invoice Total"}
              value={data.invoice_total}
              inputType={"decimal-pad"}
              editable={false}
            />
            <View
              style={{
                height: 1,
                flex: 1,
                backgroundColor: colors.GREY_TXT,
                marginTop: 10,
              }}
            />
            <FlatList
              data={data.invoice_items}
              renderItem={ProductCollectionView}
            />
            {/* {data.status_type === "INVOICE_UPDATED" && (
            <CustomViewRetailer
              isTextInput
              isMultiLine
              titleText={"Remarks"}
              mainContainerStyle={{ marginTop: 10 }}
              placeHolderText={"Enter Remarks here.."}
              numberOfLine={4}
              value={completeRemark}
              setValue={setCompleteRemark}
              editable={true}
            />
          )} */}
            <Text
              style={{
                paddingBottom: 8,
                fontSize: 14,
                marginTop: 10,
                fontFamily: font.GoldPlay_Medium,
              }}
            >
              {"Invoice Image"}
            </Text>
            <TouchableOpacity
              style={{ height: 100, width: 100 }}
              onPress={() => null}
            >
              {data.invoice_file_url.length > 0 && (
                <Image
                  source={{ uri: data.invoice_file_url }}
                  style={{
                    height: 100,
                    width: 100,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
              )}
            </TouchableOpacity>

            {/* {products.map((product, index) => (
                  <ProductCollectionView
                    index={index}
                    product={product}
                    key={index}
                  />
                ))} */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
