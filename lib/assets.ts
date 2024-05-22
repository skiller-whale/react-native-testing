import type { ImageRequireSource } from "react-native";

export default {
  ada: require("../assets/ada.png") as ImageRequireSource,
  icon: require("../assets/icon.png") as ImageRequireSource,
  splash: require("../assets/splash.png") as ImageRequireSource,
} as const;
