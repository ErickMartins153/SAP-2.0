import { PropsWithoutRef, useState } from "react";
import Dialog, { DialogProps } from "../layouts/Dialog";
import Input from "../general/Input";
import { Alert, View } from "react-native";
import Button from "../general/Button";
import { notBlank } from "@/util/validate";

type PasswordDialogProps = {
  onChangePassword: (passwords: PasswordReset) => void;
} & Omit<PropsWithoutRef<DialogProps>, "title" | "children">;

export type PasswordReset = {
  senhaAtual: string;
  novaSenha: string;
  confirmacaoSenha: string;
};

const defaultValues: PasswordReset = {
  confirmacaoSenha: "",
  senhaAtual: "",
  novaSenha: "",
};

export default function PasswordDialog({
  onChangePassword,
  closeDialog,
  visible,
  ...props
}: PasswordDialogProps) {
  const [passwords, setPasswords] = useState<PasswordReset>(defaultValues);

  function changePasswordHandler(
    field: keyof typeof defaultValues,
    input: string
  ) {
    setPasswords((inputs) => ({ ...inputs, [field]: input }));
  }

  function submitHandler() {
    if (notBlank(passwords)) {
      if (passwords.novaSenha === passwords.confirmacaoSenha) {
        onChangePassword(passwords);
      } else {
        Alert.alert("As senhas devem ser iguais!");
      }
    } else {
      Alert.alert(
        "Erro",
        "Preencha todas as informações necessárias para continuar."
      );
    }
  }

  function resetHandler() {
    setPasswords(defaultValues);
  }

  return (
    <Dialog
      closeDialog={closeDialog}
      visible={visible}
      title="Alterar senha"
      reset={resetHandler}
      {...props}
    >
      <View>
        <Input
          placeholder="Digite a senha atual"
          onChangeText={changePasswordHandler.bind(null, "senhaAtual")}
          value={passwords.senhaAtual}
          mode="password"
        />
        <Input
          placeholder="Digite a nova senha"
          onChangeText={changePasswordHandler.bind(null, "novaSenha")}
          value={passwords.novaSenha}
          mode="password"
        />
        <Input
          placeholder="Repita a nova senha"
          onChangeText={changePasswordHandler.bind(null, "confirmacaoSenha")}
          value={passwords.confirmacaoSenha}
          mode="password"
        />
      </View>
      <Button onPress={submitHandler}>Mudar senha</Button>
    </Dialog>
  );
}
