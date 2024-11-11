import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import { font, icon } from "../constants";
import { SCREEN_WIDTH } from "../Themes/stylesCommon";
import SelectDropdown from "react-native-select-dropdown";
import DocumentPicker from "react-native-document-picker";

const RejectionModal = ({ isVisible, onClose, isEdit = false }) => {
  const [claimedTitle, setClaimedTitle] = useState(null); // Selected value for dropdown
  const [description, setDescription] = useState(""); // Description text
  const [attachments, setAttachments] = useState("");

  const handleAttachment = () => {
    // For demo purposes, we're adding dummy attachment names.
    // You can replace this with your file picker logic.
    const newAttachment = `Attachment ${attachments.length + 1}`;
    setAttachments((prevAttachments) => [...prevAttachments, newAttachment]);
  };

  const handleFileUpload = async () => {
    try {
      // Open the file picker with the specific file types you want
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf], // Specify the file types (image or pdf in this case)
      });

      // The result is an array of selected files, even though we expect just one in this case
      if (result && result.length > 0) {
        const { uri, name } = result[0]; // Get the first file's URI and name
        console.log(name);
        setAttachments(name); // Set the attachment name
      }
    } catch (error) {
      // Handle canceled selection or errors
      if (DocumentPicker.isCancel(error)) {
        console.log("User canceled the file picker.");
      } else {
        Alert.alert("Error", "Failed to upload file.");
      }
    }
  };

  const closeModal = () => {
    setAttachments("");
    setDescription("");
    setClaimedTitle("");
    onClose(); // This will close the modal when the user taps outside of it
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={() => closeModal()}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <Text style={styles.headerText}>
              {isEdit ? "Edit Of The Rejection" : "Reason Of Rejection"}
            </Text>

            {/* Dropdown for "Claimed Title" */}
            <Text style={[styles.label, { marginTop: 40 }]}>Claimed Title</Text>

            <SelectDropdown
              data={[
                "Item 1",
                "Item 2",
                "Item 3",
                "Item 4",
                "Item 5",
                "Item 6",
              ]}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: "#E5E3E3" }),
                    }}
                  >
                    <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                  </View>
                );
              }}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text
                      style={
                        selectedItem
                          ? styles.dropdownButtonTxtStyle
                          : styles.dropdownDefaultTxt
                      }
                    >
                      {(selectedItem && selectedItem) ||
                        "Select the Claim Title"}
                    </Text>
                    <Image
                      source={icon.Down_DIS}
                      style={{ width: 40, height: 40, resizeMode: "contain" }}
                    />
                  </View>
                );
              }}
              dropdownStyle={styles.dropdownMenuStyle}
              defaultValue="Select the Claim Title"
            />

            {/* Description Text Area */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              placeholder="Write here description"
              maxLength={100}
            />
            <View style={{}}>
              <Text style={styles.charCount}>{description.length}/100</Text>
            </View>

            {/* Attachment Section */}
            <View style={{}}>
              <Text style={styles.label}>Attachments</Text>

              {/* List of attachments */}

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                {attachments !== "" && (
                  <View
                    style={{
                      elevation: 1,
                      backgroundColor: "#fff",
                      paddingHorizontal: 15,
                      borderRadius: 6,
                      height: 45,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Attachment Name */}
                    <Text style={styles.attachmentPreview}>{attachments}</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.attachmentButton}
                  onPress={handleFileUpload}
                >
                  <Image
                    source={icon.ADD_DIS} // Replace with your actual icon path
                    style={{
                      width: "130%",
                      height: "130%",
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </View>

              {/* Add Attachment button: Show it at the last item */}
            </View>

            <View
              style={{
                alignItems: "flex-end",
                marginEnd: 8,
                marginTop: 45,
              }}
            >
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
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: SCREEN_WIDTH - 50,
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    padding: 20,
  },
  headerText: {
    fontFamily: font.GoldPlay_SemiBold,
    fontSize: 20,

    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  label: {
    fontFamily: font.GoldPlay_Medium,
    fontSize: 20,
    marginTop: 20,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    maxHeight: 100,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontFamily: font.GoldPlay_Medium,
    elevation: 2,
    backgroundColor: "#fff",
    fontSize: 14,
    textAlignVertical: "top", // Ensures the text is top-aligned in the TextInput
    marginBottom: 8,
  },

  charCount: {
    fontSize: 12,
    marginEnd: 1,
    color: "#334155",
    fontFamily: font.GoldPlay_Medium,
    textAlign: "right", // Align the character count text to the right
  },
  attachmentButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 1,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  attachmentText: {
    color: "white",
    fontSize: 14,
  },
  attachmentPreview: {
    color: "#666666",
    fontSize: 12,

    textAlign: "center",
  },
  footer: {
    marginTop: 20,
  },

  dropdownButtonTxtStyle: {
    fontFamily: font.GoldPlay_Medium,
    fontSize: 14,
    paddingStart: 10,
  },
  dropdownDefaultTxt: {
    fontFamily: font.GoldPlay_Medium,
    fontSize: 14,
    paddingStart: 10,
  },

  dropdownButtonArrowStyle: {
    fontSize: 24,
  },
  dropdownMenuStyle: {
    borderRadius: 8,
    width: SCREEN_WIDTH / 1.35,
  },
  dropdownItemStyle: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,

    width: "100%",
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontFamily: font.GoldPlay_Medium,
    fontSize: 14,
  },
  dropdownButtonStyle: {
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#fff",
    height: SCREEN_WIDTH / 7,
    elevation: 2,
    paddingHorizontal: 8,
    width: SCREEN_WIDTH - 90,
    alignItems: "center",
  },
});

export default RejectionModal;
