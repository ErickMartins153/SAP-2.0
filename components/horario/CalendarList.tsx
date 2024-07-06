import { FlatList, FlatListProps, StyleSheet } from "react-native";
import CalendarItem from "./CalendarItem";
import { getTimeIntervals } from "@/util/dateUtils";
import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";
import { useQuery } from "@tanstack/react-query";
import { getAgendamentos } from "@/util/requests/agendamentoHTTP";
import { PropsWithoutRef, useEffect } from "react";

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
        onPress={selectDayHandler.bind(null, interval)}
      />
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.rootContainer}
      data={intervals}
      scrollEnabled={scrollEnabled}
      renderItem={renderIntervalItem}
      keyExtractor={(item) => item}
    />
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
