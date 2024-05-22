import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import modules from "./modules.ts";

export type ModuleRoute =
  | "index"
  | `/${"js" | "ts"}/${(typeof modules)[number][0]}`
  | `/${"js" | "ts"}/${(typeof modules)[number][0]}/${string}`;

export type ModuleStackParamList = Record<ModuleRoute, undefined>;

export type ModuleStackScreenProps<Route extends ModuleRoute> =
  NativeStackScreenProps<ModuleStackParamList, Route, "ModuleStack">;
