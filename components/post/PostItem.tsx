import { Pressable, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import Post from "@/interfaces/Post";
import StyledText from "../general/StyledText";
import Badge from "../UI/Badge";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import { memo } from "react";

type PostItemProps = {
  postData: Post;
};

function formatText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex === -1) return truncated + "...";

  return truncated.substring(0, lastSpaceIndex) + "...";
}

const PostItem = ({ postData }: PostItemProps) => {
  const {
    data: funcionario,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["funcionarios", postData.idAutor],
    queryFn: () => getFuncionarioById(postData.idAutor),
  });
  let imageUri: string;

  if (postData.imagemURL) {
    imageUri = postData.imagemURL;
  }

  function showPostHandler() {
    router.navigate(`detalhesPost/${postData.id}`);
  }

  if (isLoading) {
    return;
  }

  return (
    <View style={styles.rootContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.postContainer,
          pressed && styles.pressed,
        ]}
        android_ripple={{ color: Colors.lightRipple }}
        onPress={showPostHandler}
      >
        <View style={styles.postHeader}>
          <Badge label={funcionario!.nome} imagemURL={funcionario?.imagemURL} />
          <View style={styles.dateContainer}>
            <StyledText style={styles.dateText} mode="small">
              {postData.horario.toLocaleString()}
            </StyledText>
          </View>
        </View>
        <StyledText mode="big" color="text" fontWeight="bold">
          {postData.titulo}
        </StyledText>
        <View style={styles.postContent}>
          <StyledText style={styles.postText} mode="small">
            {formatText(postData.conteudo, 360)}
          </StyledText>
        </View>
      </Pressable>
    </View>
  );
};

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

export default memo(PostItem);
