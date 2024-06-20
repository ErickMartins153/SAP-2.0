import { ReactNode, createContext, useState } from "react";

interface AuthContextType {
  user: User | null;
  login: (id: string) => void;
  logout: () => void;
}

interface User {
  id: string;
}

export const AuthContext = createContext<AuthContextType>({
  login: (id: string) => {},
  logout: () => {},
  user: null,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  function login(id: string) {
    setUser({ id });
  }
  function logout() {
    setUser(null);
  }

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
