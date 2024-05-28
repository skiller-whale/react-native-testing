import { FlatList, View } from "react-native";
import { styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import TripRow from "./TripRow.jsx";

const DrivingHistory = ({ trips }) => (
  <View style={styles.container}>
    <FlatList
      ListHeaderComponent={() => (
        <View accessible={true} style={styles.tableRow}>
          <Text role="columnheader" style={[styles.tableCell, styles.bold]}>
            #
          </Text>
          <Text style={[styles.tableCell, styles.bold, styles.flex1]}>
            Date
          </Text>
          <Text style={[styles.tableCell, styles.bold, styles.flex1]}>
            Distance
          </Text>
          <Text style={[styles.tableCell, styles.bold, styles.flex1]}>
            Incidents
          </Text>
          <Text style={[styles.tableCell, styles.bold, styles.flex1]}>
            Score
          </Text>
        </View>
      )}
      data={trips}
      renderItem={TripRow}
    />
  </View>
);

export default DrivingHistory;
