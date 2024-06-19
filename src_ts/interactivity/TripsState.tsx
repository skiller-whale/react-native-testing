import { createContext, useContext } from "react";
import type useCursor from "./hooks/useCursor";
import type { Trip } from "../../lib/trips.ts";

type Cursor = ReturnType<typeof useCursor<Trip>>;

const TripsContext = createContext<[Cursor[0], Cursor[1]]>([[], undefined]);

const SetTripsContext = createContext<[Cursor[2], Cursor[3]]>([() => {}, () => {}]);

export default TripsContext.Provider;

export const SetTripsProvider = SetTripsContext.Provider;

export const useTripsContext = () => useContext(TripsContext);

export const useSetTripsContext = () => useContext(SetTripsContext);
