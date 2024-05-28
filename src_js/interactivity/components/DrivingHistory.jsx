import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { colors, fontSizes, spacing, styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import TripRow from "./TripRow.jsx";
import { useTripsContext, useSetTripsContext } from "../TripsState.jsx";

const DrivingHistory = () => {
  const [trips, selectedTrip] = useTripsContext();
  const [_selectTrip, updateSelectedTrip] = useSetTripsContext();
  const selectTrip = (trip) => {
    _selectTrip(trip);
    setDistance(trip.distance.toString());
    setIncidents(trip.incidents.toString());
  };

  const [distance, setDistance] = useState(
    selectedTrip?.distance.toString() ?? ""
  );
  const updateDistance = ({ nativeEvent }) => {
    const distance = parseInt(nativeEvent.text);
    if (selectedTrip && distance > 0) {
      updateSelectedTrip({ ...selectedTrip, distance });
      setDistance(distance.toString());
    } else {
      setDistance(selectedTrip?.distance.toString() ?? "");
    }
  };

  const [incidents, setIncidents] = useState(
    selectedTrip?.incidents.toString() ?? ""
  );
  const updateIncidents = ({ nativeEvent }) => {
    const incidents = parseInt(nativeEvent.text);
    if (selectedTrip && incidents >= 0) {
      updateSelectedTrip({ ...selectedTrip, incidents });
      setIncidents(incidents.toString());
    } else {
      setIncidents(selectedTrip?.incidents.toString() ?? "");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={drivingHistoryStyles.container}
    >
      <FlatList
        scrollEnabled={false}
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
          <TripRow
            trip={item}
            selected={item === selectedTrip}
            selectTrip={selectTrip}
          />
        )}
      />
      <View style={drivingHistoryStyles.form}>
        <Text style={drivingHistoryStyles.formHeading}>
          Selected Trip {selectedTrip ? `: ${selectedTrip.date}` : null}
        </Text>
        {selectedTrip ? (
          <>
            <View style={drivingHistoryStyles.formField}>
              <Text nativeID="distance" style={drivingHistoryStyles.label}>
                Distance
              </Text>
              <TextInput
                aria-labelledby="distance"
                keyboardType="number-pad"
                aria-valuemin={1}
                style={drivingHistoryStyles.input}
                value={selectedTrip.distance.toString()}
                selectTextOnFocus
                onChange={updateDistance}
              />
            </View>
            <View style={drivingHistoryStyles.formField}>
              <Text nativeID="incidents" style={drivingHistoryStyles.label}>
                Incidents
              </Text>
              <TextInput
                aria-labelledby="incidents"
                keyboardType="number-pad"
                aria-valuemin={0}
                style={drivingHistoryStyles.input}
                value={selectedTrip.incidents.toString()}
                selectTextOnFocus
                onChange={updateIncidents}
              />
            </View>
          </>
        ) : (
          <Text>
            Select a trip to edit the distance or number of incidents.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const drivingHistoryStyles = StyleSheet.create({
  container: {
    gap: spacing.md,
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
  form: {
    padding: spacing.md,
    gap: spacing.md,
  },
  formHeading: {
    fontSize: fontSizes.md,
    ...styles.bold,
  },
  formField: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
    flex: 1,
  },
  label: {
    flex: 1,
    ...styles.bold,
  },
  input: {
    borderColor: colors.midGrey,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    width: 60,
    textAlign: "right",
  },
});

export default DrivingHistory;
