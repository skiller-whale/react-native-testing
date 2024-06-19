import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { colors } from "../../lib/styles.ts";
import type { Trip } from "../../lib/trips.ts";
import { StyledText as Text } from "../../lib/typography.tsx";
import TripsProvider, { SetTripsProvider } from "./TripsState.tsx";
import * as api from "./api.ts";
import DrivingAssessment from "./components/DrivingAssessment.tsx";
import DrivingHistory from "./components/DrivingHistory.tsx";
import { TabID, type TabScreenParams } from "./routes.ts";

const Stack = createBottomTabNavigator<TabScreenParams>();

const App = () => {
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);
  const loadTrips = async () => {
    setLoadingTrips(true);
    const trips = await api.fetchTrips();
    setLoadingTrips(false);
    setTrips(trips);
  };
  const resetTrips = async () => {
    setLoadingTrips(true);
    const trips = await api.resetTrips();
    setLoadingTrips(false);
    setTrips(trips);
  };
  useEffect(() => {
    loadTrips();
  }, []);

  return (
    <TripsProvider value={[loadingTrips, trips]}>
      <SetTripsProvider value={[setTrips, resetTrips]}>
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
      </SetTripsProvider>
    </TripsProvider>
  );
};

export default App;
