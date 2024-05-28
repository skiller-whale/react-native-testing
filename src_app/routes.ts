import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import modules from "./modules.ts";
import { Trip } from "../lib/dummyApi.ts";

export type ModuleRoute =
  | "index"
  | `/${"js" | "ts"}/${(typeof modules)[number][0]}`
  | `/${"js" | "ts"}/${(typeof modules)[number][0]}/${string}`;

export type ModuleStackParamList = Record<ModuleRoute, { trips: Trip[] }>;

export type ModuleStackScreenProps<Route extends ModuleRoute> =
  NativeStackScreenProps<ModuleStackParamList, Route, "ModuleStack">;

export const mockModuleStackScreenProps = <Screen extends ModuleRoute>(
  name: Extract<Screen, string>,
  params: ModuleStackParamList[Screen]
): ModuleStackScreenProps<Screen> => ({
  navigation: {
    addListener: jest.fn(),
    canGoBack: jest.fn(),
    dispatch: jest.fn(),
    getId: jest.fn(),
    getParent: jest.fn(),
    getState: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    navigate: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    push: jest.fn(),
    removeListener: jest.fn(),
    replace: jest.fn(),
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
