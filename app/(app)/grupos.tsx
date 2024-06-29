import StyledText from "@/components/UI/StyledText";
import GrupoItem from "@/components/grupos/GrupoItem";
import MainPageLayout from "@/components/layouts/MainPageLayout";

import useAuth from "@/hooks/useAuth";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import { getGruposByFuncionario } from "@/util/requests/GrupoEstudoHTTP";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet } from "react-native";

export default function MeusGrupos() {
  const { user } = useAuth();
  const {
    data: gruposEstudo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["grupos", "estudo", user!.id],
    enabled: !!user?.id,
    queryFn: () => getGruposByFuncionario(user!.id),
  });

  function renderGrupoHandler(grupo: GrupoEstudo) {
    return <GrupoItem {...grupo} key={grupo.id} />;
  }

  return (
    <MainPageLayout>
      {gruposEstudo && (
        <FlatList
          ListHeaderComponent={
            <StyledText mode="title" fontWeight="bold" textAlign="center">
              Grupos de estudo
            </StyledText>
          }
          contentContainerStyle={styles.list}
          data={gruposEstudo}
          renderItem={({ item }) => renderGrupoHandler(item)}
        />
      )}
    </MainPageLayout>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: "2%",
    marginVertical: "2%",
  },
});
