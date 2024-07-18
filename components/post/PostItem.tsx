import { Pressable, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import Post from "@/interfaces/Post";
import StyledText from "../UI/StyledText";
import Badge from "../UI/Badge";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import { memo } from "react";
import useAuth from "@/hooks/useAuth";
import { formatText } from "@/util/formatter";

type PostItemProps = {
  postData: Post;
  onSelectPost?: (postId: string) => void;
  isSelected?: boolean;
  anySelected?: boolean;
};

const PostItem = ({
  postData,
  onSelectPost,
  isSelected,
  anySelected,
}: PostItemProps) => {
  const { token } = useAuth();

  const {
    data: funcionario,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["funcionarios", postData.idAutor],
    queryFn: () => getFuncionarioById(postData.idAutor, token!),
  });

  function showPostHandler() {
    router.navigate(`detalhesPost/${postData.id}`);
  }

  if (isLoading) {
    return;
  }

  return (
    <View style={[styles.rootContainer, isSelected && styles.selected]}>
      <Pressable
        style={({ pressed }) => [
          styles.postContainer,
          pressed && styles.pressed,
        ]}
        android_ripple={{ color: Colors.lightRipple }}
        onPress={
          !isSelected && !anySelected
            ? showPostHandler
            : onSelectPost?.bind(null, postData.id)
        }
        onLongPress={onSelectPost?.bind(null, postData.id)}
      >
        <View style={styles.postHeader}>
          <Badge label={funcionario!.nome} imagemURL={funcionario?.urlImagem} />
          <View style={styles.dateContainer}>
            <StyledText style={styles.dateText} size="small">
              {postData.dataPublicacao.toLocaleString()}
            </StyledText>
          </View>
        </View>
        <StyledText size="big" color="text" fontWeight="bold">
          {postData.titulo}
        </StyledText>
        <View style={styles.postContent}>
          <StyledText style={styles.postText} size="small">
            {postData.conteudo && formatText(postData.conteudo, 360)}
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
  selected: {
    opacity: 0.8,
    backgroundColor: Colors.text,
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
