import { Colors } from "@/constants/Colors";
import { PropsWithoutRef, ReactNode } from "react";
import { Modal, Pressable, StyleSheet, View, ViewProps } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import StyledText from "../UI/StyledText";
import Button from "../general/Button";

export type DialogProps = {
  children: ReactNode;
  visible: boolean;
  closeDialog: () => void;
  title: string;
  onSubmit?: () => void;
  reset?: () => void;
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
  reset,
  ...props
}: DialogProps) {
  function closeDialogHandler() {
    if (reset) {
      reset();
    }
    closeDialog();
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={closeDialogHandler}
    >
      <Pressable
        style={styles.backdrop}
        onPress={
          backdropBehavior === "dismiss" ? closeDialogHandler : undefined
        }
      />
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
          <View
            style={{ flexDirection: "row", gap: 12, justifyContent: "center" }}
          >
            <Button onPress={closeDialogHandler}>Cancelar</Button>
            <Button onPress={onSubmit}>Confirmar</Button>
          </View>
        )}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1,
    backgroundColor: Colors.backdrop,
  },
  dialog: {
    minWidth: "92%",
    margin: "4%",
    marginVertical: "auto",
    alignSelf: "center",
    paddingHorizontal: "2%",
    paddingVertical: "4%",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 4,
    gap: 16,
  },
});
