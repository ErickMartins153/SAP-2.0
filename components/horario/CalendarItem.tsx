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
} & PropsWithoutRef<PressableProps>;

export default function CalendarItem({
  id,
  lastIndex,
  timeInterval,
  available,
  onPress,
  disabled,
  ...props
}: CalendarItemProps) {
  let appliedStyle = [styles.rootContainer, styles.borderBottom];
  let availableText = available ? "Disponível" : "Ocupado";
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
          disabled && styles.disabled,
          pressed && styles.pressed,
        ]}
        onPress={onPress}
        {...props}
      >
        <Text style={[styles.text, disabled && { color: Colors.text }]}>
          {disabled ? "Escolha uma sala" : availableText}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    elevation: 4,
    flex: 1,
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
  disabled: {
    backgroundColor: Colors.lightRipple,
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
