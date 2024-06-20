import Comentario from "@/interfaces/Comentario";
import { StyleSheet, View } from "react-native";
import StyledText from "../general/StyledText";

type CommentItemProps = {
  comentario: Comentario;
};

export default function CommentItem({ comentario }: CommentItemProps) {
  return (
    <View style={styles.mainContainer}>
      <StyledText>{comentario.conteudo}</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    padding: "2%",
    borderRadius: 4,
  },
});
