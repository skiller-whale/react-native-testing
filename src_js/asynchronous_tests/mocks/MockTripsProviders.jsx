import { useState } from "react";
import TripsProvider, { SetTripsProvider } from "../TripsState.jsx";

const MockTripsProviders =
  (testTrips) =>
  ({ children }) => {
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
