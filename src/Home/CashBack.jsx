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

export default function CashBack({ navigation }) {
  return (
    <SafeAreaView style={[stylesCommon.blackbg,{backgroundColor:'#fff'}]}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <CommonHeaderNew header_title={"CASH BACKS"} header_color={colors.YELLOW} navigation={navigation}/>
      {/* <CommonHeader screen={"Product"} navigation={navigation} showBack /> */}
      <View style={{ flex: 1 , paddingBottom:100}}>
        <ImageZoom
          source={icon.CASHBACK_CHART}
          style={{
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
          }}
          minScale={0.5}
          maxScale={3}
          onInteractionStart={() => console.log("Interaction started")}
          onInteractionEnd={() => console.log("Interaction ended")}
          onPinchStart={() => console.log("Pinch gesture started")}
          onPinchEnd={() => console.log("Pinch gesture ended")}
          onPanStart={() => console.log("Pan gesture started")}
          onPanEnd={() => console.log("Pan gesture ended")}
          onResetAnimationEnd={() => console.log("Reset animation ended")}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
