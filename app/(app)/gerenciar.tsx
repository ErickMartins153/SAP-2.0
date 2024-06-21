import Select from "@/components/form/Select";
import Button from "@/components/general/Button";
import Input from "@/components/general/Input";
import StyledText from "@/components/general/StyledText";
import FuncionariosModal from "@/components/gerenciar/FuncionariosModal";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import { Colors } from "@/constants/Colors";
import useModal from "@/hooks/useModal";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";

const test = [
  { text: "Luan Vilaça" },
  { text: "Pedin doido" },
  { text: "Ana Oliveira" },
];

export default function Gerenciar() {
  const [email, setEmail] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const { changeModalContent, openModal, isVisible, closeModal, clear } =
    useModal();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    changeModalContent(<FuncionariosModal />);
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

  function changeEmailHandler(text: string) {
    setEmail(text);
  }

  function selectSupervisorHandler(selectedSupervisor: string) {
    setSupervisor(selectedSupervisor);
  }

  return (
    <MainPageLayout>
      <View style={styles.mainContainer}>
        <View style={styles.wrapper}>
          <StyledText mode="big" textAlign="center" fontWeight="bold">
            Cadastrar
          </StyledText>
          <Input
            placeholder="email@upe.br"
            onChangeText={changeEmailHandler}
            value={email}
          />
          <Select data={test} onSelect={selectSupervisorHandler} search />
          <View style={styles.buttonContainer}>
            <Button>Confirmar</Button>
          </View>
        </View>

        <Button color="red" onPress={openModal}>
          Remover usuário
        </Button>
      </View>
    </MainPageLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    gap: 24,
  },
  wrapper: {
    padding: "4%",
    backgroundColor: Colors.white,
    elevation: 4,
    borderRadius: 4,
  },
  buttonContainer: {
    marginVertical: "4%",
  },
});
