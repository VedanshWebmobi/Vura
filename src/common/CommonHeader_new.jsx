import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { colors, font, icon } from "../constants";
  import stylesCommon, {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
  } from "../Themes/stylesCommon";
  import { Ionicons } from '@expo/vector-icons';
import { shadow } from "react-native-paper";

  export default function CommonHeaderNew({
    navigation,
    showBack = true,
    header_color,
    header_title,
  header_title_color,
  showSearch,
  onSearchPress,
onWalletPress,
onHandleBackPress}){
    return(
        <View style={{backgroundColor:header_color, 
        height:60, width:'100%',
        justifyContent:'center', 
        alignItems:'center'}}>
           {
            (showBack && header_title) ? 
            <Text style={{
              fontFamily:font.GoldPlay_SemiBold, 
              color:colors.BLACK,
              fontSize:20, }}>{header_title}</Text>
              :
              <Image
              source={icon.BLACK_ICON}
              style={{
                height: SCREEN_HEIGHT / 20,
                width: SCREEN_WIDTH / 4,
                resizeMode: "contain",
              }}
            /> 
           }   
        
           <View 
                style={{position:"absolute",
                  height:60,
                  width:60,
                  start:0,
                  alignItems:"center",
                  justifyContent:"center"}}>

           <Ionicons 
                name={showBack ? "arrow-back" : "menu"} 
                size={24} 
                color={header_title_color == undefined ? colors.BLACK : header_title_color}  
                style={{padding:10}} 
                onPress={()=>{header_title === "SCAN QR CODE" ? onHandleBackPress()  : (showBack ? navigation.goBack() : navigation.navigate("CustomDrawer"));}} />   

            </View> 
            {
              showSearch && 
              <TouchableOpacity    style={{position:"absolute",
              height:60,
              width:60,
              end:0,
              alignItems:"center",
              justifyContent:"center"}}
              onPress={()=>{
                  onSearchPress()
              }}
              > 
                <Image source={require('../../assets/search.png')} style={{height:28,width:28, resizeMode:"contain"}}/>
              </TouchableOpacity>
            }
            {
              !showBack && 
              <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => {onWalletPress()}}
              style={{position:"absolute",
                height:60,
                width:60,
                end:0,
                alignItems:"center",
                justifyContent:"center"}}>
                <Image source={require('../../assets/wallet_new.png')} 
                style={{height:24, width:24, resizeMode:'contain'}}/> 
          </TouchableOpacity> 
            }
           
        </View>
    );
  }