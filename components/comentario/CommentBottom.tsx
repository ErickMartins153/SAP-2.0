import { Alert, StyleSheet } from "react-native";

import Comentario from "@/interfaces/Comentario";

import CommentItem from "./CommentItem";
import CommentHeader from "./CommentHeader";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import StyledText from "../UI/StyledText";
import { useMutation } from "@tanstack/react-query";
import { addComentario } from "@/util/requests/comentarioHTTP";
import { queryClient } from "@/util/queries";
import useAuth from "@/hooks/useAuth";

type CommentBottomProps = {
  comentarios: Comentario[];
  postId: string;
};

export default function CommentBottom({
  comentarios,
  postId,
}: CommentBottomProps) {
  const { user } = useAuth();
  const { mutate: addComment } = useMutation({
    mutationFn: addComentario,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["comentarios", postId],
      });
      Alert.alert("Comentário publicado");
    },
  });

  function deleteCommentHandler() {
    queryClient.invalidateQueries({ queryKey: ["comentarios", postId] });
  }

  function renderComentarioHandler(comentario: Comentario) {
    return (
      <CommentItem
        comentario={comentario}
        key={comentario.id}
        onDelete={deleteCommentHandler}
      />
    );
  }

  function submitComentarioHandler(conteudo: string) {
    addComment({
      conteudo,
      idAutor: user!.id,
      idPost: postId,
    });
  }

  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <CommentHeader onComment={submitComentarioHandler} key={postId} />
      }
      ListEmptyComponent={
        <StyledText textAlign="center">
          Esse post ainda não possui nenhum comentário.
        </StyledText>
      }
      data={comentarios}
      renderItem={({ item }) => renderComentarioHandler(item)}
      keyExtractor={({ id }) => id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: "4%",
  },
});
