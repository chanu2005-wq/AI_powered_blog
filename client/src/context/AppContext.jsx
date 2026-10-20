import { useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "./app-context.jsx";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

axios.defaults.baseURL = API_BASE_URL;

export const AppContextProvider = ({ children }) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const [input, setInput] = useState("");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
    setToken("");
  };

  const value = {
    axios,
    backendUrl,
    token,
    setToken,
    logout,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};