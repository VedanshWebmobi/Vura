import React, { useState, useEffect } from "react";
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
  Alert,
  Linking,
} from "react-native";
import { ExpoSecureKey, font, icon } from "../constants";
import { SCREEN_WIDTH } from "../Themes/stylesCommon";
import SelectDropdown from "react-native-select-dropdown";
import * as Preference from "../StoreData/Preference";
import DocumentPicker from "react-native-document-picker";
import { axiosCallAPI } from "../Api/Axios";
import { ORDER_ACCEPT, ORDER_CLAIM } from "../Api/Utils";
import CommonAlert from "./CommonAlert";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const RejectionModal = ({
  isVisible,
  onClose,
  fetchOrderData,
  isEdit = false,
  invoiceData = {},
  invoiceId,
  navigatePending,
}) => {
  const editTitle = invoiceData?.[0]?.claims?.[0]?.claim_type;
  const editDesc = invoiceData?.[0]?.claims?.[0]?.notes;
  const editAttachments = invoiceData?.[0]?.claims?.[0]?.document;
  const claimID = invoiceData?.[0]?.claims?.[0]?.id;
  const [claimedTitle, setClaimedTitle] = useState(null); // Selected value for dropdown
  const [description, setDescription] = useState(""); // Description text
  const [attachments, setAttachments] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false); // Track if "Other" is selected
  const [otherClaimedTitle, setOtherClaimedTitle] = useState("");
  const [visible, setVisible] = React.useState(false);
  const hideModal = () => setVisible(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [iconColor, setIconColor] = useState("red");
  const [errorMessage, setErrorMessage] = useState("");
  // const uniqueAvailableImages = new Set();
  const availableImages = [];
  const newImages = [];

  useEffect(() => {
    console.log(
      "Here is the option",
      isOtherSelected ? otherClaimedTitle : claimedTitle
    );
  }, [claimedTitle, otherClaimedTitle]);

  useEffect(() => {
    if (isEdit && invoiceData?.[0]?.claims?.[0]) {
      const claim = invoiceData[0].claims[0]; // Assuming claims is an array
      setClaimedTitle(claim.claim_type || ""); // Set the claim title
      setDescription(claim.notes || ""); // Set the description
      setAttachments(claim.document || []); // Set the attachments
      if (claim.claim_type === "Other") {
        setIsOtherSelected(true);
        setOtherClaimedTitle(claim.other_claim_type || ""); // Set the 'other' claim title
      }
    }
  }, [isEdit, invoiceData]);

  const handleSubmit = async () => {
    if (!claimedTitle && !isOtherSelected) {
      setIconColor("red");
      setAlertTitle("OPPS!");
      setErrorMessage("Please select a claimed title.");
      setVisible(true);

      return;
    }

    if (isOtherSelected && !otherClaimedTitle) {
      setIconColor("red");
      setAlertTitle("OPPS!");
      setErrorMessage("Please specify the other claimed title.");
      setVisible(true);

      return;
    }

    if (!description.trim()) {
      setIconColor("red");
      setAlertTitle("OPPS!");
      setErrorMessage("Description cannot be empty.");
      setVisible(true);

      return;
    }

    if (attachments.length === 0) {
      setIconColor("red");
      setAlertTitle("OPPS!");
      setErrorMessage("Please upload at least one attachment.");
      setVisible(true);

      return;
    }

    let formData = new FormData();

    if (isEdit) {
      formData.append("claimid", claimID);
    }
    formData.append("id", invoiceId);
    console.log("Attu", attachments);
    attachments.forEach((attachment, index) => {
      if (
        typeof attachment === "string" &&
        (attachment.startsWith("http") || attachment.startsWith("https"))
      ) {
        availableImages.push(attachment);
      } else {
        newImages.push({
          uri: attachment.uri,
          type: attachment.type || "image/jpeg",
          name: attachment.name || "file.jpg",
        });
      }
    });

    availableImages.forEach((image, index) => {
      formData.append(`availableImg[${index}]`, image);
    });

    newImages.forEach((newImage, index) => {
      formData.append(`document[${index}]`, newImage);
    });

    if (!isEdit) {
      formData.append(`availableImg[0]`, "");
    }

    formData.append("notes", description);
    console.log("Appending notes:", description); // Log the description

    formData.append("claim_type", isOtherSelected ? "Other" : claimedTitle);
    console.log(
      "Appending claim_type:",
      isOtherSelected ? "Other" : claimedTitle
    ); // Log claim_type

    formData.append(
      "other_claim_type",
      isOtherSelected ? otherClaimedTitle : ""
    );
    console.log(
      "Appending other_claim_type:",
      isOtherSelected ? otherClaimedTitle : ""
    );

    console.log("Final formData:", formData);

    let requestOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: await Preference.getValueFor(ExpoSecureKey.TOKEN),
      },
    };

    axiosCallAPI("post", ORDER_CLAIM, formData, requestOptions, true, "")
      .then((response) => {
        if (response && response.status) {
          // setshowAlert(true);
          // setIconColor("green");
          // setAlertTitle("");
          // setAlertMessage("THANK YOU \nFOR ACCEPTING");
          console.error(" response data:", response);
          onClose();
          navigatePending();
          if (!isEdit) {
            setAttachments("");
            setDescription("");
            setClaimedTitle("");
            setIsOtherSelected(false);
            setOtherClaimedTitle("");
            fetchOrderData();
          }
        } else {
          // setIconColor("red");
          // setshowAlert(true);
          // setAlertTitle("OPPS!");
          // setAlertMessage(response.message);

          onClose();
          if (!isEdit) {
            setAttachments("");
            setDescription("");
            setClaimedTitle("");
            setIsOtherSelected(false);
            setOtherClaimedTitle("");
            fetchOrderData();
          }

          console.error("Invalid response data:", response);
        }
      })

      .catch((error) => {
        // setIconColor("red");
        // setshowAlert(true);
        // setAlertTitle("OPPS!");
        // setAlertMessage(error);

        console.error("Error in Rejection Api:", error);

        onClose();
        if (!isEdit) {
          setAttachments("");
          setDescription("");
          setClaimedTitle("");
          setIsOtherSelected(false);
          setOtherClaimedTitle("");
        }
        fetchOrderData();
      });
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (result && result.length > 0) {
        const { uri, name, type } = result[0];

        setAttachments((prevAttachments) => [
          ...prevAttachments,
          { uri, name },
        ]);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log("User canceled the file picker.");
      } else {
        Alert.alert("Error", "Failed to upload file.");
      }
    }
  };

  const handleAttachmentDelete = (index) => {
    if (attachments.length === 1) {
      setIconColor("red");
      setAlertTitle("OPPS!");
      setErrorMessage("At least one attachment is required.");
      setVisible(true);
      // If there's only one attachment, show an alert

      return; // Prevent deletion
    }
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const closeModal = () => {
    onClose();
    if (!isEdit) {
      setAttachments("");
      setDescription("");
      setIsOtherSelected(false);
      setOtherClaimedTitle("");
      setClaimedTitle("");
    }
  };

  const handleImagePress = (imageUrl) => {
    if (
      typeof imageUrl === "string" &&
      (imageUrl.startsWith("http") || imageUrl.startsWith("https"))
    ) {
      // Open the URL if it's a valid HTTP/HTTPS link
      Linking.openURL(imageUrl);
    } else if (imageUrl && imageUrl.uri) {
      // Open the local image URI if it's not a URL
      Linking.openURL(imageUrl.uri);
    } else {
      // Handle the case where imageUrl is not a valid string or URI
      console.warn("Invalid image URL or URI.");
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
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
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.headerText}>
                {isEdit ? "Edit Of The Rejection" : "Reason Of Rejection"}
              </Text>

              <Text style={[styles.label, { marginTop: 40 }]}>
                Claimed Title
              </Text>

              <SelectDropdown
                data={[
                  "Material not received as per the invoice",
                  "Material received in damaged condition",
                  "Material received in wet condition",
                  "Material received of old manufacturing month",
                  "Marketing material not received as per the challan",
                  "Any feedback for the driver/transporter",
                  "Other",
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
                  if (selectedItem === "Other") {
                    setIsOtherSelected(true);
                  } else {
                    setClaimedTitle(selectedItem);
                    setIsOtherSelected(false);
                  }
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
                          claimedTitle ||
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
                value={claimedTitle || "Select the Claim Title"}
              />

              {isOtherSelected && (
                <View style={{ marginTop: 20 }}>
                  <TextInput
                    style={styles.inputField}
                    value={otherClaimedTitle}
                    onChangeText={setOtherClaimedTitle}
                    placeholder="Write Your Title"
                  />
                </View>
              )}

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
                <Text style={styles.charCount}>{description?.length}/100</Text>
              </View>

              <View style={{}}>
                <Text style={styles.label}>Attachments</Text>

                {/* List of attachments */}

                <View
                  style={{
                    flexDirection: "row",

                    gap: 10,
                  }}
                >
                  {attachments.length > 0 ? (
                    <FlatList
                      data={attachments}
                      renderItem={({ item, index }) => (
                        <View style={{ flexDirection: "row", gap: 10 }}>
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
                              flex: 1,
                              marginBottom: 10,
                            }}
                            key={index}
                          >
                            {/* Render the name of the file */}
                            <TouchableOpacity
                              onPress={() => handleImagePress(item)}
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={styles.attachmentPreview}>
                                {item.name || `Image ${index + 1}`}{" "}
                              </Text>
                            </TouchableOpacity>
                          </View>

                          <TouchableOpacity
                            style={styles.attachmentButton}
                            onPress={() => handleAttachmentDelete(index)}
                          >
                            <MaterialIcons
                              name="delete"
                              size={24}
                              color="red"
                            />
                          </TouchableOpacity>

                          {index === attachments.length - 1 && (
                            <TouchableOpacity
                              style={styles.attachmentButton}
                              onPress={handleFileUpload}
                            >
                              <Image
                                source={require("../../assets/add_dis.png")} // Your icon path
                                style={{
                                  width: 45,
                                  height: 45,
                                  resizeMode: "contain",
                                }}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={{ paddingBottom: 10 }}
                    />
                  ) : (
                    <TouchableOpacity
                      style={styles.attachmentButton}
                      onPress={handleFileUpload}
                    >
                      <Image
                        source={require("../../assets/add_dis.png")}
                        style={{
                          width: 45,
                          height: 45,
                          resizeMode: "contain",
                        }}
                        onLoad={() => {
                          console.log("Image Loaded");
                        }}
                        onError={(e) => {
                          console.error("Image loading error: ", e);
                        }}
                      />
                    </TouchableOpacity>
                  )}
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
                <TouchableOpacity onPress={handleSubmit}>
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
            </ScrollView>
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

  inputField: {
    maxHeight: 40,
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
    color: "#9E9E9E",
    fontSize: 12,
    fontFamily: font.GoldPlay_SemiBold,
    textAlign: "center",
    padding: 5,

    justifyContent: "center",
    alignItems: "center", // Allow the text to occupy full width
    // flexWrap: "nowrap", // Prevent wrapping
    // overflow: "hidden", // Prevent text overflow
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
