import { View } from "react-native";
import DaySelector from "../horario/DaySelector";
import Select from "../form/Select";
import { SALAS } from "@/interfaces/Sala";

import CalendarList from "../horario/CalendarList";
import { Agendamento } from "@/interfaces/Agendamento";

type GrupoHorarioProps = {
  inputHandler: (field: keyof Agendamento, text: string) => void;
  toggleDialog: () => void;
  selected: Omit<Agendamento, "id">;
};
export default function GrupoHorario({
  inputHandler,
  toggleDialog,
  selected,
}: GrupoHorarioProps) {
  function confirmHandler(horario: string) {
    inputHandler("horario", horario);
    toggleDialog();
  }

  return (
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
  );
}
