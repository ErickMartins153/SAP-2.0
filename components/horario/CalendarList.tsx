import { Alert, FlatList, FlatListProps, StyleSheet } from "react-native";
import CalendarItem from "./CalendarItem";
import { getTimeIntervals } from "@/util/dateUtils";
import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAgendamento,
  getAgendamentos,
  removeAgendamento,
} from "@/util/requests/agendamentoHTTP";
import { PropsWithoutRef, useEffect, useState } from "react";
import Dialog from "../layouts/Dialog";
import StyledText from "../UI/StyledText";
import InfoBox from "../UI/InfoBox";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import useAuth from "@/hooks/useAuth";
import Button from "../general/Button";
import { queryClient } from "@/util/queries";

type CalendarListProps = {
  onSelection: (horario: string) => void;
  toggleModal?: () => void;
  selected: NewAgendamento;
} & PropsWithoutRef<Partial<FlatListProps<Agendamento>>>;

const intervals = getTimeIntervals();

function isAvailable(
  interval: string,
  date: string,
  sala: string,
  agendamentos: Agendamento[]
) {
  return !agendamentos.some(
    (agendamento) =>
      agendamento.horario === interval &&
      agendamento.data! === date &&
      agendamento.sala === sala
  );
}

export default function CalendarList({
  onSelection,
  toggleModal,
  selected,
  scrollEnabled,
}: CalendarListProps) {
  const { user } = useAuth();
  const {
    data: agendamentos,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agendamentos", selected.data, selected.sala],
    enabled: !!selected.sala,
    queryFn: () =>
      getAgendamentos({ data: selected.data!, sala: selected.sala! }),
  });

  const [showDialog, setShowDialog] = useState(false);
  const [agendamentoData, setAgendamentoData] = useState<
    | {
        data: string;
        horario: string;
        sala: string;
      }
    | undefined
  >();

  const { data: agendamento, refetch: refetchAtendimento } = useQuery({
    queryKey: [
      "agendamentos",
      agendamentoData?.data,
      agendamentoData?.horario,
      agendamentoData?.sala,
    ],
    enabled: !!agendamentoData,
    queryFn: () =>
      getAgendamento(
        agendamentoData!.sala,
        agendamentoData!.data,
        agendamentoData!.horario
      ),
  });

  const { data: funcionarioData } = useQuery({
    queryKey: ["funcionarios", agendamento?.id],
    queryFn: () => getFuncionarioById(agendamento!.responsavelId),
    enabled: !!agendamento?.id,
  });

  const { mutate: desmarcar } = useMutation({
    mutationFn: () =>
      removeAgendamento(
        agendamento?.sala!,
        agendamento?.data!,
        agendamento?.horario!
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] });
      queryClient.removeQueries({
        queryKey: [
          "agendamentos",
          agendamentoData?.data,
          agendamentoData?.horario,
          agendamentoData?.sala,
        ],
      });
      refetch();
      refetchAtendimento();
      setAgendamentoData(undefined);
      Alert.alert(
        "Agendamento desmarcado com sucesso!",
        "Essa sala agora está disponível nesse horário e nesse dia."
      );
      toggleDialog();
    },
  });

  useEffect(() => {
    refetch();
  }, [selected.data, selected.sala]);

  function selectDayHandler(interval: string) {
    onSelection(interval);
    if (toggleModal) {
      toggleModal();
    }
  }

  function renderIntervalItem({ item: interval }: { item: string }) {
    const available =
      selected && agendamentos
        ? isAvailable(interval, selected.data!, selected.sala, agendamentos)
        : false;

    return (
      <CalendarItem
        id={interval}
        lastIndex={false}
        timeInterval={interval}
        available={available}
        disabled={!selected.sala}
        onPress={
          available
            ? selectDayHandler.bind(null, interval)
            : selectAgendamento.bind(
                null,
                interval,
                selected.data!,
                selected.sala
              )
        }
      />
    );
  }

  function selectAgendamento(horario: string, data: string, sala: string) {
    setAgendamentoData({ data, horario, sala });
    toggleDialog();
  }

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  function desmarcarHandler() {
    if (agendamento?.recorrente) {
      Alert.alert(
        "Esse agendamento é recorrente",
        "deseja desmarcar apenas esta ocorrência ou todas elas?",
        [
          {
            style: "destructive",
            text: "Todas as ocorrências",
            onPress: () => desmarcar(),
          },
          {
            text: "Apenas esta ocorrência",
            onPress: () => desmarcar(),
          },
          {
            isPreferred: true,
            text: "Cancelar",
          },
        ]
      );
    } else {
      desmarcar();
    }
  }

  if (isLoading) {
    return;
  }

  return (
    <>
      <FlatList
        contentContainerStyle={styles.rootContainer}
        data={intervals}
        scrollEnabled={scrollEnabled}
        renderItem={renderIntervalItem}
        keyExtractor={(item) => item}
      />
      <Dialog
        closeDialog={toggleDialog}
        title="Não foi possivel agendar"
        visible={
          showDialog &&
          !!agendamentoData &&
          !!agendamento?.id &&
          !!funcionarioData
        }
        backdropBehavior="dismiss"
        style={{ paddingHorizontal: "4%" }}
      >
        <StyledText>O horário escolhido já está ocupado</StyledText>
        <InfoBox content={funcionarioData?.nome || ""} label="Funcionário" />
        <InfoBox content={"placeholder"} label="Nome da atividade" />
        {user?.cargo === "TECNICO" && (
          <Button color="red" onPress={desmarcarHandler}>
            Desmarcar
          </Button>
        )}
      </Dialog>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    borderWidth: 1,
    borderRadius: 4,
    elevation: 4,
    overflow: "hidden",
  },
});
