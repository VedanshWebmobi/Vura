import { View, Text, TouchableOpacity, Image,  StatusBar,ScrollView, Alert } from "react-native";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import CommonHeader from "./CommonHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Preference from "../StoreData/Preference";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import CommonAlert from "./CommonAlert";
import CommonHeaderNew from "./CommonHeader_new";
import { useFocusEffect } from '@react-navigation/native';

export default function CustomDrawer({ navigation }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setprofile] = useState("");
  const [name, setName] = useState("");
  const [profileDetails, setProfileDetails] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [profileDetailsComplete, setProfileDetailsComplete] = useState(false);
  // const menuItems = [
  //   "Home",
  //   "Products",
  //   "Cash Back Charts",
  //   "Offers",
  //   "Catalogues",
  //   "Wallet History",
  //   "FAQ's",
  //   "Log Out",
  // ];
  const menuItems = [
    "WALLET HISTORY",
    "HELP & SUPPORT",
    "LOGOUT",
  ];
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

  useEffect(() => {
    const showUpdateButton = async () => {
      const isRegistered = await Preference.getValueFor(
        ExpoSecureKey.IS_REGISTER
      );

      console.log("Value of isRegistered:", isRegistered);
      if (isRegistered === "false") {
        console.log("Bhai register nai hai Custom drawer wala bol raha huin");
        setShowUpdate(false);
      } else {
        console.log("Register hai");
        setShowUpdate(true);
      }
    };

    showUpdateButton();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    
      const retrieveProfile = async () => {
        try {
          const storedDetails = await Preference.getPreference("profile");
          console.log("StoreDetails", storedDetails);
          if (storedDetails) {
            setProfileDetails(storedDetails);
            const {
              name,
              image,
              address,
              aadharCardNo,
              panCardNo,
              accountHolderName,
              accountNumber,
              bankName,
              ifscCode,
            } = storedDetails;
           
            setName(name);
            setprofile(image);
            console.log("Profile details retrieved:", {
              address,image
            });
  
            if (
              image &&
              address &&
              aadharCardNo &&
              panCardNo &&
              accountHolderName &&
              accountNumber &&
              bankName &&
              ifscCode
            ) {
              console.log("Profile is Complete");
              setProfileDetailsComplete(true);
            } else {
              setProfileDetailsComplete(false);
            }
          }
  
        } catch (error) {
          console.error("Error retrieving details:", error);
        }
      };
      retrieveProfile();
    });

    return unsubscribe;
  
  }, [navigation]);

  const renderItem = (item, index) => {
    const handleItemPress = () => {
      // Navigation logic based on the selected item
      if (item === "Home") {
        console.log("Home is pressed");
        navigation.navigate("Home");
      } else if (item === "Products") {
        console.log("Product Pressed");
        navigation.navigate("Product");
      } else if (item === "Cash Back Charts") {
        console.log("CashBack Pressed");
        navigation.navigate("CashBack");
      } else if (item === "Offers") {
        console.log("Offers Pressed");
        navigation.navigate("Offers");
      } else if (item === "Wallet History") {
        if (!profileDetailsComplete) {
          setShowAlert(true);
          setErrorMessage("Please Complete Your Profile!");
        } else {
          navigation.navigate("Wallet");
        }
      } else if (item === "Log Out") {
        Logout();
      }
    };

    const isDisabled = item === "Catalogues" || item === "FAQ's"; // Disable all except Home and Log Out
    // useFocusEffect(
    //   React.useCallback(() => {
       
    //     const retrieveProfile = async () => {
    //       try {
    //         const storedDetails = await Preference.getPreference("profile");
             
    //         if (storedDetails) {
    //           const { image, name } = storedDetails;
  
    //           setprofile(image);
    //           setName(name);
    //         }
    //       } catch (error) {
    //         console.error("Error retrieving bank details:", error);
    //       }
    //     };
    //     retrieveProfile();
  
    //     return () => {};
      
    //   }, [navigation]));
 

    return (
      <View key={index}>
      
        <TouchableOpacity
          style={{ padding: 15 }}
          activeOpacity={0.5}
          onPress={isDisabled ? null : handleItemPress}
          // Disable onPress if item is disabled
          // onPress={handleItemPress}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              // Adjusted for better alignment
              gap: 10,
            }}
          >
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 50,
                // backgroundColor: "white",
                backgroundColor: isDisabled ? colors.GREY_TXT : "white",
                alignItems: "center",
              }}
            />
            <Text
              style={{
                fontFamily: font.GoldPlay_SemiBold,
                color: isDisabled ? colors.LIGHT_GREY : "white",
                // color: "white",
                fontSize: 18,
                padding: 0,
              }}
            >
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.BLACK, height: SCREEN_HEIGHT }}
    >
          <StatusBar backgroundColor={"black"} />
      <CommonHeaderNew navigation={navigation} header_color={colors.BLACK} header_title_color={"#fff"} showBack={true} header_title={" "}/>
      {/* <CommonHeader navigation={navigation} screen={"Custom"} showBack /> */}
      <CommonAlert
        visible={showAlert} // Pass visibility state to the CommonAlert component
        hideModal={() => setShowAlert(false)} // Pass function to hide the modal
        handleOkPress={() => setShowAlert(false)} // Pass function to handle Ok button press
        //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
        title="Error" // Pass title text
        iconName="error"
        bodyText={errorMessage} // Pass body text
        // cancelButton={true} // Pass whether Cancel button should be displayed
      />
      <View style={{ justifyContent: "flex-start", gap: 20, padding:10 }}>
        <View style={{flexDirection:'row' }}>
          <Image
            source={profile.length > 0 ? { uri: profile } : icon.PROFILE_PIC}
            style={{ width: 80, height: 80, borderRadius: 40, borderWidth:2, borderColor:colors.YELLOW }}
          />
          <View style={{flex:1, paddingStart:20, paddingEnd:10, paddingTop:2,}}>
            <Text style={{color:"#fff", fontFamily:font.GoldPlay_SemiBold, fontSize:20}}>{name.length > 0 ? name : "Unknown" }</Text>
            <View style={{flexDirection:'row', marginTop:10, alignItems:"center",  }}>
              <Image source={require('../../assets/image_.png')} style={{height:20, width:20, resizeMode:'contain'}}/>
              <Text style={{color:'#fff',fontFamily:font.GoldPlay_Medium, fontSize:14, marginStart:10}}>Artisan</Text>
              </View>
          </View>
        <TouchableOpacity  onPress={() => {
              console.log("Profile Details", profileDetails);
              if(profileDetails.length == 0){
                navigation.navigate("AddAdhar")  
              }
              else if(profileDetails.aadharCardNo == "" || profileDetails.aadharCardNo == null)
              {
                navigation.navigate("AddAdhar")  
              }
              else{
                navigation.navigate("PersonalDetails",{profilePhoto:profileDetails.image, aadharNo:profileDetails.aadharCardNo});
              }
              //
        }}>
          <Image style={{height:35, width:35}} source={require('../../assets/edit_yellow.png')}/>
          </TouchableOpacity>  
        </View>
        {/* <View style={{ alignItems: "center" }}>
          <TouchableHighlight
            onPress={() => navigation.navigate("AddPhoto")}
            style={{ backgroundColor: "transparent", borderRadius: 10 }}
            underlayColor={"black"}
          >
            <View
              style={{
                width: SCREEN_WIDTH / 2.1,
                paddingVertical: 8,
                //backgroundColor: "black",
                borderColor: "white",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 10,
              }}
            >
              <Text
                style={[
                  stylesCommon.preButtonLabelStyle,
                  { textAlign: "center" },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {showUpdate ? name : "CREATE YOUR PROFILE"}
              </Text>
            </View>
          </TouchableHighlight>
        </View> */}
      </View>
      <View style={{height:1, 
        marginTop:20,backgroundColor:colors.YELLOW}}/>
      <ScrollView style={{ marginTop: 30 }}>
      <View style={{paddingStart:10, paddingEnd:10}}>
        
         {/* {menuItems.map((item, index) => (
          <View key={index}>{renderItem(item, index)}</View>
        ))}  */}
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{
         
           navigation.navigate("Notification");
      
        }}>
        <View style={{flexDirection:'row', height:50, width:'100%',alignItems:"center"}}>
          <Image style={{height:20, width:20, resizeMode:'contain'}} 
          source={require('../../assets/notification_new.png')} tintColor={"#fff"}/>
          <Text style={{fontSize:14, fontFamily:font.GoldPlay_SemiBold, color:"#fff", flex:1, marginStart:20}}>NOTIFICATIONS</Text>
        </View>
        </TouchableOpacity>
        <View style={{height:1, backgroundColor:'#FFFFFF50', marginTop:10, marginBottom:10}}/>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{
        
           navigation.navigate("Offers");
      
        }}>
        <View style={{flexDirection:'row', height:50, width:'100%',alignItems:"center"}}>
          <Image style={{height:20, width:20, resizeMode:'contain'}} 
          source={require('../../assets/discount_shape.png')}/>
          <Text style={{fontSize:14, fontFamily:font.GoldPlay_SemiBold, color:"#fff", flex:1, marginStart:20}}>OFFERS</Text>
        </View>
        </TouchableOpacity>
        <View style={{height:1, backgroundColor:'#FFFFFF50', marginTop:10, marginBottom:10}}/>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{
           if (!profileDetailsComplete) {
           // setShowAlert(true);
           // setErrorMessage("Please Complete Your Profile!");
           navigation.navigate("CompleteProfile");
          } else {
            navigation.navigate("Wallet");
          }
        }}>
        <View style={{flexDirection:'row', height:50, width:'100%',alignItems:"center"}}>
          <Image style={{height:20, width:20, resizeMode:'contain'}} 
          source={require('../../assets/wallet_minus.png')}/>
          <Text style={{fontSize:14, fontFamily:font.GoldPlay_SemiBold, color:"#fff", flex:1, marginStart:20}}>WALLET HISTORY</Text>
        </View>
        </TouchableOpacity>
        <View style={{height:1, backgroundColor:'#FFFFFF50', marginTop:10, marginBottom:10}}/>
        <TouchableOpacity activeOpacity={0.8} onPress={() =>{
           navigation.navigate("Help");
        }}>
        <View style={{flexDirection:'row', height:50, width:'100%',alignItems:"center"}}>
          <Image style={{height:20, width:20, resizeMode:'contain'}} 
          source={require('../../assets/warning.png')}/>
          <Text style={{fontSize:14, fontFamily:font.GoldPlay_SemiBold, color:"#fff", flex:1, marginStart:20}}>HELP & SUPPORT</Text>
        </View>
        </TouchableOpacity>
        <View style={{height:1, 
        marginTop:20,backgroundColor:colors.YELLOW}}/>
         <TouchableOpacity activeOpacity={0.8} style={{marginTop:10}} onPress={()=>{
          Logout();
         }}>
        <View style={{flexDirection:'row', height:50, width:'100%',alignItems:"center"}}>
          <Image style={{height:20, width:20, resizeMode:'contain'}} 
          source={require('../../assets/logout.png')}/>
          <Text style={{fontSize:14, fontFamily:font.GoldPlay_SemiBold, color:"#fff", flex:1, marginStart:20}}>LOGOUT</Text>
        </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
