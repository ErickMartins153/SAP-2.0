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
import { useCallback, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  getFuncionarioById,
  getFuncionariosByIds,
} from "@/util/requests/funcionarioHTTP";
import Funcionario from "@/interfaces/Funcionario";
import FuncionarioItem from "@/components/gerenciar/FuncionarioItem";
import Button from "@/components/general/Button";
import { queryClient } from "@/util/queries";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import Icon from "@/components/general/Icon";
import GrupoHorario from "@/components/grupos/GrupoHorario";
import { NewAgendamento } from "@/interfaces/Agendamento";
import Dialog from "@/components/layouts/Dialog";
import InfoBox from "@/components/UI/InfoBox";
import { notBlank } from "@/util/validate";

type mutateProps = {
  participanteId: string;
  grupoId: string;
};

const defaultValue: NewAgendamento = {
  idResponsavel: "",
  nomeSala: "",
  data: "",
};

function participa(funcionarioId: string, participantes: string[]) {
  return participantes.includes(funcionarioId);
}

export default function detalhesGrupo() {
  const { user, token } = useAuth();
  const { grupoId } = useLocalSearchParams<{ grupoId: string }>();
  const [showAgendar, setShowAgendar] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [agendamentoInfo, setAgendamentoInfo] = useState(defaultValue);

  const [showFuncionarios, setShowFuncionarios] = useState<
    "ministrantes" | "participantes"
  >("ministrantes");

  const {
    data: grupoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["grupos", "estudo", grupoId!],
    enabled: !!grupoId,
    queryFn: () => getGrupoById(grupoId!),
  });

  const { data: ministrante, isLoading: loadingMinistrante } = useQuery({
    queryKey: ["ministrantes", grupoId],
    enabled: !!grupoId && !!grupoData,
    queryFn: () => getFuncionarioById(grupoData!.idMinistrante, token!),
  });

  const { data: participantes, refetch: refetchParticipantes } = useQuery({
    queryKey: ["participantes", grupoId],
    enabled: !!grupoId && !!grupoData,
    queryFn: () => getFuncionariosByIds(grupoData!.idParticipantes, token!),
    initialData: [],
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
    if (user!.id === grupoData!.idMinistrante) {
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

  function deleteHandler() {}

  function toggleFuncionarioView(v: typeof showFuncionarios) {
    setShowFuncionarios(v);
  }

  function inputHandler(field: keyof NewAgendamento, text: string) {
    setAgendamentoInfo((prev) => ({ ...prev, [field]: text }));
  }

  function toggleAgendamento() {
    setShowAgendar(!showAgendar);
  }

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  function agendarHandler() {
    if (notBlank(agendamentoInfo)) {
      console.log(agendamentoInfo);
    }
  }

  if (!grupoData || loadingMinistrante) {
    return;
  }

  return (
    <StackPageLayout
      isLoading={isLoading}
      route="grupos"
      HeadRight={
        (user?.cargo === "ESTAGIARIO" ||
          grupoData.idMinistrante === user?.id) && (
          <Icon name="trash-2" color="red" size={32} onPress={deleteHandler} />
        )
      }
    >
      <View style={{ flex: 1, marginBottom: "2%" }}>
        <StyledText size="title" fontWeight="bold" textAlign="center">
          {grupoData?.temaEstudo}
        </StyledText>
        <ScrollView
          style={{ maxHeight: 200, marginVertical: "2%" }}
          contentContainerStyle={{ paddingVertical: "2%" }}
        >
          <InfoBox label="Próximo agendamento" content="PLACEHOLDER" />
          {grupoData.descricao && (
            <InfoBox label="Conteúdo" content={grupoData?.descricao} />
          )}
        </ScrollView>

        <FlatList
          data={
            showFuncionarios === "participantes"
              ? participantes
              : [ministrante!]
          }
          renderItem={({ item }) => renderFuncionariosHandler(item)}
          contentContainerStyle={styles.flatListContent}
          style={styles.flatlist}
          ListHeaderComponent={
            <>
              <View
                style={{
                  justifyContent: "center",
                  marginVertical: "4%",
                  gap: 6,
                }}
              >
                <Button
                  color={
                    showFuncionarios === "ministrantes"
                      ? "selectedButton"
                      : "button"
                  }
                  onPress={() => toggleFuncionarioView("ministrantes")}
                >
                  Ministrante
                </Button>
                <Button
                  color={
                    showFuncionarios === "participantes"
                      ? "selectedButton"
                      : "button"
                  }
                  onPress={() => toggleFuncionarioView("participantes")}
                >
                  Participantes
                </Button>
              </View>
              <StyledText
                textAlign="center"
                size="title"
                style={{
                  borderBottomWidth: 1,
                  paddingTop: "2%",
                }}
              >
                {showFuncionarios === "participantes"
                  ? "Participantes"
                  : "Ministrantes"}
              </StyledText>
            </>
          }
          ListEmptyComponent={
            <StyledText size="big" textAlign="center">
              Esse grupo ainda não possui nenhum participante
            </StyledText>
          }
        />
      </View>
      <View style={{ marginBottom: "2%", paddingTop: "2%", borderTopWidth: 1 }}>
        {participa(user!.id, grupoData!.idParticipantes) && (
          <Button color="red" onPress={alertHandler.bind(null, "sair")}>
            Sair do Grupo
          </Button>
        )}
        {!participa(user!.id, grupoData!.idParticipantes) &&
          !(user!.id === grupoData!.idMinistrante) && (
            <Button color="green" onPress={alertHandler.bind(null, "entrar")}>
              Entrar no Grupo
            </Button>
          )}
        {user?.id === grupoData.idMinistrante && (
          <Button onPress={toggleAgendamento}>Agendar</Button>
        )}
      </View>
      {showAgendar && (
        <GrupoHorario
          inputHandler={inputHandler}
          toggleModal={toggleAgendamento}
          toggleDialog={toggleDialog}
          selected={agendamentoInfo}
        />
      )}
      <Dialog
        closeDialog={toggleDialog}
        visible={showDialog}
        title="Confirmar Agendamento"
        onSubmit={agendarHandler}
      >
        <InfoBox content={agendamentoInfo.data!} label="Dia" />
        <InfoBox content={agendamentoInfo.horario!} label="Horário" />
        <InfoBox content={agendamentoInfo.nomeSala!} label="Sala" />
      </Dialog>
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
