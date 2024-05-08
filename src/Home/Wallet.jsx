import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,Animated,Easing, Dimensions
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonHeader from "../common/CommonHeader";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import stylesCommon, { SCREEN_HEIGHT } from "../Themes/stylesCommon";
import { axiosCallAPI } from "../Api/Axios";
import * as Preference from "../StoreData/Preference";
import * as Progress from "react-native-progress";
import { WALLET_LIST } from "../Api/Utils";
import CommonHeaderNew from "../common/CommonHeader_new";
import moment from "moment";

export default function Wallet({ navigation }) {
  const [data, setData] = useState([
    { id: 1, title: "Product Name 1", money: 100, redeemDate: "2024-03-15" },
    { id: 2, title: "Product Name 2", money: 200, redeemDate: "2024-03-16" },
    { id: 3, title: "Product Name 3", money: 300, redeemDate: "2024-03-17" },
    { id: 4, title: "Product Name 4", money: 400, redeemDate: "2024-03-18" },
    { id: 5, title: "Product Name 5", money: 500, redeemDate: "2024-03-19" },
    { id: 5, title: "Product Name 6", money: 600, redeemDate: "2024-03-19" },
  ]);
  const SCREEN_DIMENSIONS = Dimensions.get('window');
  const [showView, setSHowView] = useState(false);
  const [walletData, setWalletData] = useState([]);
  const [walletAmount, setwalletAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setloader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const stretchValue = useRef(new Animated.Value(1)).current;

  const interpolatedStretchAnimation = stretchValue.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 0.90], // You can adjust the output range to control the stretching size
  });
  const stretch = (stretch_Value) => {
    Animated.sequence([
      Animated.timing(stretch_Value, {
        toValue: 2, // You can adjust this value to control the stretch level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(stretch_Value, {
        toValue: 1, // You can adjust this value to control the stretch level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ])
  .start(() => {
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
        useNativeDriver: true,
      }),
      Animated.timing(scale_value, {
        toValue: 1, // You can adjust this value to control the scale level
        duration: 200, // You can adjust the duration of the animation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ])
  .start(() => {
      // Reset the scale to 1
      scale_value.setValue(1);
    });
  };

  useEffect(() => {
    fetchWalletData();
  }, [currentPage]);

  const LoadMoreData =() =>{
      if(walletData.length > 0){
        if(currentPage < totalPages){
          setCurrentPage(currentPage +1);
        }
      }
  }

  const fetchWalletData = async () => {
    setloader(true);
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
        WALLET_LIST,
        "",
        requestOptions,
        true,
        navigation
      );
      console.log(response.result);
      const newData = response.result;

      setWalletData([...walletData, ...newData]);
      setwalletAmount(response.wallet_amount);
      setTotalAmount(response.total_amount);
      setTotalPages(response.pages);
     // setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    } finally {
     // setIsLoading(false);
      setloader(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1, paddingBottom:20 }}>
    
        <View
          style={{
           
          }}
        >
          <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 20 }}>
            ₹{item.amount}
          </Text>
          <View style={{ flexDirection: "row", marginTop:10, }}>
            <View style={{flex:1, flexDirection:"row"}}>
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 12 }}>
                {"Date: "}
              </Text>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 12 }}
              >{moment(item.createdAt.substring(0, 10)).format('MMMM DD, YYYY')}
              </Text>
            </View>

            <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 12 }}>
                {"Type: "}
              </Text>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 12 }}
              >
                Scan Coupon
              </Text>
            </View>
          </View>
        </View>

      <View  style={{height:1, backgroundColor:'#cccccc', marginTop:20}}/>  
     
    </View>
  );
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
        No Wallet History Found
      </Text>
    </View>
  );
  const renderFooter = () => {
    
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

  return (
    <SafeAreaView style={[stylesCommon.whitebg,{backgroundColor:'#f2f2f2'}]}>
      <StatusBar backgroundColor={colors.YELLOW} />
      {/* <CommonHeader navigation={navigation} showBack /> */}
      <CommonHeaderNew navigation={navigation} showBack={true} header_color={colors.YELLOW} header_title={"WALLET"}/>
      {isLoading ? (
        <View style={stylesCommon.loaderViewStyle}>
          <Progress.CircleSnail
            size={50}
            indeterminate={true}
            color={"black"}
            duration={1000}
            thickness={5}
            spinDuration={2000}
          />
        </View>
      ) : (
        <View
          style={{ paddingHorizontal: 15, paddingTop: 15, gap: 25, flex: 1 }}
        >
          <View
            style={{
              gap: 5,
              padding: 15,
              elevation: 2,
              backgroundColor: "white",
              borderRadius: 10,
              overflow: "hidden",
              alignItems:'center'
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: font.GoldPlay_Medium,
                fontSize: 14,
              }}
            >
              Available Balance
            </Text>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 30, alignItems:'center' }}>
             <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 25 }}> ₹ </Text>{walletAmount ? walletAmount : 0}
            </Text>
            <TouchableOpacity
          activeOpacity={1}
            onPress={() => {
              setSHowView(true);
               setTimeout(() =>{
                   setSHowView(false);
                
               },450);
          
            stretch(stretchValue);
            scaleText(scale);
              //handleOnPress("Products")
            }
            }
            //underlayColor={colors.YELLOW}
            style={{ borderRadius: 30, 
              marginTop:10
              }}
          >
            <View style={{}}>
            {
                  showView &&   <Animated.View style={{ borderColor: "#ffffff",transform:[{scaleX:interpolatedStretchAnimation}],
                   width:SCREEN_DIMENSIONS.width-60,height:50,borderRadius: 30,backgroundColor:colors.YELLOW, position:"absolute", marginTop:3,marginStart:2}}></Animated.View>
              }
            
            <Animated.View
              style={{transform:[{scaleX:interpolatedStretchAnimation}],  borderRadius: 30,
                borderColor: "#ffffff", width:SCREEN_DIMENSIONS.width-59,height:50,
                backgroundColor: colors.BLACK, flexDirection:'row',}}
            >
              
              <View style={{width:0, }}></View>
              <Animated.Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#fff',alignSelf:"center",  alignContent:"center", transform:[{scale}]}]}>WITHDRAW</Animated.Text>
             
            </Animated.View>
            </View> 
          </TouchableOpacity>

             <Text style={{fontFamily:font.GoldPlay_Medium, fontSize:13, padding:10,color:colors.BLACK, textAlign:'center'}}>NOTE: Withdrawals are limited to ₹ 500 to ₹ 1000 per day, within a 24-hour period.</Text>   
              <View style={{height:1, backgroundColor:colors.YELLOW, width:'100%'}} />  
              <View style={{flexDirection:'row', marginTop:20, marginBottom:15}}>
                <View style={{alignItems:"center", flex:1}}>
                <Text
              style={{
                color: "black",
                fontFamily: font.GoldPlay_Medium,
                fontSize: 12,
              }}
            >
              Amount Received
            </Text>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 20, alignItems:'center', marginTop:2 }}>
             <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 15 }}> ₹ </Text>{totalAmount ? totalAmount : 0}
            </Text>
                </View>
                <View style={{width:1,  backgroundColor:colors.YELLOW}} />
                <View style={{alignItems:"center", flex:1}}>
                <Text
              style={{
                color: "black",
                fontFamily: font.GoldPlay_Medium,
                fontSize: 12,
              }}
            >
              Amount Withdraw
            </Text>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 20, alignItems:'center', marginTop:2 }}>
             <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 15 }}> ₹ </Text>{0}
            </Text>
                </View>
              </View>
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 10 }}>
                Last Transaction:{" "}
                {walletData[0] ? walletData[0].createdAt : null}
                {console.log("Last trans", walletData)}
              </Text>
             
            </View> */}
          </View>

          <View style={{ flex: 1, gap: 20 }}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
          <Image source={require('../../assets/receipt_item.png')} style={{height:25, width:25, resizeMode:'contain'}}/>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 20, marginStart:10 }}>
             WITHDRAW HISTORY
            </Text>
            </View>
            <View style={{height:1, backgroundColor:colors.YELLOW}}/>  
            <FlatList
              data={walletData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={LoadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmptyComponent}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
