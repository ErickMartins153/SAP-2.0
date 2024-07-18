import { NewGrupo } from "@/components/grupos/AddGrupoModal";
import { NewAgendamento, Status } from "@/interfaces/Agendamento";
import GrupoEstudo from "@/interfaces/GrupoEstudo";
import { agendarHorario } from "./agendamentoHTTP";
import { GRUPOS_TERAPEUTICOS } from "./GrupoTerapeuticoHTTP";

export const GRUPOS_ESTUDO: GrupoEstudo[] = [
  {
    id: "101",
    temaEstudo: "Psicologia Organizacional",
    idMinistrante: "2",
    idParticipantes: ["3", "5", "4"],
  },
  {
    id: "102",
    temaEstudo: "Psicologia do Desenvolvimento",
    idMinistrante: "3",
    idParticipantes: ["2", "4", "6"],
  },
  {
    id: "103",
    temaEstudo: "Psicologia Social",
    idMinistrante: "7",
    idParticipantes: ["8"],
  },
  {
    id: "104",
    temaEstudo: "Psicologia Clínica",
    idMinistrante: "5",
    idParticipantes: ["1", "6", "8"],
  },
  {
    id: "105",
    temaEstudo: "Psicologia Cognitiva",
    idMinistrante: "7",
    idParticipantes: ["2", "4", "6"],
  },
  {
    id: "106",
    temaEstudo: "Neurociência",
    idMinistrante: "5",
    idParticipantes: ["2", "3", "4", "6", "7", "8"],
  },
];

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

export async function createGrupo(newGrupo: NewGrupo) {
  const { tema: temaEstudo, idMinistrante, tipo } = newGrupo;
  if (tipo === "Estudo") {
    return GRUPOS_ESTUDO.push({
      id: GRUPOS_ESTUDO.length.toString(),
      idMinistrante,
      temaEstudo,
      idParticipantes: [],
    });
  }
}
