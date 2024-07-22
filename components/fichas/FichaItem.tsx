import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import Ficha from "@/interfaces/Ficha";
import StyledText from "../UI/StyledText";
import InfoBox from "../UI/InfoBox";
import ItemLayout, { ItemLayoutProps } from "../layouts/ItemLayout";
import { PropsWithoutRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import useAuth from "@/hooks/useAuth";
import Loading from "../UI/Loading";

type FichaItemProps = {
  ficha: Ficha;
  onSelectFicha?: (isSelected: boolean, fichaId: string) => void;
  isSelected?: boolean;
  anySelected?: boolean;
} & PropsWithoutRef<Omit<ItemLayoutProps, "children" | "imageURL">>;

export default function FichaItem({
  ficha,
  onSelectFicha,
  isSelected,
  anySelected,
  ...props
}: FichaItemProps) {
  const { token } = useAuth();
  const { data: funcionario, isLoading: loadingFuncionario } = useQuery({
    queryKey: ["ministrantes", ficha.idResponsavel],
    enabled: !!ficha.idResponsavel,
    queryFn: () => getFuncionarioById(ficha.idResponsavel!, token!),
  });

  if (loadingFuncionario) {
    return <Loading />;
  }

  const nomeFormatado = `${funcionario?.nome} ${funcionario?.sobrenome}`;

  function selectFichaHandler() {
    onSelectFicha?.(isSelected!, ficha.id);
  }

  return (
    <ItemLayout
      {...props}
      onLongPress={selectFichaHandler}
      onPress={!isSelected && !anySelected ? props.onPress : selectFichaHandler}
      delayLongPress={200}
      isSelected={isSelected}
    >
      <InfoBox content={ficha.nome} label="Nome" />
      {ficha.idGrupoTerapeutico && (
        <InfoBox content={ficha.idGrupoTerapeutico.tema} label="Nome grupo" />
      )}
      <InfoBox content={nomeFormatado} label="Responsável" />
    </ItemLayout>
  );
}
