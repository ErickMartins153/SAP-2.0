import { Alert, BackHandler, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import UserAvatar from "@/components/UI/UserAvatar";
import Button from "@/components/general/Button";
import StyledText from "@/components/UI/StyledText";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import {
  changePictureFuncionario,
  getFuncionarioById,
  getSupervisionados,
} from "@/util/requests/funcionarioHTTP";
import Icon from "@/components/general/Icon";
import Supervisionados from "@/components/perfil/Supervisionados";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import useBottomSheet from "@/hooks/useBottom";
import { router, useFocusEffect, useNavigation } from "expo-router";
import Funcionario from "@/interfaces/Funcionario";
import Dialog from "@/components/layouts/Dialog";
import useImagePicker from "@/hooks/useImagePicker";
import { queryClient } from "@/util/queries";

export default function ProfileScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { changeBottomContent, openBottom, isVisible, closeBottom, clear } =
    useBottomSheet();
  const { openLibrary, openCamera, imageURI, clearImage } = useImagePicker();
  const [supervisionado, setSupervisionado] = useState<
    Funcionario | undefined
  >();

  const [showDialog, setShowDialog] = useState(false);

  const {
    data: supervisionados,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getSupervisionados(user!.id),
    queryKey: ["funcionarios", "supervisionados", user!.id],
    enabled: !!user?.id,
  });

  const { data: funcionarioData } = useQuery({
    queryKey: ["funcionarios", user!.id],
    queryFn: () => getFuncionarioById(user!.id),
  });

  const { mutate: changePicture } = useMutation({
    mutationFn: changePictureFuncionario.bind(null, funcionarioData!.id),
    onMutate: () => {
      closeDialog();
    },
    onSuccess: () => {
      clearImage();

      queryClient.invalidateQueries({
        queryKey: ["funcionarios", funcionarioData!.id],
      });
      Alert.alert("Imagem alterada", "Sua imagem foi alterada com sucesso!");
    },
  });

  function showSupervisionadoHandler(funcionario: Funcionario) {
    closeBottom();
    router.navigate(funcionario.id);
  }

  function closeSupervisionadoModal() {
    setSupervisionado(undefined);
  }

  useLayoutEffect(() => {
    if (!isLoading && supervisionados) {
      changeBottomContent(
        <Supervisionados
          supervisionados={supervisionados}
          onSelect={showSupervisionadoHandler}
        />
      );
    }
  }, [supervisionados, isLoading]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      clear();
      closeSupervisionadoModal();
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
          clearImage();
          router.navigate("(app)");
          return true;
        }
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [isVisible, closeBottom])
  );

  function toggleDialog() {
    setShowDialog((p) => !p);
  }

  function closeDialog() {
    setShowDialog(false);
  }

  function changePictureHandler() {
    if (imageURI) {
      changePicture(imageURI);
    }
  }

  function openImagePicker(mode: "camera" | "library") {
    if (mode === "camera") {
      openCamera();
    }
    if (mode === "library") {
      openLibrary();
    }
    toggleDialog();
  }

  function removeImageHandler() {
    Alert.alert(
      "Você tem certeza?",
      "Uma vez removida você voltará a ter a imagem padrão.",
      [
        { text: "Cancelar", isPreferred: true },
        { text: "Confirmar", onPress: () => changePicture("") },
      ]
    );
  }

  return (
    <MainPageLayout>
      <View style={styles.userContainer}>
        <UserAvatar
          size={144}
          imageURL={imageURI ?? funcionarioData?.imagemURL}
          icon={(props) => (
            <Icon name="edit" {...props} onPress={toggleDialog} />
          )}
        />
        <StyledText fontWeight="bold" textTransform="capitalize">
          {`${funcionarioData?.nome} ${funcionarioData?.sobrenome}`}
        </StyledText>
        <StyledText>
          {funcionarioData?.isTecnico ? "Técnico" : "Estagiário"}
        </StyledText>
        <View style={styles.buttonsContainer}>
          {!imageURI && (
            <>
              <Button onPress={() => router.navigate("estatisticas")}>
                Estatísticas
              </Button>
              {funcionarioData?.isTecnico && (
                <Button onPress={openBottom}>Meus supervisionados</Button>
              )}
            </>
          )}
          {imageURI && (
            <>
              <Button color="green" onPress={changePictureHandler}>
                Confirmar alterações
              </Button>
              <Button color="red" onPress={clearImage}>
                Remover alterações
              </Button>
            </>
          )}
        </View>
      </View>
      <Dialog
        closeDialog={toggleDialog}
        visible={showDialog}
        title="Escolha o modo"
        backdropBehavior="dismiss"
      >
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Button
            leftIcon={
              <Icon
                name="camera"
                color="white"
                onPress={() => openImagePicker("camera")}
              />
            }
            onPress={() => openImagePicker("camera")}
          >
            Câmera
          </Button>
          <Button
            leftIcon={
              <Icon
                name="image"
                color="white"
                onPress={() => openImagePicker("library")}
              />
            }
            onPress={() => openImagePicker("library")}
          >
            Galeria
          </Button>
        </View>
        {funcionarioData?.imagemURL && (
          <View style={{ marginTop: "4%", alignItems: "center" }}>
            <Button onPress={removeImageHandler} color="red">
              Remover imagem
            </Button>
          </View>
        )}
      </Dialog>
    </MainPageLayout>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  userContainer: {
    marginTop: "4%",
    alignItems: "center",
  },
  buttonsContainer: {
    marginTop: "12%",
    gap: 24,
  },
});
