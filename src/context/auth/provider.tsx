"use client";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import AuthContext from "./context";
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  const setAdmin = (value: boolean) => {
    console.log(value, "valuevaluevaluevalue");
    setIsAdmin(value);
  };

  const context = useMemo(() => {
    return {
      isAdmin,
      setAdmin,
    };
  }, [isAdmin, setAdmin]);

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
