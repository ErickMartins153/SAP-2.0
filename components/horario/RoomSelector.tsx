import { Pressable, StyleSheet } from "react-native";

import StyledText from "../UI/StyledText";
import Icon from "../general/Icon";
import { Colors } from "@/constants/Colors";
import useBottomSheet from "@/hooks/useBottom";
import { useQuery } from "@tanstack/react-query";
import { getSalaById } from "@/util/requests/salaHTTP";
import useAuth from "@/hooks/useAuth";

export default function RoomSelector() {
  const { token } = useAuth();
  const { openBottom, selectedValue } = useBottomSheet();
  const { data: sala } = useQuery({
    queryKey: ["salas", selectedValue],
    enabled: !!selectedValue,
    queryFn: () => getSalaById(selectedValue!, token!),
  });

  return (
    <Pressable
      style={({ pressed }) => [styles.mainContainer, pressed && styles.pressed]}
      onPress={openBottom}
    >
      <StyledText size="big" color="white">
        {sala ? sala?.nome : "Selecione a sala desejada"}
      </StyledText>
      <Icon name="chevron-down" size={28} color="white" onPress={openBottom} />
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
