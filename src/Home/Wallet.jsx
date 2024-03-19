import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonHeader from "../common/CommonHeader";
import { ExpoSecureKey, colors, font, icon } from "../constants";
import stylesCommon from "../Themes/stylesCommon";
import { axiosCallAPI } from "../Api/Axios";
import * as Preference from "../StoreData/Preference";
import * as Progress from "react-native-progress";
import { WALLET_LIST } from "../Api/Utils";

export default function Wallet({ navigation }) {
  const [data, setData] = useState([
    { id: 1, title: "Product Name 1", money: 100, redeemDate: "2024-03-15" },
    { id: 2, title: "Product Name 2", money: 200, redeemDate: "2024-03-16" },
    { id: 3, title: "Product Name 3", money: 300, redeemDate: "2024-03-17" },
    { id: 4, title: "Product Name 4", money: 400, redeemDate: "2024-03-18" },
    { id: 5, title: "Product Name 5", money: 500, redeemDate: "2024-03-19" },
    { id: 5, title: "Product Name 6", money: 600, redeemDate: "2024-03-19" },
  ]);

  const [walletData, setWalletData] = useState([]);
  const [walletAmount, setwalletAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setloader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    setloader(true);
    if (currentPage > totalPages) {
      return;
    }
    setIsLoading(true);
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
      console.log("yeh raha be", newData[0].createdAt);
      setWalletData([...walletData, ...newData]);
      setwalletAmount(response.wallet_amount);
      setTotalPages(response.pages);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    } finally {
      setIsLoading(false);
      setloader(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          overflow: "hidden",
          elevation: 1,
          backgroundColor: "white",
          borderRadius: 15,
        }}
      >
        <View
          style={{
            flex: 0.2,
            backgroundColor: colors.YELLOW,
            justifyContent: "center",
            alignItems: "center",
            borderTopStartRadius: 15,
            borderBottomStartRadius: 15,
            padding: 10,
          }}
        >
          <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 20 }}>
            ₹{item.amount}
          </Text>
        </View>
        <View
          style={{
            flex: 0.8,
            //backgroundColor: "red",
            padding: 10,
            gap: 15,
            borderTopEndRadius: 15,
            borderBottomEndRadius: 15,
          }}
        >
          <View>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 15 }}>
              {item.coupon_name}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <View>
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 12 }}>
                Reedem Date
              </Text>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 12 }}
              >
                {item.createdAt.substring(0, 10)}
              </Text>
            </View>

            <View>
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 12 }}>
                Reedem Type
              </Text>
              <Text
                style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 12 }}
              >
                Scan Coupon
              </Text>
            </View>
          </View>
        </View>

        <Image
          source={icon.GIFT}
          style={{
            height: 65,
            width: 65,
            transform: [{ rotate: "-25deg" }],
            position: "absolute",
            right: 0,
            top: 20,
          }}
        />
      </View>
    </View>
  );

  const renderFooter = () => {
    if (isLoading) {
      return (
        <Progress.CircleSnail
          size={50}
          indeterminate={true}
          color={"black"}
          style={{ alignItems: "center" }}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={stylesCommon.whitebg}>
      <CommonHeader navigation={navigation} showBack />
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
            }}
          >
            <Text
              style={{
                color: "black",
                fontFamily: font.GoldPlay_SemiBold,
                fontSize: 16,
              }}
            >
              Wallet Amount
            </Text>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 45 }}>
              ₹{walletAmount}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 10 }}>
                Last Transaction:{" "}
                {walletData[0] ? walletData[0].createdAt : null}
                {console.log("Last trans", walletData)}
              </Text>
              <Image
                source={icon.TROPHY}
                style={{
                  width: 120,
                  height: 120,
                  position: "absolute",
                  right: -10,
                  top: -77,
                }}
              ></Image>
            </View>
          </View>

          <View style={{ flex: 1, gap: 20 }}>
            <Text style={{ fontFamily: font.GoldPlay_SemiBold, fontSize: 20 }}>
              Wallet History
            </Text>
            <FlatList
              data={walletData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={fetchWalletData}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
