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
import * as Preference from "../StoreData/Preference";
import DateRangePickerModal from "../common/DateRangePickerModal";
import { colors, ExpoSecureKey, font, icon } from "../constants";
import { axiosCallAPI } from "../Api/Axios";
import { COMPLETED_HISTORY, WITHDRAW_HISTORY } from "../Api/Utils";
import axios from "axios";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";

export default function CompletedHistory({ searchText }) {
  // const [orderHistory, setOrderHistory] = useState([
  //   { id: 1, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 2, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 3, date: "August 29, 2024", invoieNo: "VSA/09/634/19-25" },
  //   { id: 4, date: "August 22, 2024", invoieNo: "VSA/09/634/21-25" },
  //   { id: 5, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 6, date: "August 2, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 7, date: "August 23, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 8, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 9, date: "August 9, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 10, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 1, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 2, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 3, date: "August 29, 2024", invoieNo: "VSA/09/634/19-25" },
  //   { id: 4, date: "August 22, 2024", invoieNo: "VSA/09/634/21-25" },
  //   { id: 5, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 6, date: "August 2, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 7, date: "August 23, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 8, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 9, date: "August 9, 2024", invoieNo: "VSA/09/634/24-25" },
  //   { id: 10, date: "September 02, 2024", invoieNo: "VSA/09/634/24-25" },
  // ]);

  const [orderHistory, setOrderHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setloader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigation = useNavigation();
  const [showDot, setshowDot] = useState(false);

  // Function to handle date range selection from the modal
  const handleDateRangeSelected = (start, end) => {
    console.log("Date Range Selected:", start, end);
    setshowDot(true);
    setStartDate(start);
    setEndDate(end);
    setCurrentPage(1);
    fetchOrderHistory(start, end);
  };

  useEffect(() => {
    if (orderHistory?.length > 0) {
      fetchOrderHistory();
    }
  }, [currentPage]);

  useEffect(() => {
    fetchOrderHistory(startDate, endDate);
  }, [searchText]);

  useFocusEffect(
    React.useCallback(() => {
      setshowDot(false);
      fetchOrderHistory();
      //resetDates();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      setCurrentPage(1);
    }, [])
  );

  // const resetDates = () => {
  //   setStartDate("");
  //   setEndDate("");

  //   fetchOrderHistory(undefined, undefined);
  // };

  const LoadMoreData = () => {
    if (orderHistory?.length > 0) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const fetchOrderHistory = async (startDate, endDate) => {
    setloader(true);
    console.log(
      "Fetching order history Of Confirmed:",
      moment(startDate).format("YYYY-MM-DD"),
      startDate !== undefined,
      "endDate:",
      moment(endDate).format("YYYY-MM-DD"),
      endDate
    );
    try {
      const token = await Preference.getValueFor(ExpoSecureKey.TOKEN);

      const params = {
        page: currentPage,
        per_page: 10,
        type: "confirmed",
        startdate:
          startDate !== undefined ? moment(startDate).format("YYYY-MM-DD") : "",
        enddate:
          endDate !== undefined ? moment(endDate).format("YYYY-MM-DD") : "",
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

      console.log("response data:", response);
      const newData = response.data.data.result;

      if (currentPage !== 1) {
        setOrderHistory([...orderHistory, ...newData]);
      } else {
        setOrderHistory(newData);
      }
      console.log("here is the pages", response?.data?.data?.pages);
      setTotalPages(response?.data?.data?.pages);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setloader(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: index % 2 == 0 ? "#fff" : "#f2f2f2",
        padding: 12,
      }}
      onPress={() => navigation.navigate("CompleteOrder", { item: item })}
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
            {moment(item?.pi_response?.main_invoice_date).format(
              "MMMM DD, YYYY"
            )}
          </Text>
        </View>

        <View style={{}}>
          <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 12 }}>
            {item?.pi_response?.main_invoice_no}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    return (
      <View>
        {currentPage < totalPages && orderHistory?.length > 0 && (
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
        paddingTop: 5,
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
        {startDate && endDate && showDot && (
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
      <View>
        <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 14 }}>
          Invoice No.
        </Text>
      </View>
    </View>
  );

  return (
    <View>
      <DateRangePickerModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onDateRangeSelected={handleDateRangeSelected}
        //resetDates={resetDates}
      />
      <FlatList
        data={orderHistory}
        renderItem={renderItem}
        //  keyExtractor={(item) => item}
        keyExtractor={(item) => item?.pi_response?.order_id?.toString()}
        showsVerticalScrollIndicator={true}
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
      />
    </View>
  );
}

const styles = StyleSheet.create({});
