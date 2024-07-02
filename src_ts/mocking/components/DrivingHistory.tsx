import { FlatList, StyleSheet, View } from "react-native";
import { spacing, styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import TripRow from "../components/TripRow.tsx";
import * as api from "../api.ts";
import { useApi } from "../context/ApiContext.tsx";
import { useTrips, useSetTrips } from "../context/TripsContext.tsx";

const DrivingHistory = () => {
  const trips = useTrips();
  const setTrips = useSetTrips();

  const confirmTrip = async (tripId: string) => {
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
