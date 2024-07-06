import * as Updates from "expo-updates";
import { useState } from "react";
import { Alert } from "react-native";

export default function useUpdates() {
  const [isChecking, setIsChecking] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  async function checkUpdate() {
    setIsChecking(true);
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setUpdateAvailable(true);
        await Updates.fetchUpdateAsync();

        Alert.alert(
          "Uma atualização foi encontrada",
          "Para aplicar a atualização, o aplicativo será reiniciado.",
          [
            {
              text: "Confirmar",
              onPress: triggerReload,
            },
          ]
        );
        return true;
      }

      async function triggerReload() {
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsChecking(false);
      return false;
    }
  }

  return { isChecking, updateAvailable, checkUpdate };
}
