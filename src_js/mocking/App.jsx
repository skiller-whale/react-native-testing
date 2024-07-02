import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../../lib/styles.ts";
import { StyledText as Text } from "../../lib/typography.tsx";
import * as api from "./api.js";
import DrivingAssessment from "./components/DrivingAssessment.jsx";
import DrivingHistory from "./components/DrivingHistory.jsx";
import { TabID } from "./routes.js";
import TripsProvider, {
  SetTripsProvider,
  SyncTripsProvider,
} from "./context/TripsContext.jsx";

const Stack = createBottomTabNavigator();

const App = ({ route }) => {
  const [trips, setTrips] = useState(route.params.trips);
  const syncTrips = async () => {
    const trips = await api.fetchTrips();
    setTrips(trips);
  };

  return (
    <TripsProvider value={trips}>
      <SetTripsProvider value={setTrips}>
        <SyncTripsProvider value={syncTrips}>
          <NavigationContainer independent={true}>
            <Stack.Navigator
              id={TabID}
              initialRouteName="Driving Assessment"
              screenOptions={{
                headerTitle: (props) => (
                  <Text
                    role="heading"
                    style={{ color: colors.white, fontWeight: "600" }}
                  >
                    {props.children}
                  </Text>
                ),
                headerStyle: {
                  backgroundColor: colors.orcaBlue,
                },
                tabBarStyle: {
                  backgroundColor: colors.orcaBlue,
                },
                tabBarShowLabel: false,
                tabBarInactiveTintColor: colors.coralOrange,
                tabBarInactiveBackgroundColor: colors.lightGrey,
                tabBarActiveBackgroundColor: colors.orcaBlue,
                tabBarActiveTintColor: colors.white,
              }}
            >
              <Stack.Screen
                name="Driving Assessment"
                component={DrivingAssessment}
                options={{
                  tabBarAccessibilityLabel: "Driving assessment tab",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      color={color}
                      size={size}
                      name="car"
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="Driving History"
                component={DrivingHistory}
                options={{
                  tabBarAccessibilityLabel: "Driving history tab",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      color={color}
                      size={size}
                      name="car-clock"
                    />
                  ),
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SyncTripsProvider>
      </SetTripsProvider>
    </TripsProvider>
  );
};

export default App;
