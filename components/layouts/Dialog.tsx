import { Colors } from "@/constants/Colors";
import { PropsWithoutRef, ReactNode } from "react";
import { Modal, Pressable, StyleSheet, View, ViewProps } from "react-native";
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
  onSubmit?: () => void;
  backdropBehavior?: "none" | "dismiss";
} & PropsWithoutRef<ViewProps>;

export default function Dialog({
  children,
  visible,
  title,
  closeDialog,
  onSubmit,
  style,
  backdropBehavior = "none",
  ...props
}: DialogProps) {
  return (
    <Modal visible={visible} transparent={true} animationType="none">
      <Pressable
        style={styles.backdrop}
        onPress={backdropBehavior === "dismiss" ? closeDialog : undefined}
      >
        <Animated.View
          style={[styles.dialog, style]}
          entering={FadeInDown}
          {...props}
        >
          <StyledText mode="title" fontWeight="bold" textAlign="center">
            {title}
          </StyledText>
          {children}
          {onSubmit && (
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Button onPress={closeDialog}>Cancelar</Button>
              <Button onPress={onSubmit}>Confirmar</Button>
            </View>
          )}
        </Animated.View>
      </Pressable>
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
    paddingHorizontal: "1%",
    paddingVertical: "4%",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 4,
    gap: 16,
  },
});
