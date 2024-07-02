import { Alert, Pressable, StyleSheet, View } from "react-native";
import StyledText from "../UI/StyledText";
import { Agendamento } from "@/interfaces/Agendamento";

import { Colors } from "@/constants/Colors";
import { memo } from "react";
import { router } from "expo-router";
import InfoBox from "../UI/InfoBox";
import Icon from "../general/Icon";
import { useMutation } from "@tanstack/react-query";
import { deleteAgendamento } from "@/util/requests/agendamentoHTTP";
import { queryClient } from "@/util/queries";
import useAuth from "@/hooks/useAuth";

type AtendimentoItemProps = {
  agendamento: Agendamento;
};

const AgendamentoItem = ({ agendamento }: AtendimentoItemProps) => {
  const { user } = useAuth();

  const { mutate: removeAgendamento } = useMutation({
    mutationFn: deleteAgendamento,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["agendamentos"],
      });
      Alert.alert("Agendamento removido com sucesso!");
    },
  });

  function onDeleteHandler() {
    Alert.alert(
      "Você tem certeza?",
      "Uma vez deletado você perderá seu agendamento nessa sala para este dia!",
      [
        { isPreferred: true, text: "Cancelar" },
        { text: "Confirmar", onPress: () => removeAgendamento(agendamento.id) },
      ]
    );
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
      android_ripple={{ color: Colors.lightRipple }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <StyledText textAlign="center" fontWeight="bold" mode="big">
          Atendimento #{agendamento.id}
        </StyledText>
        <Icon
          name="trash"
          color="red"
          style={{ position: "absolute", right: 0 }}
          size={26}
          onPress={onDeleteHandler}
        />
      </View>

      <InfoBox content={agendamento.sala!} label="Sala" />
      <InfoBox content={agendamento.horario!} label="Horário" />
      <InfoBox content={agendamento.data!} label="Dia" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: "4%",
    padding: "4%",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 4,
    elevation: 4,
    gap: 12,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default memo(AgendamentoItem);
