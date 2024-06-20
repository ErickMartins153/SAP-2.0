import {
  Alert,
  BackHandler,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/general/Icon";

import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";

import StyledText from "@/components/general/StyledText";
import UserAvatar from "@/components/UI/UserAvatar";
import { POSTS } from "@/interfaces/Post";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { FUNCIONARIOS } from "@/interfaces/Funcionario";
import useModal from "@/hooks/useModal";
import CommentModal from "@/components/comentario/CommentModal";
import Button from "@/components/general/Button";
import StackPageLayout from "@/components/layouts/StackPageLayout";

export default function detalhesPost() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const selectedPost = POSTS.find((post) => post.id === postId);
  const selectedUser = FUNCIONARIOS.find(
    (funcionario) => funcionario.id === selectedPost?.idAutor
  );

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

  function handleDelete() {
    Alert.alert(
      "Você tem certeza?",
      "Uma vez deletado esse post não poderá ser recuperado!",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
        },
      ]
    );
  }

  function deleteHandler(id: string) {}

  return (
    <StackPageLayout HeadRight={<Icon name="trash-2" color="red" size={32} />}>
      <View style={styles.postContent}>
        <View style={styles.userContainer}>
          <UserAvatar size={64} alignSelf="flex-start" />
          <StyledText mode="title" style={{ marginHorizontal: "4%", flex: 1 }}>
            {`${selectedUser?.nome} ${selectedUser?.sobrenome}`}
          </StyledText>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.description}>
        <StyledText mode="title" fontWeight="bold">
          {selectedPost?.titulo}
        </StyledText>
        <ImageBackground
          resizeMode="cover"
          style={styles.imageContainer}
          imageStyle={styles.image}
          source={{
            uri: selectedPost?.imagemURL,
          }}
        />

        <StyledText>{selectedPost?.conteudo}</StyledText>
      </ScrollView>

      <View style={{ borderTopWidth: 1, paddingTop: "8%" }}>
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
