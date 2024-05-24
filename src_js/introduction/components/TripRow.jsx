import { StyleSheet, View } from "react-native";
import { spacing, styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import {
  calculateDrivingLevel,
  calculateDrivingScore,
} from "../calculations.js";
import { DrivingLevelDisplay } from "../constants.js";

const TripRow = ({ index, item }) => {
  const { date, distance, incidents } = item;
  const drivingScore = calculateDrivingScore(distance, incidents);
  const drivingLevel = calculateDrivingLevel(drivingScore);
  const { color } = DrivingLevelDisplay[drivingLevel];

  // toggle this when instructed
  const newStyle = false;

  return (
    <View role="row" style={[styles.tableRow, newStyle ? {} : { backgroundColor: color }]}>
      <Text role="cell" style={styles.tableCell}>{index + 1}</Text>
      <Text role="cell" style={[styles.tableCell, styles.flex1]}>{date}</Text>
      <Text role="cell" style={[styles.tableCell, styles.flex1]}>{distance}</Text>
      <Text role="cell" style={[styles.tableCell, styles.flex1]}>{incidents}</Text>
      <Text role="cell" style={[styles.tableCell, styles.flex1]}>
        <Text
          role="cell"
          style={
            newStyle ? [tripRowStyles.badge, { backgroundColor: color }] : []
          }
        >
          {drivingScore}
        </Text>
      </Text>
    </View>
  );
};

const tripRowStyles = StyleSheet.create({
  badge: {
    padding: spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
});

export default TripRow;
