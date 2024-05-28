import { createContext, useContext } from "react";

const TripsContext = createContext([[], undefined]);

const SetTripsContext = createContext([() => {}, () => {}]);

export default TripsContext.Provider;

export const SetTripsProvider = SetTripsContext.Provider;

export const useTripsContext = () => useContext(TripsContext);

export const useSetTripsContext = () => useContext(SetTripsContext);
