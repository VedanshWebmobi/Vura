import { View, Text } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as Utils from "./Utils";
import * as Preference from "../StoreData/Preference";
import { Alert } from "react-native";
import { StackActions, CommonActions } from "@react-navigation/native";
import { ExpoSecureKey } from "../constants";
import CommonAlert from "../common/CommonAlert";

export const axiosCallAPI = (
  method,
  endpoint,
  params,
  headerRequest,
  isShowMessage,
  navigation
) => {
  let errors;
  const client = axios.create({
    withCredentials: true,
    responseType: "json",
    timeout: 30000,
  });

  if (method === "post") {
    console.log("yeh bhe raha huin axiox ander", params);
    return client
      .post(endpoint, params, headerRequest)
      .then((response) => {
        // console.log("Bhai yeh hai dekhle ab", response.data);
        if (response.data.status) {
          if (response.data.message !== "") {
            if (isShowMessage)
              // showMessage(
              //   `${response.data.message}`,
              //   "Success ",
              //   ALERT_TYPE.SUCCESS
              // );
              console.log(response.message);
            return response.data;
          }
        } else {
          // errors = response.data;
          // Object.keys(errors).map(function (key, index) {
          //   showMessage(`${errors[key]}`, "Error");
          // });
          return response.data;
        }
      })
      .catch((error) => {
        console.log("====================================");
        console.log("error inside axios");
        console.log("====================================");
        var newError = error;
        ERROR_HANDLER(newError, errors);
        if (typeof error.response.data.errors === "string") {
          throw error.response.data.errors;
        } else if (Array.isArray(error.response.data.errors)) {
          console.log("is Array");
          throw error.response.data.errors.join(", ");
        } else {
          console.log("is Object");
          console.log(Object.values(error.response.data.errors).join(", "));
          throw Object.values(error.response.data.errors).join(", ");
        }

        // throw error.response.data.errors;
      });
  } else if (method === "get") {
    if (params) {
      return axios
        .get(endpoint, params, headerRequest)
        .then((response) => {
          console.log("Get Method response => ", JSON.stringify(response.data));
          if (response.data.status) {
            if (response.data.message !== "") {
              if (isShowMessage)
                //showMessage(`${response.data.message}`, "Success ");
                console.log(response.data.message);
            }
            return response.data.data;
          } else {
            console.log(response.message);
            //showMessage(response.data.message, 'error');
            errors = response.data.errors;

            return errors;
          }
        })
        .catch((error) => {
          // console.log(error);
          var newError = error;
          ERROR_HANDLER(newError, errors);
          if (typeof error.response.data.errors === "string") {
            throw error.response.data.errors;
          } else if (Array.isArray(error.response.data.errors)) {
            throw error.response.data.errors.join(", ");
          } else {
            throw Object.values(error).join(", ");
          }
          //return error.response.data.errors;
        });
    } else {
      return axios
        .get(endpoint, headerRequest)
        .then((response) => {
          //  console.log("response status in axiox call", response.data.message);
          //  console.log("response data in axiox call", response.data);
          //  console.log("response data.data in axiox call", response.data.data);
          if (response.data.status) {
            if (response.data.message !== "") {
              if (isShowMessage)
                // showMessage(
                //   `${response.data.message}`,
                //   "Success ",
                //   ALERT_TYPE.SUCCESS
                // );
                console.log(response.data.message);
            }
            return response.data.data;
          } else {
            errors = response.data.errors;
            // Object.keys(errors).map(function (key, index) {
            //   if (errors[key].length() > 0) {
            //     showMessage(`${errors[key]}`, "error");
            //   }
            // });
            return errors;
          }
        })
        .catch((error) => {
          var newError = error;
          ERROR_HANDLER(newError, errors);
          if (typeof error.response.data.errors === "string") {
            throw error.response.data.errors;
          } else if (Array.isArray(error.response.data.errors)) {
            throw error.response.data.errors.join(", ");
          } else {
            throw Object.values(error).join(", ");
          }
          //return error.response.data;
        });
    }
  }

  function ERROR_HANDLER(error, errors) {
    // console.log("Error aareaya hai bhai", error.response);

    if (error.response.status === 400) {
      // error = error.response.data.errors;
      // console.log("====================================");
      // console.log(error, "sfsfs", errors);
      // console.log("====================================");
      // Object.keys(errors).map(function (key, index) {
      //   // showMessage(`${(errors[key], "error")}`);
      // });
      // if (error.response.data.message) {
      //   //showMessage(error.response.data.message, "error");
      // }
    } else if (error.response.status === 404) {
      //showMessage("API request not found", "error");
    } else if (error.response.status === 401) {
      console.log("Error Handler => " + error.response.status);
      //showMessage(error.message.status);
      Preference.save(ExpoSecureKey.IS_LOGIN, "false").then(() => {
        Preference.deleteItem(ExpoSecureKey.TOKEN).then(() => {
          navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: "PreLogin" }] })
            //  StackActions.replace("PreLogin", { position: 0 })
          );
        });
      });
    } else {
      //showMessage(error.message, "error");
    }
  }
};

// const showMessage = (message, title, type) => {
//   Dialog.show({
//     type: type,
//     title: title,
//     textBody: message,
//     button: "close",
//   });

//   <CommonAlert
//     visible={showAlert} // Pass visibility state to the CommonAlert component
//     hideModal={() => setShowAlert(false)} // Pass function to hide the modal
//     handleOkPress={handleClose} // Pass function to handle Ok button press
//     handleCancelPress={() => setShowAlert(false)} // Pass function to handle Cancel button press
//     title="Close Registeration?" // Pass title text
//     iconName="error"
//     bodyText="Are you Sure You want to Exit" // Pass body text
//     cancelButton={true} // Pass whether Cancel button should be displayed
//   />;
// };
