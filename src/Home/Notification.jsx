import { SafeAreaView, StatusBar, StyleSheet, Text, View, RefreshControl,FlatList,Platform,TouchableHighlight, Alert } from "react-native";

import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import CommonHeader from "../common/CommonHeader";
import React, { useState, useEffect } from 'react';
import stylesCommon, {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../Themes/stylesCommon";
import { ExpoSecureKey,colors, icon, font } from "../constants";
import CommonHeaderNew from "../common/CommonHeader_new";
import { axiosCallAPI } from "../Api/Axios";
import * as Preference from "../StoreData/Preference";
import { NOTIFICATION,NOTIFICATION_READ } from "../Api/Utils";
import * as Progress from "react-native-progress";
import { Card} from 'react-native-paper';
import moment from 'moment';

export default function Notification({navigation}){
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [aadharNumber, setAadharNumber] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    const data1 =[{"title" : "Hello", "message" : "Message","id" : 1},
    {"title" : "Hello", "message" : "Message", "id" :2}];

    useEffect(() => {
        // Fetch data from your API or from local storage
            
                GetNotification()
          
           
      }, [currentPage]);
    
      useEffect(() =>{
        const retrievePersonalDetails = async () => {
         
          try {
            const storedDetails = await Preference.getPreference("profile");
          
            if (storedDetails) {
              const {    name,
                image,
                mobileNo,
                address,
                state,
                city,
                aadharCardNo,
                panCardNo,
                accountHolderName,
                accountNumber,
                bankName,
                ifscCode,
                country,
                current_address,
                current_city,
                current_country,
                current_pincode,
                current_state,
                current_street,
                street,pincode,gender,dateOfBirth,bank_verify } =
                storedDetails;
              console.log(
                "Bhai personal details mai yeh mil raha hai ",
                name,
                mobileNo
              );
   
            
         
         
              setAadharNumber(aadharCardNo || "");
              setProfilePhoto(image)
    
    
            }
          } catch (error) {
            console.error("Error retrieving personal details:", error);
          } 
        };
    
        retrievePersonalDetails();
      },[])


      const GetNotification = async() =>{
        if(isFirstTime){
            setIsFirstTime(false)
            setIsLoading(true)
        }
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
              const response = await axiosCallAPI('get',NOTIFICATION, "", requestOptions, true, navigation);
              setTotalPages(response.pages);
             
              if(response.result.length > 0){
                  const newData = response.result;
                  if(refreshing)
                  {
                    setData(newData);
                  }
                  else
                     setData([...data, ...newData])   
              }
              console.log("Notification response =>",response);
            //   setData([{"title" : "Hello", "message" : "Message","id" : 1},
            //   {"title" : "Hello", "message" : "Message", "id" :2}]);
           // setData(response.result);
            setIsLoading(false);
            setTimeout(() => {setRefreshing(false)},1000)
        }
        catch (error) {
            console.error("Error fetching wallet data:", error);
            setIsLoading(false);
           
          }
      }
      const handleRedirection =(type) =>{
        if(type === "coupon_scanned" || type === "transection_success"){
            navigation.navigate("Wallet")
        }
        else if(type === "bank_verify"){
            navigation.navigate("PersonalDetails",{aadharNo : aadharNumber, profilePhoto:profilePhoto});
        }
      }
      const ReadNotification = async (id, type) => {
        try {
            let profileFormData = new FormData();
                profileFormData.append("id", id);
                let requestOptions = {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
                    },
                  };
               const response = await axiosCallAPI("post",NOTIFICATION_READ,profileFormData,requestOptions, true,navigation);  
             console.log("Notification Read", response);  
          handleRedirection(type);
                
        }catch (error) {
          handleRedirection(type)
            console.error("Error fetching or storing profile data:", error);
          } 
      }
      
      const updateNotificationReadStatus = (index) =>{
                setData(previousArray =>{
                    const tempArray = [...previousArray];
                    tempArray[index].is_read = "1"
                    return tempArray;
                })
      }
      const LoadMoreData =() =>{
        if(data.length > 0){
          if(currentPage < totalPages){
            setCurrentPage(currentPage +1);
          }
        }
    }
    const renderEmptyComponent = () => (
      !isFirstTime &&  
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
          No Notification data found
        </Text>
      </View>
    );
    const renderFooter = () => {
    
      return (
        <View >
          {
            (currentPage < totalPages && data.length > 0) &&   
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
    const handleRefresh = () => {
        if(currentPage == 1){
            GetNotification();
        }
        else{
        setCurrentPage(1);
        }
        setRefreshing(true);
        // Optionally, you can also refetch data here
      };
    return(
        <SafeAreaView style={[stylesCommon.blackbg,{backgroundColor:"#f2f2f2"}]}>
        <StatusBar backgroundColor={colors.YELLOW} />
        <CommonHeaderNew navigation={navigation} showBack={true} header_title="NOTIFICATIONS" header_color={colors.YELLOW}/>
        <View style={{  flex:1}}>
        <FlatList
          ItemSeparatorComponent={
             Platform.OS !== 'android' &&
    (({highlighted}) => (
      <View
        style={[style.separator, highlighted && {marginLeft: 0}]}
      />
    ))
  }
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  }
  data={data}
  onEndReached={LoadMoreData}
  onEndReachedThreshold={0.1}
  ListFooterComponent={renderFooter}
  ListEmptyComponent={renderEmptyComponent}
  renderItem={({item, index, separators}) => (
    item.is_read === "1" ?
    <Card style={{margin:10, padding:16, backgroundColor:"#f2f2f2"}} onPress={()=>{
        updateNotificationReadStatus(index)
        handleRedirection(item.type)
    }
        }>
      <View style={{minHeight:50}}>
      <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:16, color:colors.BLACK}}>{item.title}</Text>
        <Text style={{fontFamily:font.GoldPlay_Medium, fontSize:14, color:"#333333", marginTop:5}}>{item.notification_text}</Text>
        <Text style={{fontFamily:font.GoldPlay_Medium, fontSize:14, color:"#999999", marginTop:10}}>{moment(item.createdAt).fromNow()}</Text> 
      </View>
    </Card>
    :
    <Card style={{margin:10, padding:16, backgroundColor:"#fff"}} onPress={()=>{
        updateNotificationReadStatus(index)
        ReadNotification(item.id, item.type)
        
      
        }}>
    <View style={{ minHeight:50,}}>
        <Text style={{fontFamily:font.GoldPlay_SemiBold, fontSize:16, color:colors.BLACK}}>{item.title}</Text>
        <Text style={{fontFamily:font.GoldPlay_Medium, fontSize:14, color:"#333333", marginTop:5}}>{item.notification_text}</Text>
        <Text style={{fontFamily:font.GoldPlay_Medium, fontSize:14, color:"#999999", marginTop:10}}>{moment(item.createdAt).fromNow()}</Text>
      </View>
      </Card>  
  )}
/>
{
     isLoading && 
     <View style={[stylesCommon.loaderViewStyle,{position:'absolute', backgroundColor:"#fff",top:0,bottom:0, left:0, right:0}]}>
          <Progress.CircleSnail
            size={50}
            indeterminate={true}
            color={"black"}
          />
        </View>
}
        </View>

        </SafeAreaView>
    );
}