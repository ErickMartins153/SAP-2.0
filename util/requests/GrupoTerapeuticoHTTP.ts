import { NewGrupo } from "@/components/grupos/AddGrupoModal";
import { NewAgendamento } from "@/interfaces/Agendamento";

import GrupoTerapeutico from "@/interfaces/GrupoTerapeutico";
import axios, { isAxiosError } from "axios";
import { createTimestamps } from "../dateUtils";

export const GRUPOS_TERAPEUTICOS: GrupoTerapeutico[] = [];

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/grupo-terapeutico";
const AGENDAR_URL =
  process.env.EXPO_PUBLIC_BASE_URL + "/atividades/atendimentos-grupo";

export async function getGruposTerapeuticosByFuncionario({
  funcionarioId,
  token,
}: {
  funcionarioId: string;
  token: string;
}) {
  try {
    console.log(`${BASE_URL}/many/${funcionarioId}`);

    const response = await axios.get(`${BASE_URL}/many/${funcionarioId}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data as GrupoTerapeutico[];
  } catch (error) {
    console.log(error);
  }
}

export function getGrupoById(grupoId: string) {
  return GRUPOS_TERAPEUTICOS.find((grupo) => grupo.id === grupoId);
}

export async function removeParticipante(
  participanteId: string,
  grupoId: string
) {
  const grupo = getGrupoById(grupoId);
  if (grupo) {
    grupo.fichasId = grupo.fichasId.filter((id) => id !== participanteId);
  }
}

export async function addParticipante(participanteId: string, grupoId: string) {
  const grupo = getGrupoById(grupoId);
  if (grupo) {
    if (!grupo.fichasId.includes(participanteId)) {
      grupo.fichasId.push(participanteId);
    }
  }
}

export async function getGruposDisponiveis(
  funcionarioId: string,
  token: string
) {
  try {
    console.log(
      `${BASE_URL}/grupo-nao-participados/many?uid-funcionario=${funcionarioId}`
    );

    const response = await axios.get(
      `${BASE_URL}/grupo-nao-participados/many?uid-funcionario=${funcionarioId}`,
      {
        headers: { Authorization: "Bearer " + token },
      }
    );

    return response.data as GrupoTerapeutico[];
  } catch (error) {
    console.log(error);
  }
}

export async function createGrupoTerapeutico({
  newGrupo,
  token,
}: {
  newGrupo: NewGrupo;
  token: string;
}) {
  try {
    const response = await axios.post(
      `${BASE_URL}/`,
      {
        tema: newGrupo.tema,
        descricao: newGrupo.descricao,
        idDono: newGrupo.idMinistrante,
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data.tema as string;
  } catch (error) {
    console.log(error);
  }
}

export async function createAgendamentoTerapeutico({
  agendamento,
  token,
}: {
  agendamento: NewAgendamento;
  token: string;
}) {
  try {
    const {
      idFuncionario: idFuncionario,
      idSala: idSala,
      idTerapeuta: terapeuta,
      data,
      idFicha: idGrupoTerapeutico,
      horario,
    } = agendamento;
    const { tempoFim, tempoInicio } = createTimestamps(data!, horario!);
    const finalData = {
      idSala,
      tempoInicio,
      tempoFim,
      status: "PENDENTE",
      idFuncionario,
      idGrupoTerapeutico,
    };
    console.log(`${AGENDAR_URL}/one`);

    console.log(finalData);

    const response = await axios.post(`${AGENDAR_URL}/one`, finalData, {
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function deleteGrupoTerapeutico({
  grupoId,
  token,
}: {
  grupoId: string;
  token: string;
}) {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${grupoId}`, {
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message, { cause: "Algo deu errado" });
    }
    throw new Error("Erro inesperado");
  }
}

export async function deleteGruposTerapeutico({
  gruposId,
  token,
}: {
  gruposId: string[];
  token: string;
}) {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/many`, {
      data: gruposId,
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.message, { cause: "Algo deu errado" });
    }
    throw new Error("Erro inesperado");
  }
}
