import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { useAsyncEffect } from "use-async-effect";
import fetch, { type Trip } from "../../lib/dummyApi.ts";
import { colors } from "../../lib/styles.ts";
import { StyledText as Text } from "../../lib/typography.tsx";
import DrivingAssessment from "./components/DrivingAssessment.tsx";
import DrivingHistory from "./components/DrivingHistory.tsx";
import { BaseTabID, type BaseTabScreenParams } from "./routes.ts";

const Tab = createBottomTabNavigator<BaseTabScreenParams>();

const App = () => {
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);

  useAsyncEffect(async () => {
    const response = await fetch("https://dummyapi.skillerwhale/trips");
    const { data: trips } = await response.json();
    setLoadingTrips(false);
    setTrips(trips);
  }, []);

  return loadingTrips ? (
    <Text>Loading...</Text>
  ) : (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        id={BaseTabID}
        initialRouteName="DrivingAssessment"
        screenOptions={{
          headerStyle: { backgroundColor: colors.orcaBlue },
          headerTintColor: colors.white,
          tabBarInactiveBackgroundColor: colors.lightGrey,
          tabBarInactiveTintColor: colors.coralOrange,
          tabBarActiveBackgroundColor: colors.orcaBlue,
          tabBarActiveTintColor: colors.white,
        }}
      >
        <Tab.Screen
          name="DrivingAssessment"
          component={DrivingAssessment}
          initialParams={{ trips }}
          options={{
            title: "Assessment",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="car" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="DrivingHistory"
          component={DrivingHistory}
          initialParams={{ trips }}
          options={{
            title: "Your Trips",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="car-clock"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
