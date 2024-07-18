import { View } from "react-native";
import DaySelector from "../horario/DaySelector";
import Select from "../form/Select";
import { SALAS } from "@/interfaces/Sala";

import CalendarList from "../horario/CalendarList";
import { NewAgendamento } from "@/interfaces/Agendamento";
import ModalLayout from "../layouts/ModalLayout";

type GrupoHorarioProps = {
  inputHandler: (field: keyof NewAgendamento, text: string) => void;
  toggleModal: () => void;
  selected: NewAgendamento;
};

export default function GrupoHorario({
  inputHandler,
  toggleModal,
  selected,
}: GrupoHorarioProps) {
  function confirmHandler(horario: string) {
    inputHandler("horario", horario);
    toggleModal();
  }

  return (
    <ModalLayout toggleModal={toggleModal}>
      <View style={{ marginVertical: "4%", gap: 24 }}>
        <DaySelector onSelection={inputHandler.bind(null, "data")} />
        <Select
          data={SALAS}
          onSelect={inputHandler.bind(null, "sala")}
          placeholder="Sala"
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
