export type Agendamento = {
  id: string;
  sala: string;
  data?: string;
  horario?: string;
  recorrente?: boolean;
  responsavelId: string;
};
