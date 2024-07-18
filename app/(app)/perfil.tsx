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
import PasswordDialog, {
  PasswordReset,
} from "@/components/form/PasswordDialog";
import FichaModal from "@/components/ficha/FichaModal";

export default function ProfileScreen() {
  const { user, token } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [showFichas, setShowFichas] = useState(false);

  const navigation = useNavigation();
  const { changeBottomContent, openBottom, isVisible, closeBottom, clear } =
    useBottomSheet();
  const { openLibrary, openCamera, imageURI, clearImage } = useImagePicker();
  const [supervisionado, setSupervisionado] = useState<
    Funcionario | undefined
  >();

  const {
    data: supervisionados,
    isLoading: loadingSupervisionados,
    isError,
  } = useQuery({
    queryFn: () => getSupervisionados(user!.id, token!),
    queryKey: ["funcionarios", "supervisionados", user!.id],
    enabled: !!user!.id,
  });

  const { mutate: changePicture } = useMutation({
    mutationFn: changePictureFuncionario.bind(null, user!.id),
    onMutate: () => {
      closeDialog();
    },
    onSuccess: () => {
      clearImage();

      queryClient.invalidateQueries({
        queryKey: ["funcionarios", user!.id],
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
    if (!loadingSupervisionados && supervisionados) {
      changeBottomContent(
        <Supervisionados
          supervisionados={supervisionados}
          onSelect={showSupervisionadoHandler}
        />
      );
    }
  }, [supervisionados, loadingSupervisionados]);

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

  function toggleChangePassword() {
    setChangePassword((p) => !p);
  }
  function closeChangePassword() {
    setChangePassword(false);
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

  function openFichasModal() {
    setShowFichas(true);
  }

  function closeFichasModal() {
    setShowFichas(false);
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

  function onChangePassword(passwords: PasswordReset) {
    console.log(passwords);
  }

  return (
    <MainPageLayout>
      <View style={{ height: "80%" }}>
        <View style={styles.userContainer}>
          <UserAvatar
            size={144}
            imageURL={imageURI ?? user?.urlImagem}
            icon={(props) => (
              <Icon name="edit" {...props} onPress={toggleDialog} />
            )}
          />
          <View style={{ alignItems: "center" }}>
            <StyledText fontWeight="bold" textTransform="capitalize">
              {`${user?.nome} ${user?.sobrenome}`}
            </StyledText>
            <StyledText>
              {user?.cargo === "TECNICO" ? "Técnico" : "Estagiário"}
            </StyledText>
          </View>

          <View style={styles.buttonsContainer}>
            {!imageURI && (
              <>
                <Button onPress={() => router.navigate("estatisticas")}>
                  Estatísticas
                </Button>
                {user?.cargo === "TECNICO" && (
                  <Button onPress={openBottom}>Meus supervisionados</Button>
                )}
                <Button onPress={openFichasModal}>Minhas fichas</Button>
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
      </View>
      <View
        style={{
          justifyContent: "flex-end",
        }}
      >
        <Button onPress={toggleChangePassword}>Alterar Senha</Button>
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
        {user?.urlImagem && (
          <View style={{ marginTop: "4%", alignItems: "center" }}>
            <Button onPress={removeImageHandler} color="red">
              Remover imagem
            </Button>
          </View>
        )}
      </Dialog>
      <PasswordDialog
        closeDialog={closeChangePassword}
        visible={changePassword}
        onChangePassword={onChangePassword}
        backdropBehavior="dismiss"
      />
      <FichaModal toggleModal={closeFichasModal} visible={showFichas} />
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
  },
  buttonsContainer: {
    marginTop: "12%",
    marginHorizontal: "8%",
    gap: 24,
  },
});
