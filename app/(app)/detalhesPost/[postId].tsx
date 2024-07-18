import {
  Alert,
  BackHandler,
  Keyboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Image } from "expo-image";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/general/Icon";
import StyledText from "@/components/UI/StyledText";
import UserAvatar from "@/components/UI/UserAvatar";
import useBottomSheet from "@/hooks/useBottom";
import CommentBottom from "@/components/comentario/CommentBottom";
import Button from "@/components/general/Button";
import StackPageLayout from "@/components/layouts/StackPageLayout";
import { deletePost, getPostById } from "@/util/requests/postHTTP";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import blurhash from "@/util/blurhash";
import { getComentariosByPost } from "@/util/requests/comentarioHTTP";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/UI/Loading";
import { queryClient } from "@/util/queries";

export default function detalhesPost() {
  const { user, token } = useAuth();
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const {
    data: selectedPost,
    isLoading: loadingPost,
    refetch: refetchPost,
    isRefetching: refetchingPost,
  } = useQuery({
    enabled: !!postId,
    queryKey: ["posts", postId],
    queryFn: () => getPostById(postId!, token!),
  });

  const {
    data: selectedFuncionario,
    isLoading: loadingFuncionario,
    isError: isErrorFuncionario,
    refetch: RefetchFuncionario,
    isRefetching: refetchingFuncionario,
  } = useQuery({
    enabled: !!selectedPost?.idAutor,
    queryKey: ["funcionarios", selectedPost?.idAutor],
    queryFn: () => getFuncionarioById(selectedPost?.idAutor!, token!),
  });

  const {
    data: comentarios,
    isLoading: loadingComentarios,
    isError: isErrorComentarios,
    refetch: refetchComentarios,
    isRefetching: refetchingComentarios,
  } = useQuery({
    queryKey: ["comentarios", postId],
    queryFn: () => getComentariosByPost(postId!),
    enabled: !!postId,
  });

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.refetchQueries({ queryKey: ["posts"] });
      Alert.alert(
        "Post deletado com sucesso",
        "O post foi desfixado do mural",
        [
          {
            isPreferred: true,
            text: "Ir para mural",
            onPress: () => router.navigate("(app)"),
          },
        ]
      );
    },
    retry: 3,
  });

  function refetchAll() {
    RefetchFuncionario();
    refetchPost();
    refetchComentarios();
  }

  const navigation = useNavigation();
  const {
    changeBottomContent: changeModalContent,
    openBottom,
    isVisible,
    closeBottom,
    clear,
  } = useBottomSheet();

  useLayoutEffect(() => {
    if (!loadingComentarios && postId) {
      changeModalContent(
        <CommentBottom comentarios={comentarios!} postId={postId} />
      );
    }
  }, [comentarios, loadingComentarios]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", (e) => {
      clear();
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        if (isVisible) {
          closeBottom();
          return true;
        } else {
          router.navigate("(app)");
          return true;
        }
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [isVisible, closeBottom])
  );

  function deleteHandler() {
    Alert.alert(
      "Você tem certeza?",
      "Uma vez deletado esse post não poderá ser recuperado!",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: () => mutate({ postId: postId!, token: token! }),
        },
      ]
    );
  }

  if (loadingFuncionario || loadingPost || loadingComentarios) {
    return <Loading />;
  }

  return (
    <StackPageLayout
      isLoading={loadingFuncionario || loadingComentarios}
      HeadRight={
        (user?.cargo === "TECNICO" || user?.id === selectedFuncionario?.id) && (
          <Icon name="trash-2" color="red" size={32} onPress={deleteHandler} />
        )
      }
    >
      <View style={styles.postContent}>
        <View style={styles.userContainer}>
          <View style={styles.avatarAndTitle}>
            <UserAvatar
              size={64}
              alignSelf="flex-start"
              imageURL={selectedFuncionario?.urlImagem}
            />
            <StyledText mode="title" style={{ marginHorizontal: "4%" }}>
              {`${selectedFuncionario?.nome} ${selectedFuncionario?.sobrenome}`}
            </StyledText>
          </View>
          <StyledText>
            Publicado em: {selectedPost?.dataPublicacao.toLocaleDateString()} às{" "}
            {selectedPost?.dataPublicacao.toLocaleTimeString()}
          </StyledText>
        </View>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.description}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={
              refetchingComentarios || refetchingFuncionario || refetchingPost
            }
            onRefresh={refetchAll}
          />
        }
      >
        <StyledText mode="title" fontWeight="bold">
          {selectedPost?.titulo}
        </StyledText>
        {selectedPost?.imagemPost && (
          <Image
            contentFit="cover"
            style={styles.imageContainer}
            placeholder={{ blurhash }}
            transition={600}
            source={{
              uri: selectedPost?.imagemPost,
            }}
          />
        )}

        <StyledText>{selectedPost?.conteudo}</StyledText>
      </ScrollView>

      <View
        style={{
          borderTopWidth: 1,
          paddingVertical: "8%",
        }}
      >
        <Button onPress={openBottom} disabled={loadingComentarios}>
          Ver comentários
        </Button>
      </View>
    </StackPageLayout>
  );
}

const styles = StyleSheet.create({
  postContent: {
    marginTop: "8%",
  },
  userContainer: {
    paddingBottom: "2%",
    borderBottomWidth: 1,
  },
  userText: {
    fontWeight: "bold",
    color: "white",
    paddingVertical: "2%",
    paddingHorizontal: "16%",
  },
  avatarAndTitle: {
    alignItems: "center",
    flexDirection: "row",
  },
  imageContainer: {
    aspectRatio: 1,
    width: "90%",
    alignSelf: "center",
    borderWidth: 2,
    borderRadius: 4,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  description: {
    paddingBottom: "4%",
  },
  submitContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingVertical: 8,
  },
  submitButton: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingHorizontal: "4%",
    overflow: "hidden",
  },
});
