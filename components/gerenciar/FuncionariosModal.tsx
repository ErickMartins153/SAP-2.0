import Funcionario from "@/interfaces/Funcionario";
import { StyleSheet, View } from "react-native";
import Input from "../general/Input";

import FuncionarioItem from "./FuncionarioItem";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import Icon from "../general/Icon";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import StyledText from "../general/StyledText";
import { useQuery } from "@tanstack/react-query";
import { getFuncionarios } from "@/util/funcionarioHTTP";

export default function FuncionariosModal() {
  const {
    data: funcionarios,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["funcionarios"],
    queryFn: getFuncionarios,
  });

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<Funcionario[]>([]);

  function searchHandler(text: string) {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredUsers(funcionarios!);
    } else {
      const filterUsers = funcionarios!.filter((funcionario) =>
        funcionario.nome.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filterUsers);
    }
  }

  function renderFuncionariosHandler(funcionario: Funcionario) {
    return <FuncionarioItem funcionario={funcionario} />;
  }

  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <View
          style={{
            borderBottomWidth: 1,
            backgroundColor: Colors.background,
          }}
        >
          <Input
            placeholder="Nome do funcionário"
            style={{ margin: 0, width: "100%" }}
            value={search}
            onChangeText={searchHandler}
            leftIcon={<Icon name="search" />}
          />
        </View>
      }
      stickyHeaderIndices={[0]}
      data={
        filteredUsers.length < 1 && search.trim() === ""
          ? funcionarios
          : filteredUsers
      }
      renderItem={({ item }) => renderFuncionariosHandler(item)}
      keyExtractor={({ id }) => id}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <StyledText textAlign="center">
          Nenhum funcionário encontrado
        </StyledText>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
