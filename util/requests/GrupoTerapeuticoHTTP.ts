import { NewGrupo } from "@/components/grupos/AddGrupoModal";

import GrupoTerapeutico from "@/interfaces/GrupoTerapeutico";
import axios, { isAxiosError } from "axios";

export const GRUPOS_TERAPEUTICOS: GrupoTerapeutico[] = [];

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/grupo-terapeutico";
// headers: { Authorization: "Bearer " + token },

export async function getGruposTerapeuticosByFuncionario({
  funcionarioId,
  token,
}: {
  funcionarioId: string;
  token: string;
}) {
  try {
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

export async function getGruposDisponiveis(funcionarioId: string) {
  return GRUPOS_TERAPEUTICOS.filter(
    (grupo) =>
      !(
        grupo.fichasId.includes(funcionarioId) ||
        grupo.idDono.includes(funcionarioId)
      )
  );
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

export async function getGruposTerapeuticoDisponiveis({
  funcionarioId,
  token,
}: {
  funcionarioId: string;
  token: string;
}) {
  return [] as GrupoTerapeutico[];
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
