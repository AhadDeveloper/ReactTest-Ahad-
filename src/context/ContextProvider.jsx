import context from "./context";

const ContextProvider = (props) => {
  const userAuthenticated = () => {
    localStorage.setItem("userAccess", JSON.stringify(true));
  };

  const deleteUser = () => {
    localStorage.removeItem("userAccess");
    localStorage.removeItem("login");
  };

  const loginUser = (obj) => {
    localStorage.setItem("login", JSON.stringify(obj));
  };

  const checkAuthenticated = () => {
    return JSON.parse(localStorage.getItem("userAccess"));
  };

  const getCompanyKey = () => {
    return JSON.parse(localStorage.getItem("login"))?.id;
  };

  const value = {
    userAuthenticated,
    deleteUser,
    loginUser,
    checkAuthenticated,
    getCompanyKey,
  };

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export default ContextProvider;
