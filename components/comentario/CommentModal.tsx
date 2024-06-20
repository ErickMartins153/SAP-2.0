import { FlatList, StyleSheet } from "react-native";

import Comentario, { COMENTARIOS } from "@/interfaces/Comentario";
import CommentItem from "./CommentItem";

export default function CommentModal() {
  function renderSalaHandler(comentario: Comentario) {
    return <CommentItem comentario={comentario} />;
  }

  return (
    <>
      <FlatList
        data={COMENTARIOS}
        renderItem={({ item }) => renderSalaHandler(item)}
        keyExtractor={({ id }) => id}
        contentContainerStyle={styles.items}
      />
    </>
  );
}

const styles = StyleSheet.create({
  items: {
    marginVertical: "12%",
    gap: 12,
  },
});
