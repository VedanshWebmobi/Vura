import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../constants";

const Loader = (props) => {
  return props.loading ? (
    <View
      style={[
        {
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundColor: "#00000090",
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
    >
      <ActivityIndicator size="large" color={colors.YELLOW} />
    </View>
  ) : null;
};
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});

export { Loader };
