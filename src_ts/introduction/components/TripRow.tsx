import { View, type ListRenderItemInfo } from "react-native";
import type { Trip } from "../../../lib/dummyApi.ts";
import { styles } from "../../../lib/styles.ts";
import { StyledText as Text } from "../../../lib/typography.tsx";
import {
  calculateDrivingLevel,
  calculateDrivingScore,
} from "../calculations.ts";
import { DrivingLevelDisplay } from "../constants.ts";

const TripRow = ({ index, item }: ListRenderItemInfo<Trip>) => {
  const { date, distance, incidents } = item;
  const drivingScore = calculateDrivingScore(distance, incidents);
  const drivingLevel = calculateDrivingLevel(drivingScore);
  const { color } = DrivingLevelDisplay[drivingLevel];

  // toggle this when instructed
  const newStyle = false;

  return (
    <View
      role="row"
      style={[styles.tableRow, newStyle ? {} : { backgroundColor: color }]}
    >
      <Text role="cell" style={styles.tableCell}>
        {index + 1}
      </Text>
      <Text role="cell" style={[styles.tableCell, styles.flex1]}>
        {date}
      </Text>
      <Text role="cell" style={[styles.tableCell, styles.flex1]}>
        {distance}
      </Text>
      <Text role="cell" style={[styles.tableCell, styles.flex1]}>
        {incidents}
      </Text>
      <Text role="cell" style={[styles.tableCell, styles.flex1]}>
        <Text role="cell" style={newStyle ? { color } : {}}>
          {drivingScore}
        </Text>
      </Text>
    </View>
  );
};

export default TripRow;
