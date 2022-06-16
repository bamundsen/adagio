import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { userApi, api } from "../hooks/api";

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

  const apiUser = userApi();

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

  const setUserAndIsAuthenticatedAndToken = (
    user: any,
    isAuthenticated: boolean,
    token: string
  ) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("accessToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const signin = async (login: string, password: string) => {
    const data = await apiUser.signin(login, password);

    if (data.user && data.token) {
      setUserAndIsAuthenticatedAndToken(data.user, true, data.token);
      return true;
    }
    return false;
  };

  const processUser = async () => {
    const data = await apiUser.validateToken(
      localStorage.getItem("accessToken")
    );

    console.log(data);
    if (data.user && data.token) {
      setUserAndIsAuthenticatedAndToken(data.user, true, data.token);
    } else {
    }
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
