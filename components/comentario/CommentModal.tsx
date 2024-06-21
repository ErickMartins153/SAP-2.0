import { StyleSheet } from "react-native";

import Comentario, { COMENTARIOS } from "@/interfaces/Comentario";
import CommentItem from "./CommentItem";
import CommentHeader from "./CommentHeader";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export default function CommentModal() {
  function renderComentarioHandler(comentario: Comentario) {
    return <CommentItem comentario={comentario} />;
  }

  return (
    <BottomSheetFlatList
      ListHeaderComponent={CommentHeader}
      data={COMENTARIOS}
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
