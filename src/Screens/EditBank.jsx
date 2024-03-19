import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function EditBank() {
  const [accountName, setAccountName] = useState("Vura Bau-Chemie LLP");
  const [accountType, setAccountType] = useState("Saving");
  const [accountNumber, setAccountNumber] = useState("1234567890123456");
  const [ifscCode, setIfscCode] = useState("IFSC00001234");
  return (
    <View>
      <Text>EditBank</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
