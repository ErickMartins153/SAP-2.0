import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Icon from "../general/Icon";
import StyledText from "../general/StyledText";
import Input from "../general/Input";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import Button from "../general/Button";

type RecoverForm = {
  isVisible: boolean;
  toggleModal: () => void;
};

export default function RecoverForm({ isVisible, toggleModal }: RecoverForm) {
  const [email, setEmail] = useState("");

  function inputHandler(text: string) {
    setEmail(text);
  }

  function submitHandler() {
    if (email.trim() === "") return;
    Alert.alert(
      "Email enviado",
      `Um email com instruções de recuperação foi enviado para ${email}`,
      [{ text: "Ok", isPreferred: true, onPress: toggleModal }]
    );
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={toggleModal}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: "4%",
          backgroundColor: Colors.background,
          flexGrow: 1,
        }}
      >
        <View style={styles.header}>
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={toggleModal}
          >
            <Icon name="chevron-left" size={32} />
            <StyledText mode="big" fontWeight="bold" textAlign="center">
              Voltar
            </StyledText>
          </Pressable>
        </View>
        <View style={styles.rootContainer}>
          <Image
            source={require("@/assets/images/logoSAP.png")}
            resizeMode="center"
          />
          <View style={styles.input}>
            <Input
              placeholder="email@upe.br"
              style={styles.input}
              onChangeText={inputHandler}
              value={email}
            />
            <Button onPress={submitHandler}>Recuperar senha</Button>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    elevation: 4,
    paddingVertical: "4%",
    paddingRight: "2%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  input: {
    width: "100%",
    gap: 16,
    paddingHorizontal: "4%",
  },
});
