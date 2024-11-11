import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InvoiceCard from "../common/InvoiceCard";
import CommonAlert from "../common/CommonAlert";
import { font } from "../constants";
import RejectionModal from "../common/RejectionModal";

const InvoiceList = () => {
  const [showAlert, setshowAlert] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const invoiceData = [
    {
      id: 1,
      invoiceNo: "VSA/09/630/24-25",
      date: "September 18, 2024",
      totalAmount: "63,041.00",
    },
    {
      id: 2,
      invoiceNo: "VSA/09/632/24-25",
      date: "September 13, 2024",
      totalAmount: "66,041.00",
    },
    {
      id: 3,
      invoiceNo: "VSA/09/633/24-25",
      date: "September 14, 2024",
      totalAmount: "79,041.00",
    },
    {
      id: 4,
      invoiceNo: "VSA/09/631/24-25",
      date: "September 11, 2024",
      totalAmount: "80,041.00",
    },
  ];

  const handleAccept = (id) => {
    setshowAlert(true);
  };

  const handleReject = (id) => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const renderInvoiceData = ({ item, index }) => (
    <InvoiceCard
      item={item}
      onAccept={() => handleAccept(item.id)}
      onClaim={() => handleReject(item.id)}
    />
  );

  return (
    <View>
      <RejectionModal
        isVisible={isModalVisible}
        onClose={closeModal}
        initialClaimedTitle="Claim 1" // Initial value for the dropdown
        initialDescription="This is a sample description" // Initial text for description
      />
      <CommonAlert
        visible={showAlert} // Pass visibility state to the CommonAlert component
        hideModal={() => setshowAlert(false)} // Pass function to hide the modal
        handleOkPress={() => setshowAlert(false)} // Pass function to handle Ok button press
        //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press

        bodyText={"THANK YOU \nFOR ACCEPTING"}
        bodyTextSize={20}
        imageStyle={{
          height: 50,
          width: 150,
          marginTop: 20,
          resizeMode: "cover",
        }}
        bodyTextStyle={{
          color: "#059669",
          fontSize: 24,
          fontSyle: font.GoldPlay_SemiBold,
          marginTop: 0,
        }}
        // cancelButton={true} // Pass whether Cancel button should be displayed
      />
      <FlatList
        data={invoiceData}
        renderItem={renderInvoiceData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 20, marginTop: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        // onEndReached={LoadMoreDataCoupon}
        //onEndReachedThreshold={0.1}
        //  ListFooterComponent={renderFooter("coupon")}
        // ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

export default InvoiceList;

const styles = StyleSheet.create({});
