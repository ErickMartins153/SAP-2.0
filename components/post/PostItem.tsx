import { Pressable, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import Post from "@/interfaces/Post";
import StyledText from "../general/StyledText";

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
          <View style={styles.userContainer}>
            <StyledText customStyle={styles.userText}>abc</StyledText>
          </View>

          <View style={styles.dateContainer}>
            <StyledText customStyle={styles.dateText}>
              {postData.horario.toLocaleString()}
            </StyledText>
          </View>
        </View>
        <View style={styles.postContent}>
          <StyledText>{postData.titulo}</StyledText>
          <StyledText customStyle={styles.postText}>
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
    marginVertical: "2%",
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
    paddingLeft: "4%",
    alignItems: "center",
  },
  userContainer: {
    paddingVertical: "1%",
    paddingHorizontal: "8%",
    borderRadius: 8,
    position: "absolute",
    borderWidth: 1,
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
