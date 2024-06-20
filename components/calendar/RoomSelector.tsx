import { Pressable, StyleSheet } from "react-native";

import StyledText from "../general/StyledText";
import Icon from "../general/Icon";
import { Colors } from "@/constants/Colors";
import useModal from "@/hooks/useModal";

export default function RoomSelector() {
  const { openModal: toggleModalHandler, selectedValue } = useModal();
  return (
    <Pressable
      style={({ pressed }) => [styles.mainContainer, pressed && styles.pressed]}
      onPress={toggleModalHandler}
    >
      <StyledText mode="big" color="white">
        {selectedValue ?? "Selecione a sala desejada"}
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
