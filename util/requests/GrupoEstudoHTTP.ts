import { NewGrupo } from "@/components/grupos/AddGrupoModal";
import { NewAgendamento, Status } from "@/interfaces/Agendamento";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import { createAtendimento } from "./atendimentoIndividualHTTP";

import axios, { isAxiosError } from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/grupoEstudo";

export async function getGruposByFuncionario({
  funcionarioId,
  token,
}: {
  funcionarioId: string;
  token: string;
}) {
  try {
    const response = await axios.get(
      `${BASE_URL}/funcionario/${funcionarioId}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data as GrupoEstudo[];
  } catch (error) {
    console.log(error);
  }
}

export async function getGrupoById({
  grupoId,
  token,
}: {
  grupoId: string;
  token: string;
}) {
  try {
    const response = await axios.get(`${BASE_URL}/${grupoId}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data as GrupoEstudo;
  } catch (error) {
    console.log(error);
  }
}

export async function removeParticipante({
  idGrupo,
  idParticipante,
  token,
}: {
  idParticipante: string;
  idGrupo: string;
  token: string;
}) {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteParticipacao`, {
      data: { idParticipante, idGrupo },
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addParticipante({
  grupoId,
  participanteId,
  token,
}: {
  participanteId: string;
  grupoId: string;
  token: string;
}) {
  try {
    const response = await axios.post(
      `${BASE_URL}/addFuncionario`,
      {
        idParticipante: participanteId,
        idGrupo: grupoId,
      },
      { headers: { Authorization: "Bearer " + token } }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getGruposEstudoDisponiveis({
  funcionarioId,
  token,
}: {
  funcionarioId: string;
  token: string;
}) {
  try {
    const response = await axios.get(`${BASE_URL}/all`, {
      headers: { Authorization: "Bearer " + token },
    });
    console.log(response.data);

    return response.data as GrupoEstudo[];
  } catch (error) {
    console.log(error);
  }
}

export async function createGrupoEstudo({
  newGrupo,
  token,
}: {
  newGrupo: NewGrupo;
  token: string;
}) {
  const { tema: temaEstudo, idMinistrante, tipo, descricao } = newGrupo;
  if (tipo === "Estudo") {
    const response = await axios.post(
      `${BASE_URL}/`,
      {
        tema: temaEstudo.trim(),
        descricao: descricao?.trim(),
        dono: idMinistrante,
      },
      { headers: { Authorization: "Bearer " + token } }
    );
    return temaEstudo;
  }
}

export async function getParticipantesByGrupo({
  idGrupo,
  token,
}: {
  idGrupo: string;
  token: string;
}) {
  try {
    const response = await axios.get(`${BASE_URL}/participantes/${idGrupo}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data as string[];
  } catch (error) {
    console.log(error);
  }
}

export async function deleteGrupoEstudo({
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

export async function deleteGruposEstudo({
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
