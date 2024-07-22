import { PropsWithoutRef, useState } from "react";
import ModalLayout, { ModalLayoutProps } from "../layouts/ModalLayout";

import SolicitacaoDialog from "./SolicitacaoDialog";

import { Agendamento } from "@/interfaces/Agendamento";

import useAuth from "@/hooks/useAuth";
import SolicitacaoItem from "./SolicitacaoItem";
import SolicitacoesList from "./SolicitacoesList";

type SolicitacoesModalProps = Omit<
  PropsWithoutRef<ModalLayoutProps>,
  "children"
>;

export default function SolicitacoesModal({
  ...props
}: SolicitacoesModalProps) {
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedAtividade, setSelectedAtividade] = useState<string | null>(
    null
  );
  const DUMMY: Agendamento[] = [
    {
      id: "1",
      terapeuta: user?.id!,
      sala: "1",
      data: "17/07/2024",
      horario: "12:00 - 13:00",
      recorrente: false,
    },
  ];
  function openDialog() {
    setShowDialog(true);
  }

  function closeDialog() {
    setSelectedAtividade(null);
    setShowDialog(false);
  }

  function selectAtividadeHandler(idAtividade: string) {
    setSelectedAtividade(idAtividade);
    openDialog();
  }

  return (
    <ModalLayout {...props} scrollEnabled={false}>
      <SolicitacoesList
        agendamentos={DUMMY}
        onSelectAtividade={selectAtividadeHandler}
      />
      <SolicitacaoDialog
        closeDialog={closeDialog}
        visible={showDialog}
        title="Aceitar solicitação"
        idSolicitacao={selectedAtividade!}
      />
    </ModalLayout>
  );
}
