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
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomViewRetailer from "./CustomViewRetailer";
import {
  font,
  colors,
  AllCategory,
  AllProduct,
  ExpoSecureKey,
} from "../constants";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import {
  PRODUCT_CATEGORY,
  PRODUCTS,
  RETAILER_CREATE_ORDER,
} from "../Api/Utils";
import DatePicker from "react-native-date-picker";
import { axiosCallAPI } from "../Api/Axios";
import moment from "moment";
import { Modal, Portal, Button } from "react-native-paper";
import * as Preference from "../StoreData/Preference";
import CommonAlert from "../common/CommonAlert";
import crashlytics from "@react-native-firebase/crashlytics";
import { Loader } from "../common/Loader";

export default function CreateOrder({ navigation }) {
  const [po_no, setPo_No] = useState("");
  const [showView, setSHowView] = useState(false);
  const [showViewModel, setSHowViewModel] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [po_openDate, setPO_OpenDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [po_date, setPO_Date] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    moment(date).format("DD-MM-YYYY")
  );
  const [selectedPODate, setSelectedPODate] = useState("Select Date");
  const [categories, setCategories] = useState();
  const [productData, setProductData] = useState(AllProduct);
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [po_remark, setPO_Remark] = useState("");
  const [channelPartnerName, setChannelPartnerName] = useState("");
  const [channelPartnerContact, setChannelPartnerContact] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [modeOfTransport, setModeOfTransport] = useState("");
  const [note, setNote] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [productQuantity, setProductQuantity] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [isLoading, setIsLoading] = useState(false);

  const [productIndex, setProductIndex] = useState(0);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 16,
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // {
  //   category: "",
  //   name: "",
  //   price: "",
  //   quantity: "",
  //   categoryList: [],
  //   productList: [],
  // },
  const [products, setProducts] = useState([]);
  const Po_noRef = useRef(null);
  const Po_RemarkRef = useRef(null);
  const paymentRef = useRef(null);
  const modeTranRef = useRef(null);
  const noteRef = useRef(null);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        category: "",
        category_id: "",
        name: "",
        name_id: "",
        price: "",
        quantity: "",
      },
    ]);
  };
  const handleInputChange = (index, field, value) => {
    console.log("Details =>", index + ", " + field + ", " + value);

    setProducts((pre) => {
      const updatedProducts = [...pre];
      updatedProducts[index][field] = value;
      return updatedProducts;
    });
  };
  const handleInputChange_new = (index, value) => {
    setProducts((pre) => {
      const updatedProducts = [...pre];
      updatedProducts[index] = value;
      return updatedProducts;
    });
  };
  const scale = useRef(new Animated.Value(1)).current;
  const stretchValue = useRef(new Animated.Value(1)).current;
  // Model animation
  const scaleModel = useRef(new Animated.Value(1)).current;
  const stretchValueModel = useRef(new Animated.Value(1)).current;

  const SCREEN_DIMENSIONS = Dimensions.get("window");
  const isApiCall = useRef(false);
  const isModelOpen = useRef(false);
  const interpolatedStretchAnimation = stretchValue.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0.9], // You can adjust the output range to control the stretching size
  });
  const interpolatedStretchAnimationModel = stretchValueModel.interpolate({
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
  const checkValidation = () => {
    var msg = "";
    var isValid = true;
    if (selectedDate == "Select Date") {
      isValid = false;
      msg = "Please select date.";
    } else if (po_no.trim().length <= 0) {
      isValid = false;
      msg = "Please enter PO No.";
    } else if (selectedPODate == "Select Date") {
      isValid = false;
      msg = "Please select PO date.";
    } else if (channelPartnerName.trim().length <= 0) {
      isValid = false;
      msg = "Channel Partner name not available.";
    } else if (products.length <= 0) {
      isValid = false;
      msg = "Please add product information.";
    } else if (paymentTerms.trim().length <= 0) {
      isValid = false;
      msg = "Please enter payment terms.";
    } else if (modeOfTransport.trim().length <= 0) {
      isValid = false;
      msg = "Please enter mode of transport.";
    }

    if (!isValid) {
      setAlertTitle("OPPS!");
      setErrorMessage(msg);
      setVisibleAlert(true);
    }
    return isValid;
  };

  useEffect(() => {
    const fetchProductCategory = async () => {
      //  setIsLoading(true);
      //  setError(null);

      try {
        // const requestOptions = {
        //   headers: {
        //     Accept: "application/json",
        //     Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
        //   },
        // };

        const response = await axiosCallAPI(
          "get",
          PRODUCT_CATEGORY,
          "",
          "",
          true,
          navigation
        );

        if (response !== "") {
          const categoryData = [];
          response.map((category) =>
            categoryData.push({
              label: category.productCategoryName,
              value: category.id,
            })
          );

          setCategories(categoryData); // Update categories state
          const updatedProducts = [...products];
          updatedProducts[0]["categoryList"] = categoryData;
          setProducts(updatedProducts);
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching product category:", error);
        // setError(error); // Set error state for handling
      } finally {
        // setIsLoading(false);
        GetProductData();
      }
    };
    const GetProductData = async () => {
      //setIsLoading(true);
      try {
        const requestOptions = {
          params: {
            search: "",
            categoryId: 0,
            page: 0, // Pass the current page as a query parameter
            // You may need to adjust this based on your API's pagination settings
          },
        };
        const response = await axiosCallAPI(
          "get",
          PRODUCTS,
          "",
          requestOptions,
          true,
          navigation
        );
        const newData = response.result;

        setProductData(newData);
      } catch (error) {
        setCouponData([]);
        console.error("Error fetching Product data:", error);
      } finally {
        // setIsLoading(false);
      }
    };
    // const categoryData = [];
    // AllCategory.map((category) =>
    //   categoryData.push({
    //     label: category.productCategoryName,
    //     value: category.id,
    //   })
    // );
    // console.log("Array =>", categoryData);
    // setCategories(categoryData);

    // const updatedProducts = [...products];
    // updatedProducts[0]["categoryList"] = categoryData;
    // setProducts(updatedProducts);

    fetchProductCategory();
    Preference.getPreference("retailer_profile").then((retailerProfile) => {
      // console.log(retailerProfile);
      setChannelPartnerName(retailerProfile.channel_partner_info.companyName);
      setChannelPartnerContact(
        `${retailerProfile.channel_partner_info.authorised_person_name}\n${retailerProfile.channel_partner_info.authorised_email}\n${retailerProfile.channel_partner_info.authorised_contact_no}\n${retailerProfile.channel_partner_info.company_address}, ${retailerProfile.channel_partner_info.company_city}, ${retailerProfile.channel_partner_info.company_district}, ${retailerProfile.channel_partner_info.company_state}, ${retailerProfile.channel_partner_info.company_pincode}`
      );
    });
  }, []);

  const CreateOrderApi = async () => {
    console.log("Api call...");
    crashlytics().log("Retailer CreateOrder Screen => Create Order Api call");
    setIsLoading(true);
    let profile = await Preference.getPreference("retailer_profile");
    let formData = new FormData();
    formData.append("order_date", moment(date).format("YYYY-MM-DD"));
    formData.append("po_no", po_no);
    formData.append("po_date", moment(po_date).format("YYYY-MM-DD"));
    formData.append("remarks", po_remark);
    formData.append("channel_partner_type", profile.channel_partner_type);
    formData.append("channel_partner", profile.channel_partner_info.id);
    formData.append("payment_terms", paymentTerms);
    formData.append("mode_transport", modeOfTransport);
    formData.append("note", note);
    formData.append("items", await ConvertApiData());

    crashlytics().log(
      "Retailer CreateOrder Screen => Create Order Api call => Parameter => " +
        JSON.stringify(formData)
    );
    console.log(JSON.stringify(formData));

    let requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
      },
    };
    axiosCallAPI(
      "post",
      RETAILER_CREATE_ORDER,
      formData,
      requestOptions,
      navigation
    )
      .then((response) => {
        crashlytics().log(
          "Retailer CreateOrder Screen => Create Order Api call => Response =>" +
            JSON.stringify(response)
        );
        setIsLoading(false);
        if (response && response.status) {
          console.log("Api response => ", response);
          setIconColor("green");
          setVisibleAlert(true);
          setAlertTitle("Success");
          setErrorMessage(response.message);
          ResetAllData();
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
          "Retailer CreateOrder Screen => Create Order Api call => Main try catch"
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
  const ResetAllData = () => {
    setSelectedDate("Select Date");
    setDate(new Date());
    setPo_No("");
    setSelectedPODate("Select Date");
    setPO_Date(new Date());
    setPO_Remark("");
    setProducts([]);
    setPaymentTerms("");
    setModeOfTransport("");
    setNote("");
  };

  const ConvertApiData = async () => {
    const trimmedData = products.map((item) => ({
      category_id: item.category_id,
      item_id: item.name_id,
      qty: item.quantity,
    }));
    return JSON.stringify(trimmedData);
  };
  const OpenCalendar = () => {
    setOpenDate(true);
  };
  const OpenPOCalendar = () => {
    setPO_OpenDate(true);
  };
  const RemoveProduct = (remove_index) => {
    setProducts((prevState) =>
      prevState.filter((_, index) => index !== remove_index)
    );
    setProductIndex((index) => {
      return index - 1;
    });
  };

  const validateLastObject = () => {
    if (products.length == 0) return true;
    const lastObject = products[products.length - 1];
    if (
      lastObject.category.length > 0 &&
      lastObject.name.length > 0 &&
      lastObject.quantity.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  const ProductCollectionView = ({ index, product }) => {
    return (
      <View>
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
          >
            <Text
              style={{
                fontFamily: font.GoldPlay_SemiBold,
                fontSize: 16,
                textDecorationLine: "underline",
              }}
            >
              {"Remove"}
            </Text>
          </TouchableOpacity>
        </View>
        <CustomViewRetailer
          isTextInput
          titleText={"Product Category"}
          mainContainerStyle={{ marginTop: 5 }}
          value={product.category}
          placeHolderText={"Select Product Category"}
          editable={false}
        />
        <CustomViewRetailer
          isTextInput
          titleText={"Select Product"}
          mainContainerStyle={{ marginTop: 15 }}
          value={product.name}
          placeHolderText={"Select Product"}
          editable={false}
        />
        <CustomViewRetailer
          isTextInput
          titleText={"Add Quantity"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Add Quantity"}
          value={product.quantity}
          editable={false}
        />
        {/* <CustomViewRetailer
          isTextInput
          titleText={"Price"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Add Price."}
          value={product.price}
          editable={false}
        /> */}
        {products.length > 1 && (
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
        )}
      </View>
    );
  };

  return (
    <View>
      <ScrollView>
        <View style={{ flex: 1, padding: 16 }}>
          <CommonAlert
            visible={visibleAlert} // Pass visibility state to the CommonAlert component
            hideModal={() => setVisibleAlert(false)} // Pass function to hide the modal
            handleOkPress={() => {
              setVisibleAlert(false);
            }} // Pass function to handle Ok button press
            //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
            title={alertTitle} // Pass title text
            iconName="error"
            iconColor={iconColor}
            bodyText={errorMessage} // Pass body text
            // cancelButton={true} // Pass whether Cancel button should be displayed
          />
          <CustomViewRetailer
            isDate
            icon={require("../../assets/calendar.png")}
            placeHolderText={selectedDate}
            titleText={"Date"}
            onClickCalendar={() => null}
          />
          {/* <CustomViewRetailer
            isTextInput
            titleText={"Unique ID"}
            mainContainerStyle={{ marginTop: 10 }}
            placeHolderText={"Unique ID"}
            editable={false}
          /> */}
          <CustomViewRetailer
            isTextInput
            titleText={"PO No."}
            mainContainerStyle={{ marginTop: 10 }}
            placeHolderText={"PO No."}
            value={po_no}
            setValue={setPo_No}
            _ref={Po_noRef}
            _next_ref={Po_RemarkRef}
          />
          <CustomViewRetailer
            isDate
            mainContainerStyle={{ marginTop: 10 }}
            icon={require("../../assets/calendar.png")}
            placeHolderText={selectedPODate}
            titleText={"PO Date"}
            onClickCalendar={OpenPOCalendar}
          />
          <CustomViewRetailer
            isTextInput
            isMultiLine
            titleText={"PO Remarks"}
            mainContainerStyle={{ marginTop: 10 }}
            placeHolderText={"Po Remarks."}
            numberOfLine={4}
            value={po_remark}
            setValue={setPO_Remark}
            showMaxLength={true}
            _ref={Po_RemarkRef}
            _next_ref={paymentRef}
          />
          <CustomViewRetailer
            isTextInput
            titleText={"Channel Partner Name"}
            mainContainerStyle={{ marginTop: 15 }}
            value={channelPartnerName}
            placeHolderText={"Select Channel Partner Name"}
            setValue={setChannelPartnerName}
            editable={false}
          />
          <CustomViewRetailer
            isTextInput
            isMultiLine
            numberOfLine={5}
            value={channelPartnerContact}
            setValue={setChannelPartnerContact}
            titleText={"Channel Partner Contact Information"}
            mainContainerStyle={{ marginTop: 10 }}
            placeHolderText={"Channel Partner Contact Information"}
            maxLengthForMultiline={200}
            editable={false}
          />
          <View
            style={{
              height: 1,
              flex: 1,
              backgroundColor: colors.GREY_TXT,
              marginTop: 10,
            }}
          />
          {products.map((product, index) => (
            <ProductCollectionView
              index={index}
              product={product}
              key={index}
            />
          ))}

          <TouchableOpacity
            onPress={() => {
              setSelectedProductCategory("");
              setSelectedProduct("");
              setProductQuantity("");

              showModal();
              // handleAddProduct();
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#333",
                fontFamily: font.GoldPlay_SemiBold,
                padding: 10,
                textDecorationLine: "underline",
                alignSelf: "center",
              }}
            >
              ADD Product
            </Text>
          </TouchableOpacity>
          <CustomViewRetailer
            isTextInput
            titleText={"Payments Terms"}
            mainContainerStyle={{ marginTop: 10 }}
            placeHolderText={"Payments Terms"}
            value={paymentTerms}
            setValue={setPaymentTerms}
            _ref={paymentRef}
            _next_ref={modeTranRef}
          />
          <CustomViewRetailer
            isTextInput
            titleText={"Mode of Transport"}
            mainContainerStyle={{ marginTop: 10 }}
            placeHolderText={"Mode of Transport"}
            value={modeOfTransport}
            setValue={setModeOfTransport}
            _ref={modeTranRef}
            _next_ref={noteRef}
          />
          <CustomViewRetailer
            isTextInput
            isMultiLine
            titleText={"Note"}
            mainContainerStyle={{ marginTop: 10 }}
            placeHolderText={"Note."}
            numberOfLine={4}
            value={note}
            setValue={setNote}
            _ref={noteRef}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (!isApiCall.current) {
                isApiCall.current = true;
                setSHowView(true);
                setTimeout(() => {
                  setSHowView(false);
                  isApiCall.current = false;
                  if (checkValidation()) {
                    CreateOrderApi();
                  }
                }, 450);

                stretch(stretchValue);
                scaleText(scale);
              }
              // rotateImage(rotation);

              //handleOnPress("Products")
            }}
            //underlayColor={colors.YELLOW}
            style={{ borderRadius: 30, marginTop: 30 }}
          >
            <View style={{}}>
              {showView && (
                <Animated.View
                  style={{
                    borderColor: "#ffffff",
                    transform: [{ scaleX: interpolatedStretchAnimation }],
                    width: SCREEN_DIMENSIONS.width - 40,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor: colors.YELLOW,
                    position: "absolute",
                    marginTop: 3,
                    marginStart: 2,
                  }}
                ></Animated.View>
              )}

              <Animated.View
                style={{
                  transform: [{ scaleX: interpolatedStretchAnimation }],
                  borderRadius: 30,
                  borderColor: "#ffffff",
                  width: SCREEN_DIMENSIONS.width - 39,
                  height: 50,
                  backgroundColor: colors.BLACK,
                  flexDirection: "row",
                }}
              >
                <View style={{ width: 0 }}></View>
                <Animated.Text
                  style={[
                    stylesCommon.preButtonLabelStyle,
                    {
                      flex: 1,
                      textAlign: "center",
                      color: "#fff",
                      alignSelf: "center",
                      alignContent: "center",
                      transform: [{ scale }],
                    },
                  ]}
                >
                  CONFIRM
                </Animated.Text>
              </Animated.View>
            </View>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            open={openDate}
            date={date}
            minimumDate={moment().startOf("month").toDate()}
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
          <DatePicker
            modal
            mode="date"
            open={po_openDate}
            date={po_date}
            minimumDate={moment().startOf("month").toDate()}
            maximumDate={new Date()}
            onConfirm={(date) => {
              setPO_OpenDate(false);
              setPO_Date(date);
              setSelectedPODate(moment(date).format("DD-MM-YYYY"));
            }}
            onCancel={() => {
              setPO_OpenDate(false);
            }}
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
                  isDropDown
                  titleText={"Product Category"}
                  mainContainerStyle={{ marginTop: 10 }}
                  placeHolderText={"Select Product Category"}
                  setValue={(categoryItem) => {
                    var value = {
                      label: categoryItem.label,
                      id: categoryItem.value,
                    };
                    setSelectedProductCategory(value);
                    console.log("Product Category =>", categoryItem);
                    // handleInputChange(index, "category", categoryItem.value);
                    var tempProduct = [...productData];
                    var filterArray = tempProduct.filter(
                      (item) => item.productCategory === categoryItem.value
                    );
                    var dropDownData = [];
                    filterArray.map((item) => {
                      dropDownData.push({
                        label: item.product_name,
                        value: item.id,
                      });
                    });
                    setCategoryProduct(dropDownData);
                    console.log(dropDownData);
                    // handleInputChange(index, "productList", dropDownData);
                  }}
                  inputTextBackGround={"#FAFAFA"}
                  dropDownData={categories}
                />
                <CustomViewRetailer
                  isDropDown
                  titleText={"Select Product"}
                  mainContainerStyle={{ marginTop: 15 }}
                  placeHolderText={"Select Product"}
                  setValue={(productItem) => {
                    console.log(productItem);
                    var value = {
                      label: productItem.label,
                      id: productItem.value,
                    };
                    setSelectedProduct(value);
                    // handleInputChange(index, "name", productItem.value);
                    // productData.map((item) => {
                    //   if (item.id === productItem.value) {
                    //     handleInputChange(index, "price", item.salesPrice);
                    //   }
                    // });
                    // console.log(productData.filter((item) => item.))
                  }}
                  inputTextBackGround={"#FAFAFA"}
                  dropDownData={categoryProduct}
                />
                <CustomViewRetailer
                  isTextInput
                  titleText={"Add Quantity"}
                  mainContainerStyle={{ marginTop: 10 }}
                  placeHolderText={"Add Quantity"}
                  value={productQuantity}
                  setValue={(text) => {
                    setProductQuantity(text);
                    // handleInputChange(index, "quantity", text);
                  }}
                  inputTextBackGround={"#FAFAFA"}
                  inputType={"numeric"}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (!isModelOpen.current) {
                      isModelOpen.current = true;
                      setSHowViewModel(true);
                      setTimeout(() => {
                        setSHowViewModel(false);
                        isModelOpen.current = false;
                        if (
                          JSON.stringify(selectedProductCategory).length > 0 &&
                          JSON.stringify(selectedProduct).length > 0 &&
                          productQuantity.length > 0
                        ) {
                          handleAddProduct();
                          var data = {
                            category: selectedProductCategory.label,
                            category_id: selectedProductCategory.id,
                            name: selectedProduct.label,
                            name_id: selectedProduct.id,
                            quantity: productQuantity,
                          };
                          handleInputChange_new(productIndex, data);
                          setProductIndex((index) => {
                            return index + 1;
                          });
                          hideModal();
                        } else {
                          console.log("Else part");
                          console.log("" + selectedProductCategory.length);
                          console.log("" + selectedProduct.length);
                          console.log("" + productQuantity.length);
                        }
                        // handleNext();
                      }, 450);

                      stretch(stretchValueModel);
                      scaleText(scaleModel);
                    }
                    // rotateImage(rotation);

                    //handleOnPress("Products")
                  }}
                  //underlayColor={colors.YELLOW}
                  style={{ borderRadius: 30, marginTop: 30 }}
                >
                  <View style={{}}>
                    {showViewModel && (
                      <Animated.View
                        style={{
                          borderColor: "#ffffff",
                          transform: [
                            { scaleX: interpolatedStretchAnimationModel },
                          ],
                          width: SCREEN_DIMENSIONS.width - 74,
                          height: 50,
                          borderRadius: 30,
                          backgroundColor: colors.YELLOW,
                          position: "absolute",
                          marginTop: 3,
                          marginStart: 2,
                        }}
                      ></Animated.View>
                    )}

                    <Animated.View
                      style={{
                        transform: [
                          { scaleX: interpolatedStretchAnimationModel },
                        ],
                        borderRadius: 30,
                        borderColor: "#ffffff",
                        width: SCREEN_DIMENSIONS.width - 72,
                        height: 50,
                        backgroundColor: colors.BLACK,
                        flexDirection: "row",
                      }}
                    >
                      <View style={{ width: 0 }}></View>
                      <Animated.Text
                        style={[
                          stylesCommon.preButtonLabelStyle,
                          {
                            flex: 1,
                            textAlign: "center",
                            color: "#fff",
                            alignSelf: "center",
                            alignContent: "center",
                            transform: [{ scale }],
                          },
                        ]}
                      >
                        CONFIRM
                      </Animated.Text>
                    </Animated.View>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
          </Portal>
        </View>
      </ScrollView>
      <Loader loading={isLoading} />
    </View>
  );
}
