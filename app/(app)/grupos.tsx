import StyledText from "@/components/UI/StyledText";
import Icon from "@/components/general/Icon";
import GrupoBottom from "@/components/grupos/GrupoBottom";
import GrupoItem from "@/components/grupos/GrupoItem";
import AddGrupoModal from "@/components/grupos/AddGrupoModal";
import MainPageLayout from "@/components/layouts/MainPageLayout";

import useAuth from "@/hooks/useAuth";
import useBottomSheet from "@/hooks/useBottom";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import {
  deleteGruposEstudo,
  getGruposByFuncionario,
} from "@/util/requests/GrupoEstudoHTTP";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, BackHandler, FlatList, StyleSheet, View } from "react-native";
import Button from "@/components/general/Button";
import {
  deleteGruposTerapeutico,
  getGruposTerapeuticosByFuncionario,
} from "@/util/requests/GrupoTerapeuticoHTTP";
import GrupoTerapeutico from "@/interfaces/GrupoTerapeutico";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/util/queries";
import { deleteAtividade } from "@/util/requests/atividadesHTTP";

export default function MeusGrupos() {
  const { user, token } = useAuth();
  const navigation = useNavigation();
  const { clear, isVisible, closeBottom, changeBottomContent, openBottom } =
    useBottomSheet();
  const [showModal, setShowModal] = useState(false);
  const [showGrupo, setShowGrupo] = useState<"estudo" | "terapeutico">(
    "estudo"
  );
  const [selectedGrupos, setSelectedGrupos] = useState<string[]>([]);

  function toggleModalHandler() {
    setShowModal((p) => !p);
  }

  const {
    data: gruposEstudo,
    isLoading: loadingEstudo,
    isError,
    refetch: refetchGrupo,
  } = useQuery({
    queryKey: ["grupos", "estudo", user!.id],
    enabled: !!user?.id,
    queryFn: () =>
      getGruposByFuncionario({ funcionarioId: user!.id, token: token! }),
    initialData: [],
  });

  const {
    data: gruposTerapeuticos,
    refetch: refetchTerapeutico,
    isLoading: loadingTerapeutico,
  } = useQuery({
    queryKey: ["grupos", "terapeutico", user!.id],
    enabled: !!user?.id,
    queryFn: () =>
      getGruposTerapeuticosByFuncionario({
        funcionarioId: user!.id!,
        token: token!,
      }),
    initialData: [],
  });

  const { mutate: deleteGrupos } = useMutation({
    mutationFn: deleteAtividade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grupos"] });
      queryClient.refetchQueries({ queryKey: ["grupos"] });
      Alert.alert(
        "Grupos deletados",
        "Todos os grupos selecionados foram deletados com sucesso!"
      );
      setSelectedGrupos([]);
    },
  });

  useLayoutEffect(() => {
    changeBottomContent(
      <GrupoBottom toggleModal={toggleModalHandler} mode={showGrupo} />
    );
  }, [showGrupo]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name={selectedGrupos.length > 0 ? "trash" : "plus"}
          color={selectedGrupos.length > 0 ? "red" : "icon"}
          style={{
            paddingRight: "8%",
            paddingLeft: "20%",
            height: "100%",
            justifyContent: "center",
          }}
          onPress={selectedGrupos.length > 0 ? handleDelete : openBottom}
        />
      ),
    });
  }, [navigation, selectedGrupos.length]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", (e) => {
      clear();
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        if (isVisible) {
          closeBottom();
          return true;
        } else {
          router.back();
          return true;
        }
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [isVisible, closeBottom])
  );

  function renderGrupoHandler(grupo: GrupoEstudo | GrupoTerapeutico) {
    return (
      <GrupoItem
        grupoId={grupo}
        onPress={closeBottom}
        key={grupo.id + grupo.tema}
        onSelectGrupo={selectGrupoHandler}
        isSelected={selectedGrupos.includes(grupo.id)}
        anySelected={selectedGrupos.length > 0}
      />
    );
  }

  function toggleGrupoView(v: typeof showGrupo) {
    setShowGrupo(v);
  }

  function refreshHandler() {
    refetchGrupo();
    refetchTerapeutico();
  }

  function selectGrupoHandler(isSelected: boolean, grupoId: string) {
    if (!isSelected) {
      setSelectedGrupos((prevSelected) => [...prevSelected, grupoId]);
    } else {
      setSelectedGrupos((prevSelected) =>
        prevSelected.filter((id) => id !== grupoId)
      );
    }
  }

  function handleDelete() {
    Alert.alert(
      "Tem certeza?",
      `Confirmar deleção de ${selectedGrupos.length} Grupo${
        selectedGrupos.length > 1 ? "s" : ""
      }?`,
      [
        { isPreferred: true, text: "Cancelar" },
        {
          text: "Confirmar",
          onPress: () =>
            deleteGrupos({ idsAtividade: selectedGrupos, token: token! }),
        },
      ]
    );
  }

  if (loadingEstudo || isError) {
    return null;
  }

  return (
    <MainPageLayout>
      <FlatList
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
                color={showGrupo === "estudo" ? "selectedButton" : "button"}
                onPress={() => toggleGrupoView("estudo")}
              >
                Grupos de Estudo
              </Button>
              <Button
                color={
                  showGrupo === "terapeutico" ? "selectedButton" : "button"
                }
                onPress={() => toggleGrupoView("terapeutico")}
              >
                Grupos Terapêuticos
              </Button>
            </View>
            <StyledText size="title" fontWeight="bold" textAlign="center">
              {showGrupo === "estudo"
                ? "Grupos de estudo"
                : "Grupos Terapêuticos"}
            </StyledText>
          </>
        }
        onRefresh={refreshHandler}
        refreshing={loadingEstudo || loadingTerapeutico}
        contentContainerStyle={styles.list}
        // @ts-expect-error
        data={showGrupo === "estudo" ? gruposEstudo : gruposTerapeuticos}
        renderItem={({ item }) => renderGrupoHandler(item)}
        ListEmptyComponent={
          <View style={{ marginVertical: "24%" }}>
            <StyledText textAlign="center" size="big" fontWeight="bold">
              Você não participa de nenhum Grupo
              {showGrupo === "estudo" ? " de Estudo" : " Terapêutico"}
            </StyledText>
          </View>
        }
      />

      <AddGrupoModal
        toggleModal={toggleModalHandler}
        visible={showModal}
        refetchGrupos={refreshHandler}
      />
    </MainPageLayout>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: "2%",
    marginVertical: "2%",
  },
});
