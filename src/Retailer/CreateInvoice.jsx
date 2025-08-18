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
} from "react-native";
import DatePicker from "react-native-date-picker";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CommonHeaderNew from "../common/CommonHeader_new";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//import { SafeAreaView } from "react-native-safe-area-context";
import CreateOrder from "./CreateOrder";
import RetailerHistory from "./RetailerHistory";

import CustomViewRetailer from "./CustomViewRetailer";
import { useRoute } from "@react-navigation/native";
import { Modal, Portal, Button } from "react-native-paper";
import Feather from "@expo/vector-icons/Feather";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import crashlytics from "@react-native-firebase/crashlytics";
import CommonAlert from "../common/CommonAlert";
import {
  RETAILER_ORDER_ACTION,
  RETAILER_CREATE_INVOICE,
  RETAILER_COMPLETE_ORDER,
} from "../Api/Utils";
import moment from "moment";
import { Loader } from "../common/Loader";
import * as Preference from "../StoreData/Preference";
import { axiosCallAPI } from "../Api/Axios";
export default function CreateInvoice({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("Select Date");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceTotal, setInvoiceTotal] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState();
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [productIndex, setProductIndex] = useState(0);
  const [showViewModel, setSHowViewModel] = useState(false);
  const [visibleModel, setVisibleModel] = useState(false);
  const [showView, setSHowView] = useState(false);
  const [image, setImage] = useState("");
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [isLoading, setIsLoading] = useState(false);
  const [dealerName, setDealerName] = useState("");
  const SCREEN_DIMENSIONS = Dimensions.get("window");
  const isModelOpen = useRef(false);
  const isApiCall = useRef(false);
  const scale = useRef(new Animated.Value(1)).current;
  const stretchValue = useRef(new Animated.Value(1)).current;
  const interpolatedStretchAnimation = stretchValue.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0.9], // You can adjust the output range to control the stretching size
  });

  // Model animation
  const scaleModel = useRef(new Animated.Value(1)).current;
  const stretchValueModel = useRef(new Animated.Value(1)).current;
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

  const route = useRoute();
  const { data, category } = route.params;
  //console.log("Data =>", JSON.stringify(data));
  const OpenCalendar = () => {
    setOpenDate(true);
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    margin: 16,
  };
  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        category: "",
        category_id: "",
        name: "",
        name_id: "",
        amount: "",
        qty: "",
      },
    ]);
  };
  const handleInputChange_new = (index, value) => {
    setProducts((pre) => {
      const updatedProducts = [...pre];
      updatedProducts[index] = value;
      return updatedProducts;
    });
  };
  const RemoveProduct = (remove_index) => {
    setProducts((prevState) =>
      prevState.filter((_, index) => index !== remove_index)
    );
    setProductIndex((index) => {
      return index - 1;
    });
  };
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Map(
        data.items.map((item) => [
          item.item_category,
          { label: item.category_name, value: item.item_category },
        ])
      ).values()
    );

    setCategories(uniqueCategories);
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
    } else if (dealerName.trim().length <= 0) {
      isValid = false;
      msg = "Please enter Channel partner name.";
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
    invoiceData.append("channel_partner", dealerName);
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
      item_id: item.name_id,
      qty: item.qty,
    }));
    return JSON.stringify(trimmedData);
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
          value={product.qty}
          editable={false}
        />
        <CustomViewRetailer
          isTextInput
          titleText={"Price"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Add Price."}
          value={product.amount}
          editable={false}
        />
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
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.YELLOW} />
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.YELLOW }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <CommonHeaderNew
          header_title={"ADD INVOICE"}
          header_color={colors.YELLOW}
          navigation={navigation}
        />
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
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <View style={{ flex: 1, padding: 16 }}>
            <CustomViewRetailer
              isDate
              icon={require("../../assets/calendar.png")}
              placeHolderText={selectedDate}
              titleText={"Invoice Date"}
              onClickCalendar={() => OpenCalendar()}
            />
            <CustomViewRetailer
              isTextInput
              titleText={"Invoice No."}
              mainContainerStyle={{ marginTop: 10 }}
              placeHolderText={"Invoice No."}
              setValue={setInvoiceNo}
              value={invoiceNo}
            />
            <CustomViewRetailer
              isTextInput
              titleText={"Invoice Total Amount"}
              mainContainerStyle={{ marginTop: 10 }}
              placeHolderText={"Invoice Total Amount"}
              setValue={setInvoiceTotal}
              value={invoiceTotal}
              inputType={"decimal-pad"}
            />
            <CustomViewRetailer
              isTextInput
              titleText={"Channel Partner Name"}
              mainContainerStyle={{ marginTop: 10 }}
              placeHolderText={"Channel Partner Name"}
              setValue={setDealerName}
              value={dealerName}
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
                setProductPrice("");

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
            <Text
              style={{
                paddingBottom: 8,
                fontSize: 14,
                marginTop: 10,
                fontFamily: font.GoldPlay_Medium,
              }}
            >
              {"Invoice Image"}
            </Text>
            <TouchableOpacity
              style={{ height: 100, width: 100 }}
              onPress={() => setVisibleModel(true)}
            >
              {image.length > 0 ? (
                <Image
                  source={{ uri: image }}
                  style={{
                    height: 100,
                    width: 100,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
              ) : (
                <View
                  style={{
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: colors.GREY_TXT,
                    height: 100,
                    width: 100,
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather name="plus" size={80} color={colors.GREY_TXT} />
                </View>
              )}
            </TouchableOpacity>
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
                      CreateInvoice();
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
                    {"CONFIRM"}
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

                      const products = data.items
                        .filter(
                          (item) => item.item_category === categoryItem.value
                        )
                        .map((item) => ({
                          label: item.product_name,
                          value: item.id,
                        }));
                      setCategoryProduct(products);
                      // var tempProduct = [...productData];
                      // var filterArray = tempProduct.filter(
                      //   (item) => item.productCategory === categoryItem.value
                      // );
                      // var dropDownData = [];
                      // filterArray.map((item) => {
                      //   dropDownData.push({
                      //     label: item.product_name,
                      //     value: item.id,
                      //   });
                      // });
                      // setCategoryProduct(dropDownData);
                      // console.log(dropDownData);
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
                    }}
                    inputType={"numeric"}
                  />
                  <CustomViewRetailer
                    isTextInput
                    titleText={"Price"}
                    mainContainerStyle={{ marginTop: 10 }}
                    placeHolderText={"Add Price."}
                    value={productPrice}
                    setValue={(text) => {
                      setProductPrice(text);
                    }}
                    editable={true}
                    inputType={"decimal-pad"}
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
                            JSON.stringify(selectedProductCategory).length >
                              0 &&
                            JSON.stringify(selectedProduct).length > 0 &&
                            productQuantity.trim().length > 0 &&
                            productPrice.trim().length > 0
                          ) {
                            handleAddProduct();
                            var data = {
                              category: selectedProductCategory.label,
                              category_id: selectedProductCategory.id,
                              name: selectedProduct.label,
                              name_id: selectedProduct.id,
                              qty: productQuantity,
                              amount: productPrice,
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
          </View>
        </ScrollView>
        <Loader loading={isLoading} />
      </SafeAreaView>
    </View>
  );
}
