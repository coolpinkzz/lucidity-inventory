"use client";
import { createContext, useContext } from "react";

interface AuthContextState {
  isAdmin: boolean;
  setAdmin: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextState>({
  isAdmin: true,
  setAdmin: () => undefined,
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
