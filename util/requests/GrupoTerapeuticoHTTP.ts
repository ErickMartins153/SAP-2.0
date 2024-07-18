import { NewGrupo } from "@/components/grupos/AddGrupoModal";
import { NewAgendamento, Status } from "@/interfaces/Agendamento";
import GrupoTerapeutico from "@/interfaces/GrupoTerapeutico";
import { agendarHorario } from "./agendamentoHTTP";

export const GRUPOS_TERAPEUTICOS: GrupoTerapeutico[] = [
  {
    id: "20",
    tema: "Gerenciamento de Estresse",
    fichasId: ["1", "2", "3"],
    coordenador: "4",
  },
  {
    id: "21",
    tema: "Comunicação Eficaz",
    fichasId: ["4", "5", "6"],
    coordenador: "7",
  },
  {
    id: "22",
    tema: "Trabalho em Equipe",
    fichasId: ["7", "8", "1"],
    coordenador: "2",
  },
  {
    id: "23",
    tema: "Gestão de Tempo",
    fichasId: ["2", "3", "4"],
    coordenador: "5",
  },
  {
    id: "24",
    tema: "Desenvolvimento de Liderança",
    fichasId: ["5", "6", "7"],
    coordenador: "3",
  },
];

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

export async function createGrupo(newGrupo: NewGrupo) {
  const { tema, idMinistrante: coordenador, tipo } = newGrupo;
  if (tipo === "Estudo") {
    return GRUPOS_TERAPEUTICOS.push({
      id: GRUPOS_TERAPEUTICOS.length.toString(),
      coordenador,
      tema,
      fichasId: [],
    });
  }
}
