import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors, font, icon } from "../constants";
import { StatusBar } from "expo-status-bar";
import { SCREEN_WIDTH } from "../Themes/stylesCommon";

interface HeaderProps {
  showSideBar?: boolean;
  showBannerIcon?: boolean;
  showProfile?: boolean;
  showSignOut?: boolean;
  showBackButton?: boolean;
  navigation: any;
  headerText: string;
}

export default function Header(props: HeaderProps) {
  const {
    showSideBar,
    showBannerIcon,
    showProfile,
    showSignOut,
    navigation,
    showBackButton,
    headerText,
  } = props;

  if (!navigation) {
    throw new Error(
      "Navigation prop is required in Header component.\n\nMade with ❤️ by Vedansh "
    );
  }
  return (
    <SafeAreaView style={{}}>
      <StatusBar backgroundColor={colors.PRIMARY} />
      <View
        style={{
          backgroundColor: colors.PRIMARY,
          paddingHorizontal: 5,
          paddingVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 10,
            }}
          >
            {showSideBar && (
              <TouchableOpacity
                style={{}}
                onPress={() => navigation.toggleDrawer()}
              >
                <Image
                  source={icon.SIDE_BAR}
                  style={{ height: 40, width: 40 }}
                ></Image>
              </TouchableOpacity>
            )}

            {showBannerIcon && (
              <Image
                source={icon.BANNER_ICON}
                style={{ height: 40, width: 86 }}
              ></Image>
            )}

            {showBackButton && (
              <TouchableOpacity
                style={{ padding: 5, justifyContent: "center" }}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={icon.BACK_ICON}
                  style={{ height: 25, width: 25 }}
                ></Image>
              </TouchableOpacity>
            )}
            <View
              style={{
                justifyContent: "center",
                width: SCREEN_WIDTH / 1.8,
                alignItems: "center",
                marginTop: 2,
                //backgroundColor: "green",
                marginStart: 10,
              }}
            >
              <Text style={{ fontFamily: font.INTER_SEMIBOLD, fontSize: 18 }}>
                {headerText}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "flex-end",
              marginEnd: 10,
              gap: 15,
            }}
          >
            {showProfile && (
              <TouchableOpacity
                style={{
                  padding: 5,
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={icon.PROFILE}
                  style={{ height: 25, width: 25 }}
                ></Image>
              </TouchableOpacity>
            )}

            {showSignOut && (
              <TouchableOpacity
                style={{ padding: 5, justifyContent: "center" }}
              >
                <Image
                  source={icon.SIGNOUT}
                  style={{ height: 20, width: 20, marginTop: 2 }}
                ></Image>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
