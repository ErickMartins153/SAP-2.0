import { NewGrupo } from "@/components/grupos/AddGrupoModal";

import GrupoTerapeutico from "@/interfaces/GrupoTerapeutico";

export const GRUPOS_TERAPEUTICOS: GrupoTerapeutico[] = [];

export function getGruposTerapeuticosByFuncionario(funcionarioId: string) {
  return GRUPOS_TERAPEUTICOS.filter(
    (grupo) =>
      grupo.fichasId.includes(funcionarioId) ||
      grupo.coordenador.includes(funcionarioId)
  );
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
        grupo.coordenador.includes(funcionarioId)
      )
  );
}

export async function createGrupoTerapeutico(newGrupo: NewGrupo) {
  const { tema, idMinistrante: coordenador, tipo, descricao } = newGrupo;
  if (tipo === "Terapêutico") {
    return GRUPOS_TERAPEUTICOS.push({
      id: GRUPOS_TERAPEUTICOS.length.toString(),
      coordenador,
      tema: tema.trim(),
      fichasId: [],
      descricao: descricao?.trim(),
    });
  }
}
