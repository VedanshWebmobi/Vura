import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    StatusBar,
    Alert,
    Platform,
    ScrollView,
    BackHandler,
    Dimensions
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { ExpoSecureKey, colors, font, icon } from "../constants";
  import React, { useEffect, useState } from "react";
  import * as Preference from "../StoreData/Preference";
  import { StackActions } from "@react-navigation/native";
  export default function LoginSuccessScreen({navigation}){
    
    useEffect(() =>{
        setTimeout(() => {
            Preference.getValueFor(ExpoSecureKey.IS_REGISTER).then((value)=>{
                if(value === "false"){
                    navigation.dispatch(StackActions.replace("CreateProfile"));
                }
                else{

                }
            } )

          }, 4000);
    },[])

    const SCREEN_DIMENSIONS = Dimensions.get('window');
        return(
            <SafeAreaView style={{ flex: 1, backgroundColor:colors.BLACK }}>
            <StatusBar backgroundColor={colors.BLACK} />
            <View >
            <Image source={require('../../assets/celebration.gif')} style={{width:'100%',height:'65%'}}/>
            <View style={{height:'35%', justifyContent:"center"}}>
            <Text style={{color:colors.YELLOW,textAlign:"center", fontFamily:font.GoldPlay_SemiBold, fontSize:40}}>Successfully{"\n"}Logged In</Text>
            </View>
            </View>
            </SafeAreaView>
        );
  }