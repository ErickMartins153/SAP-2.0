import { Colors } from "@/constants/Colors";
import { PropsWithoutRef, type ReactNode } from "react";
import {
  Modal,
  ModalProps,
  Pressable,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
} from "react-native";
import Icon from "../general/Icon";
import StyledText from "../UI/StyledText";
import Loading from "../UI/Loading";

export type ModalLayoutProps = {
  children: ReactNode;
  submitButton?: SubmitButton;
  toggleModal: () => void;
  isLoading?: boolean;
  backgroundColor?: keyof typeof Colors;
  headerColor?: keyof typeof Colors;
  scrollEnabled?: boolean;
  keyboardShouldPersistTaps?: ScrollViewProps["keyboardShouldPersistTaps"];
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
  backgroundColor,
  headerColor = "white",
  scrollEnabled = true,
  keyboardShouldPersistTaps = "handled",
  ...props
}: ModalLayoutProps) {
  if (scrollEnabled) {
    return (
      <Modal animationType="slide" onRequestClose={toggleModal} {...props}>
        {isLoading && <Loading />}
        <ScrollView
          contentContainerStyle={{ paddingBottom: "4%" }}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          style={
            backgroundColor && { backgroundColor: Colors[backgroundColor] }
          }
          scrollEnabled={scrollEnabled}
        >
          <View
            style={[styles.header, { backgroundColor: Colors[headerColor] }]}
          >
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
                size="big"
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
  } else {
    return (
      <Modal animationType="slide" onRequestClose={toggleModal} {...props}>
        {isLoading && <Loading />}
        <View
          style={
            backgroundColor && { backgroundColor: Colors[backgroundColor] }
          }
        >
          <View
            style={[styles.header, { backgroundColor: Colors[headerColor] }]}
          >
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
                size="big"
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
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    elevation: 4,
    paddingVertical: "4%",
    paddingRight: "2%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
});
