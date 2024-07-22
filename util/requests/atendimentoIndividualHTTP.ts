import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";
import axios from "axios";
import { createTimestamps } from "../dateUtils";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/atendimentosIndividuais";
// headers: { Authorization: "Bearer " + token },

export async function createAtendimento({
  atendimento,
  token,
}: {
  atendimento: NewAgendamento;
  token: string;
}) {
  try {
    const { funcionario, sala, terapeuta } = atendimento;
    const { tempoInicio, tempoFim } = createTimestamps(
      atendimento.data!,
      atendimento.horario!
    );

    const response = await axios.post(`${BASE_URL}/create`, {
      sala,
      tempoInicio,
      tempoFim,
      statusAtividade: "PENDENTE",
      terapeuta,
      funcionario,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAgendamentos({
  salaId,
  data,
}: {
  salaId: string;
  data: string;
}) {
  return {} as Agendamento;
}

export async function getAgendamentosByFuncionario(funcionarioId: string) {
  return AGENDAMENTOS.filter(
    (agendamento) => agendamento.terapeuta === funcionarioId
  );
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
  return (
    AGENDAMENTOS.find(
      ({ sala: sala, data, horario }) =>
        sala === searchedSala &&
        data === searchedData &&
        horario === searchedHorario
    ) || { id: "", terapeuta: "", sala: "" }
  );
}

export async function removeAgendamento(
  searchedSala: string,
  searchedData: string,
  searchedHorario: string
) {
  AGENDAMENTOS = AGENDAMENTOS.filter(
    ({ sala: sala, data, horario }) =>
      !(
        sala === searchedSala &&
        data === searchedData &&
        horario === searchedHorario
      )
  );
}
