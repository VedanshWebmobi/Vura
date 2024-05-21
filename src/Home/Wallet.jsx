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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { ScrollView } from "react-native-gesture-handler";
import WalletWithdrawList from "./WalletWithdrawList";
import CouponList from "./CouponList";

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
  const [couponData, setCouponData] = useState([]);
  const [walletAmount, setwalletAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPageCoupon, setCurrentPageCoupon] = useState(1);
  const [totalPagesCoupon, setTotalPagesCoupon] = useState(1);

  const [loader, setloader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const stretchValue = useRef(new Animated.Value(1)).current;
  const Tab = createMaterialTopTabNavigator();
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
  useEffect(() =>{
    if(walletData.length > 0)
    {
    fetchWalletData();
    }
  },[currentPage])
  useEffect(() =>{
    if(couponData.length > 0)
    {
    fetchCouponData();
    }
  },[currentPageCoupon])

  useFocusEffect(
    React.useCallback(() => {
    //  Alert.alert("Load More");
        fetchWalletData();
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      //  fetchCouponData();
    }, [])
  );

  // useEffect(() => {

  //   fetchWalletData();
  // }, [currentPage]);

  const LoadMoreData =() =>{
   
      if(walletData.length > 0){
       
        if(currentPage < totalPages){
          setCurrentPage(currentPage +1);
         
        }
      }
  }
  const LoadMoreDataCoupon =() =>{
    if(couponData.length > 0){
      if(currentPageCoupon < totalPagesCoupon){
       
        setCurrentPageCoupon(currentPageCoupon +1);
      }
    }
}

  function MyTabBar({ state, descriptors, navigation, position }) {
    
    return (
      <View style={{borderRadius:25, flexDirection: 'row', backgroundColor:'#CCCCCC', height:50, alignItems:"center", justifyContent:"center", padding:8,  }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
         
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? "#fff" : "#cccccc")),
          });
         
        
        
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, backgroundColor:opacity, borderRadius:25, height:'100%', justifyContent:'center' }}
            >
              <Animated.Text style={{  textAlign:'center', fontFamily:font.GoldPlay_SemiBold, fontSize:12,   }}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const HomeScreen =()=>{
    


    return(<View style={{flex:1, marginTop:10}}>
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
    </View>)
  }
  const SettingsScreen =()=>{
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
        WITHDRAW_HISTORY,
        "",
        requestOptions,
        true,
        navigation
      );
      console.log("WithDrawal History",response.transaction_log.result);
       const newData = response.transaction_log.result;

    //   setWalletData([...walletData, ...newData]);
       if(response.client_data)
       {
       setwalletAmount(response.client_data.available_balance);
       setTotalAmount(response.client_data.received_amount);
       setWithdrawalAmount(response.client_data.withdrawal_amount);
       }
     //  setTotalPages(response.transaction_log.pages);
     // setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    } finally {
     // setIsLoading(false);
      setloader(false);
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
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 12 }}>
                {"Amount: "}
              </Text>
              <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 14 }}>
            ₹{item.withdrawal_amount}
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
          { type === "wallet" ?
            (currentPage < totalPages && walletData.length > 0) &&   
            <Progress.CircleSnail
            size={50}
            indeterminate={true}
            color={"black"}
            style={{ alignItems: "center" }}
          />
          :
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
          style={{ paddingHorizontal: 15, paddingTop: 15,  flex: 1 }}
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
            <View  style={{flexDirection:'row', alignItems:"center"}}>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 30, alignItems:'center', textAlign:'center' }}>
            {walletAmount ? walletAmount : 0}
            </Text>
            <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 18, color:"#000000", textAlign:'center' }}> Points</Text>
            </View>
            {
               (parseFloat(walletAmount) >= 500) ?
               <TouchableOpacity
               activeOpacity={1}
                 onPress={() => {
                   setSHowView(true);
                    setTimeout(() =>{
                        setSHowView(false);
                      if(walletAmount >= 500)  
                      {
                       navigation.navigate("Withdraw",{walletAmount:walletAmount});
                      }
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
                   <Animated.Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#fff',alignSelf:"center",  alignContent:"center", transform:[{scale}]}]}>REDEEM</Animated.Text>
                  
                 </Animated.View>
                 </View> 
               </TouchableOpacity>
               :
               <View
               style={{  borderRadius: 30,
                 borderColor: "#ffffff", width:SCREEN_DIMENSIONS.width-59,height:50,
                 backgroundColor: "#cccccc", flexDirection:'row', marginTop:10}}
             >
               
               <View style={{width:0, }}></View>
               <Text style={[stylesCommon.preButtonLabelStyle,{flex:1,textAlign:'center', color:'#999999',alignSelf:"center",  alignContent:"center", }]}>REDEEM</Text>
              
             </View>

            }
             <Text style={{fontFamily:font.GoldPlay_Medium, fontSize:13, padding:10,color:colors.BLACK, textAlign:'center'}}>Limit for Redeem: Minimum 500 Points, maximum 1000 Points in 24 hours</Text>   
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
              Received Points
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
             Redeem Points
            </Text>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 20, alignItems:'center', marginTop:2 }}>
             <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 15 }}> ₹ </Text>{withdrawalAmount}
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

          <View style={{ flex: 1,marginTop:15, }}>
          <View style={{flexDirection:"row", alignItems:"center",}}>
          {/* <Image source={require('../../assets/receipt_item.png')} style={{height:25, width:25, resizeMode:'contain'}}/> */}
            <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 16, marginStart:0 }}>
            HISTORY
            </Text>
            </View>
            <View style={{height:1, backgroundColor:colors.YELLOW, marginTop:10, marginBottom:10}}/>  
            <Tab.Navigator  tabBar={props => <MyTabBar {...props} />}
            swipeEnabled ={false}
          >
            <Tab.Screen name="REDEEM" component={WalletWithdrawList} />
      <Tab.Screen name="COUPON" component={CouponList} />
            </Tab.Navigator>
            {/* <FlatList
              data={walletData}
              renderItem={renderItem}
              keyExtractor={(item) => item.unique_id.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={LoadMoreData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              ListEmptyComponent={renderEmptyComponent}
            /> */}
          </View>
        </View>
      
      )}
    </SafeAreaView>
  );
}
