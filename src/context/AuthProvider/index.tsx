import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { getUserLocalStorage, LoginRequest, RegisterRequest, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage()

    if (user) {
      setUser(user)
    }
  }, [])

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);

    console.log(response)

    const payload = { token: response.token, email };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  async function registrate(fistName: string, lastName: string, email: string, password: string){
    const response = await RegisterRequest(fistName, lastName, email, password)

    if(response && response.error) 
      return response

    const payload = { token: response.token, email }

    setUser(payload)
    setUserLocalStorage(payload)

    return payload
  }

  async function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, registrate, logout }}>
      {children}
    </AuthContext.Provider>
  )
};