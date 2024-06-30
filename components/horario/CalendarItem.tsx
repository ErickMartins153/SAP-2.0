import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Alert,
  PressableProps,
} from "react-native";
import { Colors } from "@/constants/Colors";
import StyledText from "../UI/StyledText";
import { PropsWithoutRef } from "react";

type CalendarItemProps = {
  id: string | number;
  lastIndex: boolean;
  timeInterval: string;
  available: boolean;
  onPress: () => void;
} & PropsWithoutRef<PressableProps>;

export default function CalendarItem({
  id,
  lastIndex,
  timeInterval,
  available,
  disabled,
  onPress,
}: CalendarItemProps) {
  let appliedStyle = [styles.rootContainer, styles.borderBottom];
  let availableText = available ? "Disponivel" : "Ocupado";
  if (lastIndex) {
    appliedStyle.pop();
  }

  function unavailableHandler() {
    Alert.alert(
      "Sala ocupada ",
      "Por favor, escolha outro horário ou outra sala"
    );
  }

  return (
    <View style={appliedStyle}>
      <View style={styles.timeContainer}>
        <StyledText mode="big">{timeInterval}</StyledText>
      </View>
      <Pressable
        style={({ pressed }) => [
          available ? styles.available : styles.occupied,
          styles.appointmentContainer,
          pressed && styles.pressed,
        ]}
        disabled={disabled}
        onPress={available ? onPress : unavailableHandler}
      >
        <Text style={[styles.text]}>{availableText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    elevation: 4,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  timeContainer: {
    flex: 1,
    borderRightWidth: 1,
    paddingVertical: "6%",
    paddingHorizontal: "2%",
  },
  appointmentContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  occupied: {
    backgroundColor: Colors.red,
  },
  available: {
    backgroundColor: Colors.green,
  },
  text: {
    color: Colors.white,
    fontWeight: "bold",
  },
  occupiedText: {
    color: Colors.scheduleHeader,
  },
  pressed: {
    opacity: 0.85,
  },
});
