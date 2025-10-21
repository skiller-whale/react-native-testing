import "@expo/metro-runtime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useReducer, useState } from "react";
import { Image, View } from "react-native";
import "react-native-gesture-handler";
import useAsyncEffect from "./lib/useAsyncEffect.ts";
import assets from "./lib/assets.ts";
import { colors } from "./lib/styles.ts";
import { StyledText as Text } from "./lib/typography.tsx";
import Index from "./src_app/Index.tsx";
import Splash from "./src_app/Splash.tsx";
import {
  DispatchContext,
  StateContext,
  initialState,
  storedStateKey,
  updateAndStore,
} from "./src_app/State.tsx";
import type { ModuleStackParamList } from "./src_app/routes.ts";
import { server } from "./lib/dummyServer.ts";
import type { Trip } from "./lib/trips.ts";

// JS modules
import AsynchronousTestsJS from "./src_js/asynchronous_tests/App.jsx";
import EndToEndTestsJS from "./src_js/end_to_end_tests/App.jsx";
import InteractivityJS from "./src_js/interactivity/App.jsx";
import IntroductionJS from "./src_js/introduction/App.jsx";
import MockingJS from "./src_js/mocking/App.jsx";

// TS modules
import AsynchronousTestsTS from "./src_ts/asynchronous_tests/App.tsx";
import EndToEndTestsTS from "./src_ts/end_to_end_tests/App.tsx";
import InteractivityTS from "./src_ts/interactivity/App.tsx";
import IntroductionTS from "./src_ts/introduction/App.tsx";
import MockingTS from "./src_ts/mocking/App.tsx";

server.listen();

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<ModuleStackParamList>();

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [state, dispatch] = useReducer(updateAndStore, initialState);
  const [trips, setTrips] = useState<Trip[]>([]);
  useAsyncEffect(async () => {
    const storedState = await AsyncStorage.getItem(storedStateKey);
    if (storedState) {
      dispatch({ type: "set-state", state: JSON.parse(storedState) });
    }
    const response = await fetch("https://dummyapi.skillerwhale/trips");
    const { trips } = await response.json();
    setTrips(trips);
    setIsReady(true);
    await SplashScreen.hideAsync();
  }, []);

  const [fontsLoaded] = useFonts({
    Exo: require("./assets/fonts/Exo2.ttf"),
    "Exo-Italic": require("./assets/fonts/Exo2-Italic.ttf"),
    Alegreya: require("./assets/fonts/Alegreya.ttf"),
    "Alegreya-Italic": require("./assets/fonts/Alegreya-Italic.ttf"),
  });

  return isReady && fontsLoaded ? (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <NavigationContainer
          initialState={state.navigationState}
          onStateChange={(navigationState) => {
            if (navigationState) {
              dispatch({ type: "set-navigation-state", navigationState });
            }
          }}
        >
          <Stack.Navigator
            id="ModuleStack"
            initialRouteName="index"
            screenOptions={({ route }) => ({
              headerStyle: { backgroundColor: colors.turquoise },
              headerTintColor: colors.orcaBlue,
              headerTitle: () => (
                <Text size="lg">
                  {route.name.split("/").slice(0, 3).join("/")}
                </Text>
              ),
              headerRight: () => (
                <View style={{ paddingRight: 16 }}>
                  <Image
                    source={assets.ada}
                    style={{ width: 30, height: 30 }}
                  />
                </View>
              ),
            })}
          >
            <Stack.Screen
              name="index"
              component={Index}
              options={{
                headerLeft: () => (
                  <View style={{ paddingHorizontal: 16 }}>
                    <Image
                      source={assets.icon}
                      style={{ width: 40, height: 40 }}
                    />
                  </View>
                ),
                headerRight: () => undefined,
                headerTitle: () => <Text size="lg">React Native Coaching</Text>,
              }}
            />
            <Stack.Screen
              name="/js/introduction"
              component={IntroductionJS}
              initialParams={{ trips }}
            />
            <Stack.Screen
              name="/js/interactivity"
              component={InteractivityJS}
              initialParams={{ trips }}
            />
            <Stack.Screen
              name="/js/asynchronous_tests"
              component={AsynchronousTestsJS}
              initialParams={{ trips }}
            />
            <Stack.Screen
              name="/js/mocking"
              component={MockingJS}
              initialParams={{ trips }}
            />
            <Stack.Screen
              name="/js/end_to_end_tests"
              component={EndToEndTestsJS}
              initialParams={{ trips }}
            />
            <Stack.Screen
              name="/ts/introduction"
              component={IntroductionTS}
              initialParams={{ trips }}
            />
            <Stack.Screen
              name="/ts/interactivity"
              component={InteractivityTS}
              initialParams={{ trips }}
            />
            <Stack.Screen
              name="/ts/asynchronous_tests"
              component={AsynchronousTestsTS}
              initialParams={{ trips }}
            />
            <Stack.Screen
              name="/ts/mocking"
              component={MockingTS}
              initialParams={{ trips }}
            />
            <Stack.Screen
              name="/ts/end_to_end_tests"
              component={EndToEndTestsTS}
              initialParams={{ trips }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DispatchContext.Provider>
    </StateContext.Provider>
  ) : (
    <Splash />
  );
};

export default App;
