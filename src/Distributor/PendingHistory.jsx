import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import DateRangePickerModal from "../common/DateRangePickerModal";
import PendingClaimCard from "../common/PendingClaimCard";
import { useFocusEffect } from "@react-navigation/native";
import { colors, ExpoSecureKey, font, icon } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { axiosCallAPI } from "../Api/Axios";
import * as Preference from "../StoreData/Preference";
import { COMPLETED_HISTORY, WITHDRAW_HISTORY } from "../Api/Utils";
import axios from "axios";
import moment from "moment";

export default function PendingHistory({ searchText }) {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setloader] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigation = useNavigation();

  const handleDateRangeSelected = (start, end) => {
    console.log("Date Range Selected:", start, end);

    setStartDate(start);
    setEndDate(end);

    setCurrentPage(1);
    fetchOrderHistory(start, end);
  };

  useEffect(() => {
    if (orderHistory.length > 0) {
      console.log("startDate", startDate, endDate);
      fetchOrderHistory(startDate, endDate);
    }
  }, [currentPage]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("startDate", startDate, endDate);
      fetchOrderHistory(startDate, endDate);
    }, [])
  );

  useEffect(() => {
    fetchOrderHistory(startDate, endDate);
  }, [searchText]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("In pending");
      setCurrentPage(1);
    }, [])
  );
  const LoadMoreData = () => {
    if (orderHistory.length > 0) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const handlePending = (item) => {
    navigation.navigate("PendingOrder", { item: item });
  };

  const renderItem = ({ item, index }) => (
    <PendingClaimCard item={item} onPress={() => handlePending(item)} />
  );

  const handleDateFilter = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchOrderHistory = async (startDate, endDate) => {
    setloader(true);
    console.log(
      "Fetching order history on Pending:",
      moment(startDate).format("YYYY-MM-DD"),
      "endDate:",
      moment(endDate).format("YYYY-MM-DD")
    );
    try {
      const token = await Preference.getValueFor(ExpoSecureKey.TOKEN);

      const params = {
        page: currentPage,
        per_page: 10,
        type: "pending",
        startdate: startDate ? moment(startDate).format("YYYY-MM-DD") : "", // Convert date to ISO string if present
        enddate: endDate ? moment(endDate).format("YYYY-MM-DD") : "", // Convert date to ISO string if present
        search: searchText,
      };

      const headers = {
        Accept: "application/json",
        Authorization: token,
      };

      const response = await axios.get(COMPLETED_HISTORY, {
        headers: headers,
        params: params,
      });

      const newData = response.data.data.result;
      //console.log("Your response:", JSON.stringify(newData));
      if (currentPage !== 1) {
        setOrderHistory([...orderHistory, ...newData]);
      } else {
        setOrderHistory(newData);
      }
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setloader(false);
    }
  };

  const renderHeader = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom: 15,
        paddingTop: 5,
      }}
    >
      <View>
        <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 14 }}>
          Invoice No.
        </Text>
      </View>

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
        {startDate && endDate && (
          <View
            style={{
              backgroundColor: colors.ERROR_RED,
              height: 8,
              width: 8,
              borderRadius: 100,
              right: -3,
              top: -2,
              position: "absolute",
            }}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    return (
      <View>
        {currentPage < totalPages && orderHistory.length > 0 && (
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

  return (
    <View>
      <DateRangePickerModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onDateRangeSelected={handleDateRangeSelected}
      />
      <FlatList
        data={orderHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={LoadMoreData}
        onEndReachedThreshold={0.1}
        style={{
          marginHorizontal: 15,
          marginTop: 17,
          marginBottom: 35,
        }}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
