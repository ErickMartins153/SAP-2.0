import { StyleSheet, View } from "react-native";
import StyledText from "../UI/StyledText";

import useBottomSheet from "@/hooks/useBottom";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { getGruposDisponiveis } from "@/util/requests/GrupoEstudoHTTP";
import GrupoItem from "./GrupoItem";
import Button from "../general/Button";

export default function GrupoBottom({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const { user } = useAuth();
  const { closeBottom } = useBottomSheet();

  const { data: gruposDisponiveis } = useQuery({
    queryKey: ["grupos", "disponiveis", user?.id],
    enabled: !!user?.id,
    queryFn: () => getGruposDisponiveis(user!.id),
  });

  function renderSalaHandler(grupo: GrupoEstudo) {
    return <GrupoItem grupo={grupo} key={grupo.id} onPress={closeBottom} />;
  }

  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <View style={{ gap: 16, borderBottomWidth: 1, paddingBottom: "4%" }}>
          <StyledText mode="title" textAlign="center" fontWeight="bold">
            Grupos disponíveis
          </StyledText>
          {user?.cargo === "TECNICO" && (
            <Button onPress={toggleModal}>Criar Grupo</Button>
          )}
        </View>
      }
      data={gruposDisponiveis}
      renderItem={({ item }) => renderSalaHandler(item)}
      keyExtractor={({ id }) => id}
      contentContainerStyle={styles.items}
    />
  );
}

const styles = StyleSheet.create({
  items: {
    paddingBottom: "4%",
  },
});
