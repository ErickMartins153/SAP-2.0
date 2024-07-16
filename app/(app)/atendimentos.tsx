import StyledText from "@/components/UI/StyledText";
import AgendamentoItem from "@/components/atendimento/AtendimentoItem";
import Icon from "@/components/general/Icon";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import useAuth from "@/hooks/useAuth";
import { Agendamento } from "@/interfaces/Agendamento";
import { getAgendamentosByFuncionario } from "@/util/requests/agendamentoHTTP";
import { useQuery } from "@tanstack/react-query";
import { router, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { FlatList, View } from "react-native";

export default function Atendimentos() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const {
    data: agendamentos,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!user?.id,
    queryKey: ["agendamentos", user!.id],
    queryFn: () => getAgendamentosByFuncionario(user!.id),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="plus"
          style={{
            paddingRight: "8%",
            paddingLeft: "20%",
            height: "100%",
            justifyContent: "center",
          }}
          onPress={() => router.navigate("horarios")}
        />
      ),
    });
  }, [navigation]);

  function renderAgendamentosHandler(agendamento: Agendamento) {
    return <AgendamentoItem agendamento={agendamento} />;
  }

  return (
    <MainPageLayout isLoading={isLoading}>
      <FlatList
        data={agendamentos}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => renderAgendamentosHandler(item)}
        ListEmptyComponent={
          <View style={{ marginTop: "50%" }}>
            <StyledText mode="big" textAlign="center">
              Você não possui nenhum horário agendado!
            </StyledText>
          </View>
        }
      />
    </MainPageLayout>
  );
}
