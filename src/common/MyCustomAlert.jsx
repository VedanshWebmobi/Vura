import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

const CustomDialog = ({ children, ...dialogProps }) => {
  return (
    <Dialog {...dialogProps}>
      <View
        style={
          {
            /* your custom styles for the dialog */
          }
        }
      >
        {children}
      </View>
    </Dialog>
  );
};

export default MyCustomAlert = ({ isVisible, ...props }) => (
  <CustomDialog isVisible={isVisible} {...props}>
    {/* Your custom alert content (title, text body, button) */}
  </CustomDialog>
);

const handleNext = () => {
  if (image) {
    navigation.navigate("AddAdhar", { image: image });
  } else {
    setVisible(true); // Assuming you have a state variable for visibility
  }
};

return (
  <View style={stylesCommon.yellowbg}>
    {/* ... rest of your code ... */}
    <MyCustomAlert
      isVisible={visible} // Pass visibility state to MyCustomAlert
      type="DANGER"
      title="Error"
      textBody="Upload Your Photo First"
      button="close"
    />
  </View>
);
