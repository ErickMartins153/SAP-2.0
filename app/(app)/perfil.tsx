import { BackHandler, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import UserAvatar from "@/components/UI/UserAvatar";
import Button from "@/components/general/Button";
import StyledText from "@/components/UI/StyledText";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import {
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

export default function ProfileScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const {
    changeBottomContent: changeModalContent,
    openBottom,
    isVisible,
    closeBottom,
    clear,
  } = useBottomSheet();
  const { openLibrary, openCamera, imageURI, aspect, clearImage } =
    useImagePicker();

  const [supervisionado, setSupervisionado] = useState<
    Funcionario | undefined
  >();

  const [showSupervisionado, setShowSupervisionado] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const {
    data: supervisionados,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getSupervisionados(user!.id),
    queryKey: ["funcionarios", "supervisionados", user!.id],
  });

  const { data: funcionarioData } = useQuery({
    queryKey: ["funcionarios", user!.id],
    queryFn: () => getFuncionarioById(user!.id),
  });

  function showSupervisionadoHandler(funcionario: Funcionario) {
    closeBottom();
    router.navigate(funcionario.id);
  }

  function closeSupervisionadoModal() {
    setSupervisionado(undefined);
    setShowSupervisionado(false);
  }

  useLayoutEffect(() => {
    if (!isLoading && supervisionados) {
      changeModalContent(
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

  return (
    <MainPageLayout>
      <View style={styles.userContainer}>
        <UserAvatar
          size={144}
          imageURL={funcionarioData?.imagemURL}
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
          <Button onPress={() => router.navigate("estatisticas")}>
            Estatísticas
          </Button>
          {funcionarioData?.isTecnico && (
            <Button onPress={openBottom}>Meus supervisionados</Button>
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
            leftIcon={<Icon name="camera" color="white" />}
            onPress={openCamera}
          >
            Câmera
          </Button>
          <Button
            leftIcon={<Icon name="image" color="white" onPress={openLibrary} />}
          >
            Galeria
          </Button>
        </View>
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
