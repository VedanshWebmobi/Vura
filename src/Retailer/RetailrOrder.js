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
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CommonHeaderNew from "../common/CommonHeader_new";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateOrder from "./CreateOrder";
import RetailerHistory from "./RetailerHistory";
import { colors, font } from "../constants";
export default function RetailOrder({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

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
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <SafeAreaView style={{ flex: 1 }}>
        <CommonHeaderNew
          header_title={"ORDERS"}
          header_color={colors.YELLOW}
          navigation={navigation}
          // showSearch
          // onSearchPress={handleSearch}
        />
        <Tab.Navigator
          tabBar={(props) => <MyTabBar {...props} />}
          swipeEnabled={false}
        >
          <Tab.Screen name="Create Order" children={() => <CreateOrder />} />
          <Tab.Screen
            name="ORDERS HISTORY"
            children={() => <RetailerHistory />}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </View>
  );
}
