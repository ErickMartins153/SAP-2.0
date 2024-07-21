import { PropsWithoutRef } from "react";
import ItemLayout, { ItemLayoutProps } from "../layouts/ItemLayout";
import Ficha from "@/interfaces/Ficha";
import InfoBox from "../UI/InfoBox";
import { useMutation } from "@tanstack/react-query";

type FichaItemProps = {
  ficha: Ficha;
} & PropsWithoutRef<Omit<ItemLayoutProps, "children" | "imageURL">>;

export default function FichaItem({
  ficha,
  onPress,
  ...props
}: FichaItemProps) {
  const nomeFormatado = `${ficha.responsavel.nome} ${ficha.responsavel.sobrenome}`;
  const {} = useMutation({});
  function deleteFichaHandler() {}

  return (
    <ItemLayout {...props} onPress={deleteFichaHandler}>
      <InfoBox content={ficha.nome} label="Nome" />
      {ficha.grupoTerapeutico && (
        <InfoBox content={ficha.grupoTerapeutico.tema} label="Nome grupo" />
      )}
      <InfoBox content={nomeFormatado} label="Responsável" />
    </ItemLayout>
  );
}
