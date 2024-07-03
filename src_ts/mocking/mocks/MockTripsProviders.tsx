import { useState, type PropsWithChildren } from "react";
import type { Trip } from "../../../lib/trips.ts";
import mockApi from "./mockApi.ts";
import ApiProvider from "../context/ApiContext.tsx";
import TripsProvider, { SetTripsProvider } from "../context/TripsContext.tsx";

export default (testTrips: Trip[]) => ({ children }: PropsWithChildren) => {
    const [trips, setTrips] = useState(testTrips);
  
    return (
      <TripsProvider value={trips}>
        <SetTripsProvider value={setTrips}>
          {children}
        </SetTripsProvider>
      </TripsProvider>
    );
  };
  