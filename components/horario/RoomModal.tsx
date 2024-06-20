import { FlatList, StyleSheet } from "react-native";
import StyledText from "../general/StyledText";
import Sala, { SALAS, TipoSala } from "@/interfaces/Sala";
import Button from "../general/Button";
import useModal from "@/hooks/useModal";

export default function RoomModal() {
  const { onSelectValue } = useModal();
  function renderSalaHandler(sala: Sala) {
    let content: string;
    if (sala.tipoSala === TipoSala.GRUPO) {
      content = "Sala de Grupo";
    } else if (sala.tipoSala === TipoSala.INDIVIDUAL) {
      content = `Sala ${sala.idSala}`;
    } else {
      content = "Sala Infantil";
    }
    return <Button onPress={() => onSelectValue(content)}>{content}</Button>;
  }

  return (
    <>
      <StyledText mode="title" textAlign="center" fontWeight="bold">
        Salas
      </StyledText>
      <FlatList
        data={SALAS}
        renderItem={({ item }) => renderSalaHandler(item)}
        keyExtractor={({ idSala }) => idSala}
        contentContainerStyle={styles.items}
      />
    </>
  );
}

const styles = StyleSheet.create({
  items: {
    marginVertical: "12%",
    gap: 12,
  },
});
