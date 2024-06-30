import { ScrollView, StyleSheet } from "react-native";
import CalendarItem from "./CalendarItem";
import { getTimeIntervals } from "@/util/dateUtils";

type CalendarListProps = {
  onSelection: (horario: string) => void;
  toggleModal?: () => void;
};

const intervals = getTimeIntervals();

export default function CalendarList({
  onSelection,
  toggleModal,
}: CalendarListProps) {
  function selectDayHandler(interval: string) {
    onSelection(interval);
    if (toggleModal) {
      toggleModal();
    }
  }
  return (
    <ScrollView style={styles.rootContainer}>
      {intervals.map((interval, index) => (
        <CalendarItem
          lastIndex={false}
          id={index.toString()}
          timeInterval={interval}
          available={index % 2 === 0}
          key={interval}
          onPress={selectDayHandler.bind(null, interval)}
        />
      ))}
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
