import { router, useFocusEffect, useNavigation } from "expo-router";
import { PropsWithoutRef, useCallback, useState } from "react";
import { Alert, BackHandler, ModalProps } from "react-native";

import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";
import InfoBox from "../UI/InfoBox";
import Dialog from "../layouts/Dialog";
import Switch from "../general/Switch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAtendimento } from "@/util/requests/atendimentoIndividualHTTP";
import useAuth from "@/hooks/useAuth";
import { queryClient } from "@/util/queries";
import Select from "../form/Select";
import { getFuncionariosAtivos } from "@/util/requests/funcionarioHTTP";
import Loading from "../UI/Loading";
import { getFichasByFuncionario } from "@/util/requests/fichaHTTP";
import { notBlank } from "@/util/validate";
import { getSalaById } from "@/util/requests/salaHTTP";

type HorarioModalProps = {
  toggleDialog: () => void;
  agendamento: NewAgendamento;
} & PropsWithoutRef<ModalProps>;

export default function HorarioModal({
  toggleDialog,
  agendamento,
  visible = false,
  ...props
}: HorarioModalProps) {
  const { user, token } = useAuth();
  const navigation = useNavigation();
  const [step, setStep] = useState<0 | 1>(0);
  const [recorrente, setRecorrente] = useState(false);
  const [responsavelId, setResponsavelId] = useState<string>(user?.id!);
  const [ficha, setFicha] = useState<string | null>(null);

  const { mutate: agendar } = useMutation({
    mutationFn: createAtendimento,
    onSuccess: () => {
      toggleDialog();
      queryClient.invalidateQueries({
        queryKey: ["agendamentos", agendamento.data, agendamento.idSala],
      });
      setRecorrente(false);
      Alert.alert(
        "Horário agendado com sucesso",
        "Gostaria de ver seus agendamentos?",
        [
          { text: "Não" },
          {
            isPreferred: true,
            text: "Sim",
            onPress: () => router.navigate("atendimentos"),
          },
        ]
      );
    },
  });

  const { data: fichas, isLoading: loadingFichas } = useQuery({
    queryKey: ["fichas", user?.id],
    queryFn: () =>
      getFichasByFuncionario({ idFuncionario: user?.id!, token: token! }),
    enabled: !!user?.id && !!token,
    initialData: [],
  });

  const {
    data: funcionarios,
    isLoading: loadingFuncionarios,
    refetch: refetchAtivos,
  } = useQuery({
    queryKey: ["funcionarios", "ativos"],
    queryFn: () => getFuncionariosAtivos(token!),
    initialData: [],
  });

  const { data: sala } = useQuery({
    queryKey: ["salas", agendamento.idSala],
    enabled: !!agendamento.idSala,
    queryFn: () => getSalaById(agendamento.idSala!, token!),
  });

  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        if (step === 0) {
          router.navigate("(app)");
          return true;
        } else {
          setStep(0);
          return true;
        }
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation, step])
  );

  function agendarHandler() {
    const atendimento: NewAgendamento = {
      ...agendamento,
      idTerapeuta: responsavelId,
      idFuncionario: user?.id!,
    };
    if (notBlank(atendimento) && !!ficha) {
      agendar({
        atendimento: { ...atendimento, idFicha: ficha },
        token: token!,
      });
    } else {
      Alert.alert(
        "Erro",
        "Preencha todas as informações necessárias para continuar."
      );
    }
  }

  function changeResponsavelHandler(id: string) {
    setResponsavelId(id);
  }

  function toggleRecorrencia() {
    setRecorrente((p) => !p);
  }

  function closeDialog() {
    setRecorrente(false);
    toggleDialog();
  }

  function selectFichaHandler(id: string) {
    setFicha(id);
  }

  if (loadingFuncionarios || loadingFichas) {
    return <Loading />;
  }

  return (
    <Dialog
      visible={visible}
      title="Confirmar Agendamento"
      closeDialog={closeDialog}
      onSubmit={agendarHandler}
      {...props}
      backdropBehavior="dismiss"
    >
      {agendamento.data && <InfoBox content={agendamento.data} label="Dia" />}
      <InfoBox content={agendamento.horario!} label="Horário" />
      <InfoBox content={sala?.nome || ""} label="Sala" />
      {user?.cargo === "TECNICO" && (
        <Select
          onSelect={changeResponsavelHandler}
          data={funcionarios}
          placeholder="Escolha o responsável"
          defaultValue={user}
        />
      )}
      <Select
        placeholder="Selecione uma de suas fichas"
        onSelect={selectFichaHandler}
        data={fichas!}
      />

      {/* <Switch
        isEnabled={recorrente}
        label="Recorrente?"
        onToggle={toggleRecorrencia}
      /> */}
    </Dialog>
  );
}
