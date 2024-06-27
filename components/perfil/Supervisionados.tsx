import { StyleSheet } from "react-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import Funcionario from "@/interfaces/Funcionario";
import FuncionarioItem from "../gerenciar/FuncionarioItem";

import StyledText from "../UI/StyledText";

type SupervisionadosProps = {
  supervisionados: Funcionario[];
  onSelect: (funcionario: Funcionario) => void;
};

export default function Supervisionados({
  supervisionados,
  onSelect,
}: SupervisionadosProps) {
  function renderSupervisionado(funcionario: Funcionario) {
    return <FuncionarioItem funcionario={funcionario} onSelect={onSelect} />;
  }

  return (
    <BottomSheetFlatList
      ListEmptyComponent={
        <StyledText textAlign="center">
          Você ainda não possui nenhum supervisionado.
        </StyledText>
      }
      data={supervisionados}
      renderItem={({ item }) => renderSupervisionado(item)}
      keyExtractor={({ id }) => id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: "4%",
  },
});
