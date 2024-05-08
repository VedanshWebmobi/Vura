import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    StatusBar,
    ActivityIndicator,
    TextInput,
  } from "react-native";
  import React, { useEffect, useMemo, useRef, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import Product from "./Product";
  import CommonHeaderNew from "../common/CommonHeader_new";
  import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
  import { ExpoSecureKey, colors, font, icon } from "../constants";
  import { axiosCallAPI } from "../Api/Axios";
  import { PRODUCTS, PRODUCT_CATEGORY } from "../Api/Utils";
  import { Fontisto } from '@expo/vector-icons';


  export default function ProductTabs({navigation}){
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [show_search, setShowSearch] = useState(false);

    const
    data =[
    "Home","Setting","Profile","SignUp","SIgnIn"
    ];

const handleSearchView =()=>{
    setShowSearch(true);
}

const Tab = createMaterialTopTabNavigator();
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
        categoryData.push({ label: "All",
          value: 0,})
         response.map((category) => (
         categoryData.push( {
          label: category.productCategoryName,
          value: category.id,
        })));

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

  fetchProductCategory();
}, []);


    return(
        <SafeAreaView style={{flex:1}}>
          <View style={{flex:1}}>
          <StatusBar backgroundColor={colors.YELLOW} />
      <CommonHeaderNew 
      header_title={"OUR PRODUCTS"} 
      header_color={colors.YELLOW} 
      navigation={navigation} 
      showSearch
      onSearchPress={handleSearchView}
      />
      {
        categories.length > 0 ? 
        <Tab.Navigator 
        screenOptions={{
            tabBarLabelStyle: { fontSize: 12, fontFamily:font.GoldPlay_SemiBold },
            tabBarItemStyle:{width:130},
           tabBarIndicatorStyle:{backgroundColor:colors.YELLOW},
         tabBarActiveTintColor:colors.YELLOW,
         tabBarInactiveTintColor:"#999999",
            scrollEnabled:true,
            tabBarStyle: { backgroundColor: 'black' },
              tabBarScrollEnabled:true,
               tabBarAllowFontScaling:true
          }}
        >
        { 
         categories.map((item) =>
            <Tab.Screen name={item.label} children={() => <Product name={item.label} catID={item.value} p_navigation={navigation} search={search} setSearch={setSearch}/>} />)
        }
        </Tab.Navigator>  
        :
        null
      }
       {
          show_search && 
          <View style={{position:'absolute',width:'100%', backgroundColor:colors.YELLOW, height:60,padding:8}}>
          <View style={{backgroundColor:'#fff', borderRadius:20, alignItems:'center', flexDirection:'row', paddingEnd:10}}>
          <TextInput style={{paddingStart:20, paddingBottom:10, paddingTop:10, paddingEnd:10, flex:1}}
          value={search}
          placeholder={"Search here..."}
          onChangeText={(value) => setSearch(value)}
          />
         <Fontisto name="close" size={24} color={colors.BLACK} onPress={()=>{
            if(search.length > 0){
              setSearch("")
            }
            else{
              setShowSearch(false);
            }
         }} />
          </View> 
        </View>
       } 


        </View>  
        </SafeAreaView>
    );
  }