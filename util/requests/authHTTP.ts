import Funcionario, { newFuncionario, Token } from "@/interfaces/Funcionario";
import axios from "axios";
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
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      return Alert.alert(
        "Credenciais incorretas",
        "Seu email ou senha estão incorretos, verifique e tente novamente."
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
  const response = await axios.post(`${BASE_URL}/register-tecnico`, {
    ...funcionarioData,
    senha: `SAP${new Date().getFullYear()}`,
  });

  if (response.status === 201) {
    return funcionarioData.email;
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
  const finalData = {
    ...funcionarioData,
    senha: `SAP${new Date().getFullYear()}`,
    urlImagem: "",
  };

  const response = await axios.post(
    `${BASE_URL}/register-estagiario`,
    finalData,
    { headers: { Authorization: "Bearer " + token } }
  );

  if (response.status === 201) {
    return funcionarioData.email;
  } else {
    throw new Error(
      "Houve algum problema no registro do novo estagiário, verifique as informações e tente novamente!"
    );
  }
}
