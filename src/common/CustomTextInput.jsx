import React, { useRef } from "react";
import { TextInput } from "react-native-paper";
import { colors } from "../constants";
import stylesCommon from "../Themes/stylesCommon";

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  ...props
}) => {
  const textInputRef = useRef(null);

  const handleFocus = () => {
    if (textInputRef.current) {
      textInputRef.current.setNativeProps({
        style: {
          borderColor: colors.BLACK,
        },
      });
    }
  };

  const handleBlur = () => {
    if (textInputRef.current) {
      textInputRef.current.setNativeProps({
        style: {
          borderColor: colors.GREY_TXT,
        },
      });
    }
  };

  return (
    <TextInput
      ref={textInputRef}
      label={label}
      mode="flat"
      onChangeText={onChangeText}
      textColor={colors.BLACK}
      underlineColor={colors.GREY_TXT}
      activeUnderlineColor={colors.BLACK}
      style={stylesCommon.editInputs}
      contentStyle={{ borderWidth: 1, borderColor: colors.GREY_TXT }}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
};

export default CustomTextInput;
