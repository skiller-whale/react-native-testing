import { createContext, useContext } from "react";
import * as api from "../api.js";

const ApiContext = createContext(api);

export default ApiContext.Provider;

export const useApi = () => useContext(ApiContext);
