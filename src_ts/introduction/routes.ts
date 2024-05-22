import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { Trip } from "../../lib/dummyApi.ts";

export const BaseTabID = "BaseTab";

export type BaseTabScreen = "DrivingAssessment" | "DrivingHistory";

export type BaseTabScreenParams = {
  DrivingAssessment: { trips: Trip[] };
  DrivingHistory: { trips: Trip[] };
};

export type BaseTabScreenProps<
  Route extends BaseTabScreen = "DrivingAssessment",
> = BottomTabScreenProps<BaseTabScreenParams, Route, typeof BaseTabID>;

export const mockBaseTabScreenProps = <Screen extends BaseTabScreen>(
  name: Extract<Screen, string>,
  params: BaseTabScreenParams[Screen],
): BaseTabScreenProps<Screen> => ({
  navigation: {
    addListener: jest.fn(),
    canGoBack: jest.fn(),
    dispatch: jest.fn(),
    getId: jest.fn(),
    getParent: jest.fn(),
    getState: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    jumpTo: jest.fn(),
    navigate: jest.fn(),
    removeListener: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    setParams: jest.fn(),
  },
  route: {
    key: "",
    name,
    params,
  },
});
