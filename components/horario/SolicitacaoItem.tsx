import { Pressable, StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import StyledText from "../UI/StyledText";
import UserAvatar from "../UI/UserAvatar";
import { Colors } from "@/constants/Colors";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";

import { memo } from "react";
import useAuth from "@/hooks/useAuth";
import { Agendamento } from "@/interfaces/Agendamento";
import InfoBox from "../UI/InfoBox";
import ItemLayout from "../layouts/ItemLayout";

type SolicitacaoItemProps = {
  solicitacao: Agendamento;
  onSelect: () => void;
};

const SolicitacaoItem = ({ solicitacao, onSelect }: SolicitacaoItemProps) => {
  const { user, token } = useAuth();
  const { data: selectedFuncionario } = useQuery({
    enabled: !!solicitacao?.idResponsavel,
    queryKey: ["funcionarios", solicitacao?.idResponsavel],
    queryFn: () => getFuncionarioById(solicitacao?.idResponsavel!, token!),
  });

  return (
    <ItemLayout onSelect={onSelect}>
      <StyledText size="big" fontWeight="bold">
        {selectedFuncionario?.nome} {selectedFuncionario?.sobrenome}
      </StyledText>
      <InfoBox content={solicitacao.data!} label="Data" />
      <InfoBox content={solicitacao.horario!} label="Horário" />
      <InfoBox content={solicitacao.nomeSala!} label="Sala" />
      <InfoBox
        content={solicitacao.recorrente ? "Sim" : "Não"}
        label="Recorrente"
      />
    </ItemLayout>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    borderWidth: 2,
    padding: "2%",
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: "4%",
    gap: 4,
  },
  text: {
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
    marginBottom: "2%",
  },
});

export default memo(SolicitacaoItem);
