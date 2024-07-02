import { useState } from "react";
import mockApi from "../mocks/mockApi.js";
import ApiProvider from "../context/ApiContext.jsx";
import TripsProvider, { SetTripsProvider } from "../context/TripsContext.jsx";

export default (testTrips) => ({ children }) => {
    const [trips, setTrips] = useState(testTrips);
  
    return (
      <TripsProvider value={trips}>
        <SetTripsProvider value={setTrips}>
          {children}
        </SetTripsProvider>
      </TripsProvider>
    );
  };
  