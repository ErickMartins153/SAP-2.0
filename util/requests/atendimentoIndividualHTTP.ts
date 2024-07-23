import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";
import axios from "axios";
import { createTimestamps } from "../dateUtils";
import { Atividade } from "./atividadesHTTP";

let AGENDAMENTOS: Agendamento[] = [];

const BASE_URL =
  process.env.EXPO_PUBLIC_BASE_URL + "/atividades/atendimentos-individuais";
// headers: { Authorization: "Bearer " + token },

const ATV_URL = process.env.EXPO_PUBLIC_BASE_URL + "/atividades";

export async function createAtendimento({
  atendimento,
  token,
}: {
  atendimento: NewAgendamento;
  token: string;
}) {
  try {
    const { idFuncionario, idSala, idTerapeuta, idFicha } = atendimento;
    const { tempoInicio, tempoFim } = createTimestamps(
      atendimento.data!,
      atendimento.horario!
    );

    const finalData = {
      idSala,
      tempoInicio,
      tempoFim,
      statusAtividade: "PENDENTE",
      idTerapeuta,
      idFicha,
      idFuncionario,
    };
    const url = `${BASE_URL}/one`;
    console.log(url);

    console.log(finalData);

    const response = await axios.post(url, finalData, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data as Agendamento;
  } catch (error) {
    console.log(error);
  }
}

export async function getAgendamentos({
  salaId,
  data,
  token,
}: {
  salaId: string;
  data: string;
  token: string;
}) {
  try {
    const [day, month, year] = data.split("/");

    const formattedDate = `${year}-${month}-${day}`;
    const url = `${ATV_URL}/many/sala-date/?uid-sala=${salaId}&date=${formattedDate}`;

    const response = await axios.get(url, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data as Atividade;
  } catch (error) {
    console.log(error);
  }
}

export async function getAgendamentosByFuncionario(
  funcionarioId: string,
  token: string
) {
  try {
    const response = await axios.get(`${BASE_URL}/${funcionarioId}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data as Agendamento[];
  } catch (error) {
    console.log(error);
  }
}
export async function getAtendimentosByStatus(
  status: "PENDENTE" | "APROVADO" | "REPROVADO",
  token: string
) {
  try {
    const response = await axios.get(`${BASE_URL}/status/${status}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data as Agendamento[];
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAgendamento(agendamentoId: string) {
  AGENDAMENTOS = AGENDAMENTOS.filter(
    (agendamento) => agendamento.id !== agendamentoId
  );
}

export async function getAgendamento(
  searchedSala: string,
  searchedData: string,
  searchedHorario: string
): Promise<Agendamento> {
  return {} as Agendamento;
}

export async function removeAgendamento(
  searchedSala: string,
  searchedData: string,
  searchedHorario: string
) {
  AGENDAMENTOS = AGENDAMENTOS.filter(
    ({ idSala: sala, data, horario }) =>
      !(
        sala === searchedSala &&
        data === searchedData &&
        horario === searchedHorario
      )
  );
}
