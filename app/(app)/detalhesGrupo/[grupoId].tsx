import useAuth from "@/hooks/useAuth";
import {
  addParticipante,
  createAgendamentoEstudo,
  deleteGrupoEstudo,
  getAgendamentoEstudo,
  getGrupoById,
  getParticipantesByGrupo,
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
import Loading from "@/components/UI/Loading";

import { getSalaById } from "@/util/requests/salaHTTP";

type mutateProps = {
  participanteId: string;
  grupoId: string;
};

const defaultValue: NewAgendamento = {
  idTerapeuta: "",
  idSala: "",
  data: new Date().toLocaleDateString(),
  idFuncionario: "",
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
    queryFn: () => getGrupoById({ grupoId: grupoId!, token: token! }),
  });

  const { data: ministrante, isLoading: loadingMinistrante } = useQuery({
    queryKey: ["ministrantes", grupoId],
    enabled: !!grupoId && !!grupoData,
    queryFn: () => getFuncionarioById(grupoData!.dono, token!),
  });

  const {
    data: idParticipantes,
    refetch: refetchIdParticipantes,
    isLoading: loadingIdParticipantes,
  } = useQuery({
    queryKey: ["idParticipantes", grupoId],
    enabled: !!grupoId && !!grupoData,
    queryFn: () =>
      getParticipantesByGrupo({ idGrupo: grupoData?.id!, token: token! }),
    initialData: [],
  });

  const {
    data: participantes,
    isLoading: loadingParticipantes,
    refetch: refetchParticipantes,
  } = useQuery({
    queryKey: ["participantes", grupoId],
    queryFn: () => getFuncionariosByIds(idParticipantes!, token!),
    enabled: !!idParticipantes,
    initialData: [],
  });

  const { data: sala } = useQuery({
    queryKey: ["salas", agendamentoInfo.idSala],
    enabled: !!agendamentoInfo.idSala,
    queryFn: () => getSalaById(agendamentoInfo.idSala!, token!),
  });

  const { data: encontro, isLoading: loadingEncontro } = useQuery({
    queryKey: ["agendamento", "grupo", grupoId],
    enabled: !!grupoId,
    queryFn: () => getAgendamentoEstudo(grupoId!, token!),
  });

  const { mutate: removerGrupo } = useMutation({
    mutationFn: ({ participanteId, grupoId }: mutateProps) =>
      removeParticipante({
        idParticipante: participanteId,
        idGrupo: grupoId,
        token: token!,
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
      await refetchIdParticipantes();
      await refetchParticipantes();
      router.back();
    },
  });

  const { mutate: adicionarGrupo } = useMutation({
    mutationFn: ({ participanteId, grupoId }: mutateProps) =>
      addParticipante({ participanteId, grupoId, token: token! }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
      await refetchParticipantes();
      Alert.alert(
        "Entrada confirmada!",
        `Você agora faz parte do grupo ${grupoData?.tema}!`
      );
    },
  });

  const { mutate: agendarEncontro } = useMutation({
    mutationFn: createAgendamentoEstudo,
    onSuccess: () => {
      Alert.alert("Grupo agendado", "O grupo foi agendado com sucesso");
      toggleAgendamento();
      toggleDialog();
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] });
      queryClient.refetchQueries({ queryKey: ["agendamentos"] });
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationFn: deleteGrupoEstudo,
    onSuccess: () => {
      Alert.alert("Grupo deletado", `O grupo foi deletado com sucesso!`);
      router.back();
      queryClient.invalidateQueries({ queryKey: ["grupos", "estudo"] });
      queryClient.refetchQueries({ queryKey: ["grupos", "estudo"] });
    },
    onError: (error) => {
      console.log(error);
      Alert.alert((error.cause as string) || "Error", error.message);
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
      `Você tem certeza que quer remover ${funcionario.nome} do grupo ${grupo.tema}`,
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
    if (
      idParticipantes?.includes(user?.id!) &&
      showFuncionarios === "participantes"
    ) {
      return undefined;
    }
    if (user!.id === grupoData!.dono) {
      return (
        <FuncionarioItem
          funcionario={funcionario}
          onSelect={() => removeParticipanteHandler(funcionario, grupoData!)}
        />
      );
    }
    if (idParticipantes)
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
      Alert.alert("Entrar no grupo?", undefined, [
        { text: "Cancelar" },
        {
          text: "Confirmar",
          onPress: () =>
            adicionarGrupo({ participanteId: user!.id, grupoId: grupoId! }),
        },
      ]);
    }
  }

  function deleteHandler() {
    Alert.alert(
      "Você tem certeza?",
      "Uma vez deletado, o grupo ficará indisponível!",
      [
        { isPreferred: true, text: "Cancelar" },
        {
          text: "Deletar",
          onPress: () => onDelete({ grupoId: grupoId!, token: token! }),
        },
      ]
    );
  }

  function toggleFuncionarioView(v: typeof showFuncionarios) {
    setShowFuncionarios(v);
  }

  function inputHandler(field: keyof NewAgendamento, text: string) {
    setAgendamentoInfo((prev) => ({ ...prev, [field]: text }));
  }

  function toggleAgendamento() {
    setShowAgendar(!showAgendar);
    setAgendamentoInfo(defaultValue);
  }

  function toggleDialog() {
    if (!!agendamentoInfo.idSala) {
      setShowDialog(!showDialog);
    } else {
      Alert.alert(
        "Erro",
        "Preencha todas as informações necessárias para continuar."
      );
    }
  }

  function agendarHandler() {
    agendarEncontro({
      agendamento: {
        ...agendamentoInfo,
        idFuncionario: user?.id!,
        idGrupoEstudo: grupoId!,
      },
      token: token!,
    });
  }

  if (
    !grupoData ||
    loadingMinistrante ||
    loadingParticipantes ||
    loadingIdParticipantes ||
    loadingEncontro
  ) {
    return <Loading />;
  }

  const nextDate =
    !loadingEncontro && encontro
      ? `${encontro?.data} às ${encontro?.horario}`
      : "Indefinido";

  return (
    <StackPageLayout
      isLoading={isLoading}
      route="grupos"
      HeadRight={
        (user?.cargo === "TECNICO" || grupoData.dono === user?.id) && (
          <Icon name="trash-2" color="red" size={32} onPress={deleteHandler} />
        )
      }
    >
      <View style={{ flex: 1, marginBottom: "2%" }}>
        <StyledText size="title" fontWeight="bold" textAlign="center">
          {grupoData?.tema}
        </StyledText>
        <ScrollView
          style={{ maxHeight: 200, marginVertical: "2%" }}
          contentContainerStyle={{ paddingVertical: "2%" }}
        >
          <InfoBox label="Próximo encontro" content={nextDate} />
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
          // @ts-expect-error
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
        {participa(user!.id, idParticipantes!) &&
          grupoData.dono !== user?.id && (
            <Button color="red" onPress={alertHandler.bind(null, "sair")}>
              Sair do Grupo
            </Button>
          )}
        {!participa(user!.id, idParticipantes!) &&
          !(user!.id === grupoData!.dono) && (
            <Button color="green" onPress={alertHandler.bind(null, "entrar")}>
              Entrar no Grupo
            </Button>
          )}
        {user?.id === grupoData.dono && (
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
        <InfoBox content={sala?.nome! || "Carregando..."} label="Sala" />
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
