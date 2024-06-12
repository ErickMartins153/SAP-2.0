import { View } from "react-native";

import CalendarList from "./CalendarList";
import DaySelector from "./DaySelector";

export type Day = {
  formatted: string;
  date: Date;
  day: number;
};

export default function Calendar() {
  return (
    <View style={{ flex: 1 }}>
      <DaySelector />
      <CalendarList />
    </View>
  );
}
