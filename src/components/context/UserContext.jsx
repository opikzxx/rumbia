import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setAuthedUser(loggedInUser);
    }
  }, []);

  const handleLogin = (user) => {
    setAuthedUser(user);
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setAuthedUser(null);
    sessionStorage.removeItem("loggedInUser");
  };

  return (
    <UserContext.Provider value={{ authedUser, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
    