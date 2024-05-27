import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  BackHandler,
  Dimensions
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, font, icon } from "../constants";
import stylesCommon from "../Themes/stylesCommon";
import CommonAlert from "../common/CommonAlert";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
export default function Category({ navigation }) {
  const data = [
    // "I Am An Employee",
    "I Am A Market Operator",
    "I Am A Distributer",
    "I Am A Dealer",
    "I Am A Retailer",
    "I Am A Contractor",
    "I Am An Architecht",
    "I Am An Artisan",
    
  ];
  const SCREEN_DIMENSIONS = Dimensions.get('window');
  const [selectedItem, setSelectedItem] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const Header = () => {
    return (
      <View
        style={{
          borderColor: "white",
       
       
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ color: "white", fontFamily: font.GoldPlay_SemiBold, fontSize:16 }}>
            SELECT REGISTRATION CATEGORY
          </Text>
        </View>
      </View>
    );
  };

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      // Check if navigation can go back
      navigation.dispatch(NavigationActions.back()); // Go back if possible
      return true; // Prevent default back button behavior
    } else {
      // Handle exit on PreLogin or other logic for other screens
      // (This part will be addressed in a later step)
    }
  };
  const renderItem = ({ item, index }) => {
    const isLast = index === data.length - 1;
    const isFirst = index === 0;
    const disabled = !isLast;
    return (
      <TouchableOpacity
        onPress={() => setSelectedItem(item)}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <View
          style={{
            borderColor: "white",
            padding: 10,
            borderWidth: 1,
            borderTopLeftRadius:isFirst?20:0,
            borderTopRightRadius:isFirst?20:0,
            borderBottomLeftRadius: isLast ? 20 : 0,
            borderBottomRightRadius: isLast ? 20 : 0,
            backgroundColor:"#FFFFFF",
            width: (SCREEN_DIMENSIONS.width -100)
            // backgroundColor: selectedItem === item ? "black" : "transparent",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 15,
              marginStart: 10,
              marginTop:(isFirst ? 10 :0),
              marginBottom:(isLast?10 : 0),
              alignItems:'center'
            }}
          >
            {
            selectedItem === item ? 
            <View
              style={{
                borderRadius: 50,
                height: 20,
                width: 20,
                borderWidth: 1,
                borderColor: "#000",
                backgroundColor:
                  "black" ,
               alignItems:'center', justifyContent:"center"

              }}
            >
              <View style={{borderWidth:6, borderColor:colors.YELLOW, borderRadius:50, height:18, width:18}}/>
            </View>
            : 
            <View
              style={{
                borderRadius: 50,
                height: 20,
                width: 20,
                borderWidth: 1,
                borderColor: "#000",
                backgroundColor:
                   "transparent",
              }}
            />}
            <Text
              style={{
                flex:1,
                // color: "white",
                fontFamily: (selectedItem === item) ?font.GoldPlay_SemiBold  :font.GoldPlay_Medium,
               // color: selectedItem === item ? "black" : "white",
               color:"#000000", fontSize:14
              }}
            >
              {item}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleConfirm = () => {
    if (selectedItem !== "") {
      navigation.navigate("Login");
    } else {
      setshowAlert(true);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1,  backgroundColor: colors.BLACK }}>
      <StatusBar backgroundColor={colors.BLACK} />

      <CommonAlert
        visible={showAlert} // Pass visibility state to the CommonAlert component
        hideModal={() => setshowAlert(false)} // Pass function to hide the modal
        handleOkPress={() => setshowAlert(false)} // Pass function to handle Ok button press
        //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
        title="Error" // Pass title text
        iconName="error"
        bodyText={"Please Select Any Category"} // Pass body text
        // cancelButton={true} // Pass whether Cancel button should be displayed
      />
      <View style={{flex:1}}>
      <View style={{height:(SCREEN_DIMENSIONS.height/5), alignItems:'center', justifyContent:'center', alignContent:'center',}}>
        <Text style={{width:56, height:11, backgroundColor:colors.YELLOW,borderRadius:2}}/>
      </View>

      <View
        style={{ 
          alignItems: "center",
          flex:1,
          
        }}
      >
      
        <Header/>
      
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={{ 
        }}
        />
      
      </View>

      <View
        style={{
          alignItems: "center",
          // backgroundColor: colors.GREY,
         height:SCREEN_DIMENSIONS.height/6,
     
          justifyContent: "center",
        }}
      >
        <TouchableHighlight
          onPress={handleConfirm}
          underlayColor={"black"}
          style={{ borderRadius: 15 }}
        >
        
            <Text style={[stylesCommon.preButtonLabelStyle,{textDecorationLine:'underline',color:selectedItem != "" ? colors.YELLOW : "#666666", fontSize:16}]}>CONFIRM</Text>
        
        </TouchableHighlight>
      </View>
      <Ionicons name="arrow-back" size={24} color="white" style={{position:'absolute',marginTop:20, marginStart:16}} onPress={()=>{console.log(navigation.goBack())}} /> 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
