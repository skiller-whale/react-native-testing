import { useState, type PropsWithChildren } from "react";
import type { Trip } from "../../../lib/trips.ts";
import TripsProvider, { SetTripsProvider } from "../TripsState.tsx";

const MockTripsProviders =
  (testTrips: Trip[]) =>
  ({ children }: PropsWithChildren) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [trips, setTrips] = useState(testTrips);
    const resetTrips = jest.fn();

    return (
      <TripsProvider value={[false, trips]}>
        <SetTripsProvider value={[setTrips, resetTrips]}>
          {children}
        </SetTripsProvider>
      </TripsProvider>
    );
  };

export default MockTripsProviders;
