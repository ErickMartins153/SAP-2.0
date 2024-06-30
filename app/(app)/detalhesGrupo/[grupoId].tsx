import useAuth from "@/hooks/useAuth";
import {
  addParticipante,
  getGrupoById,
  removeParticipante,
} from "@/util/requests/GrupoEstudoHTTP";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import StackPageLayout from "@/components/layouts/StackPageLayout";
import StyledText from "@/components/UI/StyledText";
import { useCallback } from "react";
import { Alert, BackHandler, FlatList, StyleSheet, View } from "react-native";
import InfoBox from "@/components/UI/InfoBox";
import { getFuncionariosByIds } from "@/util/requests/funcionarioHTTP";
import Funcionario from "@/interfaces/Funcionario";
import FuncionarioItem from "@/components/gerenciar/FuncionarioItem";
import Button from "@/components/general/Button";
import { queryClient } from "@/util/queries";
import GrupoEstudo from "@/interfaces/GrupoEstudo";

type mutateProps = {
  participanteId: string;
  grupoId: string;
};

function participa(funcionarioId: string, participantes: string[]) {
  return participantes.includes(funcionarioId);
}

function ministra(funcionarioId: string, ministrantes: string[]) {
  return ministrantes.includes(funcionarioId);
}

export default function detalhesGrupo() {
  const { user } = useAuth();
  const { grupoId } = useLocalSearchParams<{ grupoId: string }>();

  const {
    data: grupoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["grupos", "estudo", grupoId!],
    enabled: !!grupoId,
    queryFn: () => getGrupoById(grupoId!),
  });

  const { data: ministrantes } = useQuery({
    queryKey: ["ministrantes", grupoId],
    enabled: !!grupoId && !!grupoData,
    queryFn: () => getFuncionariosByIds(grupoData!.ministrantesId),
  });

  const { data: participantes, refetch: refetchParticipantes } = useQuery({
    queryKey: ["participantes", grupoId],
    enabled: !!grupoId && !!grupoData,
    queryFn: () => getFuncionariosByIds(grupoData!.participantesId),
  });

  const { mutate: removerGrupo } = useMutation({
    mutationFn: ({ participanteId, grupoId }: mutateProps) =>
      removeParticipante(participanteId, grupoId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
      await refetchParticipantes();
    },
  });

  const { mutate: adicionarGrupo } = useMutation({
    mutationFn: ({ participanteId, grupoId }: mutateProps) =>
      addParticipante(participanteId, grupoId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
      await refetchParticipantes();
      Alert.alert(
        "Entrada confirmada!",
        `Você agora faz parte do grupo ${grupoData?.temaEstudo}!`
      );
    },
  });

  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        router.navigate("grupos");
        return true;
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [router])
  );

  function removeParticipanteHandler(
    funcionario: Funcionario,
    grupo: GrupoEstudo
  ) {
    Alert.alert(
      "Tem certeza?",
      `Você tem certeza que quer remover ${funcionario.nome} do grupo ${grupo.temaEstudo}`,
      [
        { text: "Não", isPreferred: false },
        {
          text: "Sim",
          onPress: () =>
            removerGrupo({ participanteId: funcionario.id, grupoId: grupo.id }),
        },
      ]
    );
  }

  function renderFuncionariosHandler(funcionario: Funcionario) {
    if (ministra(user!.id, grupoData!.ministrantesId)) {
      return (
        <FuncionarioItem
          funcionario={funcionario}
          onSelect={() => removeParticipanteHandler(funcionario, grupoData!)}
        />
      );
    }
    return <FuncionarioItem funcionario={funcionario} onSelect={() => {}} />;
  }

  function alertHandler(mode: "entrar" | "sair") {
    if (mode === "sair") {
      Alert.alert("Confirmar saída?", undefined, [
        { text: "Cancelar" },
        {
          text: "Confirmar",
          onPress: () =>
            removerGrupo({ participanteId: user!.id, grupoId: grupoId! }),
        },
      ]);
    } else {
      adicionarGrupo({ participanteId: user!.id, grupoId: grupoId! });
    }
  }

  if (!grupoData) {
    return;
  }

  return (
    <StackPageLayout isLoading={isLoading} route="grupos">
      <View style={{ flex: 1, marginBottom: "2%" }}>
        <StyledText mode="title" fontWeight="bold" textAlign="center">
          {grupoData?.temaEstudo}
        </StyledText>
        <View style={{ marginTop: "12%", gap: 4 }}>
          <InfoBox label="Data" content={grupoData!.encontro.horario.data} />
          <InfoBox label="Horário" content={grupoData!.encontro.horario.hora} />
          <InfoBox label="Sala" content={grupoData!.encontro.salaId} />
        </View>
        <StyledText
          textAlign="center"
          mode="title"
          style={{ borderBottomWidth: 1 }}
        >
          Ministrantes
        </StyledText>
        <FlatList
          data={ministrantes}
          renderItem={({ item }) => renderFuncionariosHandler(item)}
          style={styles.flatlist}
          contentContainerStyle={styles.flatListContent}
        />
        <StyledText
          textAlign="center"
          mode="title"
          style={{ borderBottomWidth: 1, borderTopWidth: 1, paddingTop: "2%" }}
        >
          Participantes
        </StyledText>
        <FlatList
          data={participantes}
          renderItem={({ item }) => renderFuncionariosHandler(item)}
          contentContainerStyle={styles.flatListContent}
          style={styles.flatlist}
          ListEmptyComponent={
            <StyledText mode="big" textAlign="center">
              Esse grupo ainda não possui nenhum participante
            </StyledText>
          }
        />
      </View>
      <View style={{ marginBottom: "2%", paddingTop: "2%", borderTopWidth: 1 }}>
        {participa(user!.id, grupoData!.participantesId) && (
          <Button color="red" onPress={alertHandler.bind(null, "sair")}>
            Sair do Grupo
          </Button>
        )}
        {!participa(user!.id, grupoData!.participantesId) &&
          !ministra(user!.id, grupoData!.ministrantesId) && (
            <Button color="green" onPress={alertHandler.bind(null, "entrar")}>
              Entrar no Grupo
            </Button>
          )}
      </View>
    </StackPageLayout>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    minHeight: 120,
  },
  flatListContent: {
    gap: 12,
    paddingVertical: "6%",
  },
});
