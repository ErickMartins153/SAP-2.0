import { StyleSheet, View } from "react-native";
import StyledText from "../general/StyledText";

import Input from "../general/Input";
import { useState } from "react";
import Icon from "../general/Icon";

type CommentHeaderProps = {
  onComment: (conteudo: string) => void;
};

export default function CommentHeader({ onComment }: CommentHeaderProps) {
  const [comment, setComment] = useState("");

  function onCommentHandler(text: string) {
    setComment(text);
  }

  function clearCommentHandler() {
    setComment("");
  }

  function sendCommentHandler() {
    if (comment.trim() === "") return;
    onComment(comment);
    clearCommentHandler();
  }

  return (
    <View style={styles.mainContainer}>
      <StyledText mode="title" fontWeight="bold" textAlign="center">
        Comentários
      </StyledText>
      <View style={styles.form}>
        <Input
          placeholder="Insira seu comentário aqui"
          multiline
          autoCapitalize="sentences"
          autoCorrect
          onChangeText={onCommentHandler}
          value={comment}
          maxLength={160}
          style={{ flex: 1 }}
        />
        <Icon
          name="send"
          size={32}
          style={styles.submitButton}
          onPress={sendCommentHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
  form: {
    flexDirection: "row",
    flex: 1,
    gap: 6,
    alignItems: "center",
  },
  submitButton: {
    padding: 8,
  },
});
