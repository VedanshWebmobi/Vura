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
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState, useRef } from "react";
import { RETAILER_ORDER_LIST, RETAILER_COMPLETE_ORDER } from "../Api/Utils";
import * as Preference from "../StoreData/Preference";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import { axiosCallAPI } from "../Api/Axios";
import * as Progress from "react-native-progress";
import moment from "moment";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Modal, Portal, Button } from "react-native-paper";
import CustomViewRetailer from "../Retailer/CustomViewRetailer";
import CommonAlert from "../common/CommonAlert";
import crashlytics from "@react-native-firebase/crashlytics";
import { Loader } from "../common/Loader";

export default function RetailerHistory({ navigation }) {
  const SCREEN_DIMENSIONS = Dimensions.get("window");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [orderListData, setOrderListData] = useState([]);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState("");
  const selectedOrderId = useRef("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 16,
  };
  useFocusEffect(
    useCallback(() => {
      console.log("Tab is focused");
      console.log("navigation => ", navigation);
      GetOrderList();

      return () => {
        console.log("Tab is unfocused");
      };
    }, [])
  );
  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);
  const GetOrderList = async () => {
    if (isFirstTime) {
      setIsLoading(true);
    }
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
      // console.log("OrderList => ", response);
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
      setIsFirstTime(false);
    }
  };

  const CompleteOrder = async () => {
    setIsLoading(true);
    try {
      crashlytics().log(
        "Distributor Retailer Order Screen => Order Complete Api call...."
      );
      var _data = new FormData();
      _data.append("order_id", selectedOrderId?.current);
      _data.append("remarks", reason);
      console.log("Complete Order =>", JSON.stringify(_data));
      const requestOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
        },
      };
      crashlytics().log(
        "Distributor Retailer Order Screen => Order Complete Api call => Parameter => " +
          JSON.stringify(_data)
      );
      var response = await axiosCallAPI(
        "post",
        RETAILER_COMPLETE_ORDER,
        _data,
        requestOptions,
        navigation
      );
      setIsLoading(false);
      if (response && response.status) {
        console.log("Api response => ", response);
        setIconColor("green");
        setVisibleAlert(true);
        setAlertTitle("Success");
        setErrorMessage(response.message);

        // setShowOtp(true);
      } else {
        setIconColor("red");
        setVisibleAlert(true);
        setAlertTitle("OPPS!");
        setErrorMessage(response.message);
        // setAlertMessage(response.error[0]);
        // setShowOtp(true);
        console.error("Invalid response data:", response);
      }
    } catch (error) {
      crashlytics().log(
        "Distributor Retailer Order Screen => Order Complete Api call => Main try catch"
      );
      crashlytics().recordError(error);
      setIconColor("red");
      setVisibleAlert(true);
      setAlertTitle("OPPS!");
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    console.log(JSON.stringify(item.status_type));
    return (
      <TouchableOpacity
        style={{
          gap: 5,
          padding: 18,
          elevation: 2,

          backgroundColor: "white",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 10,
        }}
        activeOpacity={0.8}
        onPress={async () => {
          navigation.navigate("RetailerOrderDetail", {
            data: item,
            category: await Preference.getSelectedCategory(),
          });
        }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
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
              <AntDesign
                name="right"
                size={20}
                color={colors.YELLOW}
                style={{}}
              />
            </View>
          </View>
          {(item.status_type === "APPROVED_CHANNEL_PARTNER" ||
            item.status_type === "INVOICE_UPDATED") && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                alignSelf: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 30,
                  marginEnd: "2%",
                  backgroundColor: "#000",
                  width: "48%",
                  height: 45,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                activeOpacity={0.8}
                onPress={async () => {
                  navigation.navigate("CreateInvoice", {
                    data: item,
                    category: await Preference.getSelectedCategory(),
                  });
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: font.GoldPlay_SemiBold,
                    fontSize: 12,
                  }}
                >
                  ADD INVOICE
                </Text>
              </TouchableOpacity>

              {item.status_type === "INVOICE_UPDATED" && (
                <TouchableOpacity
                  style={{
                    borderRadius: 30,
                    marginStart: "2%",
                    borderColor: "#000",
                    borderWidth: 2,
                    backgroundColor: "#fff",
                    width: "48%",
                    height: 45,

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  activeOpacity={0.8}
                  onPress={() => {
                    selectedOrderId.current = item.id;
                    showModal();
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontFamily: font.GoldPlay_SemiBold,
                      fontSize: 12,
                    }}
                  >
                    COMPLETE ORDER
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
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
        {isFirstTime ? "" : "Order data not Found"}
      </Text>
    </View>
  );

  return (
    <View style={{ margin: 16, flex: 1 }}>
      <CommonAlert
        visible={visibleAlert} // Pass visibility state to the CommonAlert component
        hideModal={() => {
          setVisibleAlert(false);
          if (alertTitle != "OPPS!") {
            // navigation.goBack();
            GetOrderList();
          }
        }} // Pass function to hide the modal
        handleOkPress={() => {
          setVisibleAlert(false);
          if (alertTitle != "OPPS!") {
            // navigation.goBack();
            GetOrderList();
          }
        }} // Pass function to handle Ok button press
        //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
        title={alertTitle} // Pass title text
        iconName="error"
        iconColor={iconColor}
        bodyText={errorMessage} // Pass body text
        // cancelButton={true} // Pass whether Cancel button should be displayed
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
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ flex: 1 }}
        >
          <View>
            <CustomViewRetailer
              isTextInput
              isMultiLine
              titleText={"Remark"}
              placeHolderText={"Remark"}
              numberOfLine={5}
              inputTextBackGround={"#FAFAFA"}
              value={reason}
              setValue={setReason}
            />

            <TouchableOpacity
              style={{
                borderRadius: 30,

                backgroundColor: "#000",
                width: "48%",
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: 20,
              }}
              activeOpacity={0.8}
              onPress={() => {
                if (reason.length > 0) {
                  CompleteOrder();
                  hideModal();
                } else {
                  setIconColor("red");
                  setVisibleAlert(true);
                  setAlertTitle("OPPS!");
                  setErrorMessage("Please enter your remark.");
                }
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: font.GoldPlay_SemiBold,
                  fontSize: 16,
                }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Portal>
      <Loader loading={isLoading} />
    </View>
  );
}
