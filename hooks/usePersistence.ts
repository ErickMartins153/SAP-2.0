import { useEffect, useState } from "react";

import * as SecureStore from "expo-secure-store";
import useAuth from "./useAuth";

async function fetchToken() {
  return await SecureStore.getItemAsync("token");
}

export default function usePersistence() {
  const [token, setToken] = useState<string | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    async function getToken() {
      const storedToken = await fetchToken();
      setToken(storedToken);
    }

    getToken();
  }, []);

  useEffect(() => {
    if (token === null) return;
    if (!token) {
      logout();
    }
  }, [token]);

  return token;
}
