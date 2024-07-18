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
import {
  createGrupo,
  getGruposDisponiveis,
} from "@/util/requests/GrupoEstudoHTTP";
import { queryClient } from "@/util/queries";
import useBottomSheet from "@/hooks/useBottom";
import useAuth from "@/hooks/useAuth";
import { notBlank } from "@/util/validate";

type AddGrupoProps = {
  toggleModal: () => void;
} & PropsWithoutRef<ModalProps>;

type GrupoType = "Estudo" | "Individual";

type GrupoInfo = {
  tema: string;
  idMinistrante: string;
  tipo?: GrupoType;
};

export type NewGrupo = GrupoInfo;

const defaultValues: NewGrupo = {
  tema: "",
  idMinistrante: "",
};

export default function AddGrupoModal({
  toggleModal,
  visible = false,
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
  const { refetch: refetchGrupos } = useQuery({
    queryKey: ["grupos", "disponiveis", user?.id],
    enabled: !!user?.id,
    queryFn: () => getGruposDisponiveis(user!.id),
  });

  const { data: ministrante } = useQuery({
    queryKey: ["funcionarios", grupoInfo.idMinistrante!],
    queryFn: () => getFuncionarioById(grupoInfo.idMinistrante!, token!),
    enabled: !!grupoInfo.idMinistrante,
  });

  const { mutate: addGrupo } = useMutation({
    mutationFn: createGrupo,
    onSuccess: async () => {
      setGrupoInfo(defaultValues);
      toggleDialog();
      toggleModal();
      queryClient.invalidateQueries({
        exact: false,
        queryKey: ["grupos", "estudo", "agendamentos"],
      });
      closeBottom();
      await refetchGrupos();
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
    if (notBlank(grupoInfo) && !!grupoInfo.idMinistrante && !!grupoInfo.tipo) {
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
        title="Confirmar criação grupo"
        onSubmit={createGroupHandler}
        backdropBehavior="dismiss"
      >
        <InfoBox
          content={
            `${ministrante?.nome} ${ministrante?.sobrenome}` || "Carregando..."
          }
          label="Ministrante"
        />
        <InfoBox content={grupoInfo.tema} label="Tema" />
        <InfoBox content={grupoInfo.tipo!} label="Tipo" />
      </Dialog>
    </ModalLayout>
  );
}
