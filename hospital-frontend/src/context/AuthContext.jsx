import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("hospital_user");
    const storedToken = localStorage.getItem("hospital_auth_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      const { user: loggedInUser, token } = response.data;

      localStorage.setItem("hospital_auth_token", token);
      localStorage.setItem("hospital_user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("hospital_auth_token");
    localStorage.removeItem("hospital_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
