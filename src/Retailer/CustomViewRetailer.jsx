import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors, font } from "../constants";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function CustomViewRetailer({
  isDate = false,
  isTextInput = false,
  isMultiLine = false,
  isDropDown = false,
  value,
  setValue,
  icon,
  placeHolderText,
  titleText,
  mainContainerStyle,
  numberOfLine = 1,
  maxLengthForMultiline = 100,
  onClickCalendar,
  showMaxLength = false,
  dropDownData,
  inputTextBackGround = "#FFFFFF",
  inputType = "default",
  titleTextStyle,
  _ref,
  _next_ref,
  ...rest
}) {
  const maxLength = isMultiLine ? maxLengthForMultiline : undefined;
  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];
  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      <Text style={[styles.titleStyle, titleTextStyle]}>{titleText}</Text>
      <View style={styles.inputContainer}>
        {isDate && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              console.log("Press");
              onClickCalendar();
            }}
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
            {...rest}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: font.GoldPlay_SemiBold,
                  fontSize: 14,
                  color: colors.BLACK,
                }}
              >
                {placeHolderText}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                console.log("Press");
                onClickCalendar();
              }}
            >
              <Image
                style={{ resizeMode: "contain", height: 25, width: 25 }}
                source={icon}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        {isTextInput && (
          <TextInput
            style={{
              width: "100%",
              padding: 10,
              fontFamily: font.GoldPlay_SemiBold,
              color: colors.BLACK,
              backgroundColor: inputTextBackGround,
              borderRadius: 10,
            }}
            multiline={isMultiLine}
            placeholder={placeHolderText}
            numberOfLines={numberOfLine}
            textAlignVertical={isMultiLine ? "top" : "center"}
            maxLength={maxLength}
            value={value}
            onChangeText={(text) => setValue(text)}
            ref={_ref}
            onSubmitEditing={() => {
              _next_ref ? _next_ref.current?.focus() : null;
            }}
            returnKeyType={"next"}
            keyboardType={inputType}
            {...rest}
          />
        )}
        {isDropDown && (
          <Dropdown
            style={[
              styles.dropdown,
              { backgroundColor: inputTextBackGround, borderRadius: 10 },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dropDownData ? dropDownData : data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeHolderText}
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item);
            }}
            iconColor={colors.YELLOW}
            {...rest}
          />
        )}
      </View>
      {isMultiLine && showMaxLength && (
        <View style={{ alignItems: "flex-end", marginTop: 5, marginRight: 5 }}>
          <Text style={{ fontFamily: font.GoldPlay_Regular, fontSize: 12 }}>
            {value ? `${value.length}/100` : "0/100"}
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {},
  inputContainer: {
    minHeight: 45,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    marginBottom: 8,
    fontSize: 14,
    fontFamily: font.GoldPlay_Medium,
  },
  dropdown: {
    padding: 10,
    height: 45,
    width: "100%",
    borderBottomColor: "gray",
    borderBottomWidth: 0,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: font.GoldPlay_SemiBold,
    color: colors.BLACK,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
