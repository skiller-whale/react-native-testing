import { Pressable, StyleSheet, View } from "react-native";
import { colors, styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import {
  calculateDrivingLevel,
  calculateDrivingScore,
} from "../calculations.js";
import { DrivingLevelDisplay } from "../constants.js";

const TripRow = ({ trip, selected, selectTrip }) => {
  const drivingScore = calculateDrivingScore(trip.distance, trip.incidents);
  const drivingLevel = calculateDrivingLevel(drivingScore);
  const { color } = DrivingLevelDisplay[drivingLevel];

  return (
    <View role="row">
      <Pressable
        role="button"
        aria-label={`Select trip ${trip.id}`}
        aria-selected={selected}
        onPress={() => selectTrip(trip)}
        style={[styles.tableRow, selected ? tripRowStyles.selected : {}]}
      >
        <Text role="cell" style={tripRowStyles.tableDateCell}>
          {trip.date}
        </Text>
        <Text
          role="cell"
          style={tripRowStyles.tableCell}
          testID={`distance-${trip.id}`}
        >
          {trip.distance}
        </Text>
        <Text
          role="cell"
          style={tripRowStyles.tableCell}
          testID={`incidents-${trip.id}`}
        >
          {trip.incidents}
        </Text>
        <Text
          role="cell"
          style={[tripRowStyles.tableCell, drivingScoreStyle(color)]}
        >
          {drivingScore}
        </Text>
      </Pressable>
    </View>
  );
};

const tripRowStyles = StyleSheet.create({
  tableDateCell: {
    ...styles.tableCell,
    flex: 3,
  },
  tableCell: {
    ...styles.tableCell,
    flex: 2,
    textAlign: "right",
  },
  selected: {
    backgroundColor: colors.midGrey,
  },
});

const drivingScoreStyle = (color) =>
  ({
    color,
    fontWeight: "700",
  });

export default TripRow;
