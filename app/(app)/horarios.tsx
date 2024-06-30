import Calendar from "@/components/horario/Calendar";

import MainPageLayout from "@/components/layouts/MainPageLayout";
import useBottomSheet from "@/hooks/useBottom";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";
import RoomModal from "@/components/horario/RoomBottom";
import HorarioModal from "@/components/horario/HorarioModal";
import { Agendamento } from "@/interfaces/Agendamento";

const defaultValues: Agendamento = {
  sala: "",
};

export default function Horarios() {
  const navigation = useNavigation();
  const { clear, isVisible, closeBottom, changeBottomContent, selectedValue } =
    useBottomSheet();

  const [showModal, setShowModal] = useState(false);
  const [agendamento, setAgendamento] = useState(defaultValues);

  useLayoutEffect(() => {
    changeBottomContent(<RoomModal />);
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

  useEffect(() => {
    if (selectedValue) {
      inputHandler("sala", selectedValue);
    }
  }, [selectedValue]);

  function toggleModalHandler() {
    if (agendamento.sala) {
      setShowModal((p) => !p);
    } else {
      Alert.alert(
        "Erro",
        "Preencha todas as informações necessárias para continuar."
      );
    }
  }

  function inputHandler(field: keyof Agendamento, text: string) {
    setAgendamento((prev) => ({ ...prev, [field]: text }));
  }

  return (
    <MainPageLayout>
      <Calendar onSelection={inputHandler} toggleModal={toggleModalHandler} />
      <HorarioModal
        visible={showModal}
        toggleDialog={toggleModalHandler}
        agendamento={agendamento}
      />
    </MainPageLayout>
  );
}
