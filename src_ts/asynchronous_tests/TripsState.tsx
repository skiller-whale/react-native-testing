import {
  createContext,
  useContext,
  type Dispatch,
  type DispatchWithoutAction,
  type SetStateAction,
} from "react";
import type { Trip } from "../../lib/trips.ts";

const TripsContext = createContext<[boolean, Trip[]]>([true, []]);

const SetTripsContext = createContext<
  [Dispatch<SetStateAction<Trip[]>>, DispatchWithoutAction]
>([() => {}, () => {}]);

export default TripsContext.Provider;

export const SetTripsProvider = SetTripsContext.Provider;

export const useTripsContext = () => useContext(TripsContext);

export const useSetTripsContext = () => useContext(SetTripsContext);
