import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,Keyboard,
    TextInput,Dimensions,
    StatusBar,Animated,Easing, Alert
  } from "react-native";
  import React, { useEffect, useState, useRef } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import CommonHeaderNew from "../common/CommonHeader_new";
  import stylesCommon, { SCREEN_HEIGHT } from "../Themes/stylesCommon";
  import { ExpoSecureKey, colors, font, icon } from "../constants";
  import { useRoute } from "@react-navigation/native";
  import { axiosCallAPI } from "../Api/Axios";
  import { WITHDRAW } from "../Api/Utils";
  import CommonAlert from "../common/CommonAlert";
  import NumericInput from "@wwdrew/react-native-numeric-textinput";
  import * as Preference from "../StoreData/Preference";
  export default function WithdrawAmount({navigation}){
    const route = useRoute();
    const {walletAmount} = route.params;
    const [amount, setAmount] = useState(0.00);
    const [withdrawAll, setWithdrawAll] = useState(false);
    const SCREEN_DIMENSIONS = Dimensions.get('window');
    const [showView, setSHowView] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [iconColor, setIconColor] = useState("red");
    const [isLoading, setIsLoading] = useState(false);
    const [bankverify, setBankVerify] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    useEffect(() =>{
        if(!withdrawAll){
            setAmount("");
        }
    },[withdrawAll])
    useEffect(() =>{
      const retrievePersonalDetails = async () => {
       
        try {
          const storedDetails = await Preference.getPreference("profile");
        
          if (storedDetails) {
            const {    name,
              image,
              mobileNo,
              address,
              state,
              city,
              aadharCardNo,
              panCardNo,
              accountHolderName,
              accountNumber,
              bankName,
              ifscCode,
              country,
              current_address,
              current_city,
              current_country,
              current_pincode,
              current_state,
              current_street,
              street,pincode,gender,dateOfBirth,bank_verify } =
              storedDetails;
            console.log(
              "Bhai personal details mai yeh mil raha hai ",
              name,
              mobileNo
            );
 
          
       
            setBankVerify(bank_verify);
            setAadharNumber(aadharNo || "");
  
  
          }
        } catch (error) {
          console.error("Error retrieving personal details:", error);
        } 
      };
  
      retrievePersonalDetails();
    },[])


    const scale = useRef(new Animated.Value(1)).current;
    const stretchValue = useRef(new Animated.Value(1)).current;
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

const WithDrawalAmount = async() =>{
    Keyboard.dismiss();
    try {
        const requestOptions = {
            headers: {
              Accept: "application/json",
              Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
            },
            params: {
              amount: parseFloat(amount.toString().replace(',','')), 
            },
          };
        
        const response = await axiosCallAPI("post",WITHDRAW,"",requestOptions,true, navigation);
        console.log("Withdrawal Response", response);

        if(response.status){
            setIconColor("green");
            setShowAlert(true);
            setAlertTitle("TRANSACTION SUCCESSFULLY!");
            setAlertMessage(response.message);
        }
        else{
            setAlertTitle("Error")
            setAlertMessage(response.message);
            setIconColor("red")
            setShowAlert(true);
        }

    }catch (error) {
        setIsLoading(false)
      console.error("Error fetching wallet data:", error);
    } finally {
        setIsLoading(false)
    }
}
  const  numberformat = x => {
        if (x === '' || !x) {
          return '';
        }
        let parts = x
          .toString()
          .replace('$ ', '')
          .replace(',', '')
          .split('.');
     
        if (parts[1] && parts[1].length > 2) {
          parts[1] = parts[1].slice(0, 2);
        }
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (parts[0].length > 0) {
          return x.toString().includes('.')
            ?  parts[0] + '.' + parts[1]
            :  parts[0];
        } else {
          return '';
        }
      };


    return(
        <SafeAreaView style={[stylesCommon.whitebg,{backgroundColor:'#f2f2f2'}]}>
        <StatusBar backgroundColor={colors.YELLOW} />
        <CommonHeaderNew 
        navigation={navigation} 
        showBack={true} 
        header_color={colors.YELLOW} 
        header_title={"WITHDRAW"}/>
              <CommonAlert
            visible={showAlert} // Pass visibility state to the CommonAlert component
            hideModal={() => {
                setIsLoading(false)
                setShowAlert(false)
                if(alertTitle === 'Error'){
                    
                }
                else{
                    navigation.goBack();
                }
            }} // Pass function to hide the modal
            handleOkPress={() => {
                setIsLoading(false)
                setShowAlert(false)
             //   Alert.alert(alertTitle);
                if(alertTitle === 'Error' ){
                    if(bankverify === "0"){
                      
                     // navigation.navigate("PersonalDetails",{aadharNo : aadharNumber});
                    }
                }
                else{
                    navigation.goBack();
                }
                
            }} // Pass function to handle Ok button press
            //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
            title={alertTitle} // Pass title text
            iconName="error"
            iconColor={iconColor}
            bodyText={alertMessage}
             // Pass body text
            // cancelButton={true} // Pass whether Cancel button should be displayed
          />
         <View
          style={{ paddingHorizontal: 15, paddingTop: 15, gap: 25, flex: 1 }}
        >
          <View
            style={{
              gap: 5,
              padding: 15,
              elevation: 2,
              backgroundColor: "white",
              borderRadius: 10,
              overflow: "hidden",
              alignItems:'center'
            }}
          >
              <Text
              style={{
                color: "black",
                fontFamily: font.GoldPlay_Medium,
                fontSize: 14,
              }}
            >
              Wallet Balance
            </Text>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 30, alignItems:'center' }}>
             <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 25 }}> ₹ </Text>{walletAmount ? walletAmount : 0}
            </Text>
            <View style={{flexDirection:'row', alignItems:'center', marginTop:20}}>
            <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 25 }}> ₹ </Text>
            <TextInput 
            style={
                {borderRadius:10, 
                    borderWidth:1, 
                    height:45,
                    width:130,
                    fontSize:20,
                    textAlign:'center',
                    
                    backgroundColor:'#fff', fontFamily:font.GoldPlay_Regular, color:colors.BLACK}}
            placeholder={"500.00"}    
            value={numberformat(amount)}
        keyboardType='decimal-pad'
                    onChangeText={(text)=> {
                        setWithdrawAll(false);
                        setAmount(text.toString().replace(',',''))}
                    }
                    />
            </View>
            <TouchableOpacity activeOpacity={0.6} style={{flexDirection:'row', alignItems:'center',marginTop:10, height:30, }} onPress={() =>{
                
                setWithdrawAll(!withdrawAll);
                if(parseFloat(walletAmount) > 1000){
                    setAmount(numberformat(1000));
                }
                else{
                    setAmount(numberformat(walletAmount));
                }
               }}>
                <Image source={withdrawAll ?require('../../assets/checkbox_selected.png') : require('../../assets/checkbox_unselected.png')} 
                style={{height:15, width:15,marginTop:0, resizeMode:'contain'}}/>
                <Text style={{fontSize:14, marginStart:10, fontFamily:withdrawAll? font.GoldPlay_SemiBold : font.GoldPlay_Regular}}>Withdraw All</Text>
                </TouchableOpacity> 
                <TouchableOpacity
          activeOpacity={1}
            onPress={() => {
                if(!isLoading){
                    setIsLoading(true);
                Keyboard.dismiss();
              setSHowView(true);
               setTimeout(() =>{
                   setSHowView(false);
                   const amountInt = parseFloat(amount.toString().replace(',',''));
                 //   Alert.alert(amountInt.toString());
                   if(amountInt >= 500 && amountInt <= 1000){
                       if(bankverify === "1")
                       {
                         WithDrawalAmount();
                       }
                       else{
                        setAlertTitle("Error")
                        setAlertMessage("Please verify your bank details for withdraw wallet balance.")
                        setIconColor("red")
                        setShowAlert(true);
                       }
                        // setIconColor("green");
                        // setShowAlert(true);
                        // setAlertTitle("Transaction successfully!");
                        // setAlertMessage("Your Transfer Amount of INR 500.00 From Your Wallet Account Has Been Transferred To Your Bank.");
                   }
                   else{
                    setAlertTitle("Error")
                    setAlertMessage("Please enter amount between 500 to 1000.")
                    setIconColor("red")
                    setShowAlert(true);
                   }
                  
               },450);
          
            stretch(stretchValue);
            scaleText(scale);
            }
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
                   width:SCREEN_DIMENSIONS.width-60,height:50,borderRadius: 30,backgroundColor:colors.YELLOW, position:"absolute", marginTop:3,marginStart:2}}></Animated.View>
              }
            
            <Animated.View
              style={{transform:[{scaleX:interpolatedStretchAnimation}],  borderRadius: 30,
                borderColor: "#ffffff", width:SCREEN_DIMENSIONS.width-59,height:50,
                backgroundColor: colors.BLACK, flexDirection:'row',}}
            >
              
              <View style={{width:0, }}></View>
              <Animated.Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#fff',alignSelf:"center",  alignContent:"center", transform:[{scale}]}]}>WITHDRAW</Animated.Text>
             
            </Animated.View>
            </View> 
          </TouchableOpacity>
          <Text style={{fontFamily:font.GoldPlay_Medium, fontSize:13, padding:10,color:colors.BLACK, textAlign:'center'}}>Limit of withdrawals: Minimum 500, maximum 1000 in 24 hours.</Text>   
          </View>
        </View>  
        </SafeAreaView>
    );
  }