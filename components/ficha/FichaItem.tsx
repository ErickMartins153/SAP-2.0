import { PropsWithoutRef } from "react";
import ItemLayout, { ItemLayoutProps } from "../layouts/ItemLayout";
import Ficha from "@/interfaces/Ficha";
import InfoBox from "../UI/InfoBox";
import { useQuery } from "@tanstack/react-query";

type FichaItemProps = {
  ficha: Ficha;
} & PropsWithoutRef<Omit<ItemLayoutProps, "children" | "imageURL">>;

export default function FichaItem({ ficha, ...props }: FichaItemProps) {
  const nomeFormatado = `${ficha.responsavel.nome} ${ficha.responsavel.sobrenome}`;
  return (
    <ItemLayout {...props}>
      <InfoBox content={ficha.nome} label="Nome" />
      <InfoBox content={ficha.grupoTerapeutico.tema} label="Nome grupo" />
      <InfoBox content={nomeFormatado} label="Responsável" />
    </ItemLayout>
  );
}
