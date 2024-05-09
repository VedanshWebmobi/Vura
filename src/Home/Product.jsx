import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import CommonHeader from "../common/CommonHeader";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import { PRODUCTS, PRODUCT_CATEGORY } from "../Api/Utils";
import * as Preference from "../StoreData/Preference";
import * as Progress from "react-native-progress";
import { axiosCallAPI } from "../Api/Axios";
import { FlatGrid } from "react-native-super-grid";
import CommonHeaderNew from "../common/CommonHeader_new";
import {useFocusEffect} from '@react-navigation/native'

export default function Product({ navigation, name, catID,p_navigation,search, setSearch}) {
  // function open() {
  //   pickerRef.current.focus();
  // }

  // function close() {
  //   pickerRef.current.blur();
  // }

  const [value, setValue] = useState(null);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(catID);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useFocusEffect(
    React.useCallback(() =>{
     // setSearch("");
     if(!isFirstTime ){
   
  }
    },[selectedValue,setSearch, search])
  )

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
          const categoryData = response.map((category) => ({
            label: category.productCategoryName,
            value: category.id,
          }));

          setCategories(categoryData); // Update categories state
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching product category:", error);
        // setError(error); // Set error state for handling
      } finally {
        // setIsLoading(false);
      }
    };

   // fetchProductCategory();
  }, []);

  useEffect(() => {
    console.log("After selecting value", currentPage);

    console.log("In use effect", currentPage, totalPages);
    setCurrentPage(1);
    setTotalPages(2);
    const timer = setTimeout(() => {
     fetchProductData(selectedValue);
   },1000);

  return () => clearTimeout(timer);
    
  
    
  }, [selectedValue,setSearch, search]);

  const fetchProductData = async (selectedValue = 0) => {
    console.log("====================================");
    console.log("Api called in product with this value", selectedValue);

    console.log(currentPage);
    console.log("====================================");
    if (currentPage > totalPages) {
      console.log(currentPage, totalPages);
      console.log("Yaha huin isislye error");
      return;
    }
    setIsLoading(true);
    try {
      const requestOptions = {
        // headers: {
        //   Accept: "application/json",
        //   Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
        // },
        params: {
          search:search,
          categoryId: selectedValue,
          page: currentPage, // Pass the current page as a query parameter
          per_page: 40, // You may need to adjust this based on your API's pagination settings
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
      console.log(response.result);
      const newData = response.result;
 
        setProductData(newData);
        
      
      if(response.pages == 0)
      {
        setTotalPages(2);
      }
      else{
      setTotalPages(response.pages);
      }
     // setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectedItem = (e) => {
    setCurrentPage(1);
    setTotalPages(1);
    setProductData([]);
    setSelectedValue(e.value);
  };
  const renderFooter =()=>{
    return <ActivityIndicator size="large" color={colors.BLACK}/>
  }

  const handleLoadMore = () =>{
      setCurrentPage((value) => value+1);
      fetchProductData(selectedValue);
      
  }

  const renderEmptyComponent = () => (
    <View
      style={{
        height: SCREEN_HEIGHT / 2,
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
        No Product Found
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[stylesCommon.whitebg,{backgroundColor:'@f2f2f2'}]}>
      <StatusBar backgroundColor={colors.YELLOW} />
      {/* <CommonHeaderNew header_title={"OUR PRODUCTS"} header_color={colors.YELLOW} navigation={navigation}/> */}
      {/* <CommonHeader screen={"Product"} navigation={navigation} showBack /> */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.YELLOW}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 15,paddingBottom:100  }}>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: font.GoldPlay_SemiBold,
                  fontSize: 18,
                  marginBottom: 5,
                }}
              >
                Our Prdoucts
              </Text>
            </View>
            <View>

              <DropDownPicker
                open={open}
                value={value}
                items={categories}
                // setItems={setCategories}
                setOpen={setOpen}
                setValue={setValue}
                onSelectItem={handleSelectedItem}
                placeholder={"Category"}
                textStyle={{ fontSize: 15, fontFamily: font.GoldPlay_Medium }}
                style={{
                  width: SCREEN_WIDTH / 2.2,
                  height: 50,
                  borderRadius: 10,
                }}
              />
            </View>
          </View> */}
         
          <FlatGrid
            data={productData}
            spacing={0}
            ListEmptyComponent={renderEmptyComponent}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    //flex: 1,
                    //width: SCREEN_WIDTH / 2 - 26,
                    elevation: 3,
                    padding: 15,
                    backgroundColor: "white",
                    alignItems: "center",
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      //console.log(p_navigation);
                       p_navigation.navigate("ProductDetail", item)
                    }}
                  >
                    <View style={{}}>
                      {
                        console.log(item.productImages)
                      }
                      <Image
                        source={{ uri:(item.productImages.length > 0) ?  item.productImages[0].productImg : "" }}
                        style={{ height: 150, width: 100, resizeMode: "contain" }}
                      />
                    </View>
                    <View
                      style={{
                        
                        height: 1,
                        width: "100%",
                        marginVertical: 10,
                      }}
                    />
                    <Text style={{ fontFamily: font.GoldPlay_Medium, paddingTop:20 }}>
                      {item.product_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => item.id}
         //   ListFooterComponent={renderFooter}
            //numColumns={2}
            maxItemsPerRow={2}
            showsVerticalScrollIndicator={false}
           // onEndReached={handleLoadMore}
            //onEndReachedThreshold={0.9}
            
            // contentContainerStyle={{ maxWidth: SCREEN_WIDTH }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
