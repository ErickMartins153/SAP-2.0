import useAuth from "@/hooks/useAuth";
import { Agendamento } from "@/interfaces/Agendamento";
import { FlatList } from "react-native";
import SolicitacaoItem from "./SolicitacaoItem";

type SolicitacoesListProps = {
  agendamentos: Agendamento[];
  onSelectAtividade: (id: string) => void;
};

export default function SolicitacoesList({
  agendamentos,
  onSelectAtividade,
}: SolicitacoesListProps) {
  const { user } = useAuth();

  function renderSolicitacaoHandler(solicitacao: Agendamento) {
    return (
      <SolicitacaoItem
        solicitacao={solicitacao}
        onSelect={() => onSelectAtividade(solicitacao.id)}
        key={solicitacao.id}
      />
    );
  }

  return (
    <FlatList
      data={agendamentos}
      renderItem={({ item }) => renderSolicitacaoHandler(item)}
      contentContainerStyle={{ paddingVertical: "8%", gap: 12 }}
    />
  );
}
