import { FlatList, FlatListProps, StyleSheet, View } from "react-native";
import CalendarItem from "./CalendarItem";
import { getTimeIntervals } from "@/util/dateUtils";
import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";
import { useQuery } from "@tanstack/react-query";
import {
  getAgendamento,
  getAgendamentos,
} from "@/util/requests/agendamentoHTTP";
import { PropsWithoutRef, useEffect, useState } from "react";
import Dialog from "../layouts/Dialog";
import StyledText from "../UI/StyledText";
import InfoBox from "../UI/InfoBox";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import { set } from "date-fns";
import useAuth from "@/hooks/useAuth";
import Button from "../general/Button";

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
  const [agendamentoData, setAgendamentoData] = useState<{
    data: string;
    horario: string;
    sala: string;
  }>();

  const { data: agendamento } = useQuery({
    queryKey: ["agendamentos", agendamentoData],
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

  useEffect(() => {
    refetch();
  }, [selected.data, selected.sala]);

  function selectDayHandler(interval: string) {
    onSelection(interval);
    if (toggleModal) {
      toggleModal();
    }
  }

  if (isLoading) {
    return;
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
        {user?.isTecnico && <Button color="red">Desmarcar</Button>}
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
