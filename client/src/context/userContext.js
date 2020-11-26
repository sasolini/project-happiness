import { createContext } from "react";

import authHeader from "../services/auth-header";

export const UserContext = createContext({
  authToken: authHeader().Authorization,
  setAuthToken: () => {},
});
