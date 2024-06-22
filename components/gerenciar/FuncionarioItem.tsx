import { Alert, Pressable, StyleSheet, View } from "react-native";
import StyledText from "../general/StyledText";
import UserAvatar from "../UI/UserAvatar";
import { Colors } from "@/constants/Colors";
import Funcionario from "@/interfaces/Funcionario";

type FuncionarioItemProps = {
  funcionario: Funcionario;
};

export default function FuncionarioItem({ funcionario }: FuncionarioItemProps) {
  function confirmHandler() {
    Alert.alert(
      "Você tem certeza?",
      `Uma vez deletado, ${funcionario.nome} ${funcionario.sobrenome} precisará ser registrado novamente`,
      [
        { text: "Cancelar", isPreferred: true },
        { text: "Confirmar", onPress: deleteHandler },
      ]
    );
  }

  function deleteHandler() {
    console.log("deletou funcionário");
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed]}
      android_ripple={{ color: Colors.lightRipple }}
      onPress={confirmHandler}
    >
      <UserAvatar size={64} />
      <View style={styles.mainContainer}>
        <StyledText mode="small" fontWeight="bold">
          {`${funcionario?.nome} ${funcionario.sobrenome}`}
        </StyledText>
        <StyledText style={styles.text}>{funcionario.email}</StyledText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    borderWidth: 2,
    padding: "2%",
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: "4%",
  },
  text: {
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  pressed: {
    opacity: 0.8,
  },
});
