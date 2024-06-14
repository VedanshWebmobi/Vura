import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,Animated,Dimensions,Easing, Alert, SafeAreaView, Platform, KeyboardAvoidingView
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import CommonHeader from "../common/CommonHeader";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import { axiosCallAPI } from "../Api/Axios";
import { TextInput, Button, Checkbox, Modal, Portal, Card, Icon } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import * as Preference from "../StoreData/Preference";
import * as Progress from "react-native-progress";
import {Fontisto} from "@expo/vector-icons";
import CommonAlert from "../common/CommonAlert";
import { TouchableHighlight } from "react-native-gesture-handler";
import CommonHeaderNew from "../common/CommonHeader_new";
import ProfileCustomView from "../common/ProfileCustomeView";
import { ADD_PROFILE, GET_PROFILE, BANK_VERIFICATION, DELETE_ACCOUNT } from "../Api/Utils";
import DatePicker from 'react-native-date-picker'
import moment from "moment";
import * as ImagePicker from "expo-image-picker";
import { StackActions } from "@react-navigation/native";

export default function PersonalDetails({ navigation }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim_address = useRef(new Animated.Value(0)).current;
  const SCREEN_DIMENSIONS = Dimensions.get('window');
  const [rotated, setRotated] = useState(false);
  const [rotated_address, setRotatedAddress] = useState(true);
  const [rotated_bank, setRotatedBank] = useState(true)
  const inputRefs = useRef([]);

//  ref for focus change
  const PanRef = useRef(null);
  const NameRef = useRef(null);
  const FlatRef = useRef(null);
  const AreaRef = useRef(null);
  const CityRef = useRef(null);
  const StateRef = useRef(null);
  const PinRef = useRef(null);
  const CountryRef = useRef(null);
  const CurrentState = useRef(null);
  const CurrentCity = useRef(null);
  const AccHolderNameRef = useRef(null);
  const AccNumberRef = useRef(null);
  const BankNameRef = useRef(null);
  const IFSCRef = useRef(null);
  const GenderRef = useRef(null);
  const DOBRef = useRef(null);

  //Animation ref
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const stretchValue = useRef(new Animated.Value(1)).current;
  // seleteButton
  const scale_delete = useRef(new Animated.Value(1)).current;
  const stretchValue_delete = useRef(new Animated.Value(1)).current;

 // new state 
  const [flat_house, setFlatHouse] = useState("");
  const [area_street, setAreaStreet] = useState("");
  const [city_town, setCityTown] = useState("");
  const [state_new, setStateNew] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] =useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  // const [accountNumber, setAccountNumber] = useState("40100123456781");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  // const [ifscCode, setIfscCode] = useState("SBIN0021745");
  const [ifscCode, setIfscCode] = useState("");
  const [showView, setSHowView] = useState(false);
  const [showView_delete, setSHowViewDelete] = useState(false);
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null);
  const [openDate, setOpenDate] = useState(false)
  const [alertTitle, setAlertTitle] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [bankverify, setBankVerify] = useState("0");
  const [oldAccountNumber, setOldAccountNumber] = useState(accountNumber);
  const [oldIFSCCode, setOldIFSCCode] = useState(ifscCode);
  const [oldBankVerify, setOldBankVeryfy] = useState(bankverify);
  const [onImageError, setIsImageError] = useState(false);
  const [isDeleteAccountRequest, setDeleteAccountRequest] = useState(false);
  
  // current location
  // const [current_flat_house, setCurrentFlatHouse] = useState("");
  // const [current_area_street, setCurrentAreaStreet] = useState("");
  // const [current_pincode, setCurrentPincode] = useState("");
  // const [current_country, setCurrentCountry] = useState("");


  const [aadharNumber, setAadharNumber] = useState("");
  const [name, setname] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [address, setAddress] = useState("");
  const [sameAddress, setSameAddress] = useState(false);
  const [panNo, setPanNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [visibleModel, setVisibleModel] = useState(false);
  const [showCameraModel, setShowCameraModel] = useState(false);
  const showModal = () => setVisible(false);
  const hideModal = () => setVisible(false);
  const hideCameraModal = () => setShowCameraModel(false);
  const [errorMessage, setErrorMessage] = useState("");

  const containerStyle = {
    backgroundColor: colors.YELLOW,
    padding: 20,
    margin: 30,
    height: SCREEN_HEIGHT / 3,
    borderRadius: 20,
  };
  const containerStyleNew = { backgroundColor: "#F2F2F2", padding: 20, borderRadius:20 };
  const route = useRoute();
  var profilePhoto = "";
  var document = "";
  if(route.params)
  {
     profilePhoto = route.params.profilePhoto;
     if(profilePhoto && (!profilePhoto.includes("http") || !profilePhoto.includes("https")) && profilePhoto.length > 0){
       // setImage(profilePhoto)
     }
     document = route.params.document;
  }  
  const { aadharNo } = route.params;
 // setImage(profilePhoto);
  // useEffect(() => {
  //   setAadharNumber(aadharNo);
  // address = route.params.address ? route.params.address : "";
  // panNo = route.params.panNo ? route.params.panNo : "";
  // sameAddress =
  //   route.params.sameAddress !== undefined ? route.params.sameAddress : true;
  // currAddress = route.params.currAddress ? route.params.currAddress : "";
  // }, []);
  
  const handleDatePicker = ()=>{
      setOpenDate(true);
  }
  const handlePincodeResult =(city, state, country) =>{
      setCityTown(city);
      setStateNew(state);
      setCountry(country);
  }
  const rotation_per =rotateAnim.interpolate({
    inputRange:[0, 1],
    outputRange: ['0deg','180deg'] 
    
  });
  const rotation_address =rotateAnim_address.interpolate({
    inputRange:[0, 1],
    outputRange: ['0deg','180deg'] 
    
  });
  const HandleAnimation = () =>{
    Animated.timing(rotateAnim,{
      toValue:rotated ? 0 : 1,
      duration:300,
      useNativeDriver:true,
    }).start(() => {
    });
    setRotated(!rotated);
  }
  const HandleAnimation_Address = () =>{
    Animated.timing(rotateAnim_address,{
      toValue:rotated_address ? 0 : 1,
      duration:300,
      useNativeDriver:true,
    }).start(() => {
    });
    setRotatedAddress(!rotated_address);
  }
  const Logout = () => {
   
    // Clear user data or perform any necessary logout actions
    // Reset the navigation stack to navigate to the "LoginScreen"
    navigation.reset({
      //  index: 0, // Reset to the first screen in the stack
      //routes: [{ name: "Category" }], // Set the route to navigate to
       routes: [{ name: "PreLogin" }], // Set the route to navigate to
    });
  };
  const HandleDeleteAccount = () =>{
    Alert.alert("Delete Account", "Are you sure you want to permanently remove this account?",[
      {
        text:'Cancel',
        onPress: () => {
          setDeleteAccountRequest(false);
        },
      },
      {
        text: 'Delete',
        onPress: () =>{ 
          delete_Account();
        }
      }
    ])
  }

  const interpolatedStretchAnimation = stretchValue.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0.90], // You can adjust the output range to control the stretching size
  });
  const interpolatedStretchAnimation_delete = stretchValue_delete.interpolate({
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

  const handleNext = () => {
    // Aadhar card number validation
    if (validation()) {
      console.log(profilePhoto);
      submitProfile();
      // All validations passed, navigate to BankDetails screen

      // navigation.navigate("BankDetails", {
      //   profilePhoto,
      //   name,
      //   phoneNo,
      //   aadharNo: aadharNumber,
      //   address,
      //   panNo,
      //   sameAddress,
      //   city,
      //   state,
      // });
    }
  };

 const handleAccountNumber =(text)=>{

    if(oldBankVerify == "1"){
     if(text != oldAccountNumber){
        setBankVerify("0")
      }
      else{
        setBankVerify("1")
      }
    }
    }
    const handleIFSCCode =(text)=>{

      if(oldBankVerify == "1"){
       if(text != oldIFSCCode){
          setBankVerify("0")
        }
        else{
          setBankVerify("1")
        }
      }
      }
 
useState(()=>{
 
  if(bankverify == "1")
    { 
  if(accountNumber != oldAccountNumber || ifscCode != oldIFSCCode){
    setBankVerify("0")
  }
}
 
},[accountNumber, ifscCode])

  const delete_Account = async () => {
    setDeleteAccountRequest(true);
    setIsLoading(true);
    try{
      let requestOptions = {
        headers: {
          Accept: "application/json",
          Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
        },
      };
      const response = await axiosCallAPI(
        "post",
        DELETE_ACCOUNT,
        "",
        requestOptions,
        true,
        navigation
      );
      setIsLoading(false);
      //{"data": {}, "errors": {}, "message": "Artisan deleted successfully.", "status": true}
        if(response.status){
          Preference.deleteItem(ExpoSecureKey.IS_LOGIN);
          Preference.deleteItem(ExpoSecureKey.IS_REGISTER);
          Preference.deleteItem(ExpoSecureKey.TOKEN);
          Preference.clearPreferences();

          setIconColor("green")
          setAlertTitle("SUCCESS!")
          setErrorMessage(response.message)
          setVisible(true)
        }
        else{
          setDeleteAccountRequest(false)
          setIconColor("red")
          setAlertTitle("Error")
          setErrorMessage(response.message)
          setVisible(true)
        }
        console.log(response);
    }
    catch (error) {
      setIsLoading(false);
      setDeleteAccountRequest(false)
      console.error("Error fetching or storing profile data:", error);
    }
   

  }

  const submitProfile = async () => {
  //  console.log("Bank", typeof(bankverify === "0" ? 0 : 1));
  //  return;
    console.log("yeh ja raha hia ander.....", profilePhoto);
    setIsLoading(true);
    try {
      let profileFormData = new FormData();
      console.log("====================================");
      console.log("Apiiiii callled...", profilePhoto);
      console.log("====================================");
      profileFormData.append("name", name);
      const position = profilePhoto.indexOf("http");
      const position1 = profilePhoto.indexOf("https");
     
      if(image.length > 0){
       
          profileFormData.append("image", {
          uri: image,
          type: "image/jpeg",
          name: "profile_image.jpg",
        });
      }

      else  if((profilePhoto.indexOf("http") <= -1 && profilePhoto.indexOf("https") <= -1 ) && profilePhoto.length > 0){
    
        profileFormData.append("image", {
          uri: profilePhoto,
          type: "image/jpeg",
          name: "profile_image.jpg",
        });
      }

      if(document)
      {
      if(document.length > 0){
        profileFormData.append("document", {
          uri:document,
          type: "image/jpeg",
          name: "aadhar_document.jpg",
        })
      }
    }
   
      profileFormData.append("address", flat_house);
      profileFormData.append("street",area_street);
      profileFormData.append("state", state_new);
      profileFormData.append("city", city_town);
      profileFormData.append("pincode",pincode);
      profileFormData.append("country", country);
      profileFormData.append("aadharCardNo", aadharNo);
      profileFormData.append("panCardNo", panNo);
      profileFormData.append("accountHolderName", accountHolderName);
      profileFormData.append("accountNumber", accountNumber);
      profileFormData.append("bankName", bankName);
      profileFormData.append("ifscCode", ifscCode);
      profileFormData.append("current_address", sameAddress ? flat_house : "" );
      profileFormData.append("current_street", sameAddress ? area_street : "" );
      profileFormData.append("current_city", sameAddress ? city_town : city);
      profileFormData.append("current_state", sameAddress ? state_new:state);
      profileFormData.append("current_pincode", sameAddress? pincode : "" );
      profileFormData.append("current_country", sameAddress ? country : "");
      profileFormData.append("gender",gender);
    
      profileFormData.append("dateOfBirth",selectedDate != null ? moment(selectedDate).format("YYYY-MM-DD") : "");
      
      profileFormData.append("bank_verify", bankverify === "0" ? 0 : 1);

      console.log("====================================");
      console.log("yeh hai bhai", profileFormData);
      console.log("====================================");
      let requestOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
        },
      };

      const response = await axiosCallAPI(
        "post",
        ADD_PROFILE,
        profileFormData,
        requestOptions,
        true,
        navigation
      );

      console.log("LE Bhai", response);

      if (response && response.status) {
        Preference.save(ExpoSecureKey.IS_REGISTER, "true");
        await getProfile();
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    } finally {
      setIsLoading(true);
    }
  };

  const VerifyBankDetails = async() =>{
    setIsLoading(true);
    try{
      const requestOptions = {
        headers: {
          Accept: "application/json",
          Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
        },
        params: {
          ifsc_code: ifscCode, // Pass the current page as a query parameter
          account_no: accountNumber, // You may need to adjust this based on your API's pagination settings
        },
      };
      // {"data": {"bank_verify": true}, "errors": {}, "message": "Bank Account details verified successfully.", "status": true}
      const response = await axiosCallAPI("post",BANK_VERIFICATION,"",requestOptions, true, navigation);
      if(response.data.bank_verify){
            setIconColor("green")
            setAlertTitle("SUCCESS!")
            setErrorMessage(response.message)
            setVisible(true)
            setBankVerify("1");
            
      }
      else{
        setIconColor("red")
        setAlertTitle("Error")
        setErrorMessage(response.message)
        setVisible(true)
        setBankVerify("0");
      }
      console.log("Bank Verification", response);

    }catch (error) {
      setIsLoading(false);
      console.error("Error fetching or storing profile data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const getProfile = async () => {
    setIsLoading(true);
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

      console.log("Bhai yeh method mai yeh mil raha", response);
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
        street, pincode,gender,dateOfBirth,document,bank_verify
      } = response;

      // Check for "null" and "undefined" strings and treat them as empty strings
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
      const formattedCurrentAddress = current_address === "null" ? "" : current_address;
      const formattedCurrentCity = current_city === "null" ? "" : current_city;
      const formattedCurrentCountry = current_country === "null" ? "" : current_country;
      const formattedCurrentPincode = current_pincode === "null" ? "" : current_pincode;
      const formattedCurrentState = current_state === "null" ? "" : current_state;
      const formattedCurrentStreet = current_street === "null" ? "" : current_street;
      const formattedStreet = street === "null" ? "":street;
      const formattedPincode = pincode === "null" ? "" : pincode;
      const formattedDateOfBirth = dateOfBirth === "null" ? "" : dateOfBirth;

      // Store non-setive profile data in AsyncStorage
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
        bank_verify:bank_verify
      });
    } catch (error) {
      console.error("Error fetching or storing profile data:", error);
    } finally {
      //navigation.navigate("HomeTab");
      navigation.dispatch(StackActions.replace("HomeTab"));
      setIsLoading(false);
      // Hide loader after fetching data
    }
  };

  const validation = () => {
    if (name.trim() === "") {
      setAlertTitle("Error")
      setIconColor("red")
      setErrorMessage("ENTER A VALID NAME");
      setVisible(true);
      return;
    }

    // Mobile number validation
    // if (phoneNo.length !== 10) {
    //   //showModal();
    //   setErrorMessage(`ENTER A VALID PHONE NUMBER`);
    //   setVisible(true);
    //   return;
    // }

    // if (aadharNumber.length !== 12) {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "ENTER A VALID AADHAR NO",
    //     button: "close",
    //   });
    //   return false;
    // }

    // Address validation
    // if (address.trim() === "") {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "ENTER A VALID ADDRESS",
    //     button: "close",
    //   });
    //   return false;
    // }

    // // PAN card number validation
    // if (panNo.length !== 10) {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "ENTER A VALID PAN NO",
    //     button: "close",
    //   });
    //   return false;
    // }

    // // Current address validation if checkbox is unchecked
    // if (!sameAddress && currAddress.trim() === "") {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "ERROR",
    //     textBody: "ENTER A VALID CURRENT ADDRESS",
    //     button: "close",
    //   });
    //   return false;
    // }
    return true;
  };
  const uploadImage = async (mode) => {
    let result = {};
    try {
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      alert("Error uploading image: " + error.message);
      hideCameraModal();
    }
  };
  const saveImage = async (image) => {
    try {
      setImage(image);
   
      hideCameraModal();
      
    } catch (error) {
      throw error;
    }
  };
  const handleOkPress = () => {
    console.log("Ok Pressed");
  };
  const handleCancelPress = () => {
    console.log("Cancel Pressed");
  };
  useEffect(() => {
    const retrievePersonalDetails = async () => {
      setIsLoading(true);
      try {
        const storedDetails = await Preference.getPreference("profile");
        console.log("My Profile", storedDetails);
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

          console.log("Yeh raha ", name, mobileNo, address, panCardNo, dateOfBirth);

          setGender(gender);
          if(dateOfBirth == null || dateOfBirth.length <= 0)
           {
             setDate(new Date())
             setDOB("");
           } 
           else{
            setDate(moment(dateOfBirth).toDate());
            setSelectedDate(moment(dateOfBirth).toDate());
            setDOB(moment(dateOfBirth).format("DD/MM/YYYY"));
           }
          
          
          setname(name || "");
          setphoneNo(mobileNo || "");
          setAddress(address || "");
          setFlatHouse(address || "");
          setstate(state || "");
          setAadharNumber(aadharNo || "");
          setcity(city || "");
          setPanNo(panCardNo || "");
          setAreaStreet(street || "");
          setCityTown(city || "");
          setStateNew(state || "");
          setPincode(pincode || "");
          setCountry(country || "");
          setAccountHolderName(accountHolderName || "");
          setAccountNumber(accountNumber || "");
          setOldAccountNumber(accountNumber || "");
          setOldIFSCCode(ifscCode || "");
          setBankName(bankName || "");
          setBankVerify(bank_verify);
          setOldBankVeryfy(bank_verify);
          setIfscCode(ifscCode || "");

          if(address == current_address){
            setSameAddress(true);
            setstate("");
            setcity("");

          }

        }
      } catch (error) {
        console.error("Error retrieving personal details:", error);
      } finally {
        //
        setIsLoading(false); // Hide loader after fetching data
      }
    };

    retrievePersonalDetails();
  }, []);



  const handleName = (text) => {
    // Filter out non-letter characters
    const filteredText = text.replace(/[^a-zA-Z\s]/g, "");
    setname(filteredText);
  };
  return (
    <>
    <SafeAreaView style={{flex:0, backgroundColor:colors.YELLOW}}/>
    <SafeAreaView style={{flex:1}}>
      <KeyboardAvoidingView style={{flex:1}}
      behavior ={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
    <View style={[stylesCommon.yellowbg,{backgroundColor:"#f2f2f2"}]}>
      {/* <CommonHeader navigation={navigation} showBack /> */}
      <Portal>
        <Modal
          visible={showCameraModel}
          onDismiss={hideCameraModal}
          contentContainerStyle={containerStyleNew}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          <View >
            <Fontisto name="close" size={24} color={"#999999"} style={{alignSelf:'flex-end'}} onPress={()=>hideCameraModal()}/>
            <Text style={{color:colors.BLACK, fontSize:20, fontFamily:font.GoldPlay_SemiBold, alignSelf:"center", marginBottom:30}}>UPLOAD PHOTO</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              paddingBottom:20
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Button
                icon={({ size, color }) => (
                  <Image
                    source={require('../../assets/take_from_camera.png')}
                    style={{
                      width: 65,
                      height: 65,
                      marginStart: 10,
                      resizeMode:'contain'
                    }}

                  />
                )}
                onPress={() => uploadImage("camera")}
              />
              <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize:16, textDecorationLine:'underline' }}>Camera</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Button
                icon={({ size, color }) => (
                  <Image
                    source={require('../../assets/take_from_gallery.png')}
                    style={{
                      width: 65,
                      height: 65,
                      marginStart: 10,
                      resizeMode:'contain'
                    }}
                  />
                )}
                onPress={() => uploadImage("gallery")}
              />
              <Text style={{ fontFamily: font.GoldPlay_SemiBold,fontSize:16, textDecorationLine:'underline' }}>
                Gallery
              </Text>
            </View>
          </View>
          </View>
        </Modal>
      </Portal>
      <CommonHeaderNew navigation={navigation} header_color={colors.YELLOW} header_title={'CREATE PROFILE'}/>

      <CommonAlert
        visible={visible} // Pass visibility state to the CommonAlert component
        hideModal={hideModal} // Pass function to hide the modal
        handleOkPress={() => {
          setVisible(false)
          if(isDeleteAccountRequest){
            setTimeout(() => {
              Logout();
            },1000)
           
          }
          }
        } // Pass function to handle Ok button press
        //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
        title={alertTitle} // Pass title text
        iconName="error"
        iconColor={iconColor}
        bodyText={errorMessage} // Pass body text
        // cancelButton={true} // Pass whether Cancel button should be displayed
      />

      {isLoading ? (
        <View style={stylesCommon.loaderViewStyle}>
          <Progress.CircleSnail
            size={50}
            indeterminate={true}
            color={"black"}
          />
        </View>
      ) : (
        <ScrollView 
      
        >
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
             
            }}
          >
              <View style={{height:100, width:130, margin:20, alignItems:"center", justifyContent:'center'}}>
            { 
              onImageError ? 
              <Image source={icon.PROFILE_PIC } style={{height:100, width:100,borderRadius:50, borderWidth:2, borderColor:colors.YELLOW}} />
              :
              <Image source={image.length > 0 ?  { uri:image } : (profilePhoto && profilePhoto.length > 0) ? {uri:profilePhoto} : icon.PROFILE_PIC } style={{height:100, width:100,borderRadius:50, borderWidth:2, borderColor:colors.YELLOW}} 
              onError ={() => setIsImageError(true)}/>
            }    
           
            <TouchableOpacity style={{position:'absolute', bottom:0, right:5}} onPress={()=>setShowCameraModel(true)}>
            <Image source={require('../../assets/button_.png')}  style={{height:35, width:35, resizeMode:'contain', }}/>  
            </TouchableOpacity>
          </View>
          <Card style={{width:'90%', padding:16,backgroundColor:"#fff",}}>
          <View style={{}}>
            <View style={{flexDirection:"row", flex:1, alignItems:"center"}}>
                <Image source={require('../../assets/user.png')} style={{height:20,width:20, resizeMode:'contain'}}/>
                <Text style={[stylesCommon.welcomeText,{fontSize:14, padding:10, flex:1,marginStart:10}]}>{"PERSONAL DETAILS"}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{HandleAnimation()}}>
                <Animated.Image 
                source={require('../../assets/frame.png')} 
                style={{height:20,width:20, resizeMode:'contain',transform:[{rotate:rotation_per}]}} />
                </TouchableOpacity>
            </View>
            {
              !rotated &&   
              <View>
              <Text style={[styles.lableText,{marginTop:10}]}>
                  Aadhar Card Number
                </Text>
                <View style={styles.inputRow}>
                  {[...Array(3)].map((_, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      value={aadharNo.substr(index * 4, 4)}
                      mode="outlined"
                      outlineStyle={{
                        borderColor: colors.YELLOW,
                        backgroundColor: "transparent",
                        borderRadius: 15,
                        
                      }}
                      keyboardType="numeric"
                      style={styles.input}
                      placeholder="1234"
                      placeholderTextColor={colors.LIGHT_GREY}
  
                      contentStyle={{
                        fontFamily: font.GoldPlay_Medium,
                        fontSize:16,
                        borderColor:colors.YELLOW,
                        textAlign:'center'
                      }}
                      // onChangeText={(text) => {
                      //   const newAadharNumber =
                      //     aadharNumber.substr(0, index * 4) +
                      //     text +
                      //     aadharNumber.substr((index + 1) * 4);
                      //   setAadharNumber(newAadharNumber);
                      // }}
                      editable={false}
                      maxLength={4}
                      cursorColor="white"
                    />
                  ))}
                  
                </View>
                <ProfileCustomView 
                item_value={panNo} 
                item_setValue={setPanNo} 
                item_Ref={PanRef}
                item_Ref_next={NameRef}
                item_label={"PAN NO:"}
                item_place_holder={'Enter your Pan Card Number'}
                item_return_key_type={'next'}
                item_all_capital= {true}
                />
              <ProfileCustomView 
                item_value={name} 
                item_setValue={setname} 
                item_Ref={NameRef}
                item_label={"Full Name:"}
                item_place_holder={'Enter your Full Name'}
                item_return_key_type={'next'}
              
                />
                   <ProfileCustomView 
                item_value={gender} 
                item_setValue={setGender} 
                item_Ref={GenderRef}
                item_label={"Gender:"}
                item_place_holder={'Select your gender'}
                item_return_key_type={'next'}
                item_is_gender
                />
                   <ProfileCustomView 
                item_value={dob} 
                item_setValue={setDOB} 
                item_Ref={DOBRef}
                item_label={"DOB:"}
                item_place_holder={'Enter your Date of Birth'}
                item_return_key_type={'next'}
                item_is_dob
                item_dob_press={handleDatePicker}
                />

                </View>
            } 
          
            </View>
          </Card>
          <Card style={{width:'90%', padding:16,backgroundColor:"#fff",
        marginTop:20,}}
        zIndex={1}>
          <View style={{}}>
            <View style={{flexDirection:"row", flex:1, alignItems:"center"}}>
                <Image source={require('../../assets/location.png')} style={{height:20,width:20, resizeMode:'contain'}}/>
                <Text style={[stylesCommon.welcomeText,{fontSize:14, padding:10, flex:1,marginStart:10}]}>{"ADDRESS"}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{HandleAnimation_Address()}}>
                <Animated.Image 
                source={require('../../assets/frame.png')} 
                style={{height:20,width:20, resizeMode:'contain',transform:[{rotate:rotation_address}]}} />
                </TouchableOpacity>
            </View>
            {
              !rotated_address &&   
              <View>
                <ProfileCustomView 
                item_value={flat_house} 
                item_setValue={setFlatHouse} 
                item_Ref={FlatRef}
                item_Ref_next={AreaRef}
                item_label={"Flat/House:"}
                item_place_holder={'Enter your Flat/House'}
                item_return_key_type={'next'}
                />
              <ProfileCustomView 
                item_value={area_street} 
                item_setValue={setAreaStreet} 
                item_Ref={AreaRef}
                item_Ref_next={PinRef}
                item_label={"Area/Street:"}
                item_place_holder={'Enter your Area/Street'}
                item_return_key_type={'next'}
                />
                     <ProfileCustomView 
                item_value={pincode} 
                item_setValue={setPincode} 
                item_Ref={PinRef}
                //item_Ref_next={CityRef}
                item_label={"Pin Code:"}
                item_place_holder={'Enter your Pin Code'}
                item_return_key_type={Platform.OS == 'ios'? 'done' : 'next'}
                item_input={"numeric"}
                item_handle_pincode_result={handlePincodeResult}
                />
                 <ProfileCustomView 
                item_value={city_town} 
                item_setValue={setCityTown} 
                item_Ref={CityRef}
                item_Ref_next={StateRef}
                item_label={"City/Town:"}
                item_place_holder={'Enter your City/Town'}
                item_return_key_type={'next'}
                />
              <ProfileCustomView 
                item_value={state_new} 
                item_setValue={setStateNew} 
                item_Ref={StateRef}
                item_Ref_next={PinRef}
                item_label={"State:"}
                item_place_holder={'Enter your State'}
                item_return_key_type={'next'}
                />
            
              <ProfileCustomView 
                item_value={country} 
                item_setValue={setCountry} 
                item_Ref={CountryRef}
                item_label={"Country:"}
                item_place_holder={'Enter your Country'}
                item_return_key_type={'next'}
                />
               <Text style={[stylesCommon.welcomeText,{fontSize:14, flex:1,marginTop:20}]}>{"CURRENT ADDRESS"}</Text>
               <TouchableOpacity activeOpacity={0.6} style={{flexDirection:'row', alignItems:'center',marginTop:20 }} onPress={() =>{
                 setSameAddress(!sameAddress);
               }}>
                <Image source={sameAddress ?require('../../assets/checkbox_selected.png') : require('../../assets/checkbox_unselected.png')} 
                style={{height:15, width:15,marginTop:0, resizeMode:'contain'}}/>
                <Text style={{fontSize:14, marginStart:10, fontFamily:sameAddress? font.GoldPlay_SemiBold : font.GoldPlay_Regular}}>SAME AS ABOVE ADDRESS</Text>
                </TouchableOpacity> 
                {
                   !sameAddress && 
                   <View> 
                    <Text style={{fontSize:14, marginTop:20, fontFamily: font.GoldPlay_Regular, alignSelf:"center"}}>OR</Text>
                    <TouchableOpacity activeOpacity={0.6} style={{alignSelf:"center", marginTop:30}} onPress={()=>{}}>
                    <Text style={{fontSize:12, fontFamily: font.GoldPlay_SemiBold, alignSelf:"center", textDecorationLine:"underline"}}>ADD CURRENT ADDRESS</Text>
                    </TouchableOpacity>
                    <View style={{marginTop:20, marginBottom:10}}>
                    <ProfileCustomView 
                      item_value={city} 
                      item_setValue={setcity} 
                      item_Ref={CurrentCity}
                      item_Ref_next={CurrentState}
                      item_label={"City/Town:"}
                      item_place_holder={'Enter your City/Town'}
                      item_return_key_type={'next'}
                      />
                    <ProfileCustomView 
                      item_value={state} 
                      item_setValue={setstate} 
                      item_Ref={CurrentState}
                      item_label={"State:"}
                      item_place_holder={'Enter your State'}
                      item_return_key_type={'done'}
                      
                      />
                  </View>
                   </View>
                }
             
                </View>
            } 
          
            </View>
          </Card>
          <Card style={{width:'90%', padding:16,backgroundColor:"#fff",
        
        marginTop:20}}
        zIndex={0}>
            <View style={{}}>
            <View style={{flexDirection:"row", flex:1, alignItems:"center"}}>
                <Image source={require('../../assets/bank.png')} style={{height:20,width:20, resizeMode:'contain'}}/>
                <Text style={[stylesCommon.welcomeText,{fontSize:14, padding:10, flex:1,marginStart:10}]}>{"BANK DETAILS"}</Text>
                <Text style={[stylesCommon.welcomeText,{fontSize:14, padding:10,marginStart:10, color: bankverify == "1" ? "#059669" : "#000000",   }]}>{bankverify === "1" ? "Verified" : "Not Verify"}</Text>
                
                
                <TouchableOpacity activeOpacity={0.5} onPress={()=>{ setRotatedBank(!rotated_bank)}}>
                  {
                    rotated_bank ? <Text style={{fontFamily:font.GoldPlay_SemiBold, padding:10,textDecorationLine:"underline", fontSize:12}} >{oldBankVerify === "1" ? "EDIT" : "ADD"}</Text> : <Fontisto name="close" color={colors.BLACK} size={20}/>
                  }
                </TouchableOpacity>
            </View>
            {
              !rotated_bank && 
               <View style={{marginBottom:10}}>
                    <ProfileCustomView 
                      item_value={accountHolderName} 
                      item_setValue={setAccountHolderName} 
                      item_Ref={AccHolderNameRef}
                      item_Ref_next={AccNumberRef}
                      item_label={"Account Holder's Name"}
                      item_place_holder={'Enter your Name'}
                      item_return_key_type={'next'}
                      item_is_bank = {true}
                      />
                    <ProfileCustomView 
                      item_value={accountNumber} 
                      item_setValue={setAccountNumber} 
                      item_Ref={AccNumberRef}
                      item_Ref_next={BankNameRef}
                      item_label={"Account Number"}
                      item_place_holder={'Enter Your Bank Account Number'}
                      item_return_key_type={Platform.OS == 'ios' ? 'done': 'next'}
                      item_is_bank = {true}
                      item_input ={'numeric'}
                      item_handle_account_number={handleAccountNumber}
                      />
                       <ProfileCustomView 
                      item_value={bankName} 
                      item_setValue={setBankName} 
                      item_Ref={BankNameRef}
                      item_Ref_next={IFSCRef}
                      item_label={"Bank Name"}
                      item_place_holder={'Enter Your Bank Name'}
                      item_return_key_type={'next'}
                      item_is_bank = {true}
                      />
                    <ProfileCustomView 
                      item_value={ifscCode} 
                      item_setValue={setIfscCode} 
                      item_Ref={IFSCRef}
                      item_label={"IFSC Code"}
                      item_place_holder={'Enter IFSC Code'}
                      item_return_key_type={'done'}
                      item_is_bank = {true}
                      item_handle_ifsc_code={handleIFSCCode}
                      />
                      {
                         bankverify == "0" && 
                         <View style={{marginTop:20,alignItems:"center"}}>
                         <TouchableOpacity style={{padding:10, alignSelf:"center", backgroundColor:"#000", borderRadius:25}} onPress={()=>VerifyBankDetails()}>
                         <Text style={{color:"#fff", fontFamily:font.GoldPlay_SemiBold,textAlign:"center", fontSize:14, paddingStart:20, paddingEnd:20}}>Verify Bank Details</Text>
                       </TouchableOpacity>
                       {/* <Text style={{fontSize:11, marginTop:20,fontFamily:font.GoldPlay_SemiBold, color:'#000'}}>If you've received a message about a deduction of 1 rupee from your bank account, it's likely related to a verification process. </Text> */}
                       </View>
                      }
                   

              </View>
            }
            </View>
        </Card>

        <TouchableOpacity
          activeOpacity={1}
            onPress={() => {
              setSHowView(true);
               setTimeout(() =>{
                   setSHowView(false);
                   handleNext()
               },450);
           // rotateImage(rotation);
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
          <TouchableOpacity
          activeOpacity={1}
            onPress={() => {
              setSHowViewDelete(true);
               setTimeout(() =>{
                   setSHowViewDelete(false);
                   HandleDeleteAccount();
                 //  handleNext()
               },450);
           // rotateImage(rotation);
            stretch(stretchValue_delete);
            scaleText(scale_delete);
              //handleOnPress("Products")
            }
            }
            //underlayColor={colors.YELLOW}
            style={{ borderRadius: 30, 
              marginTop:20
              }}
          >
            <View style={{}}>
            {
                  showView_delete &&   <Animated.View style={{ borderColor: "#ffffff",transform:[{scaleX:interpolatedStretchAnimation_delete}],
                   width:SCREEN_DIMENSIONS.width-40,height:50,borderRadius: 30,backgroundColor:colors.YELLOW, position:"absolute", marginTop:3,marginStart:2}}></Animated.View>
              }
            
            <Animated.View
              style={{transform:[{scaleX:interpolatedStretchAnimation_delete}],  borderRadius: 30,
                borderColor: "#ffffff", width:SCREEN_DIMENSIONS.width-39,height:50,
                backgroundColor: colors.ERROR_RED, flexDirection:'row',}}
            >
              
              <View style={{width:0, }}></View>
              <Animated.Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#fff',alignSelf:"center",  alignContent:"center", transform:[{scale:scale_delete}]}]}>DELETE ACCOUNT</Animated.Text>
             
            </Animated.View>
            </View> 
          </TouchableOpacity> 
             <View style={{height:20}}></View>

            {/* <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: font.GoldPlay_Medium,
                  fontSize: 18,
                  // marginTop: 20,
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                NAME
              </Text>
              <TextInput
                value={name}
                mode="outlined"
                outlineStyle={{
                  borderColor: "white",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                }}
                inputMode="text"
                style={{
                  marginTop: 10,
                  //marginBottom: 20,
                  width: "75%",
                }}
                placeholder="Enter your name"
                placeholderTextColor={colors.LIGHT_GREY}
                contentStyle={{
                  fontFamily: font.GoldPlay_Medium,
                  marginLeft: 10,
                  fontSize: 20,
                }}
                onChangeText={(text) => handleName(text)}
                cursorColor="white"
                maxLength={32}
              />
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: font.GoldPlay_Medium,
                  fontSize: 18,
                  // marginTop: 20,
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                MOBILE NUMBER
              </Text>
              <TextInput
                value={phoneNo}
                mode="outlined"
                outlineStyle={{
                  borderColor: "white",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                }}
                inputMode="numeric"
                style={{
                  marginTop: 10,
                  //marginBottom: 20,
                  width: "75%",
                }}
                placeholder="Enter your number"
                placeholderTextColor={colors.LIGHT_GREY}
                contentStyle={{
                  fontFamily: font.GoldPlay_Medium,
                  marginLeft: 10,
                  fontSize: 20,
                }}
                onChangeText={(text) => setphoneNo(text)}
                maxLength={10}
                cursorColor="white"
              />
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
            
              
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font.GoldPlay_Medium,
                  fontSize: 18,
                  // marginTop: 20,
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                ADDRESS AS PER AADHAR CARD
              </Text>
              <TextInput
                value={address}
                mode="outlined"
                outlineStyle={{
                  borderColor: "white",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                }}
                inputMode="text"
                style={{
                  margin: 10,
                  marginBottom: 20,
                  width: SCREEN_WIDTH / 1.3,
                  height: SCREEN_HEIGHT / 6,
                }}
                placeholder="Enter your address"
                placeholderTextColor={colors.LIGHT_GREY}
                contentStyle={{
                  fontFamily: font.GoldPlay_Medium,
                  marginLeft: 10,
                  //marginTop: 20,
                  fontSize: 20,
                  textAlign: "left",
                }}
                onChangeText={(text) => setAddress(text)}
                numberOfLines={5}
                multiline={true}
                cursorColor="white"
                maxLength={100}
              />
            </View>

            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: font.GoldPlay_Medium,
                  fontSize: 18,
                  // marginTop: 20,
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                PAN CARD NUMBER
              </Text>
              <TextInput
                value={panNo}
                mode="outlined"
                outlineStyle={{
                  borderColor: "white",
                  backgroundColor: "transparent",
                  borderRadius: 15,
                }}
                inputMode="text"
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  width: "75%",
                }}
                placeholder="Pan Card Number"
                placeholderTextColor={colors.LIGHT_GREY}
                contentStyle={{
                  fontFamily: font.GoldPlay_Medium,
                  marginLeft: 10,
                  fontSize: 20,
                }}
                onChangeText={(text) => setPanNo(text)}
                maxLength={10}
                cursorColor="white"
                autoCapitalize="characters"
              />
            </View>

            <View>
              <Text
                style={{
                  fontFamily: font.GoldPlay_SemiBold,
                  fontSize: 18,
                  //marginTop: 20,
                  textAlign: "center",
                  alignItems: "center",
                  color: "white",
                }}
              >
                CURRENT ADDRESS
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  gap: 0,
                  marginTop: 15,
                  alignItems: "center",
                }}
              >
                <View style={{ marginTop: 2 }}>
                  <Checkbox
                    status={sameAddress ? "checked" : "unchecked"}
                    onPress={() => {
                      setSameAddress(!sameAddress);
                    }}
                    color="#000000"
                  />
                </View>

                <Text
                  style={{
                    fontFamily: font.GoldPlay_Medium,
                    fontSize: 16,

                    color: "white",
                  }}
                >
                  SAME AS PERMANENT
                </Text>
              </View>
            </View>

            {sameAddress ? null : (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: font.GoldPlay_Medium,
                    fontSize: 16,
                    //marginTop: 20,
                    textAlign: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  IF NOT AS PER PERMANENT ADDRESS
                </Text>
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: font.GoldPlay_Medium,
                      fontSize: 18,
                      // marginTop: 20,
                      textAlign: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    CURRENT CITY
                  </Text>
                  <TextInput
                    value={city}
                    mode="outlined"
                    outlineStyle={{
                      borderColor: "white",
                      backgroundColor: "transparent",
                      borderRadius: 15,
                    }}
                    inputMode="text"
                    style={{
                      marginTop: 10,
                      marginBottom: 20,
                      width: "75%",
                    }}
                    placeholder="Enter your city"
                    placeholderTextColor={colors.LIGHT_GREY}
                    contentStyle={{
                      fontFamily: font.GoldPlay_Medium,
                      marginLeft: 10,
                      fontSize: 20,
                    }}
                    onChangeText={(text) => setcity(text)}
                    maxLength={32}
                    cursorColor="white"
                  />
                </View>

                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: font.GoldPlay_Medium,
                      fontSize: 18,
                      // marginTop: 20,
                      textAlign: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    CURRENT STATE
                  </Text>
                  <TextInput
                    value={state}
                    mode="outlined"
                    outlineStyle={{
                      borderColor: "white",
                      backgroundColor: "transparent",
                      borderRadius: 15,
                    }}
                    inputMode="text"
                    style={{
                      marginTop: 10,
                      marginBottom: 20,
                      width: "75%",
                    }}
                    placeholder="Enter your state"
                    placeholderTextColor={colors.LIGHT_GREY}
                    contentStyle={{
                      fontFamily: font.GoldPlay_Medium,
                      marginLeft: 10,
                      fontSize: 20,
                    }}
                    onChangeText={(text) => setstate(text)}
                    maxLength={32}
                    cursorColor="white"
                  />
                </View>
              </View>
            )} */}
          </View>
          {/* <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 30,
            }}
          >
            <TouchableHighlight
              onPress={handleNext}
              style={{ backgroundColor: "transparent", borderRadius: 10 }}
              underlayColor={"black"}
            >
              <View
                style={{
                  paddingVertical: 8,
                  //   backgroundColor: "black",
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
            </TouchableHighlight>
          </View> */}
        </ScrollView>
      )}
       <DatePicker
        modal
        mode="date"
        open={openDate}
        date={date}
        maximumDate={new Date()}
        onConfirm={(date) => {
          setOpenDate(false)
          setDate(date)
          setSelectedDate(date);
          setDOB(moment(date).format("DD/MM/YYYY"))
        }}
        onCancel={() => {
          setOpenDate(false)
        }}
      />
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    marginVertical: 15,
  },
  input: {
    marginHorizontal: 5,
    fontSize:20,
    flex: 1,
  },
  lableText:{
    color:'#999999',
    fontFamily:font.GoldPlay_Regular,
    fontSize:16
  }
});
