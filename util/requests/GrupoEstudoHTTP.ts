import { NewGrupo } from "@/components/grupos/AddGrupoModal";
import { NewAgendamento, Status } from "@/interfaces/Agendamento";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import { agendarHorario } from "./agendamentoHTTP";
import { GRUPOS_TERAPEUTICOS } from "./GrupoTerapeuticoHTTP";

export const GRUPOS_ESTUDO: GrupoEstudo[] = [];

export function getGruposByFuncionario(funcionarioId: string) {
  return GRUPOS_ESTUDO.filter(
    (grupo) =>
      grupo.idParticipantes.includes(funcionarioId) ||
      grupo.idMinistrante.includes(funcionarioId)
  );
}

export function getGrupoById(grupoId: string) {
  return GRUPOS_ESTUDO.find((grupo) => grupo.id === grupoId);
}

export async function removeParticipante(
  participanteId: string,
  grupoId: string
) {
  const grupo = getGrupoById(grupoId);
  if (grupo) {
    grupo.idParticipantes = grupo.idParticipantes.filter(
      (id) => id !== participanteId
    );
  }
}

export async function addParticipante(participanteId: string, grupoId: string) {
  const grupo = getGrupoById(grupoId);
  if (grupo) {
    if (!grupo.idParticipantes.includes(participanteId)) {
      grupo.idParticipantes.push(participanteId);
    }
  }
}

export async function getGruposDisponiveis(funcionarioId: string) {
  return GRUPOS_ESTUDO.filter(
    (grupo) =>
      !(
        grupo.idParticipantes.includes(funcionarioId) ||
        grupo.idMinistrante.includes(funcionarioId)
      )
  );
}

export async function createGrupoEstudo(newGrupo: NewGrupo) {
  const { tema: temaEstudo, idMinistrante, tipo, descricao } = newGrupo;
  if (tipo === "Estudo") {
    return GRUPOS_ESTUDO.push({
      id: GRUPOS_ESTUDO.length.toString(),
      idMinistrante,
      temaEstudo: temaEstudo.trim(),
      idParticipantes: [],
      descricao: descricao?.trim(),
    });
  }
}
