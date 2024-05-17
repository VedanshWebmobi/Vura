import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    StatusBar,Animated,Easing, Dimensions, Alert
  } from "react-native";
  import React, { useEffect, useState, useRef } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import CommonHeader from "../common/CommonHeader";
  import { ExpoSecureKey, colors, font, icon } from "../constants";
  import stylesCommon, { SCREEN_HEIGHT } from "../Themes/stylesCommon";
  import { axiosCallAPI } from "../Api/Axios";
  import * as Preference from "../StoreData/Preference";
  import * as Progress from "react-native-progress";
  import { WALLET_LIST,WITHDRAW_HISTORY } from "../Api/Utils";
  import CommonHeaderNew from "../common/CommonHeader_new";
  import moment from "moment";
  import { useFocusEffect } from '@react-navigation/native';

  export default function CouponList ({navigation}){
    const [couponData, setCouponData] = useState([]);
    const [currentPageCoupon, setCurrentPageCoupon] = useState(1);
    const [totalPagesCoupon, setTotalPagesCoupon] = useState(1);

    useEffect(() =>{
      //  if(couponData.length > 0)
      //  {
        fetchCouponData();
      //  }
      },[currentPageCoupon])

    //   useFocusEffect(
    //     React.useCallback(() => {
    //         fetchCouponData();
    //     }, [])
    //   );

      const LoadMoreDataCoupon =() =>{
        if(couponData.length > 0){
          if(currentPageCoupon < totalPagesCoupon){
           
            setCurrentPageCoupon(currentPageCoupon +1);
          }
        }
    }
    const fetchCouponData = async () => {
   
 
        if (currentPageCoupon > totalPagesCoupon) {
          return;
        }
       // setIsLoading(true);
        try {
          const requestOptions = {
            headers: {
              Accept: "application/json",
              Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
            },
            params: {
              page: currentPageCoupon, // Pass the current page as a query parameter
              per_page: 10, // You may need to adjust this based on your API's pagination settings
            },
          };
          console.log("Coupon Request", requestOptions);
    
          const response = await axiosCallAPI(
            "get",
            WALLET_LIST,
            "",
            requestOptions,
            true,
            navigation
          );
          console.log("Coupon History",response);
           const newData = response.result;
    
           setCouponData([...couponData, ...newData]);
          
           setTotalPagesCoupon(response.pages);
         // setCurrentPage(currentPage + 1);
        } catch (error) {
          console.error("Error fetching wallet data:", error);
        } finally {
         // setIsLoading(false);
       
        }
      };  
      const renderCouponItem = ({ item,index }) => (
        <View style={{ flex: 1,backgroundColor:index %2 == 0?"#fff" :"#f2f2f2", padding:10 }}>
        
            <View
              style={{
               flexDirection:"row",justifyContent:"space-between", alignItems:"center"
              }}
            > 
               <View style={{ flexDirection:"row", justifyContent:"center"}}>
                  <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 14 }}>
                  ₹{item.amount}
                  </Text>
                  <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 14, marginStart:10 }}>
                {item.product_name}
              </Text>
                </View>
           
              <View style={{ }}>
                
                  <Text
                    style={{ fontFamily: font.GoldPlay_Medium, fontSize: 12 }}
                  >{moment(item.createdAt.substring(0, 10)).format('MMMM DD, YYYY')}
                  </Text>
                </View>
           
            </View>
    
      
         
        </View>
      );
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
            No Wallet History Found
          </Text>
        </View>
      );
      const renderFooter = (type) => {
        
          return (
            <View >
              { 
              (currentPageCoupon < totalPagesCoupon && couponData.length > 0) &&   
              <Progress.CircleSnail
              size={50}
              indeterminate={true}
              color={"black"}
              style={{ alignItems: "center" }}
            />
              }
          
            </View>
          );
      };
      return(<View style={{flex:1, marginTop:10}}>
        <FlatList
                 data={couponData}
                 renderItem={renderCouponItem}
                 keyExtractor={(item) => item.id.toString()}
                 showsVerticalScrollIndicator={false}
                 onEndReached={LoadMoreDataCoupon}
                 onEndReachedThreshold={0.1}
                 ListFooterComponent={renderFooter("coupon")}
                 ListEmptyComponent={renderEmptyComponent}
               />  
       </View>)
  }