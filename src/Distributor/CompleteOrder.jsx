import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InvoiceCard from "../common/InvoiceCard";
import CommonAlert from "../common/CommonAlert";
import CommonHeaderNew from "../common/CommonHeader_new";
import { StatusBar } from "expo-status-bar";
import MyTabBar from "../common/MyCustomTab";
import { colors } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const CompleteOrder = ({ navigation }) => {
  const [showAlert, setshowAlert] = useState(false);
  const invoiceData = [
    {
      id: 1,
      invoiceNo: "VSA/09/630/24-25",
      date: "September 18, 2024",
      totalAmount: "63,041.00",
    },
  ];

  const handleAccept = (id) => {
    setshowAlert(true);
  };

  const handleReject = (id) => {
    setshowAlert(true);
  };

  const renderInvoiceData = ({ item, index }) => (
    <InvoiceCard
      item={item}
      onPress={() => handleAccept(item.id)}
      buttons={false}
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
