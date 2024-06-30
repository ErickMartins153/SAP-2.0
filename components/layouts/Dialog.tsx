import { Colors } from "@/constants/Colors";
import { ReactNode } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
} from "react-native-reanimated";
import StyledText from "../UI/StyledText";
import Button from "../general/Button";

type DialogProps = {
  children: ReactNode;
  visible: boolean;
  closeDialog: () => void;
  title: string;
  onSubmit: () => void;
};

export default function Dialog({
  children,
  visible,
  title,
  closeDialog,
  onSubmit,
}: DialogProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <View style={styles.backdrop}>
        <Animated.View style={[styles.dialog]} entering={FadeInDown}>
          <StyledText mode="title" fontWeight="bold" textAlign="center">
            {title}
          </StyledText>
          {children}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Button onPress={closeDialog}>Cancelar</Button>
            <Button onPress={onSubmit}>Confirmar</Button>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backdrop,
    borderWidth: 10,
  },
  dialog: {
    paddingHorizontal: "2%",
    paddingVertical: "4%",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 4,
    gap: 16,
  },
});