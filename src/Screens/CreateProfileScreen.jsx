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
    Button,
    Dimensions,Animated,Easing
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { ExpoSecureKey, colors, font, icon } from "../constants";
  import React, { useEffect, useState, useRef } from "react";
  import * as Preference from "../StoreData/Preference";
  import { StackActions } from "@react-navigation/native";
  import stylesCommon from "../Themes/stylesCommon";

  export default function CreateProfileScreen({navigation}){
const [showView, setSHowView] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;
const scale = useRef(new Animated.Value(1)).current;
const stretchValue = useRef(new Animated.Value(1)).current;

const interpolatedRotateAnimation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-13deg'],
  });

  const interpolatedStretchAnimation = stretchValue.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0.90], // You can adjust the output range to control the stretching size
  });
  
  const stretch = (stretch_Value) => {
    Animated.sequence([
      Animated.timing(stretch_Value, {
        toValue: 2, // You can adjust this value to control the stretch level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(stretch_Value, {
        toValue: 1, // You can adjust this value to control the stretch level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ])
  .start(() => {
      // Reset the stretch value to 1
      stretch_Value.setValue(1);
    });
  };
  const rotateImage = (rota_value) => {
    Animated.sequence([
      Animated.timing(rota_value, {
        toValue: 2,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(rota_value, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ])
   .start(() => {
      // Reset the rotation to 0
      rota_value.setValue(0);
    });
  };
  const scaleText = (scale_value) => {
    Animated.sequence([
      Animated.timing(scale_value, {
        toValue: 0.9, // You can adjust this value to control the scale level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scale_value, {
        toValue: 1, // You can adjust this value to control the scale level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ])
  .start(() => {
      // Reset the scale to 1
      scale_value.setValue(1);
    });
  };


    return(
        <SafeAreaView style={{ flex: 1, backgroundColor:"#fff" }}>
        <StatusBar backgroundColor={colors.BLACK} />
         <View style={{justifyContent:'center',alignContent:'center', alignItems:'center', flex:1}}>
         <TouchableOpacity
        activeOpacity={1}
          onPress={() => {
            setSHowView(true);
             setTimeout(() =>{
                 setSHowView(false);
                 navigation.dispatch(StackActions.replace("AddPhoto"));
                //navigation.navigate("AddPhoto");
                 
             },450);
          rotateImage(rotation);
          stretch(stretchValue);
          scaleText(scale);
            //handleOnPress("Products")
          }
          }
          //underlayColor={colors.YELLOW}
          style={{ borderRadius: 30, shadowColor : 'rgba(0,0,0,0.1)', shadowOpacity:0.8, elevation:6, shadowRadius:15, shadowOffset:{width:1, height:13}}}
        >
          <View style={{}}>
          {
                showView &&   <Animated.View style={{ borderColor: "#ffffff",transform:[{scaleX:interpolatedStretchAnimation}],
                 width:221,height:50,borderRadius: 30,backgroundColor:colors.BLACK, position:"absolute", marginTop:3,}}></Animated.View>
            }
          
          <Animated.View
            style={{transform:[{scaleX:interpolatedStretchAnimation}],  borderRadius: 30,
              borderColor: "#ffffff", width:220,height:50,
              backgroundColor: colors.YELLOW, flexDirection:'row',}}
          >
            
            <View style={{width:30, }}></View>
            <Animated.Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#000000',alignSelf:"center",  alignContent:"center", transform:[{scale}]}]}>CREATE PROFILE</Animated.Text>
           
          </Animated.View>
          <Animated.Image
          source={icon.PROFILE_NEW} 
          style={ { transform: [{ rotate: interpolatedRotateAnimation }], height:50, width:50,position:'absolute' }}
        />
          </View> 
        </TouchableOpacity>
      
        <View style={{position:"absolute", bottom:30}}>
            <Text style={{fontFamily:font.GoldPlay_Regular, color:colors.BLACK, fontSize:12}}>If you Want To Set Your Profile Later, You Can <Text style={{fontFamily:font.GoldPlay_SemiBold, color:colors.BLACK, fontSize:13, textDecorationLine:'underline'}} onPress={()=>{navigation.navigate("HomeTab")}} >SKIP</Text></Text>
        </View>
            </View>   
        </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
  
 
  });  