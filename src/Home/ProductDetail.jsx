import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesCommon, { SCREEN_WIDTH } from "../Themes/stylesCommon";
import CommonHeader from "../common/CommonHeader";
import { colors, font, icon } from "../constants";
import Icons from "@expo/vector-icons/FontAwesome5";
import { Icon } from "react-native-paper";

export default function ProductDetail({ navigation, route }) {
  const { name, image, price, size, category, ProductCode } = route.params;

  return (
    <SafeAreaView style={stylesCommon.whitebg}>
      <CommonHeader navigation={navigation} showBack />
      <ScrollView>
        <View style={styles.container}>
          {/* Render your product details here using the route params */}
          <View style={{ height: 350 }}>
            <Image source={image} style={{ width: 350, height: 350 }} />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              width: SCREEN_WIDTH,
              padding: 10,
              justifyContent: "space-between",
              // backgroundColor: "white",

              elevation: 1,
            }}
          >
            <View style={{ gap: 5 }}>
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 20 }}>
                {name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: font.GoldPlay_SemiBold,
                    fontSize: 15,
                  }}
                >
                  ₹{price}
                </Text>
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    fontSize: 10,
                    fontFamily: font.GoldPlay_Medium,
                    color: colors.GREY_TXT,
                  }}
                >
                  ₹ 2000.00
                </Text>
              </View>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 15 }}>
                Size
              </Text>
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 15 }}>
                ({size}kg)
              </Text>
            </View>
          </View>

          {/* Render other product details as needed */}

          <View style={{ marginTop: 15, padding: 15, gap: 10 }}>
            <View style={{ marginBottom: 5 }}>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 15 }}
              >
                Product Information
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 13 }}>
                Category
              </Text>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 14 }}
              >
                Ceramic
              </Text>
            </View>
            <View style={{ height: 1, backgroundColor: colors.LINE_GREY }} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 13 }}>
                Product Code
              </Text>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 14 }}
              >
                {ProductCode}
              </Text>
            </View>
          </View>

          <View style={{ padding: 15 }}>
            <View style={{ marginBottom: 5 }}>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 15 }}
              >
                Characteristics
              </Text>
            </View>

            <View>
              <Text>
                <Text
                  style={{ fontFamily: font.GoldPlay_Regular, fontSize: 13 }}
                >
                  - C1 T compliant with EN 12004 standard{"\n"}- Type 1 T as per
                  IS 15477-2019{"\n"}- For ceramic and gres tiles adhesive{"\n"}
                  - No vertical slip{"\n"}- Application up to 10mm{"\n"}-
                  Prolonged workability{"\n"}- Adjustable{"\n"}- Excellent
                  workability{"\n"}- For larger vitrified tiles up to 4 sq.ft.
                </Text>
              </Text>
            </View>
          </View>

          <View>
            <View style={{ padding: 15 }}>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 15 }}
              >
                Documents & Downloads
              </Text>
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity>
                  <View style={{ gap: 5, alignItems: "center" }}>
                    <Image
                      source={icon.DOWNLOAD_ICON}
                      style={{ height: 50, width: 40 }}
                    />
                    <View
                      style={{
                        backgroundColor: colors.LINE_GREY,
                        width: SCREEN_WIDTH / 2.4,
                        padding: 5,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font.GoldPlay_Medium,
                          color: "black",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        TECHNICAL DATA SHEET
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={{ gap: 5, alignItems: "center" }}>
                    <Image
                      source={icon.DOWNLOAD_ICON}
                      style={{ height: 50, width: 40 }}
                    />
                    <View
                      style={{
                        backgroundColor: colors.LINE_GREY,
                        width: SCREEN_WIDTH / 2.4,
                        padding: 5,
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: font.GoldPlay_Medium,
                          color: "black",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        MATERIAL SAFETY DATA
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ padding: 15 }}>
              <TouchableOpacity>
                <View
                  style={{
                    gap: 5,

                    width: SCREEN_WIDTH / 2.4,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={icon.DOWNLOAD_ICON}
                      style={{ height: 50, width: 40 }}
                    />
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.LINE_GREY,
                      width: SCREEN_WIDTH / 2.4,
                      padding: 5,
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: font.GoldPlay_Medium,
                        color: "black",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      METHOD STATEMENT
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ padding: 15 }}>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 15 }}
              >
                User Guide
              </Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 15 }}
              >
                Substrate Preparation
              </Text>
              <Text style={{ fontFamily: font.GoldPlay_Regular, fontSize: 13 }}>
                Adhesive can be applied on even and compact substrates, free of
                any substances that reduce adherence (grease, bitumen, oil,
                paint, dust etc.). Concrete should be at least 1 month old.
                Cement screeds and plasters should be fully cured. Anhydrite
                (residual moisture below 0.5%) substrates should be mechanically
                roughened and cleaned from dust. Aerated concrete should be free
                from dust. Substrates must not be wet. Any existing dirt, loose
                layers and paint coating shall be mechanically removed.
                Absorbent substrates shall be dampen and remove excess water
                before application.
              </Text>

              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 15 }}
              >
                Application
              </Text>
              <Text style={{ fontFamily: font.GoldPlay_Regular, fontSize: 13 }}>
                Pour VURA FasTile into a container with the precisely measured
                amount of clean water and stir with a drill and mixer until a
                homogeneous mass without lumps is obtained. Leave for 5 min. and
                then stir again. Apply the mortar with a suitable notched
                trowel. Use the proper sized notch trowel to ensure full bedding
                in the tile. Do not soak tiles adhesive in the water. The back
                buttering method shall be used for larger tiles and for outdoor
                applications (ie. additionally a thin layer of the mortar should
                be spread on the tile's back side, contact area > 90%). Place
                the tiles only during the open time of the adhesive. Fresh
                excess mortar can be removed with water, hardened material can
                only be removed mechanically. Grouting on the wall can be done
                after 8 hrs in (Gres tiles) and after 24 hrs in porous tiles
                using VURA grouts. Floors are set to light traffic after approx.
                24 hrs. Expansion joints, joints at the corners of walls and
                floor and around sanitary equipment shall be filled with
                sealants or shall be treated with appropriate treatment.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",

    // justifyContent: "center",
  },
});
