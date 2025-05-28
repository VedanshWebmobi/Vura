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
import { font, colors } from "../constants";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import { PRODUCT_CATEGORY, PRODUCTS } from "../Api/Utils";
import DatePicker from "react-native-date-picker";
import { axiosCallAPI } from "../Api/Axios";

export default function CreateOrder({ navigation }) {
  const [po_no, setPo_No] = useState("");
  const [showView, setSHowView] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([
    {
      category: "",
      name: "",
      price: "",
      quantity: "",
      categoryList: [],
      productList: [],
    },
  ]);
  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        category: "",
        name: "",
        price: "",
        quantity: "",
        categoryList: categories,
        productList: [],
      },
    ]);
  };
  const handleInputChange = (index, field, value) => {
    console.log("Details =>", index + ", " + field + ", " + value);
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };
  const scale = useRef(new Animated.Value(1)).current;
  const stretchValue = useRef(new Animated.Value(1)).current;
  const SCREEN_DIMENSIONS = Dimensions.get("window");
  const isApiCall = useRef(false);
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

    fetchProductCategory();
  }, []);

  const OpenCalendar = () => {
    setOpenDate(true);
  };
  const ProductCollectionView = ({ index, product }) => {
    return (
      <View>
        <CustomViewRetailer
          isDropDown
          titleText={"Product Category"}
          mainContainerStyle={{ marginTop: 10 }}
          value={product.category}
          placeHolderText={"Select Product Category"}
          setValue={(categoryItem) => {
            console.log("Product Category =>", categoryItem);
            handleInputChange(index, "category", categoryItem.value);
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
            console.log(dropDownData);
            handleInputChange(index, "productList", dropDownData);
          }}
          dropDownData={product.categoryList}
        />
        <CustomViewRetailer
          isDropDown
          titleText={"Select Product"}
          mainContainerStyle={{ marginTop: 15 }}
          value={product.name}
          placeHolderText={"Select Product"}
          setValue={(productItem) => {
            console.log(productItem);
            handleInputChange(index, "name", productItem.value);
            productData.map((item) => {
              if (item.id === productItem.value) {
                handleInputChange(index, "price", item.salesPrice);
              }
            });
            // console.log(productData.filter((item) => item.))
          }}
          dropDownData={product.productList}
        />
        <CustomViewRetailer
          isTextInput
          titleText={"Add Quantity"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Add Quantity"}
        />
        <CustomViewRetailer
          isTextInput
          titleText={"Price"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Add Price."}
          value={product.price}
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
    <ScrollView>
      <View style={{ flex: 1, padding: 16 }}>
        <CustomViewRetailer
          isDate
          icon={require("../../assets/calendar.png")}
          placeHolderText={"Select Date"}
          titleText={"Date"}
          onClickCalendar={OpenCalendar}
        />
        <CustomViewRetailer
          isTextInput
          titleText={"Unique ID"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Unique ID"}
        />
        <CustomViewRetailer
          isDropDown
          titleText={"PO No."}
          mainContainerStyle={{ marginTop: 10 }}
          value={po_no}
          setValue={setPo_No}
        />
        <CustomViewRetailer
          isDate
          mainContainerStyle={{ marginTop: 10 }}
          icon={require("../../assets/calendar.png")}
          placeHolderText={"Select Date"}
          titleText={"PO Date"}
        />
        <CustomViewRetailer
          isTextInput
          isMultiLine
          titleText={"PO Remarks"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Po Remarks."}
          numberOfLine={4}
        />
        <CustomViewRetailer
          isDropDown
          titleText={"Channel Partner Name"}
          mainContainerStyle={{ marginTop: 15 }}
          value={po_no}
          placeHolderText={"Select Channel Partner Name"}
          setValue={setPo_No}
        />
        <CustomViewRetailer
          isTextInput
          titleText={"Channel Partner Contact Information"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Channel Partner Contact Information"}
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
          <ProductCollectionView index={index} product={product} key={index} />
        ))}

        <TouchableOpacity
          onPress={() => {
            handleAddProduct();
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333",
              fontFamily: font.GoldPlay_SemiBold,
              padding: 10,
              textDecorationLine: "underline",
              alignSelf: "flex-end",
            }}
          >
            ADD
          </Text>
        </TouchableOpacity>
        <CustomViewRetailer
          isTextInput
          titleText={"Payments Terms"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Payments Terms"}
        />
        <CustomViewRetailer
          isTextInput
          titleText={"Mode of Transport"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Mode of Transport"}
        />
        <CustomViewRetailer
          isTextInput
          isMultiLine
          titleText={"Note"}
          mainContainerStyle={{ marginTop: 10 }}
          placeHolderText={"Note."}
          numberOfLine={4}
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
                // handleNext();
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
          minimumDate={new Date()}
          onConfirm={(date) => {
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
  );
}
