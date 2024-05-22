import { Image, View } from "react-native";
import assets from "../lib/assets.ts";
import { colors } from "../lib/styles.ts";

const Splash = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.turquoise,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Image source={assets.icon} style={{ width: 100, height: 100 }} />
  </View>
);

export default Splash;
