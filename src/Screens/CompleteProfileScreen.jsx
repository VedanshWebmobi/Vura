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
import CommonHeaderNew from "../common/CommonHeader_new";

  export default function CompleteProfileScreen({navigation,statusColor}){
    const SCREEN_DIMENSIONS = Dimensions.get('window');
    const [showView, setSHowView] = useState(false);

    const [screen, setScreen] = useState("");
    const [aadharNo, setAadharNo] = useState("");
    const rotation = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const stretchValue = useRef(new Animated.Value(1)).current;

    useEffect(()=>{
      const GetToken = async() =>{
        const token = await Preference.getValueFor(ExpoSecureKey.TOKEN);
        const StoreDetail = await Preference.getPreference("profile");
         console.log(token);
         console.log(StoreDetail); 
        if (token) {
           if(StoreDetail && (StoreDetail.aadharCardNo.length == 0 || StoreDetail.document.length == 0)){
            setAadharNo(StoreDetail.aadharCardNo);
            setScreen("AddAdhar");
           }
           else if(StoreDetail == null){
            setScreen("AddAdhar");
           }
           else{
            setAadharNo(StoreDetail.aadharCardNo);
            setScreen("PersonalDetails");
           }
          
        } else {
          setScreen("PreLogin");
        
        }
      } 
      GetToken();
    },[])

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
        <StatusBar backgroundColor={statusColor} />
        <CommonHeaderNew navigation={navigation} header_title=" "/>
        <View style={{flex:1}}>
          <View style={{alignItems:'center',justifyContent:'center', flex:4, }}>
             <Text style={{fontSize:22, fontFamily:font.GoldPlay_SemiBold,color:colors.BLACK}}>Complete Your Profile</Text>
             <Text style={{fontSize:15, fontFamily:font.GoldPlay_Regular,color:colors.BLACK, textAlign:'center',padding:20}}>Please complete your profile first to {"\n"}access further section.</Text>
             <TouchableOpacity
          activeOpacity={1}
            onPress={() => {
              setSHowView(true);
               setTimeout(() =>{
                   setSHowView(false);
                    navigation.navigate(screen,{aadharNo : aadharNo});
                  // handleNext()
               },450);
          //  rotateImage(rotation);
            stretch(stretchValue);
            scaleText(scale);
              //handleOnPress("Products")
            }
            }
            //underlayColor={colors.YELLOW}
            style={{ borderRadius: 30, 
          marginTop:'20%'
              }}
          >
            <View style={{}}>
            {
                  showView &&   <Animated.View style={{ borderColor: "#ffffff",transform:[{scaleX:interpolatedStretchAnimation}],
                   width:SCREEN_DIMENSIONS.width-40,height:50,borderRadius: 30,backgroundColor:colors.YELLOW, position:"absolute", marginTop:3,marginStart:2}}></Animated.View>
              }
            
            <Animated.View
              style={{transform:[{scaleX:interpolatedStretchAnimation}],  borderRadius: 30,
                borderColor: "#ffffff", width:SCREEN_DIMENSIONS.width-39,height:50,
                backgroundColor: colors.BLACK, flexDirection:'row',}}
            >
              
              <View style={{width:0, }}></View>
              <Animated.Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#fff',alignSelf:"center",  alignContent:"center", transform:[{scale}]}]}>COMPLETE PROFILE</Animated.Text>
             
            </Animated.View>
            </View> 
          </TouchableOpacity>
          </View>
       
        </View>
        </SafeAreaView>
    );
  }
