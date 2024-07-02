import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { colors } from "../../lib/styles.ts";
import { StyledText as Text } from "../../lib/typography.tsx";
import { ModuleStackScreenProps } from "../../src_app/routes.ts";
import * as api from "./api.ts";
import DrivingAssessment from "./components/DrivingAssessment.tsx";
import DrivingHistory from "./components/DrivingHistory.tsx";
import { TabID, type TabScreenParams } from "./routes.ts";
import TripsProvider, {
  SetTripsProvider,
  SyncTripsProvider,
} from "./context/TripsContext.tsx";

const Stack = createBottomTabNavigator<TabScreenParams>();

const App = ({ route }: ModuleStackScreenProps<"/ts/mocking">) => {
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
