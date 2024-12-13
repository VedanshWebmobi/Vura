import { FlatList, StyleSheet, Text, View, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import InvoiceCard from "../common/InvoiceCard";
import CommonAlert from "../common/CommonAlert";
import CommonHeaderNew from "../common/CommonHeader_new";
import * as Preference from "../StoreData/Preference";
import { StatusBar } from "expo-status-bar";
import MyTabBar from "../common/MyCustomTab";
import { colors, ExpoSecureKey } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { DOWNLOAD_INVOICE } from "../Api/Utils";
import axios from "axios";
import * as Progress from "react-native-progress";

const CompleteOrder = ({ route, navigation }) => {
  const { item } = route.params; // Extract 'item' from route.params

  const [showAlert, setshowAlert] = useState(false);
  const [invoiceData, setInvoiceData] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalBodyStyle, setmodalBodyStyle] = useState([]);

  useEffect(() => {
    if (item) {
      setInvoiceData([item]);
    }
  }, [item]);

  const handleAccept = (id) => {
    setshowAlert(true);
  };

  const handleReject = (id) => {
    setshowAlert(true);
  };

  const fetchPdf = async (item) => {
    const id = item?.pi_response?.order_id;
    try {
      const token = await Preference.getValueFor(ExpoSecureKey.TOKEN);

      const headers = {
        Accept: "application/json",
        Authorization: token,
      };

      // Assuming params are required for the API call, define them if necessary
      const params = {}; // Adjust or remove this if params are not needed
      console.log(DOWNLOAD_INVOICE + id);
      const response = await axios.get(`${DOWNLOAD_INVOICE}${id}`, {
        headers: headers,
        params: params, // Attach params if needed
      });

      const fileUrl = response?.data?.data; // Assuming the URL is in 'fileUrl'

      console.log("Your response:", response.data.data, id);

      if (fileUrl) {
        // Open the PDF directly using Linking
        Linking.openURL(fileUrl).catch((err) => {
          console.error("Failed to open URL:", err);
          setVisible(true);
          setIconColor("red");
          setshowAlert(true);
          setAlertTitle("OPPS!");
          setErrorMessage("Failed to open the PDF.");
        });
      } else {
        setVisible(true);
        setIconColor("red");
        setshowAlert(true);
        setAlertTitle("OPPS!");
        setErrorMessage("No PDF URL available.");
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setVisible(true);
      setIconColor("red");
      setshowAlert(true);
      setAlertTitle("OPPS!");
      setErrorMessage("No Invoice Found.");
    }
  };

  const renderInvoiceData = ({ item, index }) => (
    <InvoiceCard
      item={item}
      onPress={() => handleAccept(item.id)}
      buttons={false}
      onPdfPress={() => fetchPdf(item)}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <SafeAreaView>
        <CommonHeaderNew
          header_title={"COMPLETED ORDER"}
          header_color={colors.YELLOW}
          navigation={navigation}
        />
        <CommonAlert
          visible={visible} // Pass visibility state to the CommonAlert component
          hideModal={hideModal} // Pass function to hide the modal
          handleOkPress={() => {
            setVisible(false);
          }} // Pass function to handle Ok button press
          //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
          title={alertTitle} // Pass title text
          iconName="error"
          iconColor={iconColor}
          bodyText={errorMessage}
          bodyTextSize={20}
          imageStyle={{
            height: 50,
            width: 150,
            marginTop: 20,
            resizeMode: "cover",
          }}
          bodyTextStyle={[
            {
              // color: "#059669",
              // fontSize: 24,
              // fontSyle: font.GoldPlay_SemiBold,
              marginTop: 0,
            },
            modalBodyStyle,
          ]}
          // Pass body text
          // cancelButton={true} // Pass whether Cancel button should be displayed
        />

        <FlatList
          data={invoiceData}
          renderItem={renderInvoiceData}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            paddingBottom: 10,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          // onEndReached={LoadMoreDataCoupon}
          //onEndReachedThreshold={0.1}
          //  ListFooterComponent={renderFooter("coupon")}
          // ListEmptyComponent={renderEmptyComponent}
        />
      </SafeAreaView>
    </View>
  );
};

export default CompleteOrder;

const styles = StyleSheet.create({});
