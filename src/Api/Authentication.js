import * as Preference from "../StoreData/Preference";

export default requestHeader = async (FormData, Content_Type_Only) => {
  let requestHeader;

  if (FormData) {
    requestHeader = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };
  } else if (Content_Type_Only) {
    requestHeader = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  } else {
    requestHeader = {
      headers: {
        Accept: "application/json",
        Authorization: await Preference.GetData(PreferenceKeys.TOKEN),
      },
    };
  }
  console.log(requestHeader);
  return requestHeader;
};
