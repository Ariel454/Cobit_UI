import React, { useState, createContext, ReactNode } from "react";

interface AuthContextType {
  auth: {
    token: string;
    auth: boolean;
  };
  guardarAuth: React.Dispatch<
    React.SetStateAction<{ token: string; auth: boolean }>
  >;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, guardarAuth] = useState({ token: "", auth: false });

  return (
    <AuthContext.Provider value={{ auth, guardarAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export { AuthContextProvider, useAuth };
