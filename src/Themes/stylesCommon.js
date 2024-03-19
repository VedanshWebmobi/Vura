import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { colors, font } from "../constants";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export default StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
  },

  statusBar: {
    color: colors.YELLOW,
    //flex: 1,
    backgroundColor: colors.YELLOW,
  },

  loaderViewStyle: { flex: 1, justifyContent: "center", alignItems: "center" },

  bgImageContainer: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  yellowbg: {
    flex: 1,
    backgroundColor: colors.YELLOW,
  },

  blackbg: {
    flex: queueMicrotask,
    backgroundColor: "black",
  },

  whitebg: {
    flex: 1,
    backgroundColor: "white",
  },
  blackbg: {
    flex: 1,
    backgroundColor: "black",
  },
  logoViewStyle: {
    height: 150,
    alignItems: "center",
  },
  logoStyle: {
    marginTop: 10,
    width: 105,
    height: 51,
  },

  welcomeText: {
    fontFamily: font.GoldPlay_SemiBold,
    fontSize: 18,
  },
  otpText: {
    fontFamily: font.INTER,
    fontSize: 18,
    marginLeft: 20,
  },

  numberText: {
    fontFamily: font.INTER_SEMIBOLD,
    fontSize: 18,
    marginLeft: 20,
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginTop: 5,
    borderRadius: 4,
    backgroundColor: colors.YELLOW,
  },

  buttonLabelStyle: { fontFamily: font.INTER_SEMIBOLD, fontSize: 16 },

  inputStyle: {
    backgroundColor: "#ffffff",
    margin: 20,
  },
  editInputs: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },

  profileView: {
    gap: 2,
    flex: 1,
  },

  profileCardView: {
    margin: 15,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 3,
  },
  lineStyle: {
    height: 1,
    backgroundColor: colors.LINE_GREY,
    margin: 15,
  },
  profileText: {
    fontFamily: font.INTER_MEDIUM,
    fontSize: 10,
    color: colors.GREY_400,
  },

  profileSubText: {
    fontFamily: font.INTER_MEDIUM,
    fontSize: 15,
  },

  preLoginContainerView: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },

  preLoginButtonStyle: {
    borderRadius: 15,
    borderColor: "#ffffff",
    width: 180,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#000000",
    alignItems: "center",
  },

  preButtonLabelStyle: {
    fontFamily: font.GoldPlay_SemiBold,
    color: "#ffffff",
  },

  homeTextView: {
    borderColor: colors.YELLOW,
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  homeText: {
    fontFamily: font.GoldPlay_SemiBold,
    fontSize: 10,
    color: colors.YELLOW,
    textAlign: "center",
  },

  homeImage: {
    width: 80,
    height: 80,
  },
  homeItemView: {
    gap: 10,
    // backgroundColor: "red",
    alignItems: "center",
  },
});
