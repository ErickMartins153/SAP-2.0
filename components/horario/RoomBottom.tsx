import { StyleSheet } from "react-native";
import StyledText from "../UI/StyledText";
import Sala, { SALAS } from "@/interfaces/Sala";
import Button from "../general/Button";
import useBottomSheet from "@/hooks/useBottom";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export default function RoomBottom() {
  const { onSelectValue } = useBottomSheet();
  function renderSalaHandler(sala: Sala) {
    return (
      <Button onPress={() => onSelectValue(sala.nome)}>{sala.nome}</Button>
    );
  }

  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <StyledText mode="title" textAlign="center" fontWeight="bold">
          Salas
        </StyledText>
      }
      data={SALAS}
      renderItem={({ item }) => renderSalaHandler(item)}
      keyExtractor={({ id: idSala }) => idSala}
      contentContainerStyle={styles.items}
    ></BottomSheetFlatList>
  );
}

const styles = StyleSheet.create({
  items: {
    marginVertical: "12%",
    gap: 12,
  },
});
