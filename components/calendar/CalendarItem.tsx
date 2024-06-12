import { Pressable, StyleSheet, View, Text, Alert } from "react-native";
import { Colors } from "@/constants/Colors";
import StyledText from "../general/StyledText";

type CalendarItemProps = {
  id: string | number;
  lastIndex: boolean;
  timeInterval: string;
};
export default function CalendarItem({
  id,
  lastIndex,
  timeInterval,
}: CalendarItemProps) {
  let appliedStyle = [styles.rootContainer, styles.borderBottom];
  if (lastIndex) {
    appliedStyle.pop();
  }
  return (
    <View style={appliedStyle}>
      <View style={styles.timeContainer}>
        <StyledText mode="big">{timeInterval}</StyledText>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.appointmentContainer,
          pressed && styles.pressed,
        ]}
        onPress={() => {
          Alert.alert("Em breve!");
        }}
      >
        <Text style={{ color: Colors.white, fontWeight: "bold" }}>Ocupado</Text>
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
    backgroundColor: "#ff3c3c",
  },
  pressed: {
    opacity: 0.85,
  },
});
