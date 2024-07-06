import { NewGrupo } from "@/components/grupos/AddGrupoModal";
import { NewAgendamento } from "@/interfaces/Agendamento";
import GrupoTerapeutico from "@/interfaces/GrupoTerapeutico";
import { agendarHorario } from "./agendamentoHTTP";

export const GRUPOS_TERAPEUTICOS: GrupoTerapeutico[] = [
  {
    id: "20",
    tema: "Gerenciamento de Estresse",
    participantesId: ["1", "2", "3"],
    ministrantesId: ["4"],
    encontro: {
      salaId: "2",
      horario: { data: "15/07/2024", hora: "14:00" },
    },
  },
  {
    id: "21",
    tema: "Comunicação Eficaz",
    participantesId: ["4", "5", "6"],
    ministrantesId: ["7"],
    encontro: {
      salaId: "4",
      horario: { data: "16/07/2024", hora: "10:00" },
    },
  },
  {
    id: "22",
    tema: "Trabalho em Equipe",
    participantesId: ["7", "8", "1"],
    ministrantesId: ["2"],
    encontro: {
      salaId: "1",
      horario: { data: "17/07/2024", hora: "16:00" },
    },
  },
  {
    id: "23",
    tema: "Gestão de Tempo",
    participantesId: ["2", "3", "4"],
    ministrantesId: ["5"],
    encontro: {
      salaId: "3",
      horario: { data: "18/07/2024", hora: "09:00" },
    },
  },
  {
    id: "24",
    tema: "Desenvolvimento de Liderança",
    participantesId: ["5", "6", "7"],
    ministrantesId: ["3"],
    encontro: {
      salaId: "5",
      horario: { data: "19/07/2024", hora: "13:00" },
    },
  },
];

export function getGruposTerapeuticosByFuncionario(funcionarioId: string) {
  return GRUPOS_TERAPEUTICOS.filter(
    (grupo) =>
      grupo.participantesId.includes(funcionarioId) ||
      grupo.ministrantesId.includes(funcionarioId)
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
    grupo.participantesId = grupo.participantesId.filter(
      (id) => id !== participanteId
    );
  }
}

export async function addParticipante(participanteId: string, grupoId: string) {
  const grupo = getGrupoById(grupoId);
  if (grupo) {
    if (!grupo.participantesId.includes(participanteId)) {
      grupo.participantesId.push(participanteId);
    }
  }
}

export async function getGruposDisponiveis(funcionarioId: string) {
  return GRUPOS_TERAPEUTICOS.filter(
    (grupo) =>
      !(
        grupo.participantesId.includes(funcionarioId) ||
        grupo.ministrantesId.includes(funcionarioId)
      )
  );
}

export async function createGrupo(newGrupo: NewGrupo) {
  const id = (GRUPOS_TERAPEUTICOS.length + 101).toString();
  const encontro: NewAgendamento = {
    sala: newGrupo.sala!,
    responsavelId: newGrupo.responsavelId!,
    data: newGrupo.data,
    horario: newGrupo.horario,
    recorrente: true,
  };

  await agendarHorario(encontro);

  const grupoEstudo: GrupoTerapeutico = {
    id,
    tema: newGrupo.temaEstudo,
    ministrantesId: newGrupo.ministrantesId,
    participantesId: [],
    encontro: {
      horario: { data: encontro.data!, hora: encontro.horario! },
      salaId: encontro.sala,
    },
  };

  return GRUPOS_TERAPEUTICOS.push(grupoEstudo);
}
