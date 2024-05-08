import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import CommonHeader from "../common/CommonHeader";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import { colors, icon } from "../constants";
import CommonHeaderNew from "../common/CommonHeader_new";

export default function Offers({ navigation }) {
  return (
    <SafeAreaView style={stylesCommon.blackbg}>
      <StatusBar backgroundColor={colors.YELLOW} />
      {/* <CommonHeader screen={"Product"} navigation={navigation} showBack /> */}
      <CommonHeaderNew navigation={navigation} showBack={true} header_title="OFFERS" header_color={colors.YELLOW}/>
      <ImageZoom
        source={icon.OFFER_CHART}
        style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
        minScale={0.5}
        maxScale={2}
        onInteractionStart={() => console.log("Interaction started")}
        onInteractionEnd={() => console.log("Interaction ended")}
        onPinchStart={() => console.log("Pinch gesture started")}
        onPinchEnd={() => console.log("Pinch gesture ended")}
        onPanStart={() => console.log("Pan gesture started")}
        onPanEnd={() => console.log("Pan gesture ended")}
        onResetAnimationEnd={() => console.log("Reset animation ended")}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
