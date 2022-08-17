import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/UserType";
import { UserApi } from "../hooks/userApi";
import { api } from "../hooks/base_api";

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: boolean;
  processUser: () => Promise<any>;
  signin: (login: string, password: string) => Promise<boolean>;
  register: (
    login: string,
    name: string,
    email: string,
    password: string,
    phone: string,
    cpf: string
  ) => Promise<any>;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [auxUserAndIsAuthenticated, setAuxUserAndIsAuthenticated] = useState<
    any[]
  >([]);
  const apiUser = UserApi();

  useEffect(() => {
    if (user === null || isAuthenticated === false) {
      processUser().then((response) => {
        if (response.status === 200) {
          setAuxUserAndIsAuthenticated([response.data.user, true]);
        } else {
          setAuxUserAndIsAuthenticated([null, false]);
        }
      });
    }
  }, [trigger, setTrigger]);

  useEffect(() => {
    if (
      auxUserAndIsAuthenticated.length > 0 &&
      auxUserAndIsAuthenticated[0] !== null
    ) {
      setUserAndIsAuthenticatedAndToken(
        auxUserAndIsAuthenticated[0],
        auxUserAndIsAuthenticated[1]
      );
    }
  }, [auxUserAndIsAuthenticated]);

  // const teste = async () => {
  //   const testeRes = await apiUser.teste();
  // };

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
    const response: any = await apiUser.register(user);

    return response;
  };

  const signout = async () => {
    const tst = await apiUser.logout();
    console.log(tst);
    console.log("CHAMADO É PELO MENSO");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    signin,
    setTrigger,
    processUser,
    trigger,
    register,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
