import StyledText from "@/components/UI/StyledText";
import Icon from "@/components/general/Icon";
import GrupoBottom from "@/components/grupos/GrupoBottom";
import GrupoItem from "@/components/grupos/GrupoItem";
import AddGrupoModal from "@/components/grupos/AddGrupoModal";
import MainPageLayout from "@/components/layouts/MainPageLayout";

import useAuth from "@/hooks/useAuth";
import useBottomSheet from "@/hooks/useBottom";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import { getGruposByFuncionario } from "@/util/requests/GrupoEstudoHTTP";
import { useQuery } from "@tanstack/react-query";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { BackHandler, FlatList, StyleSheet, View } from "react-native";
import Button from "@/components/general/Button";
import { getGruposTerapeuticosByFuncionario } from "@/util/requests/GrupoTerapeuticoHTTP";
import GrupoTerapeutico from "@/interfaces/GrupoTerapeutico";

export default function MeusGrupos() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { clear, isVisible, closeBottom, changeBottomContent, openBottom } =
    useBottomSheet();
  const [showModal, setShowModal] = useState(false);
  const [showGrupo, setShowGrupo] = useState<"estudo" | "terapeutico">(
    "estudo"
  );

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
    queryFn: () => getGruposByFuncionario(user!.id),
    initialData: [],
  });

  const {
    data: gruposTerapeuticos,
    refetch: refetchTerapeutico,
    isLoading: loadingTerapeutico,
  } = useQuery({
    queryKey: ["grupos", "terapeutico", user!.id],
    enabled: !!user?.id,
    queryFn: () => getGruposTerapeuticosByFuncionario(user!.id),
    initialData: [],
  });

  useLayoutEffect(() => {
    changeBottomContent(<GrupoBottom toggleModal={toggleModalHandler} />);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="plus"
          style={{
            paddingRight: "8%",
            paddingLeft: "20%",
            height: "100%",
            justifyContent: "center",
          }}
          onPress={openBottom}
        />
      ),
    });
  }, [navigation]);

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
    return <GrupoItem grupo={grupo} onPress={closeBottom} key={grupo.id} />;
  }

  function toggleGrupoView(v: typeof showGrupo) {
    setShowGrupo(v);
  }

  function refreshHandler() {
    refetchGrupo();
    refetchTerapeutico();
  }

  if (loadingEstudo || isError) {
    return;
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
