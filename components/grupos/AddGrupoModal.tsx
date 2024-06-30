import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { PropsWithoutRef, useCallback, useState } from "react";
import { Alert, BackHandler, ModalProps } from "react-native";
import ModalLayout from "../layouts/ModalLayout";
import { getTecnicos } from "@/util/requests/funcionarioHTTP";
import GrupoInfo from "./GrupoInfo";
import GrupoHorario from "./GrupoHorario";
import { Agendamento } from "@/interfaces/Agendamento";
import Dialog from "../layouts/Dialog";
import InfoBox from "../UI/InfoBox";
import { createGrupo } from "@/util/requests/GrupoEstudoHTTP";
import { queryClient } from "@/util/queries";
import useBottomSheet from "@/hooks/useBottom";

type AddGrupoProps = {
  toggleModal: () => void;
} & PropsWithoutRef<ModalProps>;

type GrupoType = "Estudo" | "Individual";

type GrupoInfo = {
  temaEstudo: string;
  ministrantesId: string[];
  tipo?: GrupoType;
};

export type NewGrupo = GrupoInfo & (Agendamento | Partial<Agendamento>);

const defaultValues: NewGrupo = {
  ministrantesId: [],
  temaEstudo: "",
};

export default function AddGrupoModal({
  toggleModal,
  visible = false,
  ...props
}: AddGrupoProps) {
  const [grupoInfo, setGrupoInfo] = useState(defaultValues);
  const [step, setStep] = useState<0 | 1>(0);
  const [showDialog, setShowDialog] = useState(false);
  const { closeBottom } = useBottomSheet();
  const {
    data: tecnicos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["funcionarios"],
    queryFn: getTecnicos,
  });

  const navigation = useNavigation();

  const { mutate: addGrupo } = useMutation({
    mutationFn: createGrupo,
    onSuccess: () => {
      toggleDialog();
      toggleModal();
      queryClient.invalidateQueries({ queryKey: ["grupos", "estudo"] });
      closeBottom();
      router.navigate("grupos");
    },
  });

  useFocusEffect(
    useCallback(() => {
      function onBackPress() {
        if (step === 0) {
          router.navigate("(app)");
          return true;
        } else {
          setStep(0);
          return true;
        }
      }

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation, step])
  );

  function closeHandler() {
    if (step === 0) {
      setGrupoInfo(defaultValues);
      toggleModal();
    } else {
      setStep(0);
    }
  }

  function toggleDialog() {
    if (grupoInfo.dia && grupoInfo.sala) {
      setShowDialog((p) => !p);
    } else {
      errorHandler();
    }
  }

  function inputHandler(field: keyof NewGrupo, text: string) {
    if (field === "ministrantesId") {
      grupoInfo[field] = [text];
    } else {
      setGrupoInfo((prev) => ({ ...prev, [field]: text }));
    }
  }

  function errorHandler() {
    Alert.alert(
      "Erro",
      "Preencha todas as informações necessárias para continuar."
    );
  }

  function changeStepHandler() {
    const { ministrantesId, temaEstudo, tipo } = grupoInfo;
    if (temaEstudo.trim() !== "" && ministrantesId.length > 0 && !!tipo) {
      setStep(1);
    } else {
      errorHandler();
    }
  }

  function createGroupHandler() {
    addGrupo(grupoInfo);
  }

  return (
    <ModalLayout
      isLoading={isLoading}
      toggleModal={closeHandler}
      visible={visible}
      {...props}
    >
      {step === 0 ? (
        <GrupoInfo
          grupo={grupoInfo}
          tecnicos={tecnicos!}
          inputHandler={inputHandler}
          onSubmit={changeStepHandler}
        />
      ) : (
        <GrupoHorario
          inputHandler={inputHandler}
          toggleDialog={toggleDialog}
          format="name"
        />
      )}
      <Dialog
        closeDialog={toggleDialog}
        visible={showDialog}
        title="Confirmar criação grupo"
        onSubmit={createGroupHandler}
      >
        <InfoBox content={grupoInfo.dia!} label="Dia" />
        <InfoBox content={grupoInfo.horario!} label="Horário" />
        <InfoBox content={grupoInfo.sala!} label="Sala" />
      </Dialog>
    </ModalLayout>
  );
}
