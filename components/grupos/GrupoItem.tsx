import { Pressable, StyleSheet, View } from "react-native";
import StyledText from "../UI/StyledText";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import { Colors } from "@/constants/Colors";
import { memo } from "react";
import { router } from "expo-router";

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
      <View style={{ flexDirection: "row", gap: 12 }}>
        <StyledText fontWeight="bold">Data:</StyledText>
        <StyledText>{grupo.encontro.horario.data}</StyledText>
      </View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <StyledText fontWeight="bold">Horário:</StyledText>
        <StyledText>{grupo.encontro.horario.hora}</StyledText>
      </View>
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
