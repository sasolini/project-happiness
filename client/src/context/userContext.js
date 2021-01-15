import { createContext } from "react";

import authHeader from "../services/auth-header";

export const UserContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});
