import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, fontSizes, spacing, styles } from "../../lib/styles.ts";
import { StyledText as Text } from "../../lib/typography.tsx";
import DrivingAssessment from "./components/DrivingAssessment.jsx";
import DrivingHistory from "./components/DrivingHistory.jsx";
import useCursor from "./hooks/useCursor.js";
import TripsProvider, { SetTripsProvider } from "./TripsState.jsx";

const App = ({ route }) => {
  const { trips: initialTrips } = route.params;
  const [trips, selectedTrip, selectTrip, updateSelectedTrip] =
    useCursor(initialTrips);

  const [tab, setTab] = useState("assessment");

  return (
    <TripsProvider value={[trips, selectedTrip]}>
      <SetTripsProvider value={[selectTrip, updateSelectedTrip]}>
        <View style={styles.container}>
          <Text role="heading" aria-level={1} style={appStyles.headerTitle}>
            {tab === "assessment" ? "Overall Assessment" : "Your Trips"}
          </Text>
          <ScrollView style={styles.container}>
            {tab === "assessment" ? <DrivingAssessment /> : <DrivingHistory />}
          </ScrollView>
          <View style={appStyles.tabs}>
            <Pressable
              role="link"
              aria-label="Overall Assessment"
              style={[
                appStyles.tab,
                tab === "assessment" && appStyles.activeTab,
              ]}
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
      </SetTripsProvider>
    </TripsProvider>
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
