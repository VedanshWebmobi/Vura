import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  Dimensions,Animated,Easing
} from "react-native";
import React, { useState, useEffect,useRef } from "react";
import { colors, font, icon } from "../constants";
import { Button } from "react-native-paper";
import stylesCommon from "../Themes/stylesCommon";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable';

export default function PreLogin({ navigation }) {
  const MONEY_DIMENSIONS = {width: 49, height: 26};
const SCREEN_DIMENSIONS = Dimensions.get('window');
const SCREEN_HEIGHT = SCREEN_DIMENSIONS.height;
console.log("Height", SCREEN_HEIGHT +", "+(SCREEN_HEIGHT/3) );
const WIGGLE_ROOM = 50;
const rotation = useRef(new Animated.Value(0)).current;
const scale = useRef(new Animated.Value(1)).current;
const stretchValue = useRef(new Animated.Value(1)).current;

const scale_cash = useRef(new Animated.Value(1)).current;
const scale_offer = useRef(new Animated.Value(1)).current;

const rotation_cash = useRef(new Animated.Value(0)).current;
const rotation_offer = useRef(new Animated.Value(0)).current;

const stretchValue_cash = useRef(new Animated.Value(1)).current;
const stretchValue_offer = useRef(new Animated.Value(1)).current;

  const [selectedButton, setSelectedButton] = useState(null);
  const [buttonState, setButtonState] = useState({
    Products: false,
    CashBack: false,
    Offers: false,
    Login: false,
  });

  useEffect(() => {
    if (navigation.routeName === "PreLogin") {
      // Check for routeName
      const backHandlerSubscription = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

      return () => backHandlerSubscription.remove();
    }
  }, [navigation]); //

  function handleBackPress() {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  }
  const handleOnPress = (buttonName) => {
    setButtonState({
      ...buttonState,
      [buttonName]: true,
    });
    if (buttonName === "Login") {
      // setButtonPressed(true);
      setTimeout(() => {
        navigation.navigate("Category");
        setButtonState({
          Products: false,
          CashBack: false,
          Offers: false,
          Login: false,
        });
      }, 200);
    }
    if (buttonName === "Offers") {
      navigation.navigate("Offers");
    }

    if (buttonName === "CashBack") {
      navigation.navigate("CashBack");
    }

    if (buttonName === "Products") {
      navigation.navigate("Product");
    }
  };
  const interpolatedRotateAnimation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-20deg'],
  });

  const interpolatedRotateAnimation_cash = rotation_cash.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-20deg'],
  });

  const interpolatedRotateAnimation_offer = rotation_offer.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-20deg'],
  });

  const interpolatedStretchAnimation = stretchValue.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0.90], // You can adjust the output range to control the stretching size
  });

  const interpolatedStretchAnimation_cash = stretchValue_cash.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0.90], // You can adjust the output range to control the stretching size
  });
  const interpolatedStretchAnimation_offer = stretchValue_offer.interpolate({
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
     
        alignItems: "center",
        gap: 50,
      }}
    >
      <StatusBar backgroundColor={"black"} />

      <View style={{height:(SCREEN_HEIGHT/5), alignItems:'center', justifyContent:'center', alignContent:'center'}}>
        <Text style={{width:40, height:10, backgroundColor:colors.YELLOW,borderRadius:2}}/>
      </View>
    <View style={{flex:1,  justifyContent:"center"}}>
     
      <View >
        <TouchableOpacity
        activeOpacity={1}
          onPress={() => {
          rotateImage(rotation);
          stretch(stretchValue);
          scaleText(scale);
            //handleOnPress("Products")
          }
          }
          //underlayColor={colors.YELLOW}
          style={{ borderRadius: 30 }}
        >
          <View style={{}}>
          <Animated.View
            style={{transform:[{scaleX:interpolatedStretchAnimation}],  borderRadius: 30,
              borderColor: "#ffffff", width:190,height:50,
              backgroundColor: "#FFFFFF", flexDirection:'row',}}
          >
            
            <View style={{width:30, }}></View>
            <Animated.Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#000000',alignSelf:"center",  alignContent:"center", transform:[{scale}]}]}>PRODUCTS</Animated.Text>
           
          </Animated.View>
          <Animated.Image
          source={icon.PRODUCT} 
          style={ { transform: [{ rotate: interpolatedRotateAnimation }], height:50, width:50,position:'absolute' }}
        />
          </View> 
        </TouchableOpacity>
   
        <TouchableOpacity
        activeOpacity={1}
          onPress={() =>{ 
            rotateImage(rotation_cash);
            stretch(stretchValue_cash);
            scaleText(scale_cash);
          //  handleOnPress("CashBack")
          }}
         // underlayColor={colors.YELLOW}
          style={{ borderRadius: 15, marginTop:30 }}
        >
          <View style={{}}>
          <Animated.View
            style={{transform:[{scaleX:interpolatedStretchAnimation_cash}],  borderRadius: 30,
              borderColor: "#ffffff", width:190,height:50,
              backgroundColor: "#FFFFFF", flexDirection:'row',}}
          >
            
            <View style={{width:30, }}></View>
            <Animated.Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#000000',alignSelf:"center",  alignContent:"center", transform:[{scale:scale_cash}]}]}>CASH BACK</Animated.Text>
           
          </Animated.View>
          <Animated.Image
          source={icon.CASHBACK} 
          style={ { transform: [{ rotate: interpolatedRotateAnimation_cash }], height:50, width:50,position:'absolute' }}
        />
          </View>
        
        </TouchableOpacity>
       
        <TouchableOpacity
        activeOpacity={1}
          onPress={() =>{ 
          //  handleOnPress("Offers")
          rotateImage(rotation_offer);
          stretch(stretchValue_offer);
          scaleText(scale_offer);
          }}
          underlayColor={colors.YELLOW}
          style={{ borderRadius: 15, marginTop:30 }}
        >
       <View style={{}}>
          <Animated.View
            style={{transform:[{scaleX:interpolatedStretchAnimation_offer}],  borderRadius: 30,
              borderColor: "#ffffff", width:190,height:50,
              backgroundColor: "#FFFFFF", flexDirection:'row',}}
          >
            
            <View style={{width:30, }}></View>
            <Animated.Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#000000',alignSelf:"center",  alignContent:"center", transform:[{scale:scale_offer}]}]}>OFFERS</Animated.Text>
           
          </Animated.View>
          <Animated.Image
          source={icon.OFFERS} 
          style={ { transform: [{ rotate: interpolatedRotateAnimation_offer }], height:50, width:50,position:'absolute' }}
        />
          </View>
        </TouchableOpacity>
        </View>
      </View>  
      <View style={{height:(SCREEN_HEIGHT/4), justifyContent:"center",   }}>
      <View style={stylesCommon.preLoginContainerView}>
        <TouchableHighlight
          onPress={() => handleOnPress("Login")}
        //  underlayColor={colors.YELLOW}
          style={{ borderRadius: 15 }}
        >
        
            <Text style={[stylesCommon.preButtonLabelStyle,{textDecorationLine:'underline', color:colors.YELLOW}]}>
              GO TO LOGIN PAGE
            </Text>
         
        </TouchableHighlight>
      </View>
      </View>
    </View>
  );
}
