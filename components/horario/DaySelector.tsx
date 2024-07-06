import { memo, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import StyledText from "../UI/StyledText";
import { type Day } from "./Calendar";
import { getWeekDays } from "@/util/dateUtils";

const todayDate = new Date();

type DaySelectorProps = {
  onSelection: (date: string) => void;
};

const DaySelector = ({ onSelection }: DaySelectorProps) => {
  const today = todayDate.getDate();
  const [week, setWeek] = useState<Day[]>([]);
  const [selectedDay, setSelectedDay] = useState(today);

  useLayoutEffect(() => {
    const weekDays = getWeekDays(todayDate);
    setWeek(weekDays);
  }, [todayDate]);

  useEffect(() => {
    if (week[0]) {
      onSelection(week[0].date.toLocaleDateString());
    }
  }, []);

  function handleSelectedDay(day: Day) {
    setSelectedDay(day.day);

    onSelection(day.date.toLocaleDateString());
  }

  return (
    <View style={styles.container}>
      {week.map((weekDay) => {
        const formatted = weekDay.formatted.slice(0, 3) + ".";

        return (
          <View key={weekDay.formatted}>
            <Pressable
              style={({ pressed }) => [
                styles.dateContainer,
                selectedDay === weekDay.day && styles.selectedDayContainer,
                pressed && styles.pressed,
              ]}
              onPress={() => handleSelectedDay(weekDay)}
            >
              <StyledText
                style={[
                  styles.text,
                  selectedDay === weekDay.day && styles.selectedDay,
                  today === weekDay.day && styles.today,
                  { textTransform: "capitalize" },
                ]}
              >
                {formatted}
              </StyledText>
              <View>
                <StyledText
                  style={[
                    styles.text,
                    styles.weekDayNumber,
                    selectedDay === weekDay.day && styles.selectedDay,
                  ]}
                >
                  {weekDay.day}
                </StyledText>
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: "4%",
    backgroundColor: Colors.scheduleHeader,
    borderRadius: 4,
    elevation: 2,
  },
  dateContainer: {
    alignItems: "center",
  },
  text: {
    color: Colors.white,
  },
  selectedDay: {
    fontWeight: "bold",
  },
  weekDayNumber: {
    padding: 4,
  },
  selectedDayContainer: {
    backgroundColor: "#705344",
    minWidth: "14%",
    padding: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.25,
  },
  selectedDayText: {},
  today: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
  },
});

export default memo(DaySelector);
