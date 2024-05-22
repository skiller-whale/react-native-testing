import { ScrollView, StyleSheet, View } from "react-native";
import { colors, spacing, styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import { calculateDrivingAssessment } from "../calculations.ts";
import { DrivingLevelDisplay } from "../constants.ts";
import type { BaseTabScreenProps } from "../routes.ts";

const DrivingAssessment = ({ route }: BaseTabScreenProps<"DrivingAssessment">) => {
  const { trips } = route.params;
  const {
    drivingScore,
    drivingLevel,
    tripsCount,
    incidentsCount,
    totalDistance,
  } = calculateDrivingAssessment(trips);
  const { summary, color } = DrivingLevelDisplay[drivingLevel];

  return (
    <ScrollView style={styles.container}>
      <View role="heading" style={{ ...drivingAssessmentStyles.header, backgroundColor: color }}>
        <Text>Driving Level:</Text>
        <Text>{drivingLevel}</Text>
      </View>
      <View style={drivingAssessmentStyles.body}>
        <Text>{summary}</Text>
        <View role="table" style={drivingAssessmentStyles.table}>
          <View role="row" style={drivingAssessmentStyles.tableRow}>
            <Text role="rowheader" style={drivingAssessmentStyles.tableHeaderCell}>
              Total Trips
            </Text>
            <Text role="cell" style={drivingAssessmentStyles.tableCell}>{tripsCount}</Text>
          </View>
          <View role="row" style={drivingAssessmentStyles.tableRow}>
            <Text role="rowheader" style={drivingAssessmentStyles.tableHeaderCell}>
              Total Distance
            </Text>
            <Text role="cell" style={drivingAssessmentStyles.tableCell}>{totalDistance} miles</Text>
          </View>
          <View role="row" style={drivingAssessmentStyles.tableRow}>
            <Text role="rowheader" style={drivingAssessmentStyles.tableHeaderCell}>
              Number of Incidents
            </Text>
            <Text role="cell" style={drivingAssessmentStyles.tableCell}>{incidentsCount}</Text>
          </View>
          <View role="row" style={drivingAssessmentStyles.tableRow}>
            <Text role="rowheader" style={drivingAssessmentStyles.tableHeaderCell}>
              Score
            </Text>
            <Text role="cell" style={drivingAssessmentStyles.tableCell}>{drivingScore}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const drivingAssessmentStyles = StyleSheet.create({
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
