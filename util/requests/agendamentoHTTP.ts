import { Agendamento, NewAgendamento } from "@/interfaces/Agendamento";

const today = new Date().toLocaleDateString();

export let AGENDAMENTOS: Agendamento[] = [
  {
    id: "1",
    nomeSala: "1",
    data: today,
    horario: "10:20 - 11:10",
    recorrente: true,
    idResponsavel: "1",
  },
  {
    id: "2",
    nomeSala: "2",
    data: today,
    horario: "11:10 - 12:00",
    recorrente: false,
    idResponsavel: "2",
  },
  {
    id: "3",
    nomeSala: "3",
    data: today,
    horario: "12:00 - 12:50",
    recorrente: true,
    idResponsavel: "3",
  },
  {
    id: "4",
    nomeSala: "4",
    data: today,
    horario: "12:50 - 13:40",
    recorrente: false,
    idResponsavel: "4",
  },
  {
    id: "5",
    nomeSala: "5",
    data: today,
    horario: "15:30 - 16:20",
    recorrente: true,
    idResponsavel: "5",
  },
  {
    id: "6",
    nomeSala: "6",
    data: today,
    horario: "16:20 - 17:10",
    recorrente: false,
    idResponsavel: "6",
  },
  {
    id: "7",
    nomeSala: "7",
    data: today,
    horario: "17:10 - 18:00",
    recorrente: true,
    idResponsavel: "7",
  },
  {
    id: "8",
    nomeSala: "1",
    data: today,
    horario: "18:00 - 18:50",
    recorrente: false,
    idResponsavel: "8",
  },
];

export async function agendarHorario(agendamento: NewAgendamento) {
  console.log(agendamento);

  const exists = AGENDAMENTOS.find(
    (item) =>
      item.nomeSala === agendamento.nomeSala &&
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
  salaId,
  data,
}: {
  salaId: string;
  data: string;
}) {
  return AGENDAMENTOS.filter(
    (agendamento) =>
      agendamento.nomeSala === salaId && agendamento.data === data
  );
}

export async function getAgendamentosByFuncionario(funcionarioId: string) {
  return AGENDAMENTOS.filter(
    (agendamento) => agendamento.idResponsavel === funcionarioId
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
      ({ nomeSala: sala, data, horario }) =>
        sala === searchedSala &&
        data === searchedData &&
        horario === searchedHorario
    ) || { id: "", idResponsavel: "", nomeSala: "" }
  );
}

export async function removeAgendamento(
  searchedSala: string,
  searchedData: string,
  searchedHorario: string
) {
  AGENDAMENTOS = AGENDAMENTOS.filter(
    ({ nomeSala: sala, data, horario }) =>
      !(
        sala === searchedSala &&
        data === searchedData &&
        horario === searchedHorario
      )
  );
}
