import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import Profile from "../Screens/Profile";
import { colors, icon } from "../constants";
import CustomDrawerComponent from "../common/CustomDrawerComponent";

import AddPhoto from "../Profile/AddPhoto";
import { useNavigation } from "@react-navigation/native";
import Home from "../Home/Home";
import { useRoute } from "@react-navigation/native";
import Product from "../Home/Product";
import CashBack from "../Home/CashBack";
import Offers from "../Home/Offers";
import StartScreen from "../Screens/StartScreen";
import PreLogin from "../Screens/PreLogin";
import Category from "../Screens/Category";
import Login from "../Screens/Login";

const Drawer = createDrawerNavigator();

const MainComponent = ({ navigation }) => {
  const drawerNavigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        // drawerType: "permanent",
        drawerStyle: { width: "100%", height: "100%" },
        drawerPosition: "right",
        // overlayColor: "transparent",
      }}
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Product" component={Product} />
      <Drawer.Screen name="CashBack" component={CashBack} />
      <Drawer.Screen name="Offers" component={Offers} />
      {/* <Drawer.Screen name="Profile" component={Profile} />  */}
    </Drawer.Navigator>
  );
};

export default MainComponent;
