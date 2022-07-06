import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { userApi } from "../hooks/userApi";
import { api } from "../hooks/base_api";

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  signin: (login: string, password: string) => Promise<boolean>;
  register: (
    login: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    cpf: string
  ) => Promise<undefined | number>;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const apiUser = userApi();

  // useEffect(() => {
  //   teste();
  // });
  useEffect(() => {
    if (user === null || isAuthenticated === false) {
      processUser().then((response) => {
        console.log(response);
        if (response.status === 200) {
          setUserAndIsAuthenticatedAndToken(response.data.user, true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      });
    }
  }, [isAuthenticated, user]);

  const teste = async () => {
    const testeRes = await apiUser.teste();
    console.log(testeRes);
  };
  const processUser = async () => {
    const response: any = await apiUser.validateToken();

    return response;
  };

  const setUserAndIsAuthenticatedAndToken = (
    user: any,
    isAuthenticated: boolean
    // token: string,
    // tipo: string
  ) => {
    setUser(user);
    setIsAuthenticated(isAuthenticated);
  };

  const signin = async (login: string, password: string) => {
    const response: any = await apiUser.signin(login, password);

    console.log(response);
    if (response?.status === 200) {
      setUserAndIsAuthenticatedAndToken(response.data.user, true);
      return true;
    }
    return false;
  };

  const register = async (
    login: string,
    name: string,
    phone: string,
    email: string,
    cpf: string,
    password: string
  ) => {
    const user: User = { login, name, phone, email, cpf, password };
    const response = await apiUser.register(user);
    console.log(response);

    return response?.status;
  };

  const signout = async () => {
    await apiUser.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    signin,
    register,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
