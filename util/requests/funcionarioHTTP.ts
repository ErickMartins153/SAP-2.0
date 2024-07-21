import Funcionario, { newFuncionario } from "@/interfaces/Funcionario";
import axios, { isAxiosError } from "axios";
import { registerEstagiario, registerTecnico } from "./authHTTP";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/funcionarios";

export async function getFuncionariosAtivos(token: string) {
  const response = await axios.get(`${BASE_URL}/many/ativos`, {
    headers: { Authorization: "Bearer " + token },
  });

  return response.data as Funcionario[];
}

export async function getFuncionariosInativos(token: string) {
  const response = await axios.get(`${BASE_URL}/many/inativos`, {
    headers: { Authorization: "Bearer " + token },
  });

  return response.data as Funcionario[];
}

export async function getFuncionarioById(funcionarioId: string, token: string) {
  const response = await axios.get(
    `${BASE_URL}/one?by=uid&uid=${funcionarioId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data as Funcionario;
}

export async function toggleAtivacaoFuncionario({
  funcionarioId,
  mode,
  token,
}: {
  funcionarioId: string;
  mode: "ATIVAR" | "DESATIVAR";
  token: string;
}) {
  const url = `${BASE_URL}/one/activation?uid=${funcionarioId}&status=${
    mode === "ATIVAR"
  }`;

  try {
    const response = await axios.put(url, null, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data as Funcionario;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.toJSON());
    }
  }
}

export async function addFuncionario({
  funcionarioData,
  cargo,
  token,
}: {
  funcionarioData: newFuncionario;
  cargo: newFuncionario["cargo"];
  token: string;
}) {
  if (cargo === "TECNICO") {
    return await registerTecnico(funcionarioData);
  } else if (cargo === "ESTAGIARIO") {
    return await registerEstagiario(funcionarioData, token);
  }
}

export async function getTecnicos(token: string) {
  const response = await axios.get(`${BASE_URL}/many/tecnicos`, {
    headers: { Authorization: "Bearer " + token },
  });

  return response.data as Funcionario[];
}

export async function getSupervisionados(supervisorId: string, token: string) {
  const response = await axios.get(
    `${BASE_URL}/many/supervisionados?uid=${supervisorId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data as Funcionario[];
}

export async function getFuncionariosByIds(uids: string[], token: string) {
  const url = `${BASE_URL}/many/uids`;
  const response = await axios.post(url, uids, {
    headers: { Authorization: "Bearer " + token },
  });

  return response.data as Funcionario[];
}

export async function changePictureFuncionario(
  funcionarioId: string,
  imageURI: string
) {
  // const funcionario = FUNCIONARIOS.find(
  //   (funcionario) => funcionario.id === funcionarioId
  // );
  // if (funcionario) {
  //   funcionario.urlImagem = imageURI;
  //   return true;
  // }
  // return false;
}
