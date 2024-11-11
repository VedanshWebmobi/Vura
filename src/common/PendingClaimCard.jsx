import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, font } from "../constants";
import { Title } from "react-native-paper";

export default function PendingClaimCard({ item, onPress, isClaim = false }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        elevation: 0,
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 12,
      }}
      onPress={onPress}
    >
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 14 }}>
          {item.invoiceNo}
        </Text>
        <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 14 }}>
          {isClaim ? item.date : ""}
        </Text>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: colors.YELLOW,
          width: "100%",
          marginVertical: 15,
        }}
      />

      <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 14 }}>
        {item.title}
      </Text>
      <Text
        style={{
          fontFamily: font.GoldPlay_Medium,
          fontSize: 13,
          marginTop: 10,
        }}
        numberOfLines={2}
      >
        {item.desc}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
