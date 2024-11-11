import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Dimensions,
  StatusBar,
  Animated,
  Easing,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState, useRef } from "react";
import { colors, font, icon } from "../constants";
import stylesCommon from "../Themes/stylesCommon";

export default function InvoiceCard({
  item,
  buttons = true,
  onAccept,
  onClaim,
  isClaim = false,
  isEdit = false,
  onEditPress,
}) {
  const [showView, setSHowView] = useState(false);
  const SCREEN_DIMENSIONS = Dimensions.get("window");
  const scale = useRef(new Animated.Value(1)).current;
  const stretchValue = useRef(new Animated.Value(1)).current;
  const interpolatedStretchAnimation = stretchValue.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0.9], // You can adjust the output range to control the stretching size
  });
  const stretch = (stretch_Value) => {
    Animated.sequence([
      Animated.timing(stretch_Value, {
        toValue: 2, // You can adjust this value to control the stretch level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(stretch_Value, {
        toValue: 1, // You can adjust this value to control the stretch level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Reset the stretch value to 1
      stretch_Value.setValue(1);
    });
  };

  const scaleText = (scale_value) => {
    Animated.sequence([
      Animated.timing(scale_value, {
        toValue: 0.9, // You can adjust this value to control the scale level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(scale_value, {
        toValue: 1, // You can adjust this value to control the scale level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Reset the scale to 1
      scale_value.setValue(1);
    });
  };

  return (
    <View
      style={{
        gap: 5,
        padding: 18,
        elevation: 2,

        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <Text
        style={{
          color: colors.INVOICE_GREY,
          fontFamily: font.GoldPlay_Medium,
          fontSize: 12,
        }}
      >
        Invoice No.
      </Text>
      <Text
        style={{
          fontFamily: font.GoldPlay_SemiBold,
          fontSize: 26,
        }}
      >
        {item.invoiceNo}
      </Text>
      <Text
        style={{
          fontFamily: font.GoldPlay_Medium,
          fontSize: 13,
          marginTop: 5,
        }}
      >
        {item.date}
      </Text>

      {isEdit && (
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
          }}
          onPress={onEditPress}
        >
          <Image
            source={icon.EDIT_DIS}
            style={{ width: 25, height: 25, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      )}
      <View
        style={{
          height: 1,
          backgroundColor: colors.YELLOW,
          width: "100%",
          marginTop: isEdit ? 8 : 15,
          marginVertical: 15,
        }}
      />

      {isEdit ? (
        <View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 13 }}>
              Claimed Title
            </Text>

            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 15 }}>
              {item.title}
            </Text>
          </View>
          <View style={{ gap: 8, marginTop: 15, marginBottom: 35 }}>
            <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 13 }}>
              Description
            </Text>

            <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 13 }}>
              {item.desc}
            </Text>
          </View>
        </View>
      ) : (
        ""
      )}

      {isClaim ? (
        <View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 15 }}>
              {item.title}
            </Text>
          </View>
          <View style={{ gap: 8, marginTop: 15, marginBottom: 35 }}>
            <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 13 }}>
              {item.desc}
            </Text>
          </View>
        </View>
      ) : (
        ""
      )}

      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 30,
        }}
      >
        <View>
          <Text
            style={{
              color: colors.INVOICE_GREY,
              fontFamily: font.GoldPlay_Medium,
              fontSize: 13,
            }}
          >
            Total Amount
          </Text>
          <Text
            style={{
              fontFamily: font.GoldPlay_SemiBold,
              fontSize: 22,
              marginTop: 5,
            }}
          >
            {item.totalAmount}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            borderRadius: 30,
            backgroundColor: colors.YELLOW,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            paddingHorizontal: 12,
          }}
        >
          <Image
            source={icon.PDF_DIS}
            style={{ width: 20, height: 20, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontFamily: font.GoldPlay_SemiBold,
              fontSize: 14,
            }}
          >
            PDF
          </Text>
        </View>
      </View>

      {buttons && (
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 30,

              backgroundColor: "#000",
              width: SCREEN_DIMENSIONS.width / 2.8,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onAccept}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: font.GoldPlay_SemiBold,
                fontSize: 16,
              }}
            >
              ACCEPT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderRadius: 30,

              borderColor: "#000",
              borderWidth: 2,
              backgroundColor: "#fff",
              width: SCREEN_DIMENSIONS.width / 2.8,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onClaim}
          >
            <Text
              style={{
                color: "#000",
                fontFamily: font.GoldPlay_SemiBold,
                fontSize: 16,
              }}
            >
              CLAIM
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

{
  /* <TouchableOpacity
activeOpacity={1}
onPress={() => {
  setSHowView(true);
  setTimeout(() => {
    setSHowView(false);
  }, 450);

  stretch(stretchValue);
  scaleText(scale);
  //handleOnPress("Products")
}}
//underlayColor={colors.YELLOW}
style={{ borderRadius: 30, marginTop: 10 }}
>
<View style={{}}>
  {showView && (
    <Animated.View
      style={{
        borderColor: "#ffffff",
        transform: [{ scaleX: interpolatedStretchAnimation }],
        width: SCREEN_DIMENSIONS.width - 60,
        height: 50,
        borderRadius: 30,
        backgroundColor: colors.YELLOW,
        position: "absolute",
        marginTop: 3,
        marginStart: 2,
      }}
    ></Animated.View>
  )}

  <Animated.View
    style={{
      transform: [{ scaleX: interpolatedStretchAnimation }],
      borderRadius: 30,
      borderColor: "#ffffff",
      width: SCREEN_DIMENSIONS.width / 2.2,
      height: 50,
      backgroundColor: colors.BLACK,
      flexDirection: "row",
    }}
  >
    <View style={{ width: 0 }}></View>
    <Animated.Text
      style={[
        stylesCommon.preButtonLabelStyle,
        {
          flex: 1,
          textAlign: "center",
          color: "#fff",
          alignSelf: "center",
          alignContent: "center",
          transform: [{ scale }],
        },
      ]}
    >
      ACCEPT
    </Animated.Text>
  </Animated.View>
</View>
</TouchableOpacity>

<TouchableOpacity
activeOpacity={1}
onPress={() => {
  setSHowView(true);
  setTimeout(() => {
    setSHowView(false);
  }, 450);

  stretch(stretchValue);
  scaleText(scale);
  //handleOnPress("Products")
}}
//underlayColor={colors.YELLOW}
style={{ borderRadius: 30, marginTop: 10 }}
>
<View style={{}}>
  {showView && (
    <Animated.View
      style={{
        borderColor: "#ffffff",
        transform: [{ scaleX: interpolatedStretchAnimation }],
        width: SCREEN_DIMENSIONS.width - 60,
        height: 50,
        borderRadius: 30,
        backgroundColor: colors.YELLOW,
        position: "absolute",
        marginTop: 3,
        marginStart: 2,
      }}
    ></Animated.View>
  )}

  <Animated.View
    style={{
      transform: [{ scaleX: interpolatedStretchAnimation }],
      borderRadius: 30,
      borderColor: "#000",
      width: SCREEN_DIMENSIONS.width /2.2,
      height: 50,
      backgroundColor: "#fff",
      flexDirection: "row",
    }}
  >
    <View style={{ width: 0 }}></View>
    <Animated.Text
      style={[
        stylesCommon.preButtonLabelStyle,
        {
          flex: 1,
          textAlign: "center",
          color: "#000",
          alignSelf: "center",
          alignContent: "center",
          transform: [{ scale }],
        },
      ]}
    >
      CLAIM
    </Animated.Text>
  </Animated.View>
</View>
</TouchableOpacity> */
}

const styles = StyleSheet.create({});
