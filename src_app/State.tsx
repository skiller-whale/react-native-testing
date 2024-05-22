import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NavigationState } from "@react-navigation/native";
import { createContext, type Dispatch } from "react";

export const storedStateKey = "state";

export type State = {
  navigationState?: NavigationState;
  typeScript: boolean;
};

export type Action =
  | { type: "set-state"; state: State }
  | { type: "set-navigation-state"; navigationState: NavigationState }
  | { type: "set-typescript"; typeScript: boolean };

export const initialState: State = {
  navigationState: undefined,
  typeScript: false,
};

export const StateContext = createContext<State>(initialState);

export const DispatchContext = createContext<Dispatch<Action>>(() => {});

export const updateAndStore = (state: State, action: Action): State => {
  const newState = update(state, action);
  AsyncStorage.setItem(storedStateKey, JSON.stringify(newState));
  return newState;
};

const update = (state: State, action: Action): State => {
  switch (action.type) {
    case "set-state":
      return action.state;
    case "set-navigation-state":
      return { ...state, navigationState: action.navigationState };
    case "set-typescript":
      return { ...state, typeScript: action.typeScript };
    default:
      return action satisfies never;
  }
};
