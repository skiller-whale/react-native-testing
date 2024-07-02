import { FlatList, StyleSheet, View } from "react-native";
import { spacing, styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import TripRow from "../components/TripRow.jsx";
import * as api from "../api.js";
import { useApi } from "../context/ApiContext.jsx";
import { useTrips, useSetTrips } from "../context/TripsContext.jsx";

const DrivingHistory = () => {
  const trips = useTrips();
  const setTrips = useSetTrips();

  const confirmTrip = async (tripId) => {
    const modifiedTrip = await api.confirmTrip(tripId);
    setTrips((trips) =>
      trips.map((trip) => (trip.id === tripId ? modifiedTrip : trip))
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View accessible={true} style={styles.tableRow}>
            <Text style={drivingHistoryStyles.tableDateCell}>Date</Text>
            <Text style={drivingHistoryStyles.tableCell}>Distance</Text>
            <Text style={drivingHistoryStyles.tableCell}>Incidents</Text>
            <Text style={drivingHistoryStyles.tableCell}>Score</Text>
          </View>
        )}
        data={trips}
        renderItem={({ item }) => (
          <TripRow trip={item} confirmTrip={confirmTrip} />
        )}
      />
    </View>
  );
};

const drivingHistoryStyles = StyleSheet.create({
  container: {
    padding: spacing.md,
    gap: spacing.md,
    alignItems: "center",
  },
  tableDateCell: {
    ...styles.tableCell,
    ...styles.bold,
    flex: 3,
  },
  tableCell: {
    ...styles.tableCell,
    ...styles.bold,
    flex: 2,
    textAlign: "right",
  },
});

export default DrivingHistory;
