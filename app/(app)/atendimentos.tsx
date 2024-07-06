import StyledText from "@/components/UI/StyledText";
import AgendamentoItem from "@/components/atendimento/AtendimentoItem";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import useAuth from "@/hooks/useAuth";
import { Agendamento } from "@/interfaces/Agendamento";
import { getAgendamentosByFuncionario } from "@/util/requests/agendamentoHTTP";
import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";

export default function Atendimentos() {
  const { user } = useAuth();
  const {
    data: agendamentos,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!user?.id,
    queryKey: ["agendamentos", user!.id],
    queryFn: () => getAgendamentosByFuncionario(user!.id),
  });

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
