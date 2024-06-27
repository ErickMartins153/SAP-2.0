import { Alert, BackHandler, ScrollView, StyleSheet, View } from "react-native";
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
import useBottomSheet from "@/hooks/useModal";
import CommentModal from "@/components/comentario/CommentModal";
import Button from "@/components/general/Button";
import StackPageLayout from "@/components/layouts/StackPageLayout";
import { getPostById } from "@/util/requests/postHTTP";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import blurhash from "@/util/blurhash";
import { getComentariosByPost } from "@/util/requests/comentarioHTTP";
import useAuth from "@/hooks/useAuth";

export default function detalhesPost() {
  const { user } = useAuth();
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const {
    data: selectedPost,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!postId,
    queryKey: ["posts", postId],
    queryFn: () => getPostById(postId!),
  });

  const {
    data: selectedFuncionario,
    isLoading: isLoadingFuncionario,
    isError: isErrorFuncionario,
  } = useQuery({
    enabled: !!selectedPost?.idAutor,
    queryKey: ["funcionarios", selectedPost?.idAutor],
    queryFn: () => getFuncionarioById(selectedPost?.idAutor!),
  });

  const {
    data: comentarios,
    isLoading: isLoadingComentarios,
    isError: isErrorComentarios,
  } = useQuery({
    queryKey: ["comentarios", postId],
    queryFn: () => getComentariosByPost(postId!),
    enabled: !!postId,
  });

  const { mutate } = useMutation<void, Error, string>({
    mutationKey: ["deletePost"],
    onSuccess: () => router.navigate("(app)"),
  });

  const navigation = useNavigation();
  const { changeModalContent, openModal, isVisible, closeModal, clear } =
    useBottomSheet();

  useLayoutEffect(() => {
    if (!isLoadingComentarios && postId) {
      changeModalContent(
        <CommentModal comentarios={comentarios!} postId={postId} />
      );
    }
  }, [comentarios, isLoadingComentarios]);

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
          closeModal();
          return true;
        } else {
          router.navigate("(app)");
          return true;
        }
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [isVisible, closeModal])
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
          onPress: () => mutate(postId!),
        },
      ]
    );
  }

  return (
    <StackPageLayout
      isLoading={
        isLoadingFuncionario || isLoadingComentarios || isLoadingFuncionario
      }
      HeadRight={
        (user?.isTecnico || user?.id === selectedFuncionario?.id) && (
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
              imageURL={selectedFuncionario?.imagemURL}
            />
            <StyledText mode="title" style={{ marginHorizontal: "4%" }}>
              {`${selectedFuncionario?.nome} ${selectedFuncionario?.sobrenome}`}
            </StyledText>
          </View>
          <StyledText>
            Publicado em: {selectedPost?.horario.toLocaleDateString()} às{" "}
            {selectedPost?.horario.toLocaleTimeString()}
          </StyledText>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.description}
        showsVerticalScrollIndicator={false}
      >
        <StyledText mode="title" fontWeight="bold">
          {selectedPost?.titulo}
        </StyledText>
        {selectedPost?.imagemURL && (
          <Image
            contentFit="cover"
            style={styles.imageContainer}
            placeholder={{ blurhash }}
            transition={600}
            source={{
              uri: selectedPost?.imagemURL,
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
        <Button onPress={openModal} disabled={isLoadingComentarios}>
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
