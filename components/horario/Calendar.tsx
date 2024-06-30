import { View } from "react-native";

import CalendarList from "./CalendarList";
import DaySelector from "./DaySelector";
import RoomSelector from "./RoomSelector";

import { Agendamento } from "@/interfaces/Agendamento";

export type Day = {
  formatted: string;
  date: Date;
  day: number;
};

type CalendarProps = {
  onSelection: (field: keyof Agendamento, text: string) => void;
  toggleModal: () => void;
};
export default function Calendar({ onSelection, toggleModal }: CalendarProps) {
  return (
    <View style={{ flex: 1, marginTop: "4%" }}>
      <DaySelector onSelection={onSelection.bind(null, "dia")} format="day" />
      <RoomSelector />
      <CalendarList
        onSelection={onSelection.bind(null, "horario")}
        toggleModal={toggleModal}
      />
    </View>
  );
}
