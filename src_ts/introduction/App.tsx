import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fontSizes, spacing, styles } from "../../lib/styles.ts";
import { StyledText as Text } from "../../lib/typography.tsx";
import { ModuleStackScreenProps } from "../../src_app/routes.ts";
import DrivingAssessment from "./components/DrivingAssessment.tsx";
import DrivingHistory from "./components/DrivingHistory.tsx";

const App = ({ route }: ModuleStackScreenProps<"/ts/introduction">) => {
  const { trips } = route.params;

  const [tab, setTab] = useState<"assessment" | "history">("assessment");
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ ...styles.container, paddingBottom: bottom }}>
      <Text role="heading" aria-level={1} style={appStyles.headerTitle}>
        {tab === "assessment" ? "Overall Assessment" : "Your Trips"}
      </Text>
      <ScrollView style={styles.container}>
        {tab === "assessment" ? (
          <DrivingAssessment trips={trips} />
        ) : (
          <DrivingHistory trips={trips} />
        )}
      </ScrollView>
      <View style={appStyles.tabs}>
        <Pressable
          role="link"
          aria-label="Overall Assessment"
          style={[appStyles.tab, tab === "assessment" && appStyles.activeTab]}
          onPress={() => setTab("assessment")}
        >
          <MaterialCommunityIcons
            name="car"
            size={32}
            color={tab === "assessment" ? colors.white : colors.coralOrange}
          />
        </Pressable>
        <Pressable
          role="link"
          aria-label="Your Trips"
          style={[appStyles.tab, tab === "history" && appStyles.activeTab]}
          onPress={() => setTab("history")}
        >
          <MaterialCommunityIcons
            name="car-clock"
            size={32}
            color={tab === "history" ? colors.white : colors.coralOrange}
          />
        </Pressable>
      </View>
    </View>
  );
};

const appStyles = StyleSheet.create({
  headerTitle: {
    backgroundColor: colors.orcaBlue,
    padding: spacing.md,
    color: colors.white,
    fontSize: fontSizes.lg,
    ...styles.bold,
  },
  tabs: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: spacing.sm,
    backgroundColor: colors.lightGrey,
    color: colors.coralOrange,
  },
  activeTab: {
    backgroundColor: colors.orcaBlue,
    color: colors.white,
  },
});

export default App;
