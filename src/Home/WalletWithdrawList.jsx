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

  export default function WalletWithdrawList({navigation, refresh}){
    const [walletData, setWalletData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() =>{
   // if(walletData.length > 0)
  //  {
    console.log("Refresh", refresh);
  
    fetchWalletData();
    //}
  },[currentPage])

  useFocusEffect(
    React.useCallback(() => {
        setCurrentPage(1);
    }, [])
  );
  const LoadMoreData =() =>{
   
    if(walletData.length > 0){
    
      if(currentPage < totalPages){
     
        setCurrentPage(currentPage +1);
       
      }
    }
}
const fetchWalletData = async () => {
  //setloader(true);
  if (currentPage > totalPages) {
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
        page: currentPage, // Pass the current page as a query parameter
        per_page: 10, // You may need to adjust this based on your API's pagination settings
      },
    };

    const response = await axiosCallAPI(
      "get",
      WITHDRAW_HISTORY,
      "",
      requestOptions,
      true,
      navigation
    );
    console.log("WithDrawal History",response.transaction_log.result);
     const newData = response.transaction_log.result;
      if(currentPage != 1)
      {
     setWalletData([...walletData, ...newData]);
      }
      else{
        setWalletData(newData);
      }
    //  if(response.client_data)
    //  {
    //  setwalletAmount(response.client_data.available_balance);
    //  setTotalAmount(response.client_data.received_amount);
    //  setWithdrawalAmount(response.client_data.withdrawal_amount);
    //  }
     setTotalPages(response.transaction_log.pages);
   // setCurrentPage(currentPage + 1);
  } catch (error) {
    console.error("Error fetching wallet data:", error);
  } finally {
   // setIsLoading(false);
   // setloader(false);
  }
};
const renderItem = ({ item,index }) => (
  <View style={{ flex: 1,backgroundColor:index %2 == 0?"#fff" :"#f2f2f2", padding:10 }}>
  
      <View
        style={{
         flexDirection:"row",justifyContent:"space-between", alignItems:"center"
        }}
      > 
         <View style={{ flexDirection:"row", justifyContent:"center"}}>
            <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 14, color:"#666666" }}>
              {"Points "}
            </Text>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 14 }}>
          {item.withdrawal_amount}
        </Text>
          </View>
     
        <View style={{ }}>
          
            <Text
              style={{ fontFamily: font.GoldPlay_Medium, fontSize: 12 }}
            >{moment(item.withdrawal_date.substring(0, 10)).format('MMMM DD, YYYY')}
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
        (currentPage < totalPages && walletData.length > 0) &&   
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

    return(
<View style={{ marginTop:10}}>
    <FlatList
              data={walletData}
              renderItem={renderItem}
              keyExtractor={(item) => item.unique_id.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={LoadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter("wallet")}
              ListEmptyComponent={renderEmptyComponent}
            /> 
    </View>
    )
  }