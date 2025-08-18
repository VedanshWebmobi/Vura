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
  SafeAreaView,
  TextInput,
} from "react-native";
//import { SafeAreaView } from "react-native-safe-area-context";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import CommonHeaderNew from "../common/CommonHeader_new";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState, memo, useRef } from "react";
import * as Preference from "../StoreData/Preference";
import { axiosCallAPI } from "../Api/Axios";
import * as Progress from "react-native-progress";
import moment from "moment";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import CustomViewRetailer from "../Retailer/CustomViewRetailer";
import { Modal, Portal, Button } from "react-native-paper";
import {
  RETAILER_ORDER_ACTION,
  RETAILER_CREATE_INVOICE,
  RETAILER_COMPLETE_ORDER,
} from "../Api/Utils";
import crashlytics from "@react-native-firebase/crashlytics";
import CommonAlert from "../common/CommonAlert";
import DatePicker from "react-native-date-picker";
import Feather from "@expo/vector-icons/Feather";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import { Loader } from "./Loader";

export default function RetailerOrderDetail({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleModel, setVisibleModel] = useState(false);
  const [reason, setReason] = useState("");
  const [action, setAction] = useState("");
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("Select Date");
  const [openDate, setOpenDate] = useState(false);
  const [showView, setSHowView] = useState(false);
  const [image, setImage] = useState("");
  const [completeRemark, setCompleteRemark] = useState("");
  const route = useRoute();
  const isApiCall = useRef(false);
  const SCREEN_DIMENSIONS = Dimensions.get("window");
  const { data, category } = route.params;
  console.log("Data => ", JSON.stringify(data));
  const [products, setProducts] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceTotal, setInvoiceTotal] = useState("");
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 16,
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const scale = useRef(new Animated.Value(1)).current;
  const stretchValue = useRef(new Animated.Value(1)).current;
  const interpolatedStretchAnimation = stretchValue.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0.9], // You can adjust the output range to control the stretching size
  });
  const stretch = (stretch_Value) => {
    Animated.sequence([
      Animated.timing(stretch_Value, {
        toValue: 2, // You can adjust this value to control the stretch level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(stretch_Value, {
        toValue: 1, // You can adjust this value to control the stretch level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Reset the stretch value to 1
      stretch_Value.setValue(1);
    });
  };
  const scaleText = (scale_value) => {
    Animated.sequence([
      Animated.timing(scale_value, {
        toValue: 0.9, // You can adjust this value to control the scale level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(scale_value, {
        toValue: 1, // You can adjust this value to control the scale level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Reset the scale to 1
      scale_value.setValue(1);
    });
  };
  useEffect(() => {
    if (
      data.status_type === "INVOICE_UPDATED" ||
      data.status_type === "COMPLETED"
    ) {
      console.log("Invoice => ", data.invoices[0].invoice_items);
      setImage(data.invoices[0].invoice_file_url);
      setProducts(data.invoices[0].invoice_items);
      setSelectedDate(
        moment(data.invoices[0].invoice_date, "YYYY-MM-DD").format("DD-MM-YYYY")
      );
      setInvoiceNo(data.invoices[0].invoice_no);
      setInvoiceTotal(data.invoices[0].invoice_total);
      setInvoice(data.invoices);
    } else {
      setProducts(data.items);
    }

    Preference.getSelectedCategory().then((category) => {
      setSelectedCategory(category);
    });
  }, []);
  const OpenCalendar = () => {
    setOpenDate(true);
  };
  const handleInputChange = useCallback((index, field, value) => {
    console.log("Details =>", index + ", " + field + ", " + value);

    setProducts((pre) => {
      const updatedProducts = [...pre];
      updatedProducts[index][field] = value;
      return updatedProducts;
    });
  }, []);

  const uploadImage = async (mode) => {
    let result = {};
    try {
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,

          quality: 0.4,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,

          quality: 0.4,
        });
      }

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      crashlytics().log(
        "RetailerOrder Detail => Photo or gallery selection try catch"
      );
      crashlytics().recordError(error);
      alert("Error uploading image: " + error.message);
      hideModal();
    }
  };

  const saveImage = async (image) => {
    try {
      console.log(image);
      setImage(image);
      setVisibleModel(false);
    } catch (error) {
      throw error;
    }
  };

  const checkValidation = () => {
    var msg = "";
    var isValid = true;
    if (selectedDate == "Select Date") {
      isValid = false;
      msg = "Please select date.";
    } else if (invoiceNo.trim().length <= 0) {
      isValid = false;
      msg = "Please enter Invoice No.";
    } else if (invoiceTotal.trim().length <= 0) {
      isValid = false;
      msg = "Please enter Invoice total.";
    } else {
      var tempProduct = [...products];
      var filterField = tempProduct.filter(
        (item) =>
          item.qty.length == 0 ||
          item.amount === "0.00" ||
          item.amount.trim().length == 0
      );
      console.log(filterField);
      if (filterField.length > 0) {
        isValid = false;
        msg = "Please enter product details.";
      } else if (image.length == 0) {
        isValid = false;
        msg = "Please upload invoice photo.";
      }
    }

    if (!isValid) {
      setAlertTitle("OPPS!");
      setErrorMessage(msg);
      setVisibleAlert(true);
    }
    return isValid;
  };

  const CreateInvoice = async () => {
    crashlytics().log(
      "Retailer Order Detail Screen => Create Invoice Api call"
    );
    setIsLoading(true);
    let invoiceData = new FormData();
    if (image.length > 0) {
      invoiceData.append("invoice_file", {
        uri: image,
        type: "image/*",
        name: "invoice_image.jpg",
      });
    }
    invoiceData.append("order_id", data.id);
    invoiceData.append(
      "invoice_date",
      moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")
    );
    invoiceData.append("invoice_no", invoiceNo);
    invoiceData.append("invoice_total", invoiceTotal);
    invoiceData.append("items", await ConvertApiData());
    let requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
      },
    };
    crashlytics().log(
      "Retailer Order Detail Screen => Create Invoice Api call => Parameter => " +
        JSON.stringify(invoiceData)
    );
    axiosCallAPI(
      "post",
      RETAILER_CREATE_INVOICE,
      invoiceData,
      requestOptions,
      navigation
    )
      .then((response) => {
        crashlytics().log(
          "Retailer Order Detail Screen => Create Invoice Api call => Response =>" +
            JSON.stringify(response)
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
      })
      .catch((error) => {
        crashlytics().log(
          "Retailer Order Detail Screen => Create Invoice Api call => Main try catch"
        );
        crashlytics().recordError(error);
        setIsLoading(false);
        isApiCall.current = false;
        setIconColor("red");
        setVisibleAlert(true);
        setAlertTitle("OPPS!");
        setErrorMessage(error);
        console.error("Error in login request:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const ConvertApiData = async () => {
    const trimmedData = products.map((item) => ({
      price: item.amount,
      item_id: item.item_id,
      qty: item.qty,
    }));
    return JSON.stringify(trimmedData);
  };
  const OrderAction = async () => {
    setIsLoading(true);
    crashlytics().log(
      "Distributor Retailer Order Screen => Order Action Api call...."
    );
    var _data = new FormData();
    _data.append("order_id", data.id);
    _data.append("new_status", action);
    _data.append("remarks", reason);

    const requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
      },
    };
    crashlytics().log(
      "Distributor Retailer Order Screen => Order Action Api call => Parameter => " +
        JSON.stringify(_data)
    );

    axiosCallAPI(
      "post",
      RETAILER_ORDER_ACTION,
      _data,
      requestOptions,
      false,
      navigation
    )
      .then((response) => {
        crashlytics().log(
          "Distributor Retailer Order Screen => Order Action Api call => Response =>" +
            JSON.stringify(response)
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
      })
      .catch((error) => {
        crashlytics().log(
          "Distributor Retailer Order Screen => Order Action Api call => Main try catch"
        );
        crashlytics().recordError(error);
        setIconColor("red");
        setVisibleAlert(true);
        setAlertTitle("OPPS!");
        setErrorMessage(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const CompleteOrder = async () => {
    setIsLoading(true);
    try {
      crashlytics().log(
        "Distributor Retailer Order Screen => Order Complete Api call...."
      );
      var _data = new FormData();
      _data.append("order_id", data.id);
      _data.append("remarks", completeRemark);

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
  const ProductCollectionView = ({ item, index }) => {
    console.log("Product Collection =>", item);
    return (
      <View key={index}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 35,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 16 }}
          >{`${index + 1}) Product`}</Text>
          <TouchableOpacity
            onPress={() => {
              RemoveProduct(index);
            }}
          ></TouchableOpacity>
        </View>
        {item.category_name && (
          <CustomViewRetailer
            isTextInput
            titleText={"Product Category"}
            mainContainerStyle={{ marginTop: 10 }}
            value={item.category_name}
            placeHolderText={"Select Product Category"}
            editable={false}
          />
        )}
        <CustomViewRetailer
          isTextInput
          titleText={"Product Name"}
          mainContainerStyle={{ marginTop: 15 }}
          value={item.product_name}
          placeHolderText={"Select Product"}
          editable={false}
        />

        <CustomViewRetailer
          isTextInput
          titleText={
            data.status_type === "APPROVED_CHANNEL_PARTNER"
              ? "Quantity"
              : "Quantity"
          }
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Add Quantity"}
          value={`${item.qty}`}
          setValue={(text) => {
            handleInputChange(index, "qty", text);
          }}
          editable={false}
          inputType={"numeric"}
        />
        {/* {data.status_type === "APPROVED_CHANNEL_PARTNER" &&
          category === "retailer" && (
            <CustomViewRetailer
              isTextInput
              titleText={"Price"}
              mainContainerStyle={{ marginTop: 10 }}
              placeHolderText={"Add Price."}
              value={item.amount}
              setValue={(text) => {
                handleInputChange(index, "amount", text);
              }}
              editable={true}
              inputType={"decimal-pad"}
            />
          )} */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.GREY_TXT,
              marginTop: 5,
            }}
          />
        </View>
      </View>
    );
  };
  const InvoiceCollection = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          minHeight: 45,
          borderRadius: 10,
          backgroundColor: colors.WHITE,
          justifyContent: "center",
          padding: 10,
          marginTop: 5,
        }}
        onPress={async () => {
          navigation.navigate("InvoiceDetails", {
            data: item,
            category: await Preference.getSelectedCategory(),
          });
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontFamily: font.GoldPlay_SemiBold,
              fontSize: 16,
              flex: 1,
            }}
          >{`${index + 1}) Invoice No - ${item.invoice_no}`}</Text>
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.YELLOW }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <CommonAlert
          visible={visibleAlert} // Pass visibility state to the CommonAlert component
          hideModal={() => {
            setVisibleAlert(false);
            if (alertTitle != "OPPS!") {
              navigation.goBack();
            }
          }} // Pass function to hide the modal
          handleOkPress={() => {
            setVisibleAlert(false);
            if (alertTitle != "OPPS!") {
              navigation.goBack();
            }
          }} // Pass function to handle Ok button press
          //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
          title={alertTitle} // Pass title text
          iconName="error"
          iconColor={iconColor}
          bodyText={errorMessage} // Pass body text
          // cancelButton={true} // Pass whether Cancel button should be displayed
        />
        <CommonHeaderNew
          header_title={"RETAILER ORDERS"}
          header_color={colors.YELLOW}
          navigation={navigation}
        />
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <View style={{ flex: 1, padding: 16 }}>
            {(data.status_type === "DISTRIBUTION_NETWORK" ||
              data.status_type === "REJECTED_CHANNEL_PARTNER") &&
              (category === "distributer" || category === "dealer") && (
                <View>
                  <CustomViewRetailer
                    isTextInput
                    value={moment(data?.order_date, "YYYY-MM-DD").format(
                      "DD-MM-YYYY"
                    )}
                    titleText={"Date"}
                    editable={false}
                  />
                  <CustomViewRetailer
                    isTextInput
                    titleText={"PO No."}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"PO No."}
                    value={data?.po_no}
                    editable={false}
                  />
                  <CustomViewRetailer
                    isTextInput
                    mainContainerStyle={{ marginTop: 10 }}
                    value={moment(data?.po_date, "YYYY-MM-DD").format(
                      "DD-MM-YYYY"
                    )}
                    titleText={"PO Date"}
                    editable={false}
                  />
                  <CustomViewRetailer
                    isTextInput
                    isMultiLine
                    titleText={"PO Remarks"}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"Po Remarks."}
                    numberOfLine={4}
                    value={data?.remarks}
                    editable={false}
                  />

                  {/* {data.items.map((product, index) => (
                  <ProductCollectionView
                    index={index}
                    product={product}
                    key={index}
                  />
                ))} */}
                  <CustomViewRetailer
                    isTextInput
                    titleText={"Payments Terms"}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"Payments Terms"}
                    value={data.payment_terms}
                    editable={false}
                  />
                  <CustomViewRetailer
                    isTextInput
                    titleText={"Mode of Transport"}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"Mode of Transport"}
                    value={data.mode_transport}
                    editable={false}
                  />
                  <CustomViewRetailer
                    isTextInput
                    isMultiLine
                    titleText={"Note"}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"Note."}
                    numberOfLine={4}
                    value={data.note}
                    editable={false}
                  />
                  {data.status_type === "REJECTED_CHANNEL_PARTNER" && (
                    <CustomViewRetailer
                      isTextInput
                      isMultiLine
                      titleText={"Reject Reason"}
                      mainContainerStyle={{ marginTop: 10 }}
                      placeHolderText={"Reject Reason."}
                      numberOfLine={4}
                      value={data.status_note}
                      editable={false}
                      titleTextStyle={{
                        color: colors.ERROR_RED,
                        fontFamily: font.GoldPlay_SemiBold,
                      }}
                    />
                  )}
                  <View
                    style={{
                      height: 1,
                      flex: 1,
                      backgroundColor: colors.GREY_TXT,
                      marginTop: 10,
                    }}
                  />

                  <FlatList
                    data={products}
                    renderItem={ProductCollectionView}
                  />
                </View>
              )}
            {(data.status_type === "DISTRIBUTION_NETWORK" ||
              data.status_type === "REJECTED_CHANNEL_PARTNER") &&
              category === "retailer" && (
                <View>
                  <CustomViewRetailer
                    isTextInput
                    value={moment(data?.order_date, "YYYY-MM-DD").format(
                      "DD-MM-YYYY"
                    )}
                    titleText={"Date"}
                    editable={false}
                  />
                  <CustomViewRetailer
                    isTextInput
                    titleText={"PO No."}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"PO No."}
                    value={data?.po_no}
                    editable={false}
                  />
                  <CustomViewRetailer
                    isTextInput
                    mainContainerStyle={{ marginTop: 10 }}
                    value={moment(data?.po_date, "YYYY-MM-DD").format(
                      "DD-MM-YYYY"
                    )}
                    titleText={"PO Date"}
                    editable={false}
                  />
                  <CustomViewRetailer
                    isTextInput
                    isMultiLine
                    titleText={"PO Remarks"}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"Po Remarks."}
                    numberOfLine={4}
                    value={data?.remarks}
                    editable={false}
                  />

                  {/* {data.items.map((product, index) => (
                  <ProductCollectionView
                    index={index}
                    product={product}
                    key={index}
                  />
                ))} */}
                  <CustomViewRetailer
                    isTextInput
                    titleText={"Payments Terms"}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"Payments Terms"}
                    value={data.payment_terms}
                    editable={false}
                  />
                  <CustomViewRetailer
                    isTextInput
                    titleText={"Mode of Transport"}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"Mode of Transport"}
                    value={data.mode_transport}
                    editable={false}
                  />
                  <CustomViewRetailer
                    isTextInput
                    isMultiLine
                    titleText={"Note"}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"Note."}
                    numberOfLine={4}
                    value={data.note}
                    editable={false}
                  />
                  {data.status_type === "REJECTED_CHANNEL_PARTNER" && (
                    <CustomViewRetailer
                      isTextInput
                      isMultiLine
                      titleText={"Reject Reason"}
                      mainContainerStyle={{ marginTop: 10 }}
                      placeHolderText={"Reject Reason."}
                      numberOfLine={4}
                      value={data.status_note}
                      editable={false}
                      titleTextStyle={{
                        color: colors.ERROR_RED,
                        fontFamily: font.GoldPlay_SemiBold,
                      }}
                    />
                  )}
                  <View
                    style={{
                      height: 1,
                      flex: 1,
                      backgroundColor: colors.GREY_TXT,
                      marginTop: 10,
                    }}
                  />
                  <FlatList
                    data={products}
                    renderItem={ProductCollectionView}
                  />
                </View>
              )}
            {(data.status_type === "APPROVED_CHANNEL_PARTNER" ||
              data.status_type === "INVOICE_UPDATED" ||
              data.status_type === "COMPLETED") && (
              <View>
                <CustomViewRetailer
                  isTextInput
                  value={moment(data?.order_date, "YYYY-MM-DD").format(
                    "DD-MM-YYYY"
                  )}
                  titleText={"Date"}
                  editable={false}
                />
                <CustomViewRetailer
                  isTextInput
                  titleText={"PO No."}
                  mainContainerStyle={{ marginTop: 10 }}
                  placeHolderText={"PO No."}
                  value={data?.po_no}
                  editable={false}
                />
                <CustomViewRetailer
                  isTextInput
                  mainContainerStyle={{ marginTop: 10 }}
                  value={moment(data?.po_date, "YYYY-MM-DD").format(
                    "DD-MM-YYYY"
                  )}
                  titleText={"PO Date"}
                  editable={false}
                />
                <CustomViewRetailer
                  isTextInput
                  isMultiLine
                  titleText={"PO Remarks"}
                  mainContainerStyle={{ marginTop: 10 }}
                  placeHolderText={"Po Remarks."}
                  numberOfLine={4}
                  value={data?.remarks}
                  editable={false}
                />

                {/* {data.items.map((product, index) => (
                  <ProductCollectionView
                    index={index}
                    product={product}
                    key={index}
                  />
                ))} */}
                <CustomViewRetailer
                  isTextInput
                  titleText={"Payments Terms"}
                  mainContainerStyle={{ marginTop: 10 }}
                  placeHolderText={"Payments Terms"}
                  value={data.payment_terms}
                  editable={false}
                />
                <CustomViewRetailer
                  isTextInput
                  titleText={"Mode of Transport"}
                  mainContainerStyle={{ marginTop: 10 }}
                  placeHolderText={"Mode of Transport"}
                  value={data.mode_transport}
                  editable={false}
                />
                <CustomViewRetailer
                  isTextInput
                  isMultiLine
                  titleText={"Note"}
                  mainContainerStyle={{ marginTop: 10 }}
                  placeHolderText={"Note."}
                  numberOfLine={4}
                  value={data.note}
                  editable={false}
                />

                <CustomViewRetailer
                  isTextInput
                  isMultiLine
                  titleText={"Channel Partner Remark"}
                  mainContainerStyle={{ marginTop: 10 }}
                  placeHolderText={"Channel Partner Remark"}
                  numberOfLine={4}
                  value={data.status_note}
                  editable={false}
                />
                {data.status_type === "COMPLETED" && (
                  <CustomViewRetailer
                    isTextInput
                    isMultiLine
                    titleText={"Retailer Remark"}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"Retailer Remark"}
                    numberOfLine={4}
                    value={data.completed_note}
                    editable={false}
                  />
                )}

                <View
                  style={{
                    height: 1,
                    flex: 1,
                    backgroundColor: colors.GREY_TXT,
                    marginTop: 10,
                  }}
                />
                <FlatList
                  data={data.items}
                  renderItem={ProductCollectionView}
                />
                <View
                  style={{
                    height: 0,
                    flex: 1,
                    backgroundColor: colors.GREY_TXT,
                    marginTop: 10,
                  }}
                />
                {invoice.length > 0 && (
                  <Text
                    style={{
                      marginBottom: 8,
                      marginTop: 5,
                      fontSize: 14,
                      fontFamily: font.GoldPlay_Medium,
                    }}
                  >
                    {"Invoices"}
                  </Text>
                )}
                <FlatList data={invoice} renderItem={InvoiceCollection} />
              </View>
            )}

            {data.status_type === "DISTRIBUTION_NETWORK" &&
              category != "retailer" && (
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderRadius: 30,

                      backgroundColor: "#000",
                      width: "48%",
                      height: 45,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    activeOpacity={0.8}
                    onPress={() => {
                      setAction("approve");
                      showModal();
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: font.GoldPlay_SemiBold,
                        fontSize: 16,
                      }}
                    >
                      ACCEPT
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      borderRadius: 30,

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
                      setAction("reject");
                      showModal();
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontFamily: font.GoldPlay_SemiBold,
                        fontSize: 16,
                      }}
                    >
                      REJECT
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
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
                    titleText={action === "approve" ? "Remark" : "Reason"}
                    placeHolderText={action === "approve" ? "Remark" : "Reason"}
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
                        OrderAction();
                        hideModal();
                      } else {
                        setIconColor("red");
                        setVisibleAlert(true);
                        setAlertTitle("OPPS!");
                        setErrorMessage("Please enter reason.");
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
            <Portal>
              <Modal
                visible={visibleModel}
                onDismiss={() => setVisibleModel(false)}
                contentContainerStyle={containerStyle}
                style={{ flex: 1, justifyContent: "flex-end" }}
              >
                <View>
                  <Fontisto
                    name="close"
                    size={24}
                    color={"#999999"}
                    style={{ alignSelf: "flex-end" }}
                    onPress={() => setVisibleModel(false)}
                  />
                  <Text
                    style={{
                      color: colors.BLACK,
                      fontSize: 20,
                      fontFamily: font.GoldPlay_SemiBold,
                      alignSelf: "center",
                      marginBottom: 30,
                    }}
                  >
                    UPLOAD INVOICE PHOTO
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      paddingBottom: 20,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Button
                        icon={({ size, color }) => (
                          <Image
                            source={require("../../assets/take_from_camera.png")}
                            style={{
                              width: 65,
                              height: 65,
                              marginStart: 10,
                              resizeMode: "contain",
                            }}
                          />
                        )}
                        onPress={() => uploadImage("camera")}
                      />
                      <Text
                        style={{
                          fontFamily: font.GoldPlay_SemiBold,
                          fontSize: 16,
                          textDecorationLine: "underline",
                        }}
                      >
                        Camera
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Button
                        icon={({ size, color }) => (
                          <Image
                            source={require("../../assets/take_from_gallery.png")}
                            style={{
                              width: 65,
                              height: 65,
                              marginStart: 10,
                              resizeMode: "contain",
                            }}
                          />
                        )}
                        onPress={() => uploadImage("gallery")}
                      />
                      <Text
                        style={{
                          fontFamily: font.GoldPlay_SemiBold,
                          fontSize: 16,
                          textDecorationLine: "underline",
                        }}
                      >
                        Gallery
                      </Text>
                    </View>
                  </View>
                </View>
              </Modal>
            </Portal>
            <DatePicker
              modal
              mode="date"
              open={openDate}
              date={date}
              maximumDate={new Date()}
              onConfirm={(date) => {
                setSelectedDate(moment(date).format("DD-MM-YYYY"));
                setDate(date);
                setOpenDate(false);
                //  setDate(date);
                //  setSelectedDate(date);
                //  setDOB(moment(date).format("DD/MM/YYYY"));
              }}
              onCancel={() => {
                setOpenDate(false);
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Loader loading={isLoading} />
    </View>
  );
}
