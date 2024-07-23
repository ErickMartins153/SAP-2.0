import { StyleSheet } from "react-native";
import StyledText from "../UI/StyledText";
import Sala from "@/interfaces/Sala";
import Button from "../general/Button";
import useBottomSheet from "@/hooks/useBottom";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import { getSalas } from "@/util/requests/salaHTTP";
import useAuth from "@/hooks/useAuth";

export default function RoomBottom() {
  const { token } = useAuth();
  const { data: salas } = useQuery({
    queryKey: ["salas"],
    queryFn: () => getSalas(token!),
    initialData: [],
  });

  const { onSelectValue } = useBottomSheet();
  function renderSalaHandler(sala: Sala) {
    return (
      <Button onPress={() => onSelectValue(sala.uid)} key={sala.uid}>
        {sala.nome}
      </Button>
    );
  }

  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <StyledText size="title" textAlign="center" fontWeight="bold">
          Salas
        </StyledText>
      }
      data={salas}
      renderItem={({ item }) => renderSalaHandler(item)}
      keyExtractor={({ uid: idSala }) => idSala}
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
