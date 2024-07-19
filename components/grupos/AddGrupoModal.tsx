import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { PropsWithoutRef, useState } from "react";
import { Alert, ModalProps } from "react-native";
import ModalLayout from "../layouts/ModalLayout";
import {
  getFuncionarioById,
  getTecnicos,
} from "@/util/requests/funcionarioHTTP";
import GrupoInfo from "./GrupoInfo";

import Dialog from "../layouts/Dialog";
import InfoBox from "../UI/InfoBox";
import { createGrupoEstudo } from "@/util/requests/GrupoEstudoHTTP";
import { queryClient } from "@/util/queries";
import useBottomSheet from "@/hooks/useBottom";
import useAuth from "@/hooks/useAuth";
import { createGrupoTerapeutico } from "@/util/requests/GrupoTerapeuticoHTTP";

type AddGrupoProps = {
  toggleModal: () => void;
  refetchGrupos: () => void;
} & PropsWithoutRef<ModalProps>;

type GrupoType = "Estudo" | "Terapêutico";

export type NewGrupo = {
  tema: string;
  idMinistrante: string;
  tipo?: GrupoType;
  descricao?: string;
};

const defaultValues: NewGrupo = {
  tema: "",
  idMinistrante: "",
  descricao: "",
};

export default function AddGrupoModal({
  toggleModal,
  visible = false,
  refetchGrupos,
  ...props
}: AddGrupoProps) {
  const { user, token } = useAuth();
  const [grupoInfo, setGrupoInfo] = useState(defaultValues);
  const [showDialog, setShowDialog] = useState(false);
  const { closeBottom } = useBottomSheet();
  const { data: tecnicos, isLoading } = useQuery({
    queryKey: ["funcionarios"],
    queryFn: () => getTecnicos(token!),
  });

  const { data: ministrante } = useQuery({
    queryKey: ["funcionarios", grupoInfo.idMinistrante!],
    queryFn: () => getFuncionarioById(grupoInfo.idMinistrante!, token!),
    enabled: !!grupoInfo.idMinistrante,
  });

  const { mutate: addGrupo } = useMutation({
    mutationFn:
      grupoInfo.tipo === "Estudo" ? createGrupoEstudo : createGrupoTerapeutico,
    onSuccess: async () => {
      setGrupoInfo(defaultValues);
      toggleDialog();
      toggleModal();
      queryClient.invalidateQueries({
        exact: false,
        queryKey: ["grupos", "estudo", "agendamentos"],
      });
      refetchGrupos();
      closeBottom();
      router.navigate("grupos");
    },
  });

  function closeHandler() {
    toggleModal();
    setGrupoInfo(defaultValues);
  }

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  function inputHandler(field: keyof NewGrupo, text: string) {
    setGrupoInfo((prev) => ({ ...prev, [field]: text }));
  }

  function errorHandler() {
    Alert.alert(
      "Erro",
      "Preencha todas as informações necessárias para continuar."
    );
  }

  function createGroupHandler() {
    addGrupo(grupoInfo);
  }

  function openDialog() {
    if (!!grupoInfo.idMinistrante && !!grupoInfo.tipo && !!grupoInfo.tema) {
      setShowDialog(true);
    } else {
      errorHandler();
    }
  }

  return (
    <ModalLayout
      isLoading={isLoading}
      toggleModal={closeHandler}
      visible={visible}
      keyboardShouldPersistTaps="never"
      {...props}
    >
      <GrupoInfo
        grupo={grupoInfo}
        tecnicos={tecnicos!}
        inputHandler={inputHandler}
        onSubmit={openDialog}
      />

      <Dialog
        closeDialog={toggleDialog}
        visible={showDialog}
        title="Confirmar criação de grupo"
        onSubmit={createGroupHandler}
        backdropBehavior="dismiss"
      >
        <InfoBox
          content={
            `${ministrante?.nome} ${ministrante?.sobrenome}` || "Carregando..."
          }
          label="Ministrante"
        />
        <InfoBox content={grupoInfo.tema.trim()} label="Tema" />
        {grupoInfo.descricao && (
          <InfoBox content={grupoInfo.descricao.trim()} label="Descrição" />
        )}
        <InfoBox content={grupoInfo.tipo!} label="Tipo" />
      </Dialog>
    </ModalLayout>
  );
}
