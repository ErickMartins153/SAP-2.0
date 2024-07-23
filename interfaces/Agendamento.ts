export interface Agendamento {
  id: string;
  idSala: string;
  data?: string;
  horario?: string;
  recorrente?: boolean;
  idTerapeuta: string;
  idFuncionario: string;
  statusAtividade?: "PENDENTE" | "APROVADO" | "REPROVADO";
  idFicha?: string;
}

export type NewAgendamento = Omit<Agendamento, "id">;
