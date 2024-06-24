import { StyleSheet } from "react-native";

import Comentario, { newComentario } from "@/interfaces/Comentario";

import CommentItem from "./CommentItem";
import CommentHeader from "./CommentHeader";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import StyledText from "../general/StyledText";
import { useMutation } from "@tanstack/react-query";
import { addComentario } from "@/util/requests/comentarioHTTP";
import { queryClient } from "@/util/queries";
import useAuth from "@/hooks/useAuth";

type CommentModalType = {
  comentarios: Comentario[];
  postId: string;
};

export default function CommentModal({
  comentarios,
  postId,
}: CommentModalType) {
  const { user } = useAuth();
  const { mutate: addComment } = useMutation<void, Error, newComentario>({
    mutationFn: (comentatioData) => addComentario(comentatioData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comentarios", postId],
      });
    },
  });

  function renderComentarioHandler(comentario: Comentario) {
    return <CommentItem comentario={comentario} />;
  }

  function submitComentarioHandler(conteudo: string) {
    addComment({
      conteudo,
      idAutor: user!.id,
      idPost: postId,
      dataPublicacao: new Date(),
    });
  }

  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <CommentHeader onComment={submitComentarioHandler} />
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
