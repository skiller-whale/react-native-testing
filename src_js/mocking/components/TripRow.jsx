import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { colors, spacing, styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import {
  calculateDrivingLevel,
  calculateDrivingScore,
} from "../calculations.js";
import { DrivingLevelDisplay } from "../constants.js";

const TripRow = ({ trip, confirmTrip }) => {
  const [confirming, setConfirming] = useState(false);
  const confirm = async () => {
    setConfirming(true);
    await confirmTrip(trip.id);
    setConfirming(false);
  };

  const drivingScore = calculateDrivingScore(trip.distance, trip.incidents);
  const drivingLevel = calculateDrivingLevel(drivingScore);
  const { color } = DrivingLevelDisplay[drivingLevel];

  return (
    <View role="row">
      <View style={[styles.tableRow, tripRowStyles.firstRow]}>
        <Text role="cell" style={tripRowStyles.tableDateCell}>
          {trip.date}
        </Text>
        <Text role="cell" style={tripRowStyles.tableCell}>
          {trip.distance}
        </Text>
        <Text role="cell" style={tripRowStyles.tableCell}>
          {trip.incidents}
        </Text>
        <Text
          role="cell"
          style={[
            tripRowStyles.tableCell,
            tripRowStyles.drivingScoreCell,
            { color },
          ]}
        >
          {drivingScore}
        </Text>
      </View>
      <View style={[styles.tableRow, tripRowStyles.secondRow]}>
        <Pressable
          style={[
            tripRowStyles.button,
            trip.confirmed && tripRowStyles.buttonConfirmed,
          ]}
          role="button"
          aria-label={`Confirm trip ${trip.id}`}
          disabled={trip.confirmed}
          onPress={confirm}
        >
          <Text
            style={[
              tripRowStyles.buttonText,
              !trip.confirmed && tripRowStyles.buttonTextUnconfirmed,
            ]}
          >
            {trip.confirmed
              ? "Confirmed"
              : confirming
                ? "Confirming..."
                : "Confirm"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const tripRowStyles = StyleSheet.create({
  firstRow: {
    borderBottomWidth: 0,
  },
  secondRow: {
    padding: spacing.sm,
    justifyContent: "flex-end",
  },
  tableDateCell: {
    ...styles.tableCell,
    flex: 3,
  },
  tableCell: {
    ...styles.tableCell,
    flex: 2,
    textAlign: "right",
  },
  drivingScoreCell: {
    fontWeight: "700",
  },
  button: {
    backgroundColor: colors.oceanBlue,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    width: "100%",
  },
  buttonConfirmed: {
    backgroundColor: colors.turquoise,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonTextUnconfirmed: {
    color: colors.white,
  },
});

export default TripRow;
