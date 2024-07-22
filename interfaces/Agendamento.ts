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
  terapeuta: string;
  funcionario: string;
  status?: Status;
  ficha?: string;
}

export type NewAgendamento = Omit<Agendamento, "id">;
