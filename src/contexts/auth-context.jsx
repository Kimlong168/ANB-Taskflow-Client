import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import axiosClient from "@/api/axiosClient";
import { notify } from "@/utils/toastify";
const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = useCallback(async (credentials, onSuccess) => {
    try {
      setIsLoading(true);
      if (!credentials.email || !credentials.password) {
        setIsLoading(false);
        return notify("Please fill in all information", "error");
      }

      if (credentials.confirmPassword !== credentials.password) {
        setIsLoading(false);
        return notify("Passwords do not match!", "error");
      }

      const formData = new FormData();
      formData.append("name", credentials.name);
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("image", credentials.image);

      const response = await axiosClient.post("/auth/register", formData);

      setIsLoading(false);

      const { status, data } = response.data;

      if (status === "success") {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        setUser(data.user);
        notify("Register Successfully!");
        onSuccess();
      } else {
        notify(response.data?.error.message || "Register Fail!", "error");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Register error:", error.response?.data);
    }
  }, []);

  const handleLogin = useCallback(async (credentials, onSuccess) => {
    try {
      setIsLoading(true);
      if (!credentials.email || !credentials.password) {
        setIsLoading(false);
        return notify("Please fill in all information", "error");
      }

      const response = await axiosClient.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      setIsLoading(false);

      const { status, data } = response.data;

      if (status === "success") {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
        setUser(data.user);
        notify("Login Successfully!");
        onSuccess();
      } else {
        notify(response.data?.error.message || "Login Fail!", "error");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Login error:", error.response?.data);
    }
  }, []);

  const handleLogout = useCallback(async (onSuccess) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axiosClient.post("/auth/logout", { ...user });

      if (response.data.status === "success") {
        setUser(null);
        notify("Logout Sucessfully!", "success");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        onSuccess();
      } else {
        notify("Logout Fail!", "error");
      }
    } catch (error) {
      console.log("Logout error:", error.response?.data);
    }
  }, []);

  const handleRefreshToken = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    const tokenType = "Bearer";

    if (refreshToken) {
      try {
        const response = await axios.post(
          `${API_URL}/auth/refresh-token`,
          { username: user?.username },
          {
            headers: {
              Authorization: `${tokenType} ${refreshToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const { status, data } = response.data;

        if (status === "success") {
          localStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(data.refreshToken)
          );
        } else {
          throw new Error("Error refreshing token: " + response.data?.message);
        }
      } catch (error) {
        if (error.response?.data?.status === "error") {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          notify("Token expired, please login again", "info");
          window.location.href = "/login";
        }
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      notify("Token expired, please login again", "info");
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        handleRefreshToken();
      }, 30 * 60 * 1000); // refresh every 30 minutes

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // refresh token on first load
  useEffect(() => {
    if (user) {
      handleRefreshToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleRegister,
        handleLogin,
        isLoading,
        handleLogout,
        handleRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
