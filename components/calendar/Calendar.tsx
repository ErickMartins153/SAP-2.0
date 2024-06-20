import { View } from "react-native";

import CalendarList from "./CalendarList";
import DaySelector from "./DaySelector";
import RoomSelector from "./RoomSelector";

export type Day = {
  formatted: string;
  date: Date;
  day: number;
};

export default function Calendar() {
  return (
    <View style={{ flex: 1, marginTop: "4%" }}>
      <DaySelector />
      <RoomSelector />
      <CalendarList />
    </View>
  );
}
