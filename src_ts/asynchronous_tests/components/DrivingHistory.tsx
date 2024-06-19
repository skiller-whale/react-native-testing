import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { colors, fontSizes, spacing, styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import { useTripsContext } from "../TripsState.tsx";
import TripRow from "./TripRow.tsx";

const DrivingHistory = () => {
  const [loadingTrips, trips] = useTripsContext();

  return loadingTrips ? (
    <View style={[styles.container, drivingHistoryStyles.container]}>
      <ActivityIndicator size={fontSizes.lg} color={colors.oceanBlue} />
      <Text>Loading...</Text>
    </View>
  ) : (
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
        renderItem={(props) => <TripRow {...props} />}
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
