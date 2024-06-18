import { Pressable, StyleSheet } from "react-native";

import StyledText from "../general/StyledText";
import Icon from "../general/Icon";
import { Colors } from "@/constants/Colors";

type RoomSelectorProps = {
  onPress?: () => void;
};

export default function RoomSelector({ onPress }: RoomSelectorProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.mainContainer, pressed && styles.pressed]}
      onPress={onPress}
    >
      <StyledText mode="big" color="white">
        Selecione a sala desejada
      </StyledText>
      <Icon name="chevron-down" size={28} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    marginVertical: "6%",
    borderRadius: 4,
    padding: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: Colors.button,
  },
  pressed: {
    opacity: 0.85,
  },
});
