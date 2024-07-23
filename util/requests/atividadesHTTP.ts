import { Agendamento } from "@/interfaces/Agendamento";
import axios from "axios";
import { formatDateTime } from "../dateUtils";
import GrupoTerapeutico from "@/interfaces/GrupoTerapeutico";
import GrupoEstudo from "@/interfaces/GrupoEstudo";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/atividades";

export type Atividade = {
  atendimentosIndividuais: Agendamento[];
  atendimentosGrupo: GrupoTerapeutico[];
  encontros: GrupoEstudo[];
};

export async function getAtividadesByStatus({
  status,
  token,
}: {
  status: "PENDENTE" | "APROVADO" | "REPROVADO";
  token: string;
}) {
  try {
    const url = `${BASE_URL}/many/status/${status.toUpperCase()}`;
    console.log(url);

    const response = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });

    return response.data as Atividade[];
  } catch (error) {
    console.log(error);
  }
}

export async function getAgendamentoEstudo(idGrupoEstudo: string) {
  try {
    const response = await axios.get(`${BASE_URL}/one/uid/${idGrupoEstudo}`);
    const { tempoInicio, tempoFim } = response.data;
    const { data, horario } = formatDateTime(tempoInicio, tempoFim);
    console.log(response.data);

    return { data, horario } || null;
  } catch (error) {
    console.log(error);
  }
}

export async function getAtividadesByFuncionario(
  idFuncionario: string,
  token: string
) {
  try {
    const url = `${BASE_URL}/many/id-funcionario/${idFuncionario}`;

    const response = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });
    console.log(response.data);

    return response.data as Atividade;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAtividade({
  idsAtividade: idAtividade,
  token,
}: {
  idsAtividade: string[];
  token: string;
}) {
  try {
    console.log(idAtividade);

    const response = await axios.delete(`${BASE_URL}/many/uids`, {
      data: idAtividade,
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    console.log(error);
  }
}
