import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import DateRangePickerModal from "../common/DateRangePickerModal";
import PendingClaimCard from "../common/PendingClaimCard";
import { font, icon } from "../constants";

export default function PendingHistory({ p_navigation }) {
  const [pendingOrder, setPendingOrder] = useState([
    {
      id: 1,
      invoiceNo: "VSA/09/679/24-25",
      title: "The Product Quantity Less",
      desc: "Here will be some text regarding the description of the claimed title and all some related text will be here. ",
    },
    {
      id: 2,
      invoiceNo: "VSA/09/679/24-25",
      title: "The Product Quantity Less",
      desc: "Here will be some text regarding the description of the claimed title and all some related text will be here. ",
    },
    {
      id: 3,
      invoiceNo: "VSA/09/679/24-25",
      title: "The Product Quantity Less",
      desc: "Here will be some text regarding the description of the claimed title and all some related text will be here. ",
    },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePending = (id) => {
    p_navigation.navigate("PendingOrder");
  };

  const renderItem = ({ item, index }) => (
    <PendingClaimCard item={item} onPress={() => handlePending(item.id)} />
  );

  const handleDateFilter = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderHeader = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
        marginBottom: 15,
      }}
    >
      <View>
        <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 14 }}>
          Invoice No.
        </Text>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 18,
        }}
        onPress={handleDateFilter}
      >
        <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 14 }}>
          Dates
        </Text>
        <Image
          source={icon.FILTER_DIS}
          style={{ width: 20, height: 20, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <DateRangePickerModal isVisible={isModalVisible} onClose={closeModal} />
      <FlatList
        data={pendingOrder}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        //  onEndReached={LoadMoreData}
        // onEndReachedThreshold={0.1}
        style={{
          marginHorizontal: 15,
          marginTop: 22,
          marginBottom: 35,
        }}
        // ListFooterComponent={renderFooter("wallet")}
        //ListEmptyComponent={renderEmptyComponent}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
