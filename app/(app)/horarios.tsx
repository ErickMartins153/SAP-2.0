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
import { getAgendamentos } from "@/util/requests/atendimentoIndividualHTTP";
import useAuth from "@/hooks/useAuth";

import SolicitacoesModal from "@/components/horario/SolicitacoesModal";
import SolicitacoesIcon from "@/components/horario/SolicitacoesIcon";
import { getSalaByName } from "@/util/requests/salaHTTP";

const defaultValues: NewAgendamento = {
  idSala: "",
  data: new Date().toLocaleDateString(),
  idTerapeuta: "",
  idFuncionario: "",
  statusAtividade: "PENDENTE",
};

export default function Horarios() {
  const navigation = useNavigation();
  const { user, token } = useAuth();
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
  const [showSolicitacoes, setShowSolicitacoes] = useState(false);
  const { data: selectedSala } = useQuery({
    queryKey: ["salas", agendamento.idSala],
    enabled: !!agendamento.idSala,
    queryFn: () => getSalaByName(agendamento.idSala, token!),
  });

  const {
    data: agendamentos,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agendamentos", agendamento.data, agendamento.idSala],
    enabled: !!selectedSala,
    queryFn: () =>
      getAgendamentos({
        data: agendamento.data!,
        salaId: selectedSala?.uid!,
        token: token!,
      }),
  });
  console.log(agendamento);

  useLayoutEffect(() => {
    changeBottomContent(<RoomModal />);
  }, []);

  useLayoutEffect(() => {
    if (user?.cargo === "TECNICO") {
      navigation.setOptions({
        headerRight: () => (
          <SolicitacoesIcon toggleModal={toggleSolicitacoesHandler} />
        ),
      });
    }
  }, [navigation]);

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
  }, [agendamento.data, agendamento.idSala]);

  useEffect(() => {
    if (selectedValue) {
      inputHandler("idSala", selectedValue);
    }
  }, [selectedValue]);

  function toggleModalHandler() {
    if (agendamento.idSala) {
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

  function toggleSolicitacoesHandler() {
    setShowSolicitacoes(!showSolicitacoes);
  }

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
      <SolicitacoesModal
        toggleModal={toggleSolicitacoesHandler}
        visible={showSolicitacoes}
      />
    </MainPageLayout>
  );
}
