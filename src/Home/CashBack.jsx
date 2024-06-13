import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image,ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import CommonHeader from "../common/CommonHeader";
import { useFocusEffect } from '@react-navigation/native';
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import { colors, font, icon } from "../constants";
import CommonHeaderNew from "../common/CommonHeader_new";

export default function CashBack({ navigation }) {
  const [statusColor, setStatusColor] = useState(colors.YELLOW);
  const data=[{"name": "VURA KrafTile (G)", "point" : "8"},
  {"name": "VURA FasTile (G)", "point" : "15"},
  {"name": "VURA FasTile+ (G)", "point" : "20"},
  {"name": "VURA FasTile+ (W)", "point" : "20"},
  {"name": "VURA FasTone (G)", "point" : "25"},
  {"name": "VURA FasTone (W)", "point" : "25"},
  {"name": "VURA FasTone S1 (G)", "point" : "50"},
  {"name": "VURA FasTone S1 (W)", "point" : "55"},
  {"name": "VURA FasTone S2 (G)", "point" : "80"},
  {"name": "VURA FasTone S2 (W)", "point" : "90"},
  {"name": "VURA Lastik (5Kg. Pack)", "point" : "120"},
  {"name": "VURA Oxi (1Kg. Pack)", "point" : "60"},
  {"name": "VURA Oxi (5Kg. Pack)", "point" : "200"},
]
  useFocusEffect(
    React.useCallback(() => {
      setStatusColor(colors.YELLOW);

      return () => {


      };
    
    }, [navigation]));
    const HeaderView =() =>{
      return (
      <View>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", minHeight:40, paddingStart:12, paddingEnd:12}}>
          <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:16, color:"#000"}}>PRODUCT</Text>
          <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:16, color:"#000"}}>POINTS</Text>
        </View>
        <View style={{height:1, backgroundColor:colors.YELLOW}} />
        </View>  
      );
    }

    const ChildView =({name, point, index}) => {
      return (
      <View style={{paddingStart:12, paddingEnd:12,flexDirection:"row", justifyContent:"space-between", alignItems:"center", minHeight:40, backgroundColor:index%2 != 0? "#fff" : "#f2f2f2"}}>
      <Text style={{fontFamily:font.GoldPlay_Medium, fontSize:14, color:"#000"}}>{name}</Text>
      <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:14, color:"#000"}}>{point}</Text>
    </View>
      );
    }

  return (
    <>
    <SafeAreaView style={{flex:0, backgroundColor:colors.YELLOW}} />
    <SafeAreaView style={[stylesCommon.blackbg,{backgroundColor:'#f2f2f2'}]}>
      <StatusBar backgroundColor={statusColor} />
      <CommonHeaderNew header_title={"CASH BACKS"} header_color={colors.YELLOW} navigation={navigation}/>
      {/* <CommonHeader screen={"Product"} navigation={navigation} showBack /> */}
      <ScrollView>
      <View style={{ flex: 1 , paddingBottom:Platform.OS == 'ios'? 60 : 100, }}>

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
        {/* <Image source={icon.CASHBACK_CHART}   style={{
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
           zIndex:0, resizeMode:'stretch'
          }}/> */}
          <View style={{backgroundColor:'#000', padding:16}}>
            <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:18, color:"#fff", alignSelf:'center'}}>
            WOW SAB THIK HAI,
            </Text>
            <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:40, color:colors.YELLOW, alignSelf:'center', textAlign:'left', alignSelf:"flex-start", marginTop:5}}>
            CASH BACKS

            </Text>
            <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:40, color:colors.YELLOW, alignSelf:'center', textAlign:'left', alignSelf:"flex-end", marginTop:0}}>
          KITNA MILEGA?
            </Text>
            <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:18, color:"#fff", alignSelf:'center', marginTop:5}}>
            SCHEME
            </Text>
          </View>
          <View style={{padding:10 }}>

          <HeaderView />
          {
            data.map((item, index) =>{
            return(  
              <ChildView name={item.name} point={item.point} index={index}/>
            )
            })
          }
          <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:13, color:"#000000", alignSelf:'center', padding:10,marginTop:10, textAlign:'center'}}>Cashback Available in 20Kg. Bag Packings Only</Text>
          </View>
      </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
