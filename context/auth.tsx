import Funcionario from "@/interfaces/Funcionario";
import { Credentials, authenticateUser } from "@/util/requests/authHTTP";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useState } from "react";

interface AuthContextType {
  user: Funcionario | null;
  login: (credentials: Credentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  login: (credentials: Credentials) => {},
  logout: () => {},
  user: null,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<Funcionario | null>(null);
  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (user) => {
      setUser(user);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  function login(credentials: Credentials) {
    mutate(credentials);
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
