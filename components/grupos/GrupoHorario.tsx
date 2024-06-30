import { View } from "react-native";
import DaySelector from "../horario/DaySelector";
import Select from "../form/Select";
import { SALAS } from "@/interfaces/Sala";

import CalendarList from "../horario/CalendarList";
import { Agendamento } from "@/interfaces/Agendamento";

type GrupoHorarioProps = {
  inputHandler: (field: keyof Agendamento, text: string) => void;
  format: "name" | "day";
  toggleDialog: () => void;
};
export default function GrupoHorario({
  inputHandler,
  toggleDialog,
  format = "day",
}: GrupoHorarioProps) {
  function confirmHandler(horario: string) {
    inputHandler("horario", horario);
    toggleDialog();
  }
  return (
    <View style={{ marginVertical: "4%", gap: 24 }}>
      <DaySelector
        onSelection={inputHandler.bind(null, "dia")}
        format={format}
      />
      <Select
        data={SALAS}
        onSelect={inputHandler.bind(null, "sala")}
        placeholder="Sala"
        key="salas"
      />
      <CalendarList onSelection={confirmHandler} />
    </View>
  );
}
