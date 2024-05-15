import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import CommonHeader from "../common/CommonHeader";
import { useFocusEffect } from '@react-navigation/native';
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import { colors, icon } from "../constants";
import CommonHeaderNew from "../common/CommonHeader_new";

export default function CashBack({ navigation }) {
  const [statusColor, setStatusColor] = useState(colors.YELLOW);
  useFocusEffect(
    React.useCallback(() => {
      setStatusColor(colors.YELLOW);

      return () => {


      };
    
    }, [navigation]));


  return (
    <SafeAreaView style={[stylesCommon.blackbg,{backgroundColor:'#fff'}]}>
      <StatusBar backgroundColor={statusColor} />
      <CommonHeaderNew header_title={"CASH BACKS"} header_color={colors.YELLOW} navigation={navigation}/>
      {/* <CommonHeader screen={"Product"} navigation={navigation} showBack /> */}
      <ScrollView>
      <View style={{ flex: 1 , paddingBottom:100}}>

        {/* <ImageZoom
          source={icon.CASHBACK_CHART}
          style={{
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
           zIndex:0, resizeMode:'stretch'
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
        /> */}
        <Image source={icon.CASHBACK_CHART}   style={{
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
           zIndex:0, resizeMode:'stretch'
          }}/>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
