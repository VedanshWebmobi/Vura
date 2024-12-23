import { FlatList, StyleSheet, Text, View, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import InvoiceCard from "../common/InvoiceCard";
import CommonAlert from "../common/CommonAlert";
import { ExpoSecureKey, font } from "../constants";
import RejectionModal from "../common/RejectionModal";
import { DOWNLOAD_INVOICE, ORDERS, ORDER_ACCEPT, PRODUCTS } from "../Api/Utils";
import { axiosCallAPI } from "../Api/Axios";
import * as Preference from "../StoreData/Preference";
import * as Progress from "react-native-progress";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const InvoiceList = ({ navigation, searchText }) => {
  const [showAlert, setshowAlert] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [iconColor, setIconColor] = useState("red");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [totalPages, setTotalPages] = useState(2);
  const [rejectionInvoiceId, setRejectionInvoiceId] = useState(null);
  const [loader, setloader] = useState(false);

  const [invoiceData, setInvoiceData] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrderData();
  }, [searchText]);

  const handleAccept = async (id) => {
    console.log("This is the id", id);
    let formData = new FormData();
    formData.append("id", id);

    let requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
      },
    };

    axiosCallAPI(
      "post",
      ORDER_ACCEPT,
      formData,
      requestOptions,
      true,
      navigation
    )
      .then((response) => {
        if (response && response.status) {
          setshowAlert(true);
          setIconColor("green");
          setAlertTitle("");
          setAlertMessage("THANK YOU \nFOR ACCEPTING");
          fetchOrderData();
        } else {
          setIconColor("red");
          setshowAlert(true);
          setAlertTitle("OPPS!");
          setAlertMessage(response.message);
          // setAlertMessage(response.error[0]);
          // setShowOtp(true);
          fetchOrderData();
          console.error("Invalid response data:", response);
        }
      })

      .catch((error) => {
        setIconColor("red");
        setshowAlert(true);
        setAlertTitle("OPPS!");
        setAlertMessage(error);
        fetchOrderData();
        console.error("Error in login request:", error);
      });
  };

  // useEffect(() => {
  //   fetchOrderData();
  // }, [currentPage]);

  useEffect(() => {
    fetchOrderData();
  }, [currentPage]);

  useEffect(() => {
    console.log("Here is the invoice list");
    fetchOrderData();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchOrderData();
  //   }, [])
  // );

  // const fetchOrderData = async () => {
  //   console.error("Invoice list updated");
  //   if (currentPage == 1) {
  //     // setInvoiceData([]);
  //   }

  //   // setIsLoading(true);
  //   try {
  //     const params = {
  //       //  search: search,
  //       page: currentPage, // Pass the current page as a query parameter
  //       per_page: 10, // You may need to adjust this based on your API's pagination settings
  //       type: "",
  //     };
  //     const requestOptions = {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
  //       },
  //     };

  //     const response = await axiosCallAPI(
  //       "get",
  //       ORDERS,
  //       params,
  //       requestOptions,
  //       true,
  //       navigation
  //     );
  //     // console.log(JSON.stringify(response.result));
  //     setIsFirstTime(false);

  //     const newData = response.result;

  //     if (newData.length > 0) {
  //       console.log("HEre is the data", newData);
  //       setInvoiceData(newData);
  //     } else {
  //       setInvoiceData([]);
  //     }

  //     // if(response.pages == 0)
  //     // {
  //     //   setTotalPages(2);
  //     // }
  //     // else{
  //     setIsLoading(false);
  //     setTotalPages(response.pages);
  //     // }
  //     setCurrentPage(currentPage + 1);
  //   } catch (error) {
  //     console.error("Error fetching Order data:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchOrderData = async () => {
    setloader(true);

    try {
      const token = await Preference.getValueFor(ExpoSecureKey.TOKEN);

      const params = {
        page: currentPage,
        per_page: 10,
        type: "",
        search: searchText,
      };

      const headers = {
        Accept: "application/json",
        Authorization: token,
      };

      const response = await axios.get(ORDERS, {
        headers: headers,
        params: params,
      });
      // console.log(
      //   "Full Response of invoic3:",
      //   response.data.data.result,
      //   params
      // );

      const newData = response.data.data.result;
      //console.error("Your response vvv:", JSON.stringify(newData));
      if (currentPage !== 1) {
        setInvoiceData([...invoiceData, ...newData]);
      } else {
        setInvoiceData(newData);
      }

      setTotalPages(response?.data?.data?.pages);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setloader(false);
    }
  };

  const handleReject = (id) => {
    setRejectionInvoiceId(id);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
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

      const response = await axios.get(`${DOWNLOAD_INVOICE}${id}`, {
        headers: headers,
        params: params, // Attach params if needed
      });

      const fileUrl = response?.data?.data; // Assuming the URL is in 'fileUrl'

      console.log("Your response:", response.data);

      if (fileUrl) {
        // Open the PDF directly using Linking
        Linking.openURL(fileUrl).catch((err) => {
          console.error("Failed to open URL:", err);

          setIconColor("red");
          setshowAlert(true);
          setAlertTitle("OPPS!");
          setAlertMessage("Failed to open the PDF.");
        });
      } else {
        setIconColor("red");
        setshowAlert(true);
        setAlertTitle("OPPS!");
        setAlertMessage("No PDF URL available.");
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);

      setIconColor("red");
      setshowAlert(true);
      setAlertTitle("OPPS!");
      setAlertMessage("Failed to fetch PDF data.");
    }
  };

  const renderFooter = () => {
    return (
      <View>
        {currentPage < totalPages && invoiceData.length > 0 && (
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
  const LoadMoreData = () => {
    if (invoiceData.length > 0) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    }
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

  const renderInvoiceData = ({ item, index }) => (
    <InvoiceCard
      item={item}
      onAccept={() => handleAccept(item.id)}
      onClaim={() => handleReject(item.id)}
      onPdfPress={() => fetchPdf(item)}
    />
  );

  return (
    <View>
      <RejectionModal
        isVisible={isModalVisible}
        onClose={closeModal}
        fetchOrderData={fetchOrderData}
        initialClaimedTitle="Claim 1"
        initialDescription="This is a sample description"
        invoiceId={rejectionInvoiceId}
      />
      <CommonAlert
        visible={showAlert} // Pass visibility state to the CommonAlert component
        hideModal={() => setshowAlert(false)} // Pass function to hide the modal
        handleOkPress={() => setshowAlert(false)} // Pass function to handle Ok button press
        //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
        title={alertTitle}
        bodyText={alertMessage}
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
        iconColor={iconColor}
        // cancelButton={true} // Pass whether Cancel button should be displayed
      />
      <FlatList
        data={invoiceData}
        renderItem={renderInvoiceData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 20, marginTop: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        onEndReached={LoadMoreData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter("coupon")}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

export default InvoiceList;

const styles = StyleSheet.create({});
