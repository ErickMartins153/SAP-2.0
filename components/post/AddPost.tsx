import { PropsWithoutRef, useCallback, useState } from "react";
import { BackHandler, ModalProps, View } from "react-native";
import { Image } from "expo-image";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/general/Icon";
import Input from "../general/Input";
import Button from "../general/Button";
import useImagePicker from "@/hooks/useImagePicker";

import useAuth from "@/hooks/useAuth";
import { newPost } from "@/interfaces/Post";
import blurhash from "@/util/blurhash";
import ModalLayout from "../layouts/ModalLayout";

type AddPostProps = {
  toggleModal: () => void;
} & PropsWithoutRef<ModalProps>;

type PostContent = {
  titulo: string;
  conteudo: string;
};

const defaultValues: PostContent = {
  conteudo: "",
  titulo: "",
};

export default function AddPost({
  toggleModal,
  visible = false,
  ...props
}: AddPostProps) {
  const { user } = useAuth();
  const { mutate, isPending } = useMutation<void, Error, newPost>({
    mutationKey: ["addPost"],
    onSuccess: () => {
      setPostContent(defaultValues);
      clearImage();
      toggleModal();
    },
  });

  const navigation = useNavigation();
  const { openLibrary, openCamera, imageURI, aspect, clearImage } =
    useImagePicker();

  const [postContent, setPostContent] = useState(defaultValues);

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
    <ModalLayout
      submitButton={{
        button: ({ onSubmit }) => <Button onPress={onSubmit}>Postar</Button>,
        onSubmit: createPostHandler,
      }}
      toggleModal={toggleModal}
      visible={visible}
      {...props}
    >
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
    </ModalLayout>
  );
}
