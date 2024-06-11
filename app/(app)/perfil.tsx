import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import UserAvatar from "@/components/UI/UserAvatar";
import Button from "@/components/general/Button";
import StyledText from "@/components/general/StyledText";

export default function ProfileScreen() {
  function handleEdit() {
    alert("Em breve!");
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.userContainer}>
          <UserAvatar size={144} />
          <StyledText fontWeight="bold" textTransform="capitalize">
            Usuário
          </StyledText>
          <StyledText>(Ele/Dele)</StyledText>
          <View style={styles.buttonsContainer}>
            <Button style={styles.button} onPress={() => {}}>
              Dados pessoais
            </Button>
            <Button style={styles.button} onPress={() => {}}>
              Segurança e Privacidade
            </Button>
            <Button style={styles.button} onPress={() => {}}>
              Estatísticas
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    marginTop: 100,
  },
  userContainer: {
    alignItems: "center",
  },
  userText: {
    fontWeight: "bold",
    marginTop: 16,
  },
  buttonsContainer: {
    height: "54%",
    justifyContent: "space-evenly",
  },
  button: {
    paddingHorizontal: "18%",
    paddingVertical: "6%",
    alignItems: "center",
  },
});
