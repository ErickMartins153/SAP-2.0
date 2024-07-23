import { useLayoutEffect, useState } from "react";
import { FlatList, Alert, View, RefreshControl } from "react-native";
import useAuth from "@/hooks/useAuth";
import Ficha from "@/interfaces/Ficha";
import FichaItem from "@/components/fichas/FichaItem";
import StyledText from "@/components/UI/StyledText";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import { useNavigation } from "expo-router";
import Icon from "@/components/general/Icon";
import AddFichaModal from "@/components/fichas/AddFichaModal";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/util/queries";
import {
  deleteMultipleFichas,
  getFichasByFuncionario,
} from "@/util/requests/fichaHTTP";
import Loading from "@/components/UI/Loading";

type FichasProps = {};

export default function Fichas({ ...props }: FichasProps) {
  const { user, token } = useAuth();
  const navigation = useNavigation();
  const [selectedFichas, setSelectedFichas] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const {
    data: fichas,
    isLoading: loadingFichas,
    refetch: refetchFichas,
    isRefetching: refetchingFichas,
  } = useQuery({
    queryKey: ["fichas", user?.id],
    queryFn: () =>
      getFichasByFuncionario({ idFuncionario: user?.id!, token: token! }),
    enabled: !!user?.id && !!token,
    initialData: [],
  });

  const { mutate: deleteFichas } = useMutation({
    mutationFn: deleteMultipleFichas,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fichas"] });
      queryClient.refetchQueries({ queryKey: ["fichas"] });
      Alert.alert(
        "Fichas deletadas",
        "Todas as fichas selecionadas foram deletadas com sucesso!"
      );
      setSelectedFichas([]);
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name={selectedFichas.length > 0 ? "trash" : "plus"}
          color={selectedFichas.length > 0 ? "red" : "icon"}
          style={{
            paddingRight: "8%",
            paddingLeft: "20%",
            height: "100%",
            justifyContent: "center",
          }}
          onPress={selectedFichas.length > 0 ? handleDelete : toggleFichaModal}
        />
      ),
    });
  }, [navigation, selectedFichas.length]);

  function toggleFichaModal() {
    setShowModal(!showModal);
  }

  function selectFichaHandler(isSelected: boolean, fichaId: string) {
    if (!isSelected) {
      setSelectedFichas((prevSelected) => [...prevSelected, fichaId]);
    } else {
      setSelectedFichas((prevSelected) =>
        prevSelected.filter((id) => id !== fichaId)
      );
    }
  }

  function handleDelete() {
    Alert.alert(
      "Tem certeza?",
      `Confirmar deleção de ${selectedFichas.length} Ficha${
        selectedFichas.length > 1 ? "s" : ""
      }?`,
      [
        { isPreferred: true, text: "Cancelar" },
        {
          text: "Confirmar",
          onPress: () => deleteFichas({ uids: selectedFichas, token: token! }),
        },
      ]
    );
  }

  function renderFichaHandler(ficha: Ficha) {
    return (
      <FichaItem
        ficha={ficha}
        onPress={() => {}}
        onSelectFicha={selectFichaHandler}
        isSelected={selectedFichas.includes(ficha.id)}
        anySelected={selectedFichas.length > 0}
      />
    );
  }

  if (loadingFichas) {
    return <Loading />;
  }

  return (
    <MainPageLayout {...props}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refetchingFichas}
            onRefresh={refetchFichas}
          />
        }
        ListEmptyComponent={
          <View style={{ marginVertical: "50%" }}>
            <StyledText fontWeight="bold" size="big" textAlign="center">
              Você não possui nenhuma ficha!
            </StyledText>
          </View>
        }
        data={fichas}
        renderItem={({ item }) => renderFichaHandler(item)}
        contentContainerStyle={{ gap: 16, marginVertical: "2%" }}
        // onRefresh={refetch}
        // refreshing={isRefetching}
      />
      <AddFichaModal visible={showModal} toggleModal={toggleFichaModal} />
    </MainPageLayout>
  );
}
