import { View } from "react-native";

import CalendarList from "./CalendarList";
import DaySelector from "./DaySelector";
import RoomSelector from "./RoomSelector";

export type Day = {
  formatted: string;
  date: Date;
  day: number;
};

type CalendarProps = {
  onShowModal: () => void;
};

export default function Calendar({ onShowModal }: CalendarProps) {
  return (
    <View style={{ flex: 1, marginTop: "4%" }}>
      <DaySelector />
      <RoomSelector onPress={onShowModal} />
      <CalendarList />
    </View>
  );
}
