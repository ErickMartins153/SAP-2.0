import { router, useFocusEffect, useNavigation } from "expo-router";
import { PropsWithoutRef, useCallback, useState } from "react";
import { BackHandler, ModalProps } from "react-native";

import { Agendamento } from "@/interfaces/Agendamento";
import InfoBox from "../UI/InfoBox";
import Dialog from "../layouts/Dialog";
import Switch from "../general/Switch";

type HorarioModalProps = {
  toggleDialog: () => void;
  agendamento: Agendamento;
} & PropsWithoutRef<ModalProps>;

export default function HorarioModal({
  toggleDialog,
  agendamento,
  visible = false,
  ...props
}: HorarioModalProps) {
  const navigation = useNavigation();
  const [step, setStep] = useState<0 | 1>(0);
  const [recorrente, setRecorrente] = useState(false);

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

  function agendarHandler() {
    console.log({ ...agendamento, recorrente });
    toggleDialog();
  }

  function toggleRecorrencia() {
    setRecorrente((p) => !p);
  }

  return (
    <Dialog
      visible={visible}
      title="Confirmar Agendamento"
      closeDialog={toggleDialog}
      onSubmit={agendarHandler}
      {...props}
    >
      <InfoBox content={agendamento.dia!} label="Dia" />
      <InfoBox content={agendamento.horario!} label="Horário" />
      <InfoBox content={agendamento.sala!} label="Sala" />
      <Switch
        isEnabled={recorrente}
        label="Recorrente?"
        onToggle={toggleRecorrencia}
      />
    </Dialog>
  );
}
