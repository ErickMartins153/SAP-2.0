import { Colors } from "@/constants/Colors";
import { PropsWithoutRef, type ReactNode } from "react";
import {
  Modal,
  ModalProps,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Icon from "../general/Icon";
import StyledText from "../UI/StyledText";
import Loading from "../UI/Loading";

type ModalLayoutProps = {
  children: ReactNode;
  submitButton?: SubmitButton;
  toggleModal: () => void;
  isLoading?: boolean;
} & PropsWithoutRef<ModalProps>;

type SubmitButton = {
  button: (props: { onSubmit: () => void }) => ReactNode;
  onSubmit: () => void;
};

export default function ModalLayout({
  children,
  submitButton,
  toggleModal,
  isLoading,
  ...props
}: ModalLayoutProps) {
  return (
    <Modal animationType="slide" onRequestClose={toggleModal} {...props}>
      {isLoading && <Loading />}
      <ScrollView
        contentContainerStyle={{ paddingBottom: "4%" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: "2%",
            }}
            onPress={toggleModal}
          >
            <Icon name="chevron-left" size={32} onPress={toggleModal} />
            <StyledText
              mode="big"
              fontWeight="bold"
              textAlign="center"
              onPress={toggleModal}
            >
              Voltar
            </StyledText>
          </Pressable>
          {submitButton &&
            submitButton.button({ onSubmit: submitButton.onSubmit })}
        </View>
        <View style={{ marginHorizontal: "3%" }}>{children}</View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    elevation: 4,
    paddingVertical: "4%",
    paddingRight: "2%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
});
