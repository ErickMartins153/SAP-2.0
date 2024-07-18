import { router, useFocusEffect, useNavigation } from "expo-router";
import { PropsWithoutRef, useCallback, useState } from "react";
import { Alert, BackHandler, ModalProps } from "react-native";

import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";
import InfoBox from "../UI/InfoBox";
import Dialog from "../layouts/Dialog";
import Switch from "../general/Switch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { agendarHorario } from "@/util/requests/agendamentoHTTP";
import useAuth from "@/hooks/useAuth";
import { queryClient } from "@/util/queries";
import Select from "../form/Select";
import { getFuncionariosAtivos } from "@/util/requests/funcionarioHTTP";
import Loading from "../UI/Loading";

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

  const { mutate: agendar } = useMutation({
    mutationFn: agendarHorario,
    onSuccess: () => {
      toggleDialog();
      queryClient.invalidateQueries({
        queryKey: ["agendamentos", agendamento.data, agendamento.sala],
      });
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

  const {
    data: funcionarios,
    isLoading: loadingFuncionarios,
    refetch: refetchAtivos,
  } = useQuery({
    queryKey: ["funcionarios", "ativos"],
    queryFn: () => getFuncionariosAtivos(token!),
    initialData: [],
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
    setRecorrente(false);

    agendar({ ...agendamento, recorrente, idResponsavel: responsavelId });
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
      <InfoBox content={agendamento.sala!} label="Sala" />
      {user?.cargo === "TECNICO" && (
        <Select
          onSelect={changeResponsavelHandler}
          data={funcionarios}
          placeholder="Escolha o responsável"
          defaultValue={user}
        />
      )}
      <Switch
        isEnabled={recorrente}
        label="Recorrente?"
        onToggle={toggleRecorrencia}
      />
    </Dialog>
  );
}
