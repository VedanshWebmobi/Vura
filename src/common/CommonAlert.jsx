import { StyleSheet, Text, TouchableHighlight, View, Image, Modal, Alert, TouchableWithoutFeedback} from "react-native";
import React from "react";
import { TextInput, Button, Checkbox,  Portal, PaperProvider, } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, font, icon } from "../constants";
import { SCREEN_HEIGHT } from "../Themes/stylesCommon";
import Icon from "@expo/vector-icons/MaterialIcons";


export default function ({
  visible,
  hideModal,
  iconColor = "red",
  title,
  bodyText,
  handleOkPress,
  handleCancelPress,
  cancelButton,
  bodyTextSize
}) {
  //   const [visible, setVisible] = React.useState(false);

  //   const showModal = () => setVisible(true);
  //   const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: "#fff",
    padding: 20,
    margin: 30, 
    height: SCREEN_HEIGHT / 2.1,
    borderRadius: 20,
  };
  //  height: SCREEN_HEIGHT / 2.4,
//<View  style={styles.container}>
  return (
      
    
        <Modal
          visible={visible}
          onDismiss={hideModal}
          transparent={true}
          onRequestClose={handleOkPress}
          //contentContainerStyle={containerStyle}
        >
          <TouchableWithoutFeedback onPress={handleOkPress}>
            <View style={styles.modalContainer} >
            <TouchableWithoutFeedback >
            <View style={styles.modalContent}>
          <View
            style={{
              alignItems: "center",
              gap: 10,
              //backgroundColor: "grey",
            
            }}
          >
            { title === "Error" ? <Icon
              name={"error"}
              size={40}
              color={
                iconColor === "red" ? colors.ERROR_RED : colors.SUCCESS_GREEN
              }
            /> :<Image style={{height:100, width:100, marginTop:-20}}
            source ={require('../../assets/success.gif')} /> }
            {/* <Icon
              name={"error"}
              size={40}
              color={
                iconColor === "red" ? colors.ERROR_RED : colors.SUCCESS_GREEN
              }
            /> */}
            <Text style={{color:title === "Error" ? "#000000" : "#059669",  fontFamily: font.GoldPlay_SemiBold, fontSize: 25, marginTop:title === "Error" ? 1 : -30, textAlign:'center' }}>
              {title}
            </Text>
            <Text
              style={{
                marginTop: 10,
                marginBottom:30,
                fontFamily: font.GoldPlay_SemiBold,
                fontSize:bodyTextSize ? bodyTextSize : 15,
                textAlign: "center",
              }}
            >
              {bodyText}
            </Text>
          </View>
          {/* <View
            style={{ flexDirection: "row", justifyContent: "center",  marginTop:30, marginBottom:30}}
          >
            <TouchableHighlight
              style={{
                alignItems: "center",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "black",
                paddingVertical: 10,
                width: 80,
                borderRadius: 10,
                //justifyContent: "flex-end",
              }}
              underlayColor={colors.YELLOW}
              onPress={handleOkPress}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: font.GoldPlay_SemiBold,
                  fontSize: 18,
                  color: "black",
                }}
              >
                Ok
              </Text>
            </TouchableHighlight>

            {cancelButton && (
              <TouchableHighlight
                style={{
                  alignItems: "center",
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "white",
                  paddingVertical: 10,
                  width: 80,
                  borderRadius: 10,
                  //justifyContent: "flex-end",
                }}
                underlayColor={"black"}
                onPress={handleCancelPress}
              >
                <Text
                  style={{
                    fontFamily: font.GoldPlay_SemiBold,
                    fontSize: 18,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Cancel
                </Text>
              </TouchableHighlight>
            )}
          </View> */}
          </View>
          </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
       
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width:'100%'
  },
  modalContent_new: {
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 10,
   
  },
});
