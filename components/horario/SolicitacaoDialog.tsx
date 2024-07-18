import { PropsWithoutRef } from "react";
import Dialog, { DialogProps } from "../layouts/Dialog";
import Select from "../form/Select";
import StyledText from "../UI/StyledText";

type SolicitacaoDialog = {
  idSolicitacao: string;
} & PropsWithoutRef<Omit<DialogProps, "children">>;

export default function SolicitacaoDialog({
  idSolicitacao,
  ...props
}: SolicitacaoDialog) {
  return (
    <Dialog backdropBehavior="dismiss" {...props}>
      <StyledText> abc dialog</StyledText>
      <StyledText>id: {idSolicitacao}</StyledText>
    </Dialog>
  );
}
