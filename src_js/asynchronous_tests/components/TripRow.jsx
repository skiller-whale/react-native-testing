import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { colors, spacing, styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import { useSetTripsContext } from "../TripsState.jsx";
import * as api from "../api.js";
import {
  calculateDrivingLevel,
  calculateDrivingScore,
} from "../calculations.js";
import { DrivingLevelDisplay } from "../constants.js";

const TripRow = ({ item }) => {
  const [setTrips] = useSetTripsContext();
  const [confirming, setConfirming] = useState(false);
  const confirmTrip = async () => {
    setConfirming(true);
    const modifiedTrip = await api.confirmTrip(item.id);
    setConfirming(false);
    setTrips((trips) =>
      trips.map((trip) => (trip.id === item.id ? modifiedTrip : trip))
    );
  };

  const drivingScore = calculateDrivingScore(item.distance, item.incidents);
  const drivingLevel = calculateDrivingLevel(drivingScore);
  const { color } = DrivingLevelDisplay[drivingLevel];

  return (
    <View role="row">
      <View style={[styles.tableRow, tripRowStyles.firstRow]}>
        <Text role="cell" style={tripRowStyles.tableDateCell}>
          {item.date}
        </Text>
        <Text role="cell" style={tripRowStyles.tableCell}>
          {item.distance}
        </Text>
        <Text role="cell" style={tripRowStyles.tableCell}>
          {item.incidents}
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
            item.confirmed && tripRowStyles.buttonConfirmed,
          ]}
          role="button"
          aria-label={`Confirm trip ${item.id}`}
          disabled={item.confirmed}
          onPress={confirmTrip}
        >
          <Text
            style={[
              tripRowStyles.buttonText,
              !item.confirmed && tripRowStyles.buttonTextUnconfirmed,
            ]}
          >
            {item.confirmed
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
