import {
  Alert,
  BackHandler,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
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
import StyledText from "@/components/general/StyledText";
import UserAvatar from "@/components/UI/UserAvatar";
import useModal from "@/hooks/useModal";
import CommentModal from "@/components/comentario/CommentModal";
import Button from "@/components/general/Button";
import StackPageLayout from "@/components/layouts/StackPageLayout";
import { getPostById } from "@/util/postHTTP";
import { getFuncionarioById } from "@/util/funcionarioHTTP";

export default function detalhesPost() {
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

  const { mutate } = useMutation<void, Error, string>({
    mutationKey: ["deletePost"],
    onSuccess: () => router.navigate("(app)"),
  });

  const navigation = useNavigation();
  const { changeModalContent, openModal, isVisible, closeModal, clear } =
    useModal();

  useLayoutEffect(() => {
    changeModalContent(<CommentModal />);
  }, []);

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
      HeadRight={
        <Icon name="trash-2" color="red" size={32} onPress={deleteHandler} />
      }
    >
      <View style={styles.postContent}>
        <View style={styles.userContainer}>
          <UserAvatar
            size={64}
            alignSelf="flex-start"
            imageURL={selectedFuncionario?.imagemURL}
          />
          <StyledText mode="title" style={{ marginHorizontal: "4%", flex: 1 }}>
            {`${selectedFuncionario?.nome} ${selectedFuncionario?.sobrenome}`}
          </StyledText>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.description}>
        <StyledText mode="title" fontWeight="bold">
          {selectedPost?.titulo}
        </StyledText>
        {selectedPost?.imagemURL && (
          <ImageBackground
            resizeMode="cover"
            style={styles.imageContainer}
            imageStyle={styles.image}
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
          paddingTop: "8%",
          justifyContent: "flex-end",
          alignContent: "flex-end",
        }}
      >
        <Button onPress={openModal}>Ver comentários</Button>
      </View>
      <View style={styles.submitContainer}></View>
    </StackPageLayout>
  );
}

const styles = StyleSheet.create({
  postContent: {
    marginTop: "8%",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "2%",
    borderBottomWidth: 1,
  },
  userText: {
    fontWeight: "bold",
    color: "white",
    paddingVertical: "2%",
    paddingHorizontal: "16%",
  },
  content: {},
  imageContainer: {
    aspectRatio: 1,
    width: "90%",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    marginVertical: "4%",
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
