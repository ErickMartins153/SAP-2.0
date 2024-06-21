import { StyleSheet, View } from "react-native";

import { useState } from "react";
import Input from "../general/Input";
import Button from "../general/Button";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";
import StyledText from "../general/StyledText";

type LoginContent = {
  email: string;
  senha: string;
};

export default function LoginForm() {
  const [inputs, setInputs] = useState<LoginContent>({ email: "", senha: "" });
  const { login } = useAuth();

  function InputChangeHandler(field: keyof LoginContent, text: string) {
    setInputs((prevInput) => ({ ...prevInput, [field]: text }));
  }

  function onSubmitHandler() {
    login(inputs.email);
    router.replace("/");
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="email@upe.br"
          onChangeText={InputChangeHandler.bind(null, "email")}
          value={inputs.email}
        />
        <View style={styles.passwordContainer}>
          <Input
            onChangeText={InputChangeHandler.bind(null, "senha")}
            placeholder="Digite sua senha"
            style={{}}
            value={inputs.senha}
            mode="password"
          />

          <View style={styles.recoverContainer}>
            <StyledText color="icon">Esqueci minha senha</StyledText>
          </View>
        </View>
      </View>
      <View>
        <Button onPress={onSubmitHandler}>Entrar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: "5%",
  },
  passwordContainer: {
    paddingBottom: "4%",
  },
  recoverContainer: {
    marginTop: "2%",
    alignItems: "flex-end",
  },
  invalid: {
    borderWidth: 2,
  },
});
