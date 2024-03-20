import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../common/Header";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../constants";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <Header
        showSideBar
        showBannerIcon
        showProfile
        showSignOut
        navigation={navigation}
      />
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
