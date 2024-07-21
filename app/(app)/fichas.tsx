import { PropsWithoutRef, useLayoutEffect, useState } from "react";

import { FlatList } from "react-native";

import useAuth from "@/hooks/useAuth";
import Ficha from "@/interfaces/Ficha";
import FichaItem from "@/components/fichas/FichaItem";
import StyledText from "@/components/UI/StyledText";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import { useNavigation } from "expo-router";
import Icon from "@/components/general/Icon";
import AddFichaModal from "@/components/fichas/AddFichaModal";

type FichasProps = {};

export default function Fichas({ ...props }: FichasProps) {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [selectedFicha, setSelectedFicha] = useState<string | null>();
  const [showModal, setShowModal] = useState(false);

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
          onPress={toggleFichaModal}
        />
      ),
    });
  }, [navigation]);

  const DUMMY: Ficha[] = [
    {
      id: "1",
      // @ts-expect-error
      responsavel: { nome: "Erick", sobrenome: "Martins" },
      grupoTerapeutico: {
        id: "20",
        tema: "Gerenciamento de Estresse",
        fichasId: ["1", "2", "3"],
        coordenador: "4",
      },
      nome: "Pedin doido",
    },
  ];

  function toggleFichaModal() {
    setShowModal(!showModal);
  }

  function selectFichaHandler(fichaId: string) {
    setSelectedFicha(fichaId);
  }

  function renderFichaHandler(ficha: Ficha) {
    return (
      <FichaItem ficha={ficha} onPress={() => selectFichaHandler(ficha.id)} />
    );
  }
  return (
    <MainPageLayout {...props}>
      <FlatList
        ListHeaderComponent={
          <StyledText size="title" fontWeight="bold" textAlign="center">
            Minhas Fichas
          </StyledText>
        }
        data={DUMMY}
        renderItem={({ item }) => renderFichaHandler(item)}
        contentContainerStyle={{ gap: 16 }}
      />
      <AddFichaModal visible={showModal} toggleModal={toggleFichaModal} />
    </MainPageLayout>
  );
}
