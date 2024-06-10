import { StyleSheet, View } from "react-native";

import { useState } from "react";
import Input from "../general/Input";
import Button from "../general/Button";
import useAuth from "@/hooks/useAuth";
import { router } from "expo-router";

export default function LoginForm() {
  const [inputs, setInputs] = useState({ login: "", password: "" });
  const { login } = useAuth();

  function InputChangeHandler(text: string, field: string) {
    setInputs((prevInput) => ({ ...prevInput, [field]: text }));
  }

  function onSubmitHandler() {
    login(inputs.login);
    router.replace("/");
  }

  return (
    <View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="email@upe.br"
          changeText={InputChangeHandler}
          field="login"
          value={inputs.login}
        />
        <View style={styles.passwordContainer}>
          <Input
            changeText={InputChangeHandler}
            field="password"
            placeholder="Digite sua senha"
            value={inputs.password}
            mode="password"
          />

          <View style={styles.passwordTextContainer}></View>
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
  passwordInput: {
    marginBottom: "2%",
  },
  passwordTextContainer: {
    alignItems: "flex-end",
  },
  invalid: {
    borderWidth: 2,
  },
});
