import Funcionario from "@/interfaces/Funcionario";
import { Alert, StyleSheet, View } from "react-native";
import Input from "../general/Input";

import FuncionarioItem from "./FuncionarioItem";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import Icon from "../general/Icon";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import StyledText from "../UI/StyledText";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteFuncionario,
  getFuncionariosAtivos,
} from "@/util/requests/funcionarioHTTP";
import { queryClient } from "@/util/queries";

export default function FuncionariosBottom() {
  const {
    data: funcionarios,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["funcionarios"],
    queryFn: getFuncionariosAtivos,
  });
  const { mutate } = useMutation({
    mutationFn: deleteFuncionario,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["funcionarios"],
      }),
  });

  function confirmHandler(funcionario: Funcionario) {
    Alert.alert(
      "Você tem certeza?",
      `Uma vez deletado, ${funcionario.nome} ${funcionario.sobrenome} precisará ser registrado novamente`,
      [
        { text: "Cancelar", isPreferred: true },
        { text: "Confirmar", onPress: () => deleteHandler(funcionario.id) },
      ]
    );
  }

  function deleteHandler(funcionarioId: string) {
    mutate(funcionarioId);
  }

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
    return (
      <FuncionarioItem funcionario={funcionario} onSelect={confirmHandler} />
    );
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
