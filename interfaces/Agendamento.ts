export interface Agendamento {
  id: string;
  sala: string;
  data?: string;
  horario?: string;
  recorrente?: boolean;
  responsavelId: string;
}

export type NewAgendamento = Omit<Agendamento, "id">;
