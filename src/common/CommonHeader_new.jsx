import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
  } from "react-native";
  import React from "react";
  import { colors, font, icon } from "../constants";
  import stylesCommon, {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
  } from "../Themes/stylesCommon";
  import { Ionicons } from '@expo/vector-icons';

  export default function CommonHeaderNew({navigation,showBack,header_color, header_title}){
    return(
        <View style={{backgroundColor:header_color, height:60, width:'100%',justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontFamily:font.GoldPlay_SemiBold, color:colors.BLACK, fontSize:20, }}>{header_title}</Text>
           <View style={{position:"absolute", height:60, width:60,start:0,alignItems:"center", justifyContent:"center"}}>
           <Ionicons name="arrow-back" size={24} color={colors.BLACK} style={{padding:10}} onPress={()=>{console.log(navigation.goBack())}} /> 
            </View> 
        </View>
    );
  }