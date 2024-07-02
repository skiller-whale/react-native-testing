import {
  createContext,
  useContext,
} from "react";

const TripsContext = createContext([]);

const SetTripsContext = createContext(() => {});

const SyncTripsContext = createContext(async () => {});

export default TripsContext.Provider;

export const SetTripsProvider = SetTripsContext.Provider;

export const SyncTripsProvider = SyncTripsContext.Provider;

export const useTrips = () => useContext(TripsContext);

export const useSetTrips = () => useContext(SetTripsContext);

export const useSyncTrips = () => useContext(SyncTripsContext);
