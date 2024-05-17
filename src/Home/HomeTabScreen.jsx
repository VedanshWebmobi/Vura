import {
    Image,
      SafeAreaView,
      ScrollView,
      StatusBar,
      StyleSheet,
      Text,
      useColorScheme,
      View,
    } from 'react-native';
    import { useRoute } from "@react-navigation/native";
    import {
        AnimatedTabBarNavigator,
        DotSize, // optional
        TabElementDisplayOptions, // optional
        TabButtonLayout, // optional
        IAppearanceOptions // optional
      } from 'react-native-animated-nav-tab-bar'
      import React, { useEffect, useState, useRef } from "react";
      import { GET_PROFILE, LOGIN, VERIFY_OTP } from "../Api/Utils";
      import { createNativeStackNavigator } from "@react-navigation/native-stack";   
      import { axiosCallAPI } from "../Api/Axios";
      import * as Preference from "../StoreData/Preference";
      import { ExpoSecureKey, colors, font, icon } from "../constants";

      import Home from './Home';
      import ProductTabs from './ProductsTabScreen';
      import CashBack from './CashBack';
      import Scanner from './Scanner';

export default function HomeTabScreen({navigation}){
    const Tabs = AnimatedTabBarNavigator();
    const [TabPosition, setTabPosition] = useState(-1)

    const route = useRoute();
    useEffect(()=>{
      Preference.getValueFor(ExpoSecureKey.TOKEN).then(token => {
        if(token != null){
          getProfile();
        }
      });
     // 
    },[])
    if(route.params)
    {
      const { position} = route.params;
      if(TabPosition < 0)
      {
        setTabPosition(position);
      }
         // TabPosition.current.setActiveIndex(position);
          //TabPosition.current.navigate((position == 2) ? "PRODUCTS" : (position == 3) ? "CASHBACK" : "Home")
       
    }
    const getProfile = async () => {
    
      try {
        const requestOptions = {
          headers: {
            Accept: "application/json",
            Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
          },
        };
  
        const response = await axiosCallAPI(
          "get",
          GET_PROFILE,
          "",
          requestOptions,
          true,
          navigation
        );

  
         
        //  Extract relevant data from the API response
        const {
          name,
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
          image,
          current_address,
          current_city,
          current_country,
          current_pincode,
          current_state,
          current_street,
          country,
          street,
          pincode,
          gender,dateOfBirth,document,bank_verify,status
        } = response;
        if(status === "Active"){
          const formattedName = name === "null" ? "" : name;
          const formattedMobileNo = mobileNo === "null" ? "" : mobileNo;
          const formattedAddress = address === "null" ? "" : address;
          const formattedState = state === "null" ? "" : state;
          const formattedCity = city === "null" ? "" : city;
          const formattedAadharCardNo = aadharCardNo === "null" ? "" : aadharCardNo;
          const formattedPanCardNo = panCardNo === "null" ? "" : panCardNo;
          const formattedAccountHolderName =
            accountHolderName === "null" ? "" : accountHolderName;
          const formattedAccountNumber =
            accountNumber === "null" ? "" : accountNumber;
          const formattedBankName = bankName === "null" ? "" : bankName;
          const formattedIfscCode = ifscCode === "null" ? "" : ifscCode;
          const formattedImage = image || "";
          const formattedCountry = country === "null" ? "" : country;
          const formattedStreet = street === "null" ? "" : street;
          const formattedPincode = pincode === "null" ? "" : pincode;
          const formattedCurrentAddress = current_address === "null" ? "" : current_address;
          const formattedCurrentCity = current_city === "null" ? "" : current_city;
          const formattedCurrentCountry = current_country === "null" ? "" : current_country;
          const formattedCurrentPincode = current_pincode === "null" ? "" : current_pincode;
          const formattedCurrentState = current_state === "null" ? "" : current_state;
          const formattedCurrentStreet = current_street === "null" ? "" : current_street;
          const formattedDateOfBirth = dateOfBirth === "null" ? "" : dateOfBirth;
          await Preference.storePreference("profile", {
            name: formattedName,
            image: formattedImage,
            mobileNo: formattedMobileNo,
            address: formattedAddress,
            state: formattedState,
            city: formattedCity,
            aadharCardNo: formattedAadharCardNo,
            panCardNo: formattedPanCardNo,
            accountHolderName: formattedAccountHolderName,
            accountNumber: formattedAccountNumber,
            bankName: formattedBankName,
            ifscCode: formattedIfscCode,
            country:formattedCountry,
            current_address: formattedCurrentAddress,
            current_city:formattedCurrentCity,
            current_country: formattedCurrentCountry,
            current_pincode:formattedCurrentPincode,
            current_state:formattedCurrentState,
            current_street:formattedCurrentStreet,
            street:formattedStreet,
            pincode:formattedPincode,
            gender:gender,
            dateOfBirth:formattedDateOfBirth,
            document:document,
            bank_verify:bank_verify,
            status:status
          });
        }
        else{
            Logout();
        }
  
        // Check for "null" and "undefined" strings and treat them as empty strings
      
        // Store non-setive profile data in AsyncStorage

      } catch (error) {
        console.error("Error fetching or storing profile data:", error);
      } finally {
     
      
     
      }
    };
  const Logout = () => {
    Preference.deleteItem(ExpoSecureKey.IS_LOGIN);
    Preference.deleteItem(ExpoSecureKey.IS_REGISTER);
    Preference.deleteItem(ExpoSecureKey.TOKEN);
    Preference.clearPreferences();
    // Clear user data or perform any necessary logout actions
    // Reset the navigation stack to navigate to the "LoginScreen"
    navigation.reset({
      //  index: 0, // Reset to the first screen in the stack
      //routes: [{ name: "Category" }], // Set the route to navigate to
       routes: [{ name: "PreLogin" }], // Set the route to navigate to
    });
  };
    return(
      <View style={{flex:1, }}>
        <Tabs.Navigator
        // default configuration from React Navigation
        initialRouteName={ (TabPosition != undefined ? (TabPosition == 2) ? "PRODUCTS" : (TabPosition == 3) ? "CASHBACK" : "Home" : "Home")}
        key={1}
        tabBarOptions={{
          activeTintColor: "#000000",
          inactiveTintColor: "#FFFFFF",
        
        }}
        
        appearance={{ floating:true, 
            activeTabBackgrounds:colors.YELLOW,
            activeTintColor:colors.YELLOW,
             tabBarBackground:'#000000', 
             inactiveTintColor:'#FFFFFF',
            dotSize:'large',
             whenActiveShow:'both',
             whenInactiveShow:'icon-only',
             }}
         backBehavior='history'    
       
      >
    
      
        <Tabs.Screen name="HOME" component={Home} 
        options={{
          tabBarIcon : ({ focused, color, size }) =>(
            <Image source={focused ? require('../../assets/home_icon.png'): require('../../assets/home_icon_white.png')} style={{height:20, width:20, resizeMode:'contain'}}/>
          )
        }}/>
        <Tabs.Screen name="PRODUCTS" component={ProductTabs} 
          options={{
            tabBarIcon : ({ focused, color, size }) =>(
              <Image source={focused ? require('../../assets/box_select.png') : require('../../assets/box.png')} style={{height:20, width:20, resizeMode:'contain'}} />
            )
          }}
        />
        <Tabs.Screen name="CASHBACK" component={CashBack} 
          options={{
            tabBarIcon : ({ focused, color, size }) =>
            {
                console.log(size);
                 return(
                    <Image source={focused ? require('../../assets/ticket_discount_select.png') : require('../../assets/ticket_discount.png')} style={{height:20, width:20, resizeMode:'contain'}} />
                 ); 
            } 
          }}
          
          />
        <Tabs.Screen name="SCAN" component={Scanner} 
          options={{
            tabBarIcon : ({ focused, color, size }) =>
            {
                console.log(focused);
                 return(<Image source={focused ? require('../../assets/scan_barcode_select.png') : require('../../assets/scan_barcode.png')} style={{height:20, width:20, resizeMode:'contain'}} />);
                //  require('../../assets/scan_barcode.png')  
            }
          }}
          />
      
    
      </Tabs.Navigator>
      
      </View>
    )
}  ;    