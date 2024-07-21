import Funcionario, { Token } from "@/interfaces/Funcionario";
import { Credentials, authenticateUser } from "@/util/requests/authHTTP";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

interface AuthContextType {
  user: Funcionario | null;
  tokenObj: Token | null;
  token: string | null;
  login: (credentials: Credentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  login: (credentials: Credentials) => {},
  logout: () => {},
  user: null,
  tokenObj: null,
  token: null,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userData, setUserData] = useState<Funcionario | null>(null);
  const [token, setToken] = useState<Token | null>(null);

  const { mutate: onLogin } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (user) => {
      if (user) {
        setUserData(user.funcionario);
        setToken(user.token);
        SecureStore.setItemAsync("token", user.token.token);
      }
    },
    onError: (e) => {
      Alert.alert(e.cause as string, e.message);
    },
  });

  function login(credentials: Credentials) {
    onLogin(credentials);
  }

  function logout() {
    setUserData(null);
    setToken(null);
  }

  const value = {
    user: userData,
    tokenObj: token,
    token: token?.token!,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
