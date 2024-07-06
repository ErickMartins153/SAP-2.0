import Calendar from "@/components/horario/Calendar";

import MainPageLayout from "@/components/layouts/MainPageLayout";
import useBottomSheet from "@/hooks/useBottom";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, BackHandler } from "react-native";
import RoomModal from "@/components/horario/RoomBottom";
import HorarioModal from "@/components/horario/HorarioModal";
import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";
import { useQuery } from "@tanstack/react-query";
import { getAgendamentos } from "@/util/requests/agendamentoHTTP";

const defaultValues: NewAgendamento = {
  sala: "",
  data: new Date().toLocaleDateString(),
  responsavelId: "",
};

export default function Horarios() {
  const navigation = useNavigation();
  const {
    clear,
    isVisible,
    closeBottom,
    changeBottomContent,
    selectedValue,
    onSelectValue,
  } = useBottomSheet();

  const [showModal, setShowModal] = useState(false);
  const [agendamento, setAgendamento] = useState(defaultValues);

  const { isLoading, refetch } = useQuery({
    queryKey: ["agendamentos", agendamento.data, agendamento.sala],
    enabled: !!agendamento.sala && !!agendamento.horario,
    queryFn: () =>
      getAgendamentos({ data: agendamento.data!, sala: agendamento.sala! }),
  });

  useLayoutEffect(() => {
    changeBottomContent(<RoomModal />);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", (e) => {
      clear();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", (e) => {
      setAgendamento(defaultValues);
      onSelectValue(undefined);
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
    refetch();
  }, [agendamento.data, agendamento.sala]);

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
    refetch();
  }

  const inputHandler = useCallback((field: keyof Agendamento, text: string) => {
    setAgendamento((prev) => ({ ...prev, [field]: text }));
  }, []);

  return (
    <MainPageLayout isLoading={isLoading}>
      <Calendar
        onSelection={inputHandler}
        toggleModal={toggleModalHandler}
        selected={agendamento}
      />
      <HorarioModal
        visible={showModal}
        toggleDialog={toggleModalHandler}
        agendamento={agendamento}
      />
    </MainPageLayout>
  );
}
