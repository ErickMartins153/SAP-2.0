import { View } from "react-native";
import DaySelector from "../horario/DaySelector";
import Select from "../form/Select";

import CalendarList from "../horario/CalendarList";
import { NewAgendamento } from "@/interfaces/Agendamento";
import ModalLayout from "../layouts/ModalLayout";
import { useQuery } from "@tanstack/react-query";
import { getSalas } from "@/util/requests/salaHTTP";
import useAuth from "@/hooks/useAuth";

type GrupoHorarioProps = {
  inputHandler: (field: keyof NewAgendamento, text: string) => void;
  toggleModal: () => void;
  toggleDialog: () => void;
  selected: NewAgendamento;
};

export default function GrupoHorario({
  inputHandler,
  toggleModal,
  toggleDialog,
  selected,
}: GrupoHorarioProps) {
  const { token } = useAuth();
  const { data: salas } = useQuery({
    queryKey: ["salas"],
    queryFn: () => getSalas(token!),
    initialData: [],
  });
  function confirmHandler(horario: string) {
    inputHandler("horario", horario);
    toggleDialog();
  }

  return (
    <ModalLayout toggleModal={toggleModal}>
      <View style={{ marginVertical: "4%", gap: 24 }}>
        <DaySelector onSelection={inputHandler.bind(null, "data")} />
        <Select
          data={salas || []}
          onSelect={inputHandler.bind(null, "idSala")}
          placeholder="Selecione a sala desejada"
          key="salas"
        />
        <CalendarList
          onSelection={confirmHandler}
          selected={selected}
          scrollEnabled={false}
        />
      </View>
    </ModalLayout>
  );
}
