import {
    Image,
      SafeAreaView,
      ScrollView,
      StatusBar,
      StyleSheet,
      Text,
      useColorScheme,
      View,
    } from 'react-native';
    import { useRoute } from "@react-navigation/native";
    import {
        AnimatedTabBarNavigator,
        DotSize, // optional
        TabElementDisplayOptions, // optional
        TabButtonLayout, // optional
        IAppearanceOptions // optional
      } from 'react-native-animated-nav-tab-bar'
      import React, { useEffect, useState, useRef } from "react";
      
      import { createNativeStackNavigator } from "@react-navigation/native-stack";    
import { colors } from '../constants';
      import Home from './Home';
      import ProductTabs from './ProductsTabScreen';
      import CashBack from './CashBack';
      import Scanner from './Scanner';

export default function HomeTabScreen({navigation}){
    const Tabs = AnimatedTabBarNavigator();
    const [TabPosition, setTabPosition] = useState(-1)

    const route = useRoute();
    if(route.params)
    {
      const { position} = route.params;
      if(TabPosition < 0)
      {
        setTabPosition(position);
      }
         // TabPosition.current.setActiveIndex(position);
          //TabPosition.current.navigate((position == 2) ? "PRODUCTS" : (position == 3) ? "CASHBACK" : "Home")
       
    }


    return(
      <View style={{flex:1, }}>
        <Tabs.Navigator
        // default configuration from React Navigation
        initialRouteName={ (TabPosition != undefined ? (TabPosition == 2) ? "PRODUCTS" : (TabPosition == 3) ? "CASHBACK" : "Home" : "Home")}
        key={1}
        tabBarOptions={{
          activeTintColor: "#000000",
          inactiveTintColor: "#FFFFFF",
        
        }}
        
        appearance={{ floating:true, 
            activeTabBackgrounds:colors.YELLOW,
            activeTintColor:colors.YELLOW,
             tabBarBackground:'#000000', 
             inactiveTintColor:'#FFFFFF',
            dotSize:'large',
             whenActiveShow:'both',
             whenInactiveShow:'icon-only',
             }}
         backBehavior='history'    
       
      >
    
      
        <Tabs.Screen name="HOME" component={Home} 
        options={{
          tabBarIcon : ({ focused, color, size }) =>(
            <Image source={focused ? require('../../assets/home_icon.png'): require('../../assets/home_icon_white.png')} style={{height:20, width:20, resizeMode:'contain'}}/>
          )
        }}/>
        <Tabs.Screen name="PRODUCTS" component={ProductTabs} 
          options={{
            tabBarIcon : ({ focused, color, size }) =>(
              <Image source={require('../../assets/box.png')} style={{height:20, width:20, resizeMode:'contain'}} tintColor={focused ? colors.BLACK : '#fff'}/>
            )
          }}
        />
        <Tabs.Screen name="CASHBACK" component={CashBack} 
          options={{
            tabBarIcon : ({ focused, color, size }) =>
            {
                console.log(size);
                 return(
                    <Image source={require('../../assets/ticket_discount.png')} style={{height:20, width:20, resizeMode:'contain'}} tintColor={focused ? colors.BLACK : '#fff'}/>
                 )  ; 
            } 
          }}
          
          />
        <Tabs.Screen name="SCAN" component={Scanner} 
          options={{
            tabBarIcon : ({ focused, color, size }) =>
            {
                console.log(focused);
                 return(<Image source={require('../../assets/scan_barcode.png')} style={{height:20, width:20, resizeMode:'contain'}} tintColor={focused ? colors.BLACK : '#fff'}/>); 
            }
          }}
          />
      
    
      </Tabs.Navigator>
      
      </View>
    )
}  ;    