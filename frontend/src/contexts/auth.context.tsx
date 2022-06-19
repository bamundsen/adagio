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
    token: string,
    tipo: string
  ) => {
    setUser(user);
    setIsAuthenticated(isAuthenticated);
    localStorage.setItem("accessToken", token);
    api.defaults.headers.common["Authorization"] = `${tipo} ${token}`;
  };

  const signin = async (login: string, password: string) => {
    const data = await apiUser.signin(login, password);

    if (data.user && data.token && data.tipo) {
      setUserAndIsAuthenticatedAndToken(data.user, true, data.token, data.tipo);
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

  const processUser = async () => {
    const data = await apiUser.validateToken(
      localStorage.getItem("accessToken")
    );

    console.log(data);
    if (data.user && data.token && data.tipo) {
      setUserAndIsAuthenticatedAndToken(data.user, true, data.token, data.tipo);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const signout = async () => {
    localStorage.setItem("accessToken", "");
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
