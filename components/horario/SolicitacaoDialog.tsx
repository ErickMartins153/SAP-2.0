import { PropsWithoutRef, useState } from "react";
import Dialog, { DialogProps } from "../layouts/Dialog";
import Select from "../form/Select";
import StyledText from "../UI/StyledText";
import Button from "../general/Button";

type SolicitacaoDialog = {
  idSolicitacao: string;
} & PropsWithoutRef<Omit<DialogProps, "children">>;

const allStatus = [{ nome: "Aprovado" }, { nome: "Reprovado" }];

export default function SolicitacaoDialog({
  idSolicitacao,
  ...props
}: SolicitacaoDialog) {
  const [status, setStatus] = useState<"Aprovado" | "Reprovado">("Aprovado");

  function changeStatus(newStatus: typeof status) {
    setStatus(newStatus);
  }

  function resetStatus() {
    setStatus("Aprovado");
  }

  return (
    <Dialog backdropBehavior="dismiss" {...props} reset={resetStatus}>
      <StyledText> abc dialog</StyledText>
      <StyledText>id: {idSolicitacao}</StyledText>
      <Select
        data={allStatus}
        onSelect={changeStatus}
        placeholder="Selecione o estado dessa atividade"
        defaultValue={status}
        defaultValueByIndex={0}
      />
      {status === "Aprovado" ? (
        <Button color="green">Aprovar agendamento</Button>
      ) : (
        <Button color="red">Reprovar agendamento</Button>
      )}
    </Dialog>
  );
}
