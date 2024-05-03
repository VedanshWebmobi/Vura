import React, { useCallback, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  PaperProvider,
  adaptNavigationTheme,
  DefaultTheme,
} from "react-native-paper";

import merge from "deepmerge";
import * as Font from "expo-font"; // Import Font from expo-font
import GoldPlay_Regular from "./assets/fonts/Goldplay_Regular.ttf";
import GoldPlay_Medium from "./assets/fonts/Goldplay_Medium.ttf";
import GoldPlay_SemiBold from "./assets/fonts/Goldplay_SemiBold.ttf";
import StartScreen from "./src/Screens/StartScreen";
import MainComponent from "./src/main/MainComponent";
import EditProfile from "./src/Screens/EditProfile";
import * as SplashScreen from "expo-splash-screen";
import PreLogin from "./src/Screens/PreLogin";
import Category from "./src/Screens/Category";
import Login from "./src/Screens/Login";
import OTPScreen from "./src/Screens/OTPScreen";
import LoginSuccessScreen from "./src/Screens/LoginSuccessScreen";
import LandingPage from "./src/Screens/LandingPage";
import AddPhoto from "./src/Profile/AddPhoto";
import AddAdhar from "./src/Profile/AddAdhar";
import HelpAndSupport from "./src/Screens/Help_Support";
import PersonalDetails from "./src/Profile/PersonalDetails";
import BankDetails from "./src/Profile/BankDetails";
import ProfileDetails from "./src/Profile/ProfileDetails";
import Home from "./src/Home/Home";
import Scanner from "./src/Home/Scanner";
import Product from "./src/Home/Product";
import CashBack from "./src/Home/CashBack";
import Offers from "./src/Home/Offers";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawer from "./src/common/CustomDrawer";
import Wallet from "./src/Home/Wallet";
import ProductDetail from "./src/Home/ProductDetail";

import * as Preference from "./src/StoreData/Preference";
import { ExpoSecureKey } from "./src/constants";
import CreateProfileScreen from "./src/Screens/CreateProfileScreen";
import HomeTabScreen from "./src/Home/HomeTabScreen";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
  reactNavigationDark: DefaultTheme,
});

const CombinedDefaultTheme = merge(DefaultTheme, LightTheme);

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [token, setToken] = useState("");

  // Load custom fonts asynchronously
  const loadFonts = async () => {
    await Font.loadAsync({
      Gp_Regular: GoldPlay_Regular,
      Gp_SemiBold: GoldPlay_SemiBold,
      Gp_Medium: GoldPlay_Medium,
    });
    setFontsLoaded(true);
  };

  // Prevent auto hiding of splash screen
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  // Handle app initialization
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        await loadFonts();
        // Artificially delay for two seconds to simulate a slow loading experience
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const showMenu = async () => {
      const token = await Preference.getValueFor(ExpoSecureKey.TOKEN);
      if (token) {
        setToken(token);
      } else {
        setToken("");
        console.log("Idhar bhi");
      }
    };

    showMenu();
  }, []);

  // Hide splash screen once the app is ready and the root view has already performed layout
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!fontsLoaded || !appIsReady) {
    return null; // Return null or a loading indicator until fonts are loaded and the app is ready
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            // initialRouteName={token ? "Home" : "StartScreen"}
            initialRouteName={token ? "HomeTab" : "StartScreen"}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="PreLogin" component={PreLogin} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
            <Stack.Screen name="Login_Success" component={LoginSuccessScreen} />
            <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CustomDrawer" component={CustomDrawer} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="CashBack" component={CashBack} />
            <Stack.Screen name="Offers" component={Offers} />
            <Stack.Screen name="Wallet" component={Wallet} />
            <Stack.Screen name="AddPhoto" component={AddPhoto} />
            <Stack.Screen name="AddAdhar" component={AddAdhar} />
            <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
            <Stack.Screen name="BankDetails" component={BankDetails} />
            <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Scanner" component={Scanner} />
            <Stack.Screen name="Help" component={HelpAndSupport} />
            <Stack.Screen name="HomeTab" component={HomeTabScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
