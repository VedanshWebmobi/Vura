import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image,Animated, Easing, Platform } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { colors, font,ExpoSecureKey } from '../constants';
import {Fontisto } from '@expo/vector-icons';
import { axiosCallAPI } from "../Api/Axios";
import { COUPON } from "../Api/Utils";
import CommonAlert from "../common/CommonAlert";
import { getValueFor, save } from "../StoreData/Preference";
import * as Preference from "../StoreData/Preference";
import { VolumeManager } from 'react-native-volume-manager';
import { StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

var Sound = require('react-native-sound');

export default function QRCodeScanner_new({navigation}) {

  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [errorMessage, setErrorMessage] = useState("");
  const [isNormal, setIsNormal] = useState("");

  const [fadeAnim] = useState(new Animated.Value(0));
  const [sound, mySound] = useState(null);
  const handleBarCodeScanned = ({ type, data }) => {
   // setScanned(true);
   // setQrData(data);
   if(Platform.OS == 'ios'){
    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
   }
   else{
    if(isNormal)
    {
    sound.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }
}
   
   sendCoupon(data)
  };
  
  useEffect(() => {
    fadeInOut();
    var BeepSound = new Sound(Platform.OS ? "beep.wav" : "beep.ogg",Sound.MAIN_BUNDLE,(error)=>{
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    } );
    mySound(BeepSound);
   const volumlistener = VolumeManager.addRingerListener((result) =>{
      console.log("Result Listener", result);
        setIsNormal(result.mode === "NORMAL" ? true : false);
    } )
 
    
   return (() => VolumeManager.removeRingerListener(volumlistener));
  }, []);

  const handleNextScreen = () =>{
    setShowAlert(false);
    if(title === "Error"){
      navigation.goBack();
    }
    else{
        //navigation.navigate("Wallet");
        navigation.dispatch(StackActions.replace("Wallet"));
    }
  }
  useEffect(() => {
    // You can do something with the scanned data here, like sending it to an API
    if (scanned) {
      // Handle the scanned QR code data
      console.log('Scanned data:', qrData);
    }
  }, [scanned]);
  const fadeInOut = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }
    ).start(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      ).start(() => {
        fadeInOut(); // Recursively call fadeInOut to repeat the animation
      });
    });
  };
 const sendCoupon = async (QR_CODE) => {
    var couponFormData = new FormData();

    // couponFormData.append("coupon_code", qrCode);
    couponFormData.append("coupon_code", QR_CODE);

    let requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: await getValueFor(ExpoSecureKey.TOKEN),
      },
    };

    axiosCallAPI(
      "post",
      COUPON,
      couponFormData,
      requestOptions,
      true,
      navigation
    ).then((response) => {
      if (response && response.status) {

        if(response.message.includes("Please Contact Our Nearest Salesperson."))
        {
         
          setTitle("CONGRATULATIONS!");
         
        }
        else
        {
          setTitle("SUCCESSFULLY SCANNED!");
        }
        setIconColor("green");
        setShowAlert(true);
        setErrorMessage(response.message);
        setQrCode("");
        // Dialog.show({
        //   type: ALERT_TYPE.SUCCESS,
        //   title: "Success",
        //   textBody: response.message,
        //   button: "close",
        // });
      } else {
        //{"data": null, "errors": ["Coupon code not found"], "message": "", "status": false} 
        if(response.message.length >0){
          setErrorMessage(response.message);
        }
        else{
          if(response.errors.length > 0){
            setErrorMessage(response.errors[0]);
          }
          else{
             setErrorMessage("Something went wrong, Try again.");
          }
        }
        setIconColor("red");
        setTitle("Error");
        setShowAlert(true);
       
        // Dialog.show({
        //   type: ALERT_TYPE.DANGER,
        //   title: "Error",
        //   textBody: response.errors[0],
        //   button: "close",
        // });
      }
    });
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
          <CommonAlert
            visible={showAlert} // Pass visibility state to the CommonAlert component
            hideModal={() => handleNextScreen()} // Pass function to hide the modal
            handleOkPress={() => handleNextScreen()} // Pass function to handle Ok button press
            //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
            title={title} // Pass title text
            iconName="error"
            iconColor={iconColor}
            bodyText={errorMessage} // Pass body text
            // cancelButton={true} // Pass whether Cancel button should be displayed
          />
       <QRCodeScanner
        onRead={handleBarCodeScanned}
        flashMode={RNCamera.Constants.FlashMode.auto}
        showMarker={true}
      
        customMarker={<View style={{height:200, width:200, alignItems:'center', justifyContent:'center'}}>
          <Image source={require('../../assets/scann_fram.png')} style={{height:200, width:200, resizeMode:'contain'}}/>
          <Animated.View
        style={{
          opacity: fadeAnim, // Bind opacity to animated value
          width: 200,
          height: 2,
          backgroundColor: colors.YELLOW,
          position:'absolute'
        }}
      ></Animated.View>
        </View>}
       
         topViewStyle={{ position:'absolute', top:0,zIndex:1}}
          bottomViewStyle={{ position:'absolute',bottom:0,zIndex:1}}
        // cameraContainerStyle={{height:'100%'}}
        cameraStyle={{height:'100%'}}
        bottomContent={
          <TouchableOpacity style={{backgroundColor:'#00000050', width:"100%", alignItems:'center', padding:20}}>
            <Text style={{color:"#fff", fontFamily:font.GoldPlay_SemiBold}}>Barcode Scanner Started</Text>
          </TouchableOpacity>
        }
        topContent={
       
          <Fontisto name="close" size={24} color={"#fff"} style={{alignSelf:'flex-end',zIndex:1, padding:20,}} 
          onPress={()=>{navigation.goBack()}}/>
         
      
        }
      />
      {/* <View style={styles.scanLimit} /> */}
      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
      {qrData && <Text style={styles.qrData}>{qrData}</Text>}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scanLimit: {
    height:200, width:200,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    margin: 40,
  },
  qrData: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
