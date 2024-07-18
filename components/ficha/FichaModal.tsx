import { PropsWithoutRef, useState } from "react";
import ModalLayout, { ModalLayoutProps } from "../layouts/ModalLayout";
import { FlatList } from "react-native";
import StyledText from "../UI/StyledText";

import useAuth from "@/hooks/useAuth";
import Ficha from "@/interfaces/Ficha";
import FichaItem from "./FichaItem";

type FichaModalProps = {} & PropsWithoutRef<Omit<ModalLayoutProps, "children">>;

export default function FichaModal({ ...props }: FichaModalProps) {
  const { user } = useAuth();
  const [selectedFicha, setSelectedFicha] = useState<string | null>();
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

  function selectFichaHandler(fichaId: string) {
    setSelectedFicha(fichaId);
  }

  function renderFichaHandler(ficha: Ficha) {
    return (
      <FichaItem ficha={ficha} onSelect={() => selectFichaHandler(ficha.id)} />
    );
  }
  return (
    <ModalLayout {...props} scrollEnabled={false}>
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
    </ModalLayout>
  );
}
