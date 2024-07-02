import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Trip } from "../../../lib/trips.ts";

const TripsContext = createContext<Trip[]>([]);

const SetTripsContext = createContext<Dispatch<SetStateAction<Trip[]>>>(() => {});

const SyncTripsContext = createContext<() => Promise<void>>(async () => {});

export default TripsContext.Provider;

export const SetTripsProvider = SetTripsContext.Provider;

export const SyncTripsProvider = SyncTripsContext.Provider;

export const useTrips = () => useContext(TripsContext);

export const useSetTrips = () => useContext(SetTripsContext);

export const useSyncTrips = () => useContext(SyncTripsContext);
