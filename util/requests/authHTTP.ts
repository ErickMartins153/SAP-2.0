import Funcionario, { newFuncionario, Token } from "@/interfaces/Funcionario";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/authentication";

export type Credentials = {
  email: string;
  senha: string;
};

export async function authenticateUser(credentials: Credentials) {
  const response = await axios.post(`${BASE_URL}/login`, credentials);

  return response.data as { funcionario: Funcionario; token: Token };
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
      "Houve algum problema no registro do novo funcionário, verifique as informações e tente novamente!"
    );
  }
}

export async function registerEstagiario() {}
