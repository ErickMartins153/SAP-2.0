import { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ptBR from "date-fns/locale/pt-BR";
import { addDays, format, getDate, startOfWeek } from "date-fns";

import { Colors } from "@/constants/Colors";
import StyledText from "../general/StyledText";
import { type Day } from "./Calendar";

const todayDate = new Date();

export default function DaySelector() {
  const today = todayDate.getDate();

  const [week, setWeek] = useState<Day[]>([]);
  const [selectedDay, setSelectedDay] = useState(today);

  useLayoutEffect(() => {
    const weekDays = getWeekDays(todayDate);
    setWeek(weekDays);
  }, [todayDate]);

  function handleSelectedDay(day: number) {
    setSelectedDay(day);
  }

  return (
    <View style={styles.container}>
      {week.map((weekDay) => {
        const formatted = weekDay.formatted.slice(0, 3) + ".";

        return (
          <View key={weekDay.formatted}>
            <Pressable
              style={({ pressed }) => [pressed && styles.pressed]}
              onPress={() => handleSelectedDay(weekDay.day)}
            >
              <StyledText
                style={[
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
}

export function getWeekDays(date: Date) {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  const final = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    final.push({
      // @ts-expect-error
      formatted: format(date, "EEE", { locale: ptBR }),
      date,
      day: getDate(date),
    });
  }
  return final;
}

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
  selectedDay: {
    color: Colors.white,
    fontWeight: "bold",
  },
  weekDayNumber: {
    color: "black",
    padding: 6,
    borderRadius: 99,
    minWidth: 30,
  },
  selectedDayContainer: {
    color: Colors.button,
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: Colors.border,
  },
  pressed: {
    opacity: 0.25,
  },
  selectedDayText: {
    color: Colors.white,
  },
  today: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
});
