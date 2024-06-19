import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export const TabID = "Tab";

export type TabScreen = "Driving Assessment" | "Driving History";

export type TabScreenParams = {
  "Driving Assessment": undefined;
  "Driving History": undefined;
};

export type TabScreenProps<Route extends TabScreen = "Driving Assessment"> =
  BottomTabScreenProps<TabScreenParams, Route, typeof TabID>;
