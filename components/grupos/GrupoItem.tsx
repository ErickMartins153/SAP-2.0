import { Pressable, StyleSheet } from "react-native";
import StyledText from "../UI/StyledText";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import { Colors } from "@/constants/Colors";
import { memo } from "react";
import { router } from "expo-router";
import InfoBox from "../UI/InfoBox";
import GrupoTerapeutico from "@/interfaces/GrupoTerapeutico";
import { formatText } from "@/util/formatter";
import { useQuery } from "@tanstack/react-query";
import { getFuncionarioById } from "@/util/requests/funcionarioHTTP";
import useAuth from "@/hooks/useAuth";
import Loading from "../UI/Loading";

type GrupoItemProps = {
  grupo: GrupoEstudo | GrupoTerapeutico;
  onPress?: () => void;
  onSelectGrupo?: (isSelected: boolean, grupoId: string) => void;
  isSelected?: boolean;
  anySelected?: boolean;
};

function isGrupoEstudo(grupo: any): grupo is GrupoEstudo {
  return typeof grupo === "object" && grupo !== null && "dono" in grupo;
}

const GrupoItem: React.FC<GrupoItemProps> = ({
  grupo,
  onPress,
  onSelectGrupo,
  isSelected,
  anySelected,
}) => {
  const idDono = isGrupoEstudo(grupo) ? grupo.dono : grupo.idDono;
  const { token } = useAuth();
  const { data: funcionario } = useQuery({
    queryKey: ["funcionarios", idDono],
    enabled: !!idDono,
    queryFn: () => getFuncionarioById(idDono!, token!),
  });

  const handleLongPress = () => {
    onSelectGrupo?.(!!isSelected, grupo.id);
  };

  const handlePress = () => {
    if (anySelected) {
      onSelectGrupo?.(!!isSelected, grupo.id);
    } else {
      router.push(`detalhesGrupo/${grupo.id}`);
      if (onPress) {
        onPress();
      }
    }
  };

  return (
    <Pressable
      style={[styles.wrapper, isSelected && styles.selected]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      android_ripple={{ color: Colors.lightRipple }}
    >
      <StyledText textAlign="center" fontWeight="bold" size="big">
        {grupo.tema}
      </StyledText>
      <InfoBox label="Descrição" content={grupo?.descricao || ""} />
      <InfoBox
        label="Responsável"
        content={formatText(
          `${funcionario?.nome} ${funcionario?.sobrenome}`,
          18
        )}
      />
    </Pressable>
  );
};

export default memo(GrupoItem);

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
  selected: {
    opacity: 0.9,
    backgroundColor: Colors.lightRipple,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderColor: Colors.text,
  },
});
