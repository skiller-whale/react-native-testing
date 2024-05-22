import { FlatList, View } from "react-native";
import { styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import TripRow from "./TripRow.tsx";
import type { BaseTabScreenProps } from "../routes.ts";

const DrivingHistory = ({ route }: BaseTabScreenProps<"DrivingHistory">) => {
  const { trips } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        accessible={true}
        role="table"
        ListHeaderComponent={() => (
          <View accessible={true} role="row" style={styles.tableRow}>
            <Text role="columnheader" style={[styles.tableCell, styles.bold]}>
              #
            </Text>
            <Text
              role="columnheader"
              style={[styles.tableCell, styles.bold, styles.flex1]}
            >
              Date
            </Text>
            <Text
              role="columnheader"
              style={[styles.tableCell, styles.bold, styles.flex1]}
            >
              Distance
            </Text>
            <Text
              role="columnheader"
              style={[styles.tableCell, styles.bold, styles.flex1]}
            >
              Incidents
            </Text>
            <Text
              role="columnheader"
              style={[styles.tableCell, styles.bold, styles.flex1]}
            >
              Score
            </Text>
          </View>
        )}
        data={trips}
        renderItem={TripRow}
      />
    </View>
  );
};

export default DrivingHistory;
