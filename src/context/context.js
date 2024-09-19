import { createContext } from "react";

const context = createContext({
  userAuthenticated: () => {},
  deleteUser: () => {},
  loginUser: () => {},
  checkAuthenticated: () => {},
  getCompanyKey: () => {},
});

export default context;
