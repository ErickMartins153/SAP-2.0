import { PasswordReset } from "@/components/form/PasswordDialog";
import Funcionario, { newFuncionario, Token } from "@/interfaces/Funcionario";
import axios, { isAxiosError } from "axios";
import { Alert } from "react-native";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/authentication";

export type Credentials = {
  email: string;
  senha: string;
};

export async function authenticateUser(credentials: Credentials) {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);

    return response.data as { funcionario: Funcionario; token: Token };
  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error(
        "Seu email ou senha estão incorretos, verifique e tente novamente.",
        { cause: "Credenciais inválidas" }
      );
    }
    if (axios.isAxiosError(error) && error.response?.status === 502) {
      return Alert.alert(
        "Servidor indisponivel",
        "O servidor está indisponível no momento, tente novamente mais tarde!"
      );
    }
  }
}

export async function registerTecnico(funcionarioData: newFuncionario) {
  const senha = `SAP${new Date().getFullYear()}`;
  const response = await axios.post(`${BASE_URL}/register-tecnico`, {
    ...funcionarioData,
    senha,
  });

  if (response.status === 201) {
    return { email: funcionarioData.email, senha };
  } else {
    throw new Error(
      "Houve algum problema no registro do novo técnico, verifique as informações e tente novamente!"
    );
  }
}

export async function registerEstagiario(
  funcionarioData: newFuncionario,
  token: string
) {
  const senha = `SAP${new Date().getFullYear()}`;
  const finalData = {
    ...funcionarioData,
    senha,
    urlImagem: "",
  };
  console.log(`${BASE_URL}/register-estagiario`);

  const response = await axios.post(
    `${BASE_URL}/register-estagiario`,
    finalData,
    { headers: { Authorization: "Bearer " + token } }
  );

  if (response.status === 201) {
    return { email: funcionarioData.email, senha };
  } else {
    throw new Error(
      "Houve algum problema no registro do novo estagiário, verifique as informações e tente novamente!"
    );
  }
}

export async function redefinePassword({
  passwords,
  token,
}: {
  passwords: PasswordReset;
  token: string;
}) {
  try {
    const response = await axios.put(
      `${BASE_URL}/redefine-password?old-password=${passwords.senhaAtual}&new-password=${passwords.novaSenha}`,
      null,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Senha inválida!");
      }
    }
  }
}
