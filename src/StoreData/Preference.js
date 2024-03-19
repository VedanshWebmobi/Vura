import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

export async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("🔐 Here's your value 🔐 \n" + result);
  } else {
    console.log("No values stored under that key.");
  }
  return result;
}

export async function deleteItem(key) {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`Value for key '${key}' deleted`);
  } catch (error) {
    console.error(`Error deleting item: ${error}`);
  }
}

export async function storePreference(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`Preference '${key}' stored`);
  } catch (error) {
    console.error(`Error storing preference: ${error}`);
  }
}

export async function getPreference(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error retrieving preference: ${error}`);
    return null;
  }
}

export async function removePreference(key) {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Preference '${key}' removed`);
  } catch (error) {
    console.error(`Error removing preference: ${error}`);
  }
}

// Clear all preferences (use with caution)
export async function clearPreferences() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    console.log("Preferences cleared successfully!");
  } catch (error) {
    console.error("Error clearing preferences:", error);
  }
}

// export async function storeImage(uri, filename) {
//   try {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const { uri: fileUri } = await FileSystem.writeAsync(
//       FileSystem.documentDirectory,
//       filename,
//       blob
//     );
//     return fileUri;
//   } catch (error) {
//     console.error(`Error storing image: ${error}`);
//     return null;
//   }
// }

// export async function retrieveImage(filename) {
//   try {
//     const { exists } = await FileSystem.getInfoAsync(
//       FileSystem.documentDirectory + filename
//     );
//     if (exists) {
//       return FileSystem.documentDirectory + filename;
//     }
//     return null;
//   } catch (error) {
//     console.error(`Error retrieving image: ${error}`);
//     return null;
//   }
// }
