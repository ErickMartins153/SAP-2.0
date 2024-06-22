import * as Updates from "expo-updates";
import { useState } from "react";
import { Alert } from "react-native";

export default function useUpdates() {
  const [isChecking, setIsChecking] = useState(false);

  async function checkUpdate() {
    setIsChecking(true);
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        return true;
      }
    } catch (error) {
      Alert.alert(
        "Não foi possivel atualizar o aplicativo",
        "Por favor, tente novamente."
      );
    } finally {
      setIsChecking(false);
      return false;
    }
  }
  return { isChecking, checkUpdate };
}
