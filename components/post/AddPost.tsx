import { PropsWithoutRef, useCallback, useLayoutEffect, useState } from "react";
import {
  BackHandler,
  ImageBackground,
  Modal,
  ModalProps,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import Icon from "@/components/general/Icon";
import { router, useFocusEffect, useNavigation } from "expo-router";
import StyledText from "../general/StyledText";
import Input from "../general/Input";
import Button from "../general/Button";
import useImagePicker from "@/hooks/useImagePicker";

type AddPostProps = {
  toggleModal: () => void;
} & PropsWithoutRef<ModalProps>;

type PostContent = {
  titulo: string;
  conteudo: string;
};

export default function AddPost({ toggleModal, ...props }: AddPostProps) {
  const navigation = useNavigation();
  const { openLibrary, openCamera, imageURI, aspect } = useImagePicker();

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {},
      title: "Postar",
    });
  }, [navigation]);

  function handleDescription(field: keyof PostContent, text: string) {
    setPostContent((prev) => ({ ...prev, [field]: text }));
  }

  return (
    <Modal animationType="slide" onRequestClose={toggleModal} {...props}>
      <ScrollView contentContainerStyle={{ paddingBottom: "4%" }}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="chevron-left" size={32} onPress={toggleModal} />
            <StyledText mode="big" fontWeight="bold" textAlign="center">
              Criar post
            </StyledText>
          </View>
          <Button>Postar</Button>
        </View>
        <View style={{ marginHorizontal: "3%" }}>
          <Input
            autoCapitalize="sentences"
            placeholder="Titulo do post"
            maxLength={50}
            value={postContent.titulo}
            onChangeText={handleDescription.bind(null, "titulo")}
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
            onChangeText={handleDescription.bind(null, "conteudo")}
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
            <ImageBackground
              resizeMode="contain"
              source={{ uri: imageURI }}
              style={{
                aspectRatio: aspect,
                borderWidth: 1,
              }}
            />
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
