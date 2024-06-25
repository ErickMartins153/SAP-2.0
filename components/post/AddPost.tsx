import { PropsWithoutRef, useCallback, useLayoutEffect, useState } from "react";
import {
  BackHandler,
  Modal,
  ModalProps,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Image } from "expo-image";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/general/Icon";
import StyledText from "../general/StyledText";
import Input from "../general/Input";
import Button from "../general/Button";
import useImagePicker from "@/hooks/useImagePicker";

import useAuth from "@/hooks/useAuth";
import { newPost } from "@/interfaces/Post";
import blurhash from "@/util/blurhash";

type AddPostProps = {
  toggleModal: () => void;
} & PropsWithoutRef<ModalProps>;

type PostContent = {
  titulo: string;
  conteudo: string;
};

export default function AddPost({ toggleModal, ...props }: AddPostProps) {
  const { user } = useAuth();
  const { mutate, isPending } = useMutation<void, Error, newPost>({
    mutationKey: ["addPost"],
    onSuccess: toggleModal,
  });

  const navigation = useNavigation();
  const { openLibrary, openCamera, imageURI, aspect, clearImage } =
    useImagePicker();

  const [postContent, setPostContent] = useState<PostContent>({
    conteudo: "",
    titulo: "",
  });

  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        router.navigate("(app)");

        return true;
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  function inputHandler(field: keyof PostContent, text: string) {
    setPostContent((prev) => ({ ...prev, [field]: text }));
  }

  function createPostHandler() {
    mutate({
      conteudo: postContent.conteudo,
      titulo: postContent.titulo,
      imagemURL: imageURI,
      horario: new Date(),
      idAutor: user!.id,
    });
  }

  return (
    <Modal animationType="slide" onRequestClose={toggleModal} {...props}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: "4%" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={toggleModal}
          >
            <Icon name="chevron-left" size={32} />
            <StyledText mode="big" fontWeight="bold" textAlign="center">
              Criar post
            </StyledText>
          </Pressable>
          <Button onPress={createPostHandler}>Postar</Button>
        </View>
        <View style={{ marginHorizontal: "3%" }}>
          <Input
            autoCapitalize="sentences"
            placeholder="Titulo do post"
            maxLength={50}
            value={postContent.titulo}
            onChangeText={inputHandler.bind(null, "titulo")}
          />

          <Input
            multiline={true}
            autoCapitalize="sentences"
            placeholder="Conteúdo do post"
            maxLength={400}
            scrollEnabled
            numberOfLines={5}
            textAlignVertical="top"
            style={{ maxHeight: 135, width: "100%" }}
            value={postContent.conteudo}
            onChangeText={inputHandler.bind(null, "conteudo")}
          />

          <View style={{ padding: "8%", gap: 16 }}>
            <Button
              leftIcon={<Icon name="image" color="white" />}
              onPress={openLibrary}
            >
              Abrir Galeria
            </Button>
            <Button
              leftIcon={<Icon name="camera" color="white" />}
              onPress={openCamera}
            >
              Abrir Câmera
            </Button>
          </View>
          {imageURI && (
            <View style={{ position: "relative" }}>
              <Image
                contentFit="contain"
                placeholder={{ blurhash }}
                source={{ uri: imageURI }}
                style={{
                  aspectRatio: aspect,
                  borderWidth: 2,
                  borderRadius: 4,
                  borderColor: Colors.border,
                  overflow: "hidden",
                }}
              />
              <Icon
                name="x-square"
                color="white"
                size={36}
                style={{ position: "absolute", right: 0, padding: "2%" }}
                onPress={clearImage}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    elevation: 4,
    paddingVertical: "4%",
    paddingRight: "2%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  input: {
    padding: "2%",
    margin: "2%",
    borderWidth: 1,
    borderRadius: 4,
  },
});
