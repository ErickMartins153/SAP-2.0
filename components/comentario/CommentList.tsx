import { StyleSheet, View } from "react-native";
import StyledText from "../general/StyledText";

import Input from "../general/Input";
import { useState } from "react";
import Icon from "../general/Icon";

export default function CommentList() {
  const [comment, setComment] = useState("");

  function onCommentHandler(text: string) {
    setComment(text);
  }

  return (
    <View style={styles.mainContainer}>
      <StyledText mode="big" fontWeight="bold">
        Comentários
      </StyledText>
      <View style={styles.form}>
        <Input
          field=""
          placeholder="Insira seu comentário aqui"
          multiline
          changeText={onCommentHandler}
          value={comment}
          maxLength={160}
          style={{ flex: 1 }}
        />
        <Icon name="send" size={32} style={styles.submitButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: "2%",
  },
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
