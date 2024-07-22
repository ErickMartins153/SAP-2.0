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
  const [newGrupo, setNewGrupo] = useState(defaultValues);
  const [showDialog, setShowDialog] = useState(false);
  const { closeBottom } = useBottomSheet();
  const { data: tecnicos, isLoading } = useQuery({
    queryKey: ["funcionarios"],
    queryFn: () => getTecnicos(token!),
  });

  const { data: ministrante } = useQuery({
    queryKey: ["funcionarios", newGrupo.idMinistrante!],
    queryFn: () => getFuncionarioById(newGrupo.idMinistrante!, token!),
    enabled: !!newGrupo.idMinistrante,
  });

  const { mutate: addGrupo } = useMutation({
    mutationFn:
      newGrupo.tipo === "Estudo" ? createGrupoEstudo : createGrupoTerapeutico,
    onSuccess: (nome) => {
      setNewGrupo(defaultValues);
      toggleDialog();
      toggleModal();
      queryClient.invalidateQueries({
        exact: false,
        queryKey: ["grupos", "estudo", "agendamentos"],
      });
      refetchGrupos();
      closeBottom();
      Alert.alert(
        "Grupo criado com sucesso",
        `O grupo ${nome} foi criado com sucesso`
      );
      router.navigate("grupos");
    },
  });

  function closeHandler() {
    toggleModal();
    setNewGrupo(defaultValues);
  }

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  function inputHandler(field: keyof NewGrupo, text: string) {
    setNewGrupo((prev) => ({ ...prev, [field]: text }));
  }

  function errorHandler() {
    Alert.alert(
      "Erro",
      "Preencha todas as informações necessárias para continuar."
    );
  }

  function createGroupHandler() {
    addGrupo({ newGrupo, token: token! });
  }

  function openDialog() {
    if (!!newGrupo.idMinistrante && !!newGrupo.tipo && !!newGrupo.tema) {
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
        grupo={newGrupo}
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
        <InfoBox content={newGrupo.tema.trim()} label="Tema" />
        {newGrupo.descricao && (
          <InfoBox content={newGrupo.descricao.trim()} label="Descrição" />
        )}
        <InfoBox content={newGrupo.tipo!} label="Tipo" />
      </Dialog>
    </ModalLayout>
  );
}
