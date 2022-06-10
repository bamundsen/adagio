import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { useApi, api } from "../hooks/useApi";
import axios from "axios";

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signin: (login: string, password: string) => Promise<boolean>;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const apiUse = useApi();

  // useEffect(() => {
  //   (async () => {
  //     axios
  //       .get("http://localhost:8092/verifiyIfIsAuthenticatedAndReturn", {
  //         headers: {
  //           accessToken: localStorage.getItem("accessToken") || "",
  //         },
  //       })
  //       .then((response) => {
  //         console.log(
  //           "response: ",
  //           response.data.userData,
  //           localStorage.getItem("accessToken")
  //         );

  //         if (response) {
  //           // userDataAux.current = response.data.userData;
  //           setUser(response.data.userData);
  //           setIsAuthenticated(true);
  //         }
  //       })
  //       .catch((erro) => {
  //         console.log("erro: ", erro, localStorage.getItem("accessToken"));
  //       });
  //   })();
  // }, []);

  useEffect(() => {
    if (user === null) processUser();
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const signin = async (login: string, password: string) => {
    const data = await apiUse.signin(login, password);

    if (data.data.user && data.data.token) {
      setUser(data.data.user);
      setIsAuthenticated(true);
      localStorage.setItem("accessToken", data.data.token);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.data.token}`;
      return true;
    }
    return false;
  };

  const processUser = () => {
    axios
      .get("http://localhost:8092/verifiyIfIsAuthenticatedAndReturn", {
        headers: {
          accessToken: localStorage.getItem("accessToken") || "",
        },
      })
      .then((response) => {
        if (response) {
          setUser(response.data.userData);
          setIsAuthenticated(true);
        }
      })
      .catch((erro) => {
        // console.log("erro: ", erro, localStorage.getItem("accessToken"));
      });
  };

  const signout = async () => {
    localStorage.setItem("accessToken", "");
    // await apiUse.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
