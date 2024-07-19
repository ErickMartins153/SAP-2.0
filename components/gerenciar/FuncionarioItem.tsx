import { Pressable, StyleSheet, View } from "react-native";
import StyledText from "../UI/StyledText";
import UserAvatar from "../UI/UserAvatar";
import { Colors } from "@/constants/Colors";
import Funcionario from "@/interfaces/Funcionario";
import { memo } from "react";

type FuncionarioItemProps = {
  funcionario: Funcionario;
  onSelect: (funcionario: Funcionario) => void;
  selectable?: boolean;
};

const FuncionarioItem = ({
  funcionario,
  onSelect,
  selectable: selfSelectable = true,
}: FuncionarioItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed]}
      android_ripple={{ color: Colors.lightRipple }}
      onPress={selfSelectable ? () => onSelect(funcionario) : undefined}
    >
      <UserAvatar size={64} imageURL={funcionario.urlImagem} />
      <View style={styles.mainContainer}>
        <StyledText size="small" fontWeight="bold">
          {`${funcionario?.nome} ${funcionario.sobrenome}`}
        </StyledText>
        <StyledText style={styles.text}>{funcionario.email}</StyledText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    borderWidth: 2,
    padding: "2%",
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: "4%",
  },
  text: {
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  pressed: {
    opacity: 0.8,
  },
});

export default memo(FuncionarioItem);
