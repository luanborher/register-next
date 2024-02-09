/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ILoginResponse {
  user: User;
  jwt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface IAuthContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  signOut: () => void;
  isAuthenticated: boolean;
}

interface ChildrenProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localStorageUser = localStorage.getItem('@register:user');

    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }

    setLoading(false);
  }, []);

  const isAuthenticated = !!user?.id;

  const signOut = () => {
    localStorage.removeItem('@register:user');
    localStorage.removeItem('@register:accessToken');
    localStorage.removeItem('@register:refreshToken');
    setUser({} as User);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signOut, isAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
