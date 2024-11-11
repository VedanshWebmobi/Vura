import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import DateRangePickerModal from "../common/DateRangePickerModal";
import { font, icon } from "../constants";

export default function CompletedHistory({ p_navigation, refresh }) {
  const [walletData, setWalletData] = useState([
    { id: 1, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 2, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 3, date: "August 29, 2024", invoieNo: "VSA/09/634/19-25" },
    { id: 4, date: "August 22, 2024", invoieNo: "VSA/09/634/21-25" },
    { id: 5, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 6, date: "August 2, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 7, date: "August 23, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 8, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 9, date: "August 9, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 10, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 1, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 2, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 3, date: "August 29, 2024", invoieNo: "VSA/09/634/19-25" },
    { id: 4, date: "August 22, 2024", invoieNo: "VSA/09/634/21-25" },
    { id: 5, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 6, date: "August 2, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 7, date: "August 23, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 8, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 9, date: "August 9, 2024", invoieNo: "VSA/09/634/24-25" },
    { id: 10, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // if(walletData.length > 0)
    //  {
    console.log("Refresh", refresh);

    fetchWalletData();
    //}
  }, [currentPage]);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentPage(1);
    }, [])
  );
  const LoadMoreData = () => {
    if (walletData.length > 0) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };
  const fetchWalletData = async () => {
    //setloader(true);
    if (currentPage > totalPages) {
      return;
    }
    // setIsLoading(true);
    try {
      const requestOptions = {
        headers: {
          Accept: "application/json",
          Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
        },
        params: {
          page: currentPage, // Pass the current page as a query parameter
          per_page: 10, // You may need to adjust this based on your API's pagination settings
        },
      };

      const response = await axiosCallAPI(
        "get",
        WITHDRAW_HISTORY,
        "",
        requestOptions,
        true,
        p_navigation
      );
      console.log("WithDrawal History", response.transaction_log.result);
      const newData = response.transaction_log.result;
      if (currentPage != 1) {
        setWalletData([...walletData, ...newData]);
      } else {
        setWalletData(newData);
      }
      //  if(response.client_data)
      //  {
      //  setwalletAmount(response.client_data.available_balance);
      //  setTotalAmount(response.client_data.received_amount);
      //  setWithdrawalAmount(response.client_data.withdrawal_amount);
      //  }
      setTotalPages(response.transaction_log.pages);
      // setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    } finally {
      // setIsLoading(false);
      // setloader(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: index % 2 == 0 ? "#fff" : "#f2f2f2",
        padding: 12,
      }}
      onPress={() => p_navigation.navigate("CompleteOrder")}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 12 }}>
            {item.date}
          </Text>
        </View>

        <View style={{}}>
          <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 12 }}>
            {item.invoieNo}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = (type) => {
    return (
      <View>
        {currentPage < totalPages && walletData.length > 0 && (
          <Progress.CircleSnail
            size={50}
            indeterminate={true}
            color={"black"}
            style={{ alignItems: "center" }}
          />
        )}
      </View>
    );
  };

  const renderEmptyComponent = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: font.GoldPlay_Regular,
          fontSize: 18,
          color: "black",
        }}
      >
        No Order History Found
      </Text>
    </View>
  );

  const handleDateFilter = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderHeader = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom: 15,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 18,
        }}
        onPress={handleDateFilter}
      >
        <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 14 }}>
          Dates
        </Text>
        <Image
          source={icon.FILTER_DIS}
          style={{ width: 20, height: 20, resizeMode: "contain" }}
        />
      </TouchableOpacity>
      <View>
        <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 14 }}>
          Invoice No.
        </Text>
      </View>
    </View>
  );

  return (
    <View>
      <DateRangePickerModal isVisible={isModalVisible} onClose={closeModal} />
      <FlatList
        data={walletData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={LoadMoreData}
        onEndReachedThreshold={0.1}
        style={{
          marginHorizontal: 15,
          marginTop: 22,
          marginBottom: 35,
        }}
        ListFooterComponent={renderFooter("wallet")}
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
