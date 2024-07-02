import { Pressable, StyleSheet, View } from "react-native";
import StyledText from "../UI/StyledText";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import { Colors } from "@/constants/Colors";
import { memo } from "react";
import { router } from "expo-router";
import InfoBox from "../UI/InfoBox";

type GrupoItemProps = {
  grupo: GrupoEstudo;
  onPress?: () => void;
};

const GrupoItem = ({ grupo, onPress }: GrupoItemProps) => {
  function onPressHandler() {
    if (onPress) {
      onPress();
    }
    router.navigate(`detalhesGrupo/${grupo.id}`);
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
      android_ripple={{ color: Colors.lightRipple }}
      onPress={onPressHandler}
    >
      <StyledText textAlign="center" fontWeight="bold" mode="big">
        {grupo.temaEstudo}
      </StyledText>
      <InfoBox label="Data" content={grupo.encontro.horario.data} />
      <InfoBox label="Horário" content={grupo.encontro.horario.hora} />
      <InfoBox label="Sala" content={grupo.encontro.salaId} />
      <StyledText textAlign="center" fontWeight="bold">
        Clique para ver mais informações
      </StyledText>
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

export default memo(GrupoItem);
