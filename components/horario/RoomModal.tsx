import { StyleSheet } from "react-native";
import StyledText from "../UI/StyledText";
import Sala, { SALAS, TipoSala } from "@/interfaces/Sala";
import Button from "../general/Button";
import useBottomSheet from "@/hooks/useModal";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export default function RoomModal() {
  const { onSelectValue } = useBottomSheet();
  function renderSalaHandler(sala: Sala) {
    let content = `Sala ${sala.idSala}`;
    if (sala.tipoSala === TipoSala.GRUPO) {
      content += " (grupo)";
    }
    return <Button onPress={() => onSelectValue(content)}>{content}</Button>;
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
      keyExtractor={({ idSala }) => idSala}
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
