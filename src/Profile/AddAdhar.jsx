import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,Animated,Easing, Dimensions
} from "react-native";
import stylesCommon, { SCREEN_WIDTH } from "../Themes/stylesCommon";
import CommonHeader from "../common/CommonHeader";
import { TextInput } from "react-native-paper";
import { colors, font } from "../constants";
import { useRoute } from "@react-navigation/native";
import * as Preference from "../StoreData/Preference";

import { TouchableHighlight } from "react-native-gesture-handler";
import CommonHeaderNew from "../common/CommonHeader_new";

export default function AddAdhar({ navigation }) {
  const SCREEN_DIMENSIONS = Dimensions.get('window');
  const [aadharNumber, setAadharNumber] = useState("");
  const [showView, setSHowView] = useState(false);
  const route = useRoute();
  const { profilePhoto } = route.params;
  console.log("ProfilePhot", profilePhoto);
  const inputRefs = useRef([]);
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

  useEffect(() => {
    // Retrieve Aadhaar number from AsyncStorage (if implemented)
    const getAadharNumber = async () => {
      try {
        const storedDetails = await Preference.getPreference("profile");

        if (storedDetails) {
          const { aadharCardNo } = storedDetails;
          if (aadharCardNo !== "") {
            setAadharNumber(aadharCardNo);
          }
        }
      } catch (error) {
        console.error("Error retrieving personal details:", error);
      }
    };

    getAadharNumber();
  }, []);

  useEffect(() => {
    if (aadharNumber) {
      // Automatically focus the next TextInput when one is filled
      if (aadharNumber.length === 4 || aadharNumber.length === 8) {
        // Focus the next TextInput
        inputRefs.current[aadharNumber.length / 4].focus();
      }
    }
  }, [aadharNumber]);

  const handleNext = () => {
    // if (aadharNumber.length !== 12) {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "ENTER A VALID AADHAR NO",
    //     button: "close",
    //   });
    //   return;
    // }
    console.log("Yeh ja raha tha bhai", aadharNumber);
    console.log(profilePhoto);
    navigation.navigate("PersonalDetails", {
      aadharNo: aadharNumber,
      profilePhoto: profilePhoto,
    });
  };

  return (
    <View style={[stylesCommon.yellowbg,{backgroundColor:'#f2f2f2'}]}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <CommonHeaderNew header_title={"CREATE PROFILE"}
      header_color={colors.YELLOW} 
      navigation ={navigation}
      />
      {/* <CommonHeader navigation={navigation} showBack /> */}
      <View style={{ alignItems: "center", flex: 4,  }}>
          <View style={{height:100, width:130, margin:30, alignItems:"center", justifyContent:'center'}}>
            <Image source={{ uri: profilePhoto }} style={{height:100, width:100,borderRadius:50, borderWidth:2, borderColor:colors.YELLOW}}/>
            <Image source={require('../../assets/button_.png')} style={{height:35, width:35, resizeMode:'contain', position:'absolute', bottom:0, right:5}}/>  
          </View>
        <Text
          style={{
            fontFamily: font.GoldPlay_SemiBold,
            fontSize: 16,
            marginTop: 40,
            color: colors.BLACK,
          }}
        >
          Enter Your Aadhar Card Number
        </Text>
        <View style={[styles.inputRow,{marginTop:10}]}>
          {[...Array(3)].map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={aadharNumber ? aadharNumber.substr(index * 4, 4) : ""}
              mode="outlined"
              
              outlineStyle={{
                borderColor: "#999999",
                backgroundColor: "transparent",
                borderRadius: 15,
                borderWidth:1
              }}
              keyboardType="numeric"
              style={styles.input}
              placeholder="1234"
              placeholderTextColor={colors.LIGHT_GREY}
              contentStyle={{
                fontFamily: font.GoldPlay_Medium,
                fontSize: 25,
                textAlign:'center',
                backgroundColor:'#fff',
                borderRadius: 15,
                borderColor: "#999999",
                borderWidth:1

              }}
              
              onChangeText={(text) => {
                // Handle the case where aadharNumber is null or empty
                if (!aadharNumber) {
                  setAadharNumber(text);
                  return; // Exit the function if aadharNumber is null or empty
                }

                const newAadharNumber =
                  aadharNumber.substr(0, index * 4) +
                  text +
                  aadharNumber.substr((index + 1) * 4);

                console.log("====================================");
                console.log(newAadharNumber);
                console.log("====================================");
                setAadharNumber(newAadharNumber);
              }}
              maxLength={4}
              cursorColor="white"
            />
          ))}
        </View>
        {
          aadharNumber.length == 12 ? 
          <TouchableOpacity
          activeOpacity={1}
            onPress={() => {
              setSHowView(true);
               setTimeout(() =>{
                   setSHowView(false);
                   handleNext()
               },450);
            rotateImage(rotation);
            stretch(stretchValue);
            scaleText(scale);
              //handleOnPress("Products")
            }
            }
            //underlayColor={colors.YELLOW}
            style={{ borderRadius: 30, 
              marginTop:50
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
              <Animated.Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#fff',alignSelf:"center",  alignContent:"center", transform:[{scale}]}]}>CONFIRM</Animated.Text>
             
            </Animated.View>
            </View> 
          </TouchableOpacity>
          :
          <View
          style={{  borderRadius: 30,
            borderColor: "#ffffff", width:SCREEN_DIMENSIONS.width-39,height:50,
            backgroundColor: "#cccccc", flexDirection:'row', marginTop:50}}
        >
          
          <View style={{width:0, }}></View>
          <Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#999999',alignSelf:"center",  alignContent:"center", }]}>CONFIRM</Text>
         
        </View>
        }
      
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
      <View style={{position:"absolute", bottom:30}}>
            <Text style={{fontFamily:font.GoldPlay_Regular, color:colors.BLACK, fontSize:12}}>If you Want To Set Your Profile Later, You Can <Text style={{fontFamily:font.GoldPlay_SemiBold, color:colors.BLACK, fontSize:13, textDecorationLine:'underline'}} onPress={()=>{}} >SKIP</Text></Text>
        </View>
        {/* <TouchableHighlight
          onPress={handleNext}
          style={{ backgroundColor: "transparent", borderRadius: 10 }}
          underlayColor={"black"}
        >
          <View
            style={{
              paddingVertical: 8,
              //backgroundColor: "black",
              borderColor: "white",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              width: SCREEN_WIDTH / 3,
            }}
          >
            <Text
              style={[
                stylesCommon.preButtonLabelStyle,
                { textAlign: "center", fontSize: 16 },
              ]}
            >
              NEXT
            </Text>
          </View>
        </TouchableHighlight> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  input: {
    marginHorizontal: 5,
    flex: 1,
    
  },
});
