import Comentario from "@/interfaces/Comentario";
import { StyleSheet, View } from "react-native";
import StyledText from "../general/StyledText";
import UserAvatar from "../UI/UserAvatar";
import { Colors } from "@/constants/Colors";
import { FUNCIONARIOS } from "@/interfaces/Funcionario";

type CommentItemProps = {
  comentario: Comentario;
};

export default function CommentItem({ comentario }: CommentItemProps) {
  const selectedUser = FUNCIONARIOS.find(
    (funcionario) => funcionario.id === comentario.idAutor
  );
  return (
    <View style={styles.rootContainer}>
      <UserAvatar size={64} />
      <View style={styles.mainContainer}>
        <StyledText mode="small" fontWeight="bold">
          {selectedUser?.nome}
        </StyledText>
        <StyledText style={styles.text}>{comentario.conteudo}</StyledText>
      </View>
    </View>
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
});
