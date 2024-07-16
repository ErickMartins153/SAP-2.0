import Funcionario, { newFuncionario } from "@/interfaces/Funcionario";
import axios from "axios";
import { registerEstagiario, registerTecnico } from "./authHTTP";

// export const FUNCIONARIOS: Funcionario[] = [
//   {
//     id: "1",
//     nome: "Erick",
//     sobrenome: "Martins",
//     email: "",
//     cargo: "TECNICO",
//     ativo: true,
//   },
//   {
//     id: "2",
//     urlImagem: `https://avatar.iran.liara.run/public/2`,
//     nome: "Ana",
//     sobrenome: "Oliveira",
//     email: "ana",
//     cargo: "ESTAGIARIO",
//     ativo: true,
//     supervisor: {
//       id: "1",
//       nome: "Erick Martins",
//       imagemURL: `https://avatar.iran.liara.run/public/1`,
//     },
//   },
//   {
//     id: "3",
//     urlImagem: `https://avatar.iran.liara.run/public/3`,
//     nome: "Marcos",
//     sobrenome: "Souza",
//     email: "marcos.souza@upe.br",
//     cargo: "TECNICO",
//     ativo: true,
//   },
//   {
//     id: "4",
//     urlImagem: `https://avatar.iran.liara.run/public/4`,
//     nome: "Julia",
//     sobrenome: "Ferreira",
//     email: "julia.ferreira@upe.br",
//     cargo: "ESTAGIARIO",
//     ativo: true,
//     supervisor: {
//       id: "3",
//       nome: "Marcos Souza",
//       imagemURL: `https://avatar.iran.liara.run/public/3`,
//     },
//   },
//   {
//     id: "5",
//     urlImagem: `https://avatar.iran.liara.run/public/5`,
//     nome: "Roberto",
//     sobrenome: "Costa",
//     email: "roberto.costa@upe.br",
//     cargo: "TECNICO",
//     ativo: true,
//   },
//   {
//     id: "6",
//     urlImagem: `https://avatar.iran.liara.run/public/6`,
//     nome: "Fernanda",
//     sobrenome: "Ribeiro",
//     email: "fernanda.ribeiro@upe.br",
//     cargo: "ESTAGIARIO",
//     ativo: true,
//     supervisor: {
//       id: "5",
//       nome: "Roberto Costa",
//       imagemURL: `https://avatar.iran.liara.run/public/5`,
//     },
//   },
//   {
//     id: "7",
//     urlImagem: `https://avatar.iran.liara.run/public/7`,
//     nome: "Ricardo",
//     sobrenome: "Almeida",
//     email: "ricardo.almeida@upe.br",
//     cargo: "TECNICO",
//     ativo: true,
//   },
//   {
//     id: "8",
//     urlImagem: `https://avatar.iran.liara.run/public/8`,
//     nome: "Patricia",
//     sobrenome: "Lima",
//     email: "patricia.lima@upe.br",
//     cargo: "ESTAGIARIO",
//     ativo: true,
//     supervisor: {
//       id: "7",
//       nome: "Ricardo Almeida",
//       imagemURL: `https://avatar.iran.liara.run/public/7`,
//     },
//   },
// ];

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/funcionarios";

export async function getFuncionariosAtivos(token: string) {
  const response = await axios.get(`${BASE_URL}/many?by=ativos`, {
    headers: { Authorization: "Bearer " + token },
  });

  return response.data as Funcionario[];
}

export async function getFuncionariosInativos(token: string) {
  const response = await axios.get(`${BASE_URL}/many?by=inativos`, {
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

export async function desativarFuncionario({
  funcionarioId,
  token,
}: {
  funcionarioId: string;
  token: string;
}) {
  try {
    const response = await axios.put(
      `${BASE_URL}/activation?uid=${funcionarioId}&status=${false}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    return response.data as Funcionario;
  } catch (error) {
    console.log(error);
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
  const response = await axios.get(`${BASE_URL}/many?by=tecnicos`, {
    headers: { Authorization: "Bearer " + token },
  });

  return response.data as Funcionario[];
}

export async function getSupervisionados(supervisorId: string, token: string) {
  const response = await axios.get(
    `${BASE_URL}/many?by=supervisionados&uid=${supervisorId}`,
    {
      headers: { Authorization: "Bearer " + token },
    }
  );
  return response.data as Funcionario[];
}

export function getFuncionariosByIds(ids: string[]): Funcionario[] {
  return ids
    .map((id) => FUNCIONARIOS.find((funcionario) => funcionario.id === id))
    .filter((funcionario) => funcionario !== undefined) as Funcionario[];
}

export async function changePictureFuncionario(
  funcionarioId: string,
  imageURI: string
) {
  const funcionario = FUNCIONARIOS.find(
    (funcionario) => funcionario.id === funcionarioId
  );
  if (funcionario) {
    funcionario.urlImagem = imageURI;
    return true;
  }
  return false;
}
