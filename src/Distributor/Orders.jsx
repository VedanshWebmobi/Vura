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
  SafeAreaView,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import CommonHeader from "../common/CommonHeader";
import { ExpoSecureKey, colors, font, icon } from "../constants";
//import { SafeAreaView } from "react-native-safe-area-context";

import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import { PRODUCTS, PRODUCT_CATEGORY } from "../Api/Utils";
import * as Preference from "../StoreData/Preference";
import * as Progress from "react-native-progress";
import { axiosCallAPI } from "../Api/Axios";
import { FlatGrid } from "react-native-super-grid";
import CommonHeaderNew from "../common/CommonHeader_new";
import { useFocusEffect } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CouponList from "../Home/CouponList";
import InvoiceList from "./InvoiceList";
import OrderHistory from "./OrderHistory";
import CommonAlert from "../common/CommonAlert";
import DistributerSearch from "../common/DistributerSearch";

export default function Orders({
  navigation,
  name,
  catID,
  p_navigation,
  search,
  setSearch,
}) {
  // function open() {
  //   pickerRef.current.focus();
  // }

  // function close() {
  //   pickerRef.current.blur();
  // }

  const [value, setValue] = useState(null);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(catID);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [show_search, setShowSearch] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const Tab = createMaterialTopTabNavigator();

  const handleSearchView = () => {
    setShowSearch(true);
  };

  function MyTabBar({ state, descriptors, navigation, position }) {
    return (
      <View
        style={{
          borderRadius: 25,
          flexDirection: "row",
          backgroundColor: "#CCCCCC",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          padding: 6,
          marginTop: 20,
          marginHorizontal: 20,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const activeStyles = isFocused
            ? { backgroundColor: "#fff" }
            : { backgroundColor: "#cccccc" };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                backgroundColor: activeStyles.backgroundColor,
                borderRadius: 25,
                height: "100%",
                justifyContent: "center",
              }}
            >
              <Animated.Text
                style={{
                  textAlign: "center",
                  fontFamily: font.GoldPlay_SemiBold,
                  fontSize: 14,
                }}
              >
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const handleSearch = () => {
    setIsSearchVisible(true);
  };

  const onSearchClose = () => {
    setIsSearchVisible(false);
  };

  const SearchedPressed = (text) => {
    setSearchText(text);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.YELLOW }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
          <CommonHeaderNew
            header_title={"ORDERS"}
            header_color={colors.YELLOW}
            navigation={navigation}
            showSearch
            onSearchPress={handleSearch}
          />

          <Tab.Navigator
            tabBar={(props) => <MyTabBar {...props} />}
            swipeEnabled={false}
          >
            <Tab.Screen
              name="NEW INVOICE"
              children={() => (
                <InvoiceList searchText={searchText} setSearch={setSearch} />
              )}
            />
            <Tab.Screen
              name="ORDERS HISTORY"
              children={() => (
                <OrderHistory searchText={searchText} setSearch={setSearch} />
              )}
            />
          </Tab.Navigator>
          <DistributerSearch
            isVisible={isSearchVisible}
            onClose={onSearchClose}
            handleSearch={SearchedPressed}
            searchText={searchText}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
