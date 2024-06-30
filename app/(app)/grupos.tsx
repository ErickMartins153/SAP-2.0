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
import { BackHandler, FlatList, StyleSheet } from "react-native";

export default function MeusGrupos() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const { clear, isVisible, closeBottom, changeBottomContent, openBottom } =
    useBottomSheet();
  const [showModal, setShowModal] = useState(false);

  function toggleModalHandler() {
    setShowModal((p) => !p);
  }

  const {
    data: gruposEstudo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["grupos", "estudo", user!.id],
    enabled: !!user?.id,
    queryFn: () => getGruposByFuncionario(user!.id),
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

  function renderGrupoHandler(grupo: GrupoEstudo) {
    return <GrupoItem grupo={grupo} onPress={closeBottom} key={grupo.id} />;
  }

  if (isLoading || isError) {
    return;
  }

  return (
    <MainPageLayout>
      {gruposEstudo && (
        <FlatList
          ListHeaderComponent={
            <StyledText mode="title" fontWeight="bold" textAlign="center">
              Grupos de estudo
            </StyledText>
          }
          contentContainerStyle={styles.list}
          data={gruposEstudo}
          renderItem={({ item }) => renderGrupoHandler(item)}
        />
      )}
      <AddGrupoModal toggleModal={toggleModalHandler} visible={showModal} />
    </MainPageLayout>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: "2%",
    marginVertical: "2%",
  },
});
