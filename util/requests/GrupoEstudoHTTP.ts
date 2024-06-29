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
];

export function getGruposByFuncionario(funcionarioId: string) {
  return GRUPOS_ESTUDO.filter((grupo) =>
    grupo.participantesId.includes(funcionarioId)
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
