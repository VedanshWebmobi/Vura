import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    StatusBar,
    ActivityIndicator,
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import Product from "./Product";
  import CommonHeaderNew from "../common/CommonHeader_new";
  import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
  import { ExpoSecureKey, colors, font, icon } from "../constants";
  export default function ProductTabs({navigation}){
    const
    data =[
    "Home"
    ,
    "Setting"
    ,
    "Profile"
    ,
    "SignUp"
    ,
    "SIgnIn"
    ];
const Tab = createMaterialTopTabNavigator();

    return(
        <SafeAreaView style={{flex:1}}>
          <View style={{flex:1}}>
          <StatusBar backgroundColor={colors.YELLOW} />
      <CommonHeaderNew header_title={"OUR PRODUCTS"} header_color={colors.YELLOW} navigation={navigation}/>
        <Tab.Navigator 
        screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarItemStyle:{width:100},
            scrollEnabled:true,
            tabBarStyle: { backgroundColor: 'powderblue' },
              tabBarScrollEnabled:true,
               tabBarAllowFontScaling:true
          }}
        >
    {data.map((item) =>
      <Tab.Screen name={item} component= {Product} />
      )}
        </Tab.Navigator>
        </View>  
        </SafeAreaView>
    );
  }