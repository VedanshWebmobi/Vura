import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { font, icon } from "../constants";
import { SCREEN_WIDTH } from "../Themes/stylesCommon";

const DistributerSearch = ({
  isVisible,
  onClose,
  searchText,
  handleSearch,
}) => {
  // States to manage modal visibility and selected dates
  const [openModal, setOpenModal] = useState(false);

  // Function to open the modal

  const closeModal = () => {
    onClose();
  };
  const onSearchSubmit = () => {
    // You can handle search submission here (e.g., closing the keyboard or logging)
    Keyboard.dismiss(); // Close the keyboard when the search button is pressed
    closeModal();
  };

  return (
    <View style={styles.container}>
      {/* Modal for date range selection */}
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={onClose}
      >
        <TouchableWithoutFeedback onPress={() => closeModal()}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by Invoice no..."
                  value={searchText}
                  onChangeText={handleSearch} // Update the search text
                  returnKeyType="search" // Show "Search" on the keyboard
                  onSubmitEditing={onSearchSubmit} // Handle press of the search button
                  autoCapitalize="none" // Prevent automatic capitalization of input
                />

                <TouchableOpacity
                  style={{ position: "absolute", right: 0, top: 2, right: 8 }}
                  //  onPress={}
                >
                  <Image
                    source={icon.SEARCH_ICN_DIS}
                    style={{ width: 35, height: 35, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#F2F2F2",
    padding: 20,
    borderRadius: 25,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    width: SCREEN_WIDTH,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  searchInput: {
    borderRadius: 30,
    backgroundColor: "white",
    fontFamily: font.GoldPlay_Regular,
    fontSize: 14,
    paddingStart: 15,
    height: 40,
    paddingEnd: 50,
  },
});

export default DistributerSearch;
