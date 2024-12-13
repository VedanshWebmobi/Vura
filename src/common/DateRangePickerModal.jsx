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
} from "react-native";
import DatePicker from "react-native-date-picker";
import { font, icon } from "../constants";
import { SCREEN_WIDTH } from "../Themes/stylesCommon";
import CommonAlert from "./CommonAlert";

const DateRangePickerModal = ({ isVisible, onClose, onDateRangeSelected }) => {
  // States to manage modal visibility and selected dates
  const [openModal, setOpenModal] = useState(false);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to open the modal
  const toggleModal = () => setOpenModal(!openModal);

  // Date picker confirmations for start and end dates
  const onStartDateConfirm = (date) => {
    setStartDate(date);
    setOpenStartDate(false);
  };

  const onEndDateConfirm = (date) => {
    setEndDate(date);
    setOpenEndDate(false);
  };

  const closeModal = () => {
    if (!startDate || !endDate) {
      setIconColor("red");
      setAlertTitle("OPPS!");
      setErrorMessage(
        "Please select both start and end dates before submitting"
      );
      setVisible(true);

      return; // Prevent closing the modal if validation fails
    }
    onDateRangeSelected(startDate, endDate);
    onClose();
    // setStartDate("");
    // setEndDate("");
  };

  const closewithoutFeedback = () => {
    setStartDate("");
    setEndDate("");
    onDateRangeSelected(undefined, undefined);
    onClose();
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    onDateRangeSelected(undefined, undefined);
    onClose();
  };

  return (
    <View style={styles.container}>
      {/* Modal for date range selection */}
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <CommonAlert
          visible={visible} // Pass visibility state to the CommonAlert component
          hideModal={hideModal} // Pass function to hide the modal
          handleOkPress={() => {
            setVisible(false);
          }} // Pass function to handle Ok button press
          //handleCancelPress={handleCancelPress} // Pass function to handle Cancel button press
          title={alertTitle} // Pass title text
          iconName="error"
          iconColor={iconColor}
          bodyText={errorMessage} // Pass body text
          // cancelButton={true} // Pass whether Cancel button should be displayed
        />

        <TouchableWithoutFeedback>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.dateRow}>
                {/* Start Date Picker */}
                <TouchableOpacity
                  onPress={() => setOpenStartDate(true)}
                  style={styles.dateInput}
                >
                  <Text style={styles.dateText}>
                    {startDate ? startDate.toLocaleDateString() : "START DATE"}
                  </Text>
                  <Image
                    source={icon.Down_DIS}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
                {/* <Text style={{ fontFamily: font.GoldPlay_Medium, fontSize: 14 }}>
                TO
              </Text> */}
                {/* End Date Picker */}
                <TouchableOpacity
                  onPress={() => setOpenEndDate(true)}
                  style={styles.dateInput}
                >
                  <Text style={styles.dateText}>
                    {endDate ? endDate.toLocaleDateString() : "END DATE"}
                  </Text>
                  <Image
                    source={icon.Down_DIS}
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  //  alignItems: "center",

                  marginEnd: 8,
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: 15,
                  marginBottom: 25,
                }}
              >
                <TouchableOpacity onPress={handleReset}>
                  <Text
                    style={{
                      fontFamily: font.GoldPlay_SemiBold,
                      fontSize: 16,
                      textDecorationLine: "underline",
                    }}
                  >
                    RESET
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal}>
                  <Text
                    style={{
                      fontFamily: font.GoldPlay_SemiBold,
                      fontSize: 16,
                      textDecorationLine: "underline",
                    }}
                  >
                    SUBMIT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Start Date Picker */}
      <DatePicker
        modal
        mode="date"
        open={openStartDate}
        date={startDate || new Date()}
        maximumDate={new Date()}
        onConfirm={onStartDateConfirm}
        onCancel={() => setOpenStartDate(false)}
      />

      {/* End Date Picker */}
      <DatePicker
        modal
        mode="date"
        open={openEndDate}
        date={endDate || new Date()}
        minimumDate={startDate} // Ensures end date can't be before start date
        maximumDate={new Date()}
        onConfirm={onEndDateConfirm}
        onCancel={() => setOpenEndDate(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#F2F2F2",
    padding: 20,
    borderRadius: 25,
    width: SCREEN_WIDTH - 25,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateInput: {
    padding: 12,
    paddingStart: 15,
    flexDirection: "row",
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 32,
    width: "45%",

    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    fontFamily: font.GoldPlay_Regular,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DateRangePickerModal;
