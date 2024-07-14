import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";

const today = new Date().toLocaleDateString();

export let AGENDAMENTOS: Agendamento[] = [
  {
    id: "1",
    sala: "1",
    data: today,
    horario: "10:20 - 11:10",
    recorrente: true,
    responsavelId: "1",
  },
  {
    id: "2",
    sala: "2",
    data: today,
    horario: "11:10 - 12:00",
    recorrente: false,
    responsavelId: "2",
  },
  {
    id: "3",
    sala: "3",
    data: today,
    horario: "12:00 - 12:50",
    recorrente: true,
    responsavelId: "3",
  },
  {
    id: "4",
    sala: "4",
    data: today,
    horario: "12:50 - 13:40",
    recorrente: false,
    responsavelId: "4",
  },
  {
    id: "5",
    sala: "5",
    data: today,
    horario: "15:30 - 16:20",
    recorrente: true,
    responsavelId: "5",
  },
  {
    id: "6",
    sala: "6",
    data: today,
    horario: "16:20 - 17:10",
    recorrente: false,
    responsavelId: "6",
  },
  {
    id: "7",
    sala: "7",
    data: today,
    horario: "17:10 - 18:00",
    recorrente: true,
    responsavelId: "7",
  },
  {
    id: "8",
    sala: "1",
    data: today,
    horario: "18:00 - 18:50",
    recorrente: false,
    responsavelId: "8",
  },
];

export async function agendarHorario(agendamento: NewAgendamento) {
  const exists = AGENDAMENTOS.find(
    (item) =>
      item.sala === agendamento.sala &&
      item.data === agendamento.data &&
      item.horario === agendamento.horario &&
      item.recorrente === agendamento.recorrente
  );
  if (!exists) {
    const id = AGENDAMENTOS.length.toString();
    return AGENDAMENTOS.push({ ...agendamento, id });
  }
}

export async function getAgendamentos({
  sala,
  data,
}: {
  sala: string;
  data: string;
}) {
  return AGENDAMENTOS.filter(
    (agendamento) => agendamento.sala === sala && agendamento.data === data
  );
}

export async function getAgendamentosByFuncionario(funcionarioId: string) {
  return AGENDAMENTOS.filter(
    (agendamento) => agendamento.responsavelId === funcionarioId
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
      ({ sala, data, horario }) =>
        sala === searchedSala &&
        data === searchedData &&
        horario === searchedHorario
    ) || { id: "", responsavelId: "", sala: "" }
  );
}

export async function removeAgendamento(
  searchedSala: string,
  searchedData: string,
  searchedHorario: string
) {
  AGENDAMENTOS = AGENDAMENTOS.filter(
    ({ sala, data, horario }) =>
      !(
        sala === searchedSala &&
        data === searchedData &&
        horario === searchedHorario
      )
  );
}
