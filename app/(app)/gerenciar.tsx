import Icon from "@/components/general/Icon";
import Input from "@/components/general/Input";
import StyledText from "@/components/general/StyledText";
import MainPageLayout from "@/components/layouts/MainPageLayout";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Gerenciar() {
  const [email, setEmail] = useState("");

  function changeEmailHandler(text: string) {
    setEmail(text);
  }
  return (
    <MainPageLayout>
      <View style={styles.mainContainer}>
        <View style={styles.wrapper}>
          <StyledText mode="big" textAlign="center">
            Cadastrar
          </StyledText>
          <Input
            placeholder="email@upe.br"
            changeText={changeEmailHandler}
            value={email}
          />
          <Icon name="arrow-right-circle" style={{ alignSelf: "flex-end" }} />
        </View>

        <View style={styles.wrapper}>
          <StyledText mode="big" textAlign="center">
            Remover
          </StyledText>
        </View>
      </View>
    </MainPageLayout>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    gap: 64,
    paddingVertical: "4%",
  },
  wrapper: {
    padding: "4%",
    backgroundColor: Colors.white,
    elevation: 4,
    borderRadius: 4,
  },
});
