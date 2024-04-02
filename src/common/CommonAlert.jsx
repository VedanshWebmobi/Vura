import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import { TextInput, Button, Checkbox, Modal, Portal } from "react-native-paper";
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
}) {
  //   const [visible, setVisible] = React.useState(false);

  //   const showModal = () => setVisible(true);
  //   const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: colors.YELLOW,
    padding: 20,
    margin: 30,
    height: SCREEN_HEIGHT / 3,
    borderRadius: 20,
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <View
            style={{
              alignItems: "center",
              gap: 10,
              //backgroundColor: "grey",
              flex: 1,
            }}
          >
            <Icon
              name={"error"}
              size={40}
              color={
                iconColor === "red" ? colors.ERROR_RED : colors.SUCCESS_GREEN
              }
            />
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 25 }}>
              {title}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: font.GoldPlay_SemiBold,
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {bodyText}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 50 }}
          >
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
              onPress={handleOkPress}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: font.GoldPlay_SemiBold,
                  fontSize: 18,
                  color: "white",
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
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({});
