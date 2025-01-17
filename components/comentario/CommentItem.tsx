import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";

import Comentario from "@/interfaces/Comentario";
import StyledText from "../UI/StyledText";
import UserAvatar from "../UI/UserAvatar";
import { Colors } from "@/constants/Colors";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import { deleteComentario } from "@/util/requests/comentarioHTTP";
import { queryClient } from "@/util/queries";
import { memo } from "react";
import useAuth from "@/hooks/useAuth";

type CommentItemProps = {
  comentario: Comentario;
  onDelete: () => void;
};

const CommentItem = ({ comentario, onDelete }: CommentItemProps) => {
  const { user, token } = useAuth();
  const {
    data: selectedFuncionario,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!comentario?.idAutor,
    queryKey: ["funcionarios", comentario?.idAutor],
    queryFn: () => getFuncionarioById(comentario?.idAutor!, token!),
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteComentario,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comentarios", comentario.idPost],
      });
      Alert.alert("Comentário deletado com sucesso!");
      onDelete();
    },
  });

  function confirmDeleteHandler() {
    if (user!.cargo === "TECNICO") {
      Alert.alert(
        "Tem certeza?",
        "Você tem certeza que deseja remover este comentário?",
        [
          { text: "Cancelar" },
          {
            text: "Confirmar",
            onPress: () =>
              deleteComment({ comentarioId: comentario.id!, token: token! }),
          },
        ]
      );
    }
  }

  return (
    <Pressable
      style={styles.rootContainer}
      onLongPress={confirmDeleteHandler}
      delayLongPress={200}
      android_ripple={{ color: Colors.lightRipple }}
    >
      <UserAvatar size={64} imageURL={selectedFuncionario?.urlImagem} />
      <View style={styles.mainContainer}>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <StyledText size="small" fontWeight="bold" textTransform="capitalize">
            {selectedFuncionario?.nome}
          </StyledText>
          {/* <StyledText>
            {comentario.dataPublicacao.toLocaleDateString()}
          </StyledText> */}
        </View>
        <StyledText style={styles.text}>{comentario.conteudo}</StyledText>
      </View>
    </Pressable>
  );
};

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
    marginBottom: "2%",
  },
});

export default memo(CommentItem);
