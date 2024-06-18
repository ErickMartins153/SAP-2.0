import { ScrollView, StyleSheet } from "react-native";
import CalendarItem from "./CalendarItem";

export default function CalendarList() {
  return (
    <ScrollView style={styles.rootContainer}>
      <CalendarItem
        lastIndex={false}
        id={1}
        timeInterval="10:20 - 11:10"
        available={false}
      />
      <CalendarItem
        lastIndex={false}
        id={2}
        timeInterval="11:10 - 12:00"
        available={false}
      />
      <CalendarItem
        lastIndex={false}
        id={3}
        timeInterval="12:00 - 12:50"
        available={false}
      />
      <CalendarItem
        lastIndex={false}
        id={4}
        timeInterval="12:50 - 13:40"
        available={false}
      />
      {/* Pausa de 2 horas */}
      <CalendarItem
        lastIndex={false}
        id={5}
        timeInterval="15:30 - 16:20"
        available
      />
      <CalendarItem
        lastIndex={false}
        id={6}
        timeInterval="16:20 - 17:10"
        available={false}
      />
      <CalendarItem
        lastIndex={false}
        id={7}
        timeInterval="17:10 - 18:00"
        available={false}
      />
      <CalendarItem
        lastIndex={false}
        id={8}
        timeInterval="18:00 - 18:50"
        available
      />
      <CalendarItem
        lastIndex={false}
        id={9}
        timeInterval="18:50 - 19:40"
        available
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 2,
    overflow: "hidden",
  },
});