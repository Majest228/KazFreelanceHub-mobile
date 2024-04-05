import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Import Cookies if not already imported
// import Cookies from 'cookies-library'; // Replace with the actual library you are using for cookies

interface AuthProps {
  authState?: {
    accessToken: string | null;
    // refreshToken: string | null;
    authenticated: boolean | null;
  };
  onLogin?: (email: string, password: string) => Promise<any>;
  logout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<any>({
    accessToken: null,
    // refreshToken: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      // const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (accessToken) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;

        setAuthState({
          accessToken: accessToken,
          // refreshToken: refreshToken,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(
        "http://194.169.160.152/api/auth/login-mobile",
        {
          email: email,
          password: password,
        }
      );
      console.log("success");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + result.data.accessToken;

      await SecureStore.setItemAsync("accessToken", result.data.accessToken);
      // await SecureStore.setItemAsync("refreshToken", result.data.refreshToken);

      setAuthState({
        accessToken: result.data.accessToken,
        // refreshToken: result.data.refreshToken,
        authenticated: true,
      });

      return result;
    } catch (error) {
      return { error: true };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    // await SecureStore.deleteItemAsync("refreshToken");

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      accessToken: null,
      // refreshToken: null,
      authenticated: false,
    });
  };

  // axios.interceptors.response.use(
  //   (config) => {
  //     return config;
  //   },
  //   async (error) => {
  //     const originalRequest = error.config;
  //     const refreshToken = authState.refreshToken;

  //     if (error.response?.status === 401 && refreshToken) {
  //       try {
  //         const response = await axios.post(
  //           "http://194.169.160.152/api/auth/login/access-token",
  //           {
  //             refreshToken,
  //           }
  //         );

  //         axios.defaults.headers.common["Authorization"] =
  //           "Bearer " + response.data.accessToken;

  //         await SecureStore.setItemAsync(
  //           "accessToken",
  //           response.data.accessToken
  //         );
  //         await SecureStore.setItemAsync(
  //           "refreshToken",
  //           response.data.refreshToken
  //         );

  //         setAuthState({
  //           accessToken: response.data.accessToken,
  //           refreshToken: response.data.refreshToken,
  //           authenticated: true,
  //         });

  //         return axios(originalRequest);
  //       } catch (error) {
  //         console.error("Token refresh failed:", error);
  //         logout();
  //       }
  //     }

  //     return Promise.reject(error);
  //   }
  // );

  const value = { onLogin: login, authState: authState, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
