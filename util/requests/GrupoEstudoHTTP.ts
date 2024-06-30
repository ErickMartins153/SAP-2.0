import { NewGrupo } from "@/components/grupos/AddGrupoModal";
import GrupoEstudo from "@/interfaces/GrupoEstudo";

export const GRUPOS_ESTUDO: GrupoEstudo[] = [
  {
    id: "101",
    temaEstudo: "Psicologia Organizacional",
    ministrantesId: ["1", "2"],
    participantesId: ["3", "5", "4"],
    encontro: {
      salaId: "6",
      horario: { data: "01/07/2023", hora: "10:00" },
    },
  },
  {
    id: "102",
    temaEstudo: "Psicologia do Desenvolvimento",
    ministrantesId: ["3"],
    participantesId: ["2", "4", "6"],
    encontro: {
      salaId: "2",
      horario: { data: "02/07/2023", hora: "14:00" },
    },
  },
  {
    id: "103",
    temaEstudo: "Psicologia Social",
    ministrantesId: ["7"],
    participantesId: ["8"],
    encontro: {
      salaId: "6",
      horario: { data: "03/07/2023", hora: "16:00" },
    },
  },
  {
    id: "104",
    temaEstudo: "Psicologia Clínica",
    ministrantesId: ["5"],
    participantesId: ["1", "6", "8"],
    encontro: {
      salaId: "1",
      horario: { data: "04/07/2023", hora: "11:00" },
    },
  },
  {
    id: "105",
    temaEstudo: "Psicologia Cognitiva",
    ministrantesId: ["3", "7"],
    participantesId: ["2", "4", "6"],
    encontro: {
      salaId: "3",
      horario: { data: "05/07/2023", hora: "15:00" },
    },
  },
  {
    id: "106",
    temaEstudo: "Neurociência",
    ministrantesId: ["5"],
    participantesId: ["2", "3", "4", "6", "7", "8"],
    encontro: {
      salaId: "4",
      horario: { data: "06/07/2023", hora: "09:00" },
    },
  },
];

export function getGruposByFuncionario(funcionarioId: string) {
  return GRUPOS_ESTUDO.filter(
    (grupo) =>
      grupo.participantesId.includes(funcionarioId) ||
      grupo.ministrantesId.includes(funcionarioId)
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
  return GRUPOS_ESTUDO.filter(
    (grupo) =>
      !(
        grupo.participantesId.includes(funcionarioId) ||
        grupo.ministrantesId.includes(funcionarioId)
      )
  );
}

export async function createGrupo(newGrupo: NewGrupo) {
  const id = (GRUPOS_ESTUDO.length + 101).toString();
  const encontro = {
    salaId: newGrupo.sala?.split("")[1]!,
    horario: {
      data: newGrupo.dia!,
      hora: newGrupo.horario!,
    },
  };

  const grupoEstudo: GrupoEstudo = {
    id,
    temaEstudo: newGrupo.temaEstudo,
    ministrantesId: newGrupo.ministrantesId,
    participantesId: [],
    encontro,
  };
  console.log(grupoEstudo);

  GRUPOS_ESTUDO.push(grupoEstudo);
}
