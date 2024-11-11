import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CompleteOrder from "./CompleteOrder";
import PendingHistory from "./PendingHistory";
import ClaimedHistory from "./ClaimedHistory";
import CompletedHistory from "./CompletedHistory";
import OrderHistoryTab from "../common/OrderHistorTab";

export default function OrderHistory({ navigation }) {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => <OrderHistoryTab {...props} />}
        swipeEnabled={false}
        lazy={true}
      >
        <Tab.Screen
          name="COMPLETED"
          key="completed"
          children={() => (
            <CompletedHistory
              name="COMPLETED"
              catID="completed" // You can customize this value as per your logic
              p_navigation={navigation}
              //   search={search}
              //   setSearch={setSearch}
            />
          )}
        />
        <Tab.Screen
          name="PENDING"
          key="pending"
          children={() => (
            <PendingHistory
              name="PENDING"
              catID="pending" // You can customize this value as per your logic
              p_navigation={navigation}
              //  search={search}
              //   setSearch={setSearch}
            />
          )}
        />
        <Tab.Screen
          name="CLAIMED"
          key="claimed"
          children={() => (
            <ClaimedHistory
              name="CLAIMED"
              catID="claimed" // You can customize this value as per your logic
              p_navigation={navigation}
              //   search={search}
              //   setSearch={setSearch}
            />
          )}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({});
