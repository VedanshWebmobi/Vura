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
import { SafeAreaView } from "react-native-safe-area-context";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import CommonHeaderNew from "../common/CommonHeader_new";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { RETAILER_ORDER_LIST } from "../Api/Utils";
import * as Preference from "../StoreData/Preference";
import { axiosCallAPI } from "../Api/Axios";
import * as Progress from "react-native-progress";
import moment from "moment";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function RetailerOrder({ navigation }) {
  const [orderListData, setOrderListData] = useState([]);
  const SCREEN_DIMENSIONS = Dimensions.get("window");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      console.log("Tab is focused");
      GetOrderList();

      return () => {
        console.log("Tab is unfocused");
      };
    }, [])
  );
  const GetOrderList = async () => {
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
        RETAILER_ORDER_LIST,
        "",
        requestOptions,
        true,
        navigation,
        true
      );
      console.log("OrderList => ", response);
      const newData = response.data;
      if (currentPage != 1) {
        setOrderListData([...orderListData, ...newData]);
      } else {
        setOrderListData(newData);
      }
      setTotalPages(response.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching retailer order data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const renderItem = ({ item }) => {
    // console.log(item);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={async () => {
          navigation.navigate("RetailerOrderDetail", {
            data: item,
            category: await Preference.getSelectedCategory(),
          });
        }}
        style={{
          gap: 5,
          padding: 18,
          elevation: 2,

          backgroundColor: "white",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 10,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.INVOICE_GREY,
              fontFamily: font.GoldPlay_Medium,
              fontSize: 12,
            }}
          >
            Invoice No.
          </Text>
          <Text
            style={{
              fontFamily: font.GoldPlay_SemiBold,
              fontSize: 20,
            }}
          >
            {item?.order_no}
          </Text>
          {/* <Text
              style={{
                color: colors.INVOICE_GREY,
                fontFamily: font.GoldPlay_Medium,
                fontSize: 12,
                marginTop: 10,
              }}
            >
              PO No.
            </Text>
            <Text
              style={{
                fontFamily: font.GoldPlay_SemiBold,
                fontSize: 20,
              }}
            >
              {item?.po_no}
            </Text>
            <Text
              style={{
                color: colors.INVOICE_GREY,
                fontFamily: font.GoldPlay_Medium,
                fontSize: 12,
                marginTop: 10,
              }}
            >
              PO Date
            </Text>
            <Text
              style={{
                fontFamily: font.GoldPlay_SemiBold,
                fontSize: 20,
              }}
            >
              {moment(item?.po_date, "YYYY-MM-DD").format("MMMM DD, YYYY")}
            </Text> */}
          <Text
            style={{
              color: colors.INVOICE_GREY,
              fontFamily: font.GoldPlay_Medium,
              fontSize: 12,
              marginTop: 10,
            }}
          >
            Status
          </Text>
          <Text
            style={{
              fontFamily: font.GoldPlay_SemiBold,
              fontSize: 20,
            }}
          >
            {item?.status_name}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",

            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <AntDesign name="right" size={20} color={colors.YELLOW} style={{}} />
        </View>
      </TouchableOpacity>
    );
  };
  const LoadMoreData = () => {
    if (orderListData.length > 0) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const renderFooter = (type) => {
    return (
      <View>
        {currentPage < totalPages && orderListData.length > 0 && (
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
        Order data not Found
      </Text>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <SafeAreaView style={{ flex: 1 }}>
        <CommonHeaderNew
          header_title={"RETAILER ORDERS"}
          header_color={colors.YELLOW}
          navigation={navigation}
        />
        <FlatList
          data={orderListData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          onEndReached={LoadMoreData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter("wallet")}
          ListEmptyComponent={renderEmptyComponent}
          style={{ margin: 16 }}
        />
      </SafeAreaView>
    </View>
  );
}
