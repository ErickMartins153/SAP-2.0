import { StyleSheet, View } from "react-native";
import StyledText from "../UI/StyledText";

import useBottomSheet from "@/hooks/useBottom";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { getGruposEstudoDisponiveis } from "@/util/requests/GrupoEstudoHTTP";
import GrupoItem from "./GrupoItem";
import Button from "../general/Button";
import { getGruposDisponiveis } from "@/util/requests/GrupoTerapeuticoHTTP";
import GrupoTerapeutico from "@/interfaces/GrupoTerapeutico";

export default function GrupoBottom({
  toggleModal,
  mode,
}: {
  toggleModal: () => void;
  mode: "estudo" | "terapeutico";
}) {
  const { user, token } = useAuth();
  const { closeBottom } = useBottomSheet();
  const groupMode = mode === "estudo" ? "de Estudo" : "Terapêutico";

  const { data: gruposEstudoDisponiveis } = useQuery({
    queryKey: ["grupos", "estudo", "disponiveis", user?.id],
    enabled: !!user?.id && mode === "estudo",
    queryFn: () => getGruposEstudoDisponiveis(user!.id, token!),
  });

  const { data: gruposTerapeuticosDisponiveis } = useQuery({
    queryKey: ["grupos", "terapeuticos", "disponiveis", user?.id],
    enabled: !!user?.id && mode === "terapeutico",
    queryFn: () => getGruposDisponiveis(user!.id, token!),
  });

  function renderSalaHandler(grupo: GrupoEstudo | GrupoTerapeutico) {
    return <GrupoItem grupoId={grupo} key={grupo.id} onPress={closeBottom} />;
  }

  const suggestionText =
    user?.cargo === "TECNICO"
      ? "Seja a primeira pessoa a criar um grupo!"
      : "Se desejar, solicite a algum técnico que crie um novo grupo.";

  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <View style={{ gap: 16, borderBottomWidth: 1, paddingBottom: "4%" }}>
          <StyledText size="title" textAlign="center" fontWeight="bold">
            Grupos disponíveis
          </StyledText>
          {user?.cargo === "TECNICO" && (
            <Button onPress={toggleModal}>Criar Grupo</Button>
          )}
        </View>
      }
      ListEmptyComponent={
        <View style={{ marginVertical: "12%" }}>
          <StyledText size="big" textAlign="center" fontWeight="bold">
            Não há nenhum grupo {groupMode} disponível no momento.{" "}
            {suggestionText}
          </StyledText>
        </View>
      }
      // @ts-expect-error
      data={
        mode === "estudo"
          ? gruposEstudoDisponiveis
          : gruposTerapeuticosDisponiveis
      }
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
