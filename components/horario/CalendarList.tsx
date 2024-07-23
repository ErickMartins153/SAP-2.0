import { Alert, FlatList, FlatListProps, StyleSheet } from "react-native";
import CalendarItem from "./CalendarItem";
import { getTimeIntervals } from "@/util/dateUtils";
import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAgendamento,
  getAgendamentos,
  removeAgendamento,
} from "@/util/requests/atendimentoIndividualHTTP";
import { PropsWithoutRef, useEffect, useState } from "react";
import Dialog from "../layouts/Dialog";
import StyledText from "../UI/StyledText";
import InfoBox from "../UI/InfoBox";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import useAuth from "@/hooks/useAuth";
import Button from "../general/Button";
import { queryClient } from "@/util/queries";
import { Atividade } from "@/util/requests/atividadesHTTP";

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
  agendamentos: Atividade
) {
  const [start, end] = interval.split(" - ");
  const [day, month, year] = date.split("/");

  const intervalStart = `${year}-${month}-${day}T${start}:00`;
  const intervalEnd = `${year}-${month}-${day}T${end}:00`;

  const isConflict = (agendamento: any) => {
    const agendamentoStart = new Date(agendamento.tempoInicio);
    const agendamentoEnd = new Date(agendamento.tempoFim);
    const intervalStartDate = new Date(intervalStart);
    const intervalEndDate = new Date(intervalEnd);

    return (
      agendamento.idSala === sala &&
      ((intervalStartDate >= agendamentoStart &&
        intervalStartDate < agendamentoEnd) ||
        (intervalEndDate > agendamentoStart &&
          intervalEndDate <= agendamentoEnd) ||
        (intervalStartDate <= agendamentoStart &&
          intervalEndDate >= agendamentoEnd))
    );
  };

  const hasConflict =
    agendamentos.atendimentosIndividuais.some(isConflict) ||
    agendamentos.encontros.some(isConflict);

  return !hasConflict;
}

export default function CalendarList({
  onSelection,
  toggleModal,
  selected,
  scrollEnabled,
}: CalendarListProps) {
  const { user, token } = useAuth();
  const {
    data: agendamentos,
    isLoading: loadingAgendamentos,
    refetch,
  } = useQuery({
    queryKey: ["agendamentos", selected.data, selected.idSala],
    enabled: !!selected.idSala,
    queryFn: () =>
      getAgendamentos({
        data: selected.data!,
        salaId: selected.idSala!,
        token: token!,
      }),
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
    queryFn: () => getFuncionarioById(agendamento!.idTerapeuta, token!),
    enabled: !!agendamento?.id,
  });

  const { mutate: desmarcar } = useMutation({
    mutationFn: () =>
      removeAgendamento(
        agendamento?.idSala!,
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
  }, [selected.data, selected.idSala]);

  function selectDayHandler(interval: string) {
    onSelection(interval);
    if (toggleModal) {
      queryClient.invalidateQueries({
        queryKey: ["agendamentos", selected.data, selected.idSala],
      });
      queryClient.refetchQueries({
        queryKey: ["agendamentos", selected.data, selected.idSala],
      });
      toggleModal();
    }
  }

  function renderIntervalItem({ item: interval }: { item: string }) {
    const available =
      selected && agendamentos
        ? isAvailable(interval, selected.data!, selected.idSala, agendamentos)
        : false;

    return (
      <CalendarItem
        id={interval}
        lastIndex={false}
        timeInterval={interval}
        available={available}
        disabled={!selected.idSala}
        key={interval}
        onPress={
          available
            ? selectDayHandler.bind(null, interval)
            : selectAgendamento.bind(
                null,
                interval,
                selected.data!,
                selected.idSala
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

  if (loadingAgendamentos || !agendamentos) {
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
