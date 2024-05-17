import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    StatusBar,
    ActivityIndicator,
    TextInput,
    Alert,TouchableOpacity,Animated,ScrollView,Dimensions
  } from "react-native";
  import React, { useEffect, useMemo, useRef, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import Product from "../Home/Product";
  import CommonHeaderNew from "../common/CommonHeader_new";
  import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
  import { ExpoSecureKey, colors, font, icon } from "../constants";
  import { axiosCallAPI } from "../Api/Axios";
  import { PRODUCTS, PRODUCT_CATEGORY } from "../Api/Utils";
  import { Fontisto } from '@expo/vector-icons';

 export default function MyTabBar({ state, descriptors, navigation, position }) {
    const scrollViewRef = React.useRef();
   
    React.useEffect(() => {
        const index = state.index;
      
        const screenWidth = Dimensions.get('window').width;
        const tabWidth = screenWidth / state.routes.length;
    
        scrollViewRef.current.scrollTo({
          x: (index == (state.routes.length -1) ? tabWidth : tabWidth-30) * index,
          animated: true,
        });
      }, [state.index]);
    return (
      <View style={{height:50,backgroundColor:"#000000", }}>
      <ScrollView  horizontal style={{ }} contentContainerStyle={{ flexDirection: 'row',
      alignItems: 'center',}}
      ref={scrollViewRef}
      >
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
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          });
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{paddingStart:10, paddingEnd:10, alignItems:"center"}}
            >
              <Animated.Text style={{ color:isFocused ? "#fff" : "#999999", fontFamily:font.GoldPlay_SemiBold, textTransform:'uppercase', fontSize:16 }}>
                {label}
              </Animated.Text>
            {
               <View style={{height:3, backgroundColor:isFocused ? colors.YELLOW : colors.BLACK, width:15, borderRadius:10}}/>
            }  
          
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      </View>
    );
  }