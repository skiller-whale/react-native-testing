import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { colors, fontSizes, spacing, styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import { calculateDrivingAssessment } from "../calculations.js";
import { DrivingLevelDisplay } from "../constants.js";
import { useTrips, useSyncTrips } from "../context/TripsContext.jsx";

const DrivingAssessment = () => {
  const trips = useTrips();
  const syncTrips = useSyncTrips();
  const {
    drivingScore,
    drivingLevel,
    tripsCount,
    incidentsCount,
    totalDistance,
  } = calculateDrivingAssessment(trips);
  const { summary, color } = DrivingLevelDisplay[drivingLevel];

  const [syncing, setSyncing] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setSyncing(true);
      await syncTrips();
      setSyncing(false);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        role="heading"
        style={{ ...drivingAssessmentStyles.header, backgroundColor: color }}
      >
        <Text>Driving Level:</Text>
        {syncing ? (
          <ActivityIndicator
            aria-label="syncing"
            size={fontSizes.lg}
            color={colors.oceanBlue}
          />
        ) : (
          <Text>{drivingLevel}</Text>
        )}
      </View>
      <View style={[drivingAssessmentStyles.body, syncing && { opacity: 0.5 }]}>
        <Text>{summary}</Text>
        <View role="table" style={drivingAssessmentStyles.table}>
          <View role="row" style={drivingAssessmentStyles.tableRow}>
            <Text
              role="rowheader"
              style={drivingAssessmentStyles.tableHeaderCell}
            >
              Total Trips
            </Text>
            <Text role="cell" style={drivingAssessmentStyles.tableCell}>
              {tripsCount}
            </Text>
          </View>
          <View role="row" style={drivingAssessmentStyles.tableRow}>
            <Text
              role="rowheader"
              style={drivingAssessmentStyles.tableHeaderCell}
            >
              Total Distance
            </Text>
            <Text role="cell" style={drivingAssessmentStyles.tableCell}>
              {totalDistance} miles
            </Text>
          </View>
          <View role="row" style={drivingAssessmentStyles.tableRow}>
            <Text
              role="rowheader"
              style={drivingAssessmentStyles.tableHeaderCell}
            >
              Number of Incidents
            </Text>
            <Text role="cell" style={drivingAssessmentStyles.tableCell}>
              {incidentsCount}
            </Text>
          </View>
          <View role="row" style={drivingAssessmentStyles.tableRow}>
            <Text
              role="rowheader"
              style={drivingAssessmentStyles.tableHeaderCell}
            >
              Score
            </Text>
            <Text role="cell" style={drivingAssessmentStyles.tableCell}>
              {drivingScore}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const drivingAssessmentStyles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md,
  },
  body: {
    gap: spacing.md,
    padding: spacing.md,
  },
  table: {},
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.midGrey,
  },
  tableHeaderCell: {
    flex: 1,
    padding: spacing.sm,
    fontWeight: "600",
  },
  tableCell: {
    flex: 1,
    padding: spacing.sm,
    textAlign: "right",
  },
});

export default DrivingAssessment;
