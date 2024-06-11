import { Pressable, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import Post from "@/interfaces/Post";
import StyledText from "../general/StyledText";
import Badge from "../UI/Badge";

type PostItemProps = {
  postData: Post;
};

export default function PostItem({ postData }: PostItemProps) {
  let imageUri: string;

  if (postData.imagemURL) {
    imageUri = postData.imagemURL;
  }

  function handleShowPost() {}

  return (
    <View style={styles.rootContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.postContainer,
          pressed && styles.pressed,
        ]}
        android_ripple={{ color: Colors.buttonRipple }}
        onPress={handleShowPost}
      >
        <View style={styles.postHeader}>
          <Badge />
          <View style={styles.dateContainer}>
            <StyledText customStyle={styles.dateText} mode="small">
              {postData.horario.toLocaleString()}
            </StyledText>
          </View>
        </View>
        <StyledText mode="big" color="text" fontWeight="bold">
          {postData.titulo}
        </StyledText>
        <View style={styles.postContent}>
          <StyledText customStyle={styles.postText} mode="small">
            {postData.conteudo}
          </StyledText>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: 8,
    elevation: 2,
    margin: "2%",
  },
  postContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingBottom: "4%",
    paddingHorizontal: "2%",
    marginBottom: "1%",
  },
  pressed: {
    opacity: 0.95,
  },
  postHeader: {
    flexDirection: "row",
    paddingTop: "4%",
    alignItems: "center",
  },
  userText: {
    color: "white",
  },
  dateContainer: {
    flex: 1,
  },
  dateText: {
    textAlign: "right",
  },
  postContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 124,
    height: 124,
  },
  postText: {
    flex: 1,
    minHeight: 88,
    paddingVertical: "2%",
  },
});
