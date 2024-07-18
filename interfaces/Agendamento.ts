export interface Agendamento {
  id: string;
  sala: string;
  data?: string;
  horario?: string;
  recorrente?: boolean;
  idResponsavel: string;
}

export type NewAgendamento = Omit<Agendamento, "id">;
