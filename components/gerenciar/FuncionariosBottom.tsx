import Funcionario from "@/interfaces/Funcionario";
import { Alert, StyleSheet, View } from "react-native";
import Input from "../general/Input";

import FuncionarioItem from "./FuncionarioItem";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import Icon from "../general/Icon";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import StyledText from "../UI/StyledText";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  toggleAtivacaoFuncionario,
  getFuncionariosAtivos,
  getFuncionariosInativos,
} from "@/util/requests/funcionarioHTTP";
import { queryClient } from "@/util/queries";
import useAuth from "@/hooks/useAuth";
import Loading from "../UI/Loading";

type FuncionariosBottomProps = {
  mode: "ATIVOS" | "INATIVOS";
};

export default function FuncionariosBottom({ mode }: FuncionariosBottomProps) {
  const { token } = useAuth();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const {
    data: funcionariosAtivos,
    isLoading: loadingAtivos,
    refetch: refetchAtivos,
  } = useQuery({
    queryKey: ["funcionarios", "ativos"],
    queryFn: () => getFuncionariosAtivos(token!),
    enabled: mode === "ATIVOS",
  });

  const { data: funcionariosInativos, isLoading: loadingInativos } = useQuery({
    queryKey: ["funcionarios", "inativos"],
    queryFn: () => getFuncionariosInativos(token!),
    enabled: mode === "INATIVOS",
  });

  useEffect(() => {
    if (mode === "ATIVOS" && funcionariosAtivos) {
      setFuncionarios(funcionariosAtivos);
    } else if (mode === "INATIVOS" && funcionariosInativos) {
      setFuncionarios(funcionariosInativos);
    }
  }, [funcionariosAtivos, funcionariosInativos]);

  const { mutate } = useMutation({
    mutationFn: toggleAtivacaoFuncionario,
    onSuccess: (funcionario) => {
      queryClient.invalidateQueries({
        queryKey: ["funcionarios"],
      });

      refetchAtivos();
      Alert.alert(
        "Funcionário desligado com sucesso",
        `O funcionário de email: ${funcionario?.email} foi desligado com sucesso! `
      );
    },
  });

  function confirmHandler(funcionario: Funcionario) {
    if (mode === "ATIVOS") {
      Alert.alert(
        "Você tem certeza?",
        `Uma vez deletado, ${funcionario.nome} ${funcionario.sobrenome} precisará ser registrado novamente`,
        [
          { text: "Cancelar", isPreferred: true },
          {
            text: "Confirmar",
            onPress: () => desativarHandler(funcionario.id),
          },
        ]
      );
    } else {
      Alert.alert(
        "Você tem certeza?",
        `Uma vez reativado, ${funcionario.nome} ${funcionario.sobrenome} poderá acessar o SAP novamente`,
        [
          { text: "Cancelar", isPreferred: true },
          { text: "Confirmar", onPress: () => ativarHandler(funcionario.id) },
        ]
      );
    }
  }

  function desativarHandler(funcionarioId: string) {
    mutate({ funcionarioId, token: token!, mode: "DESATIVAR" });
  }

  function ativarHandler(funcionarioId: string) {
    mutate({ funcionarioId, token: token!, mode: "ATIVAR" });
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

  if (loadingAtivos || loadingInativos) {
    return <Loading showBackdrop={false} />;
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
