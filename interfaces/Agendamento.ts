export enum Status {
  PENDENTE,
  APROVADO,
  REPROVADO,
}

export interface Agendamento {
  id: string;
  sala: string;
  data?: string;
  horario?: string;
  recorrente?: boolean;
  idResponsavel: string;
  status?: Status;
}

export type NewAgendamento = Omit<Agendamento, "id">;
