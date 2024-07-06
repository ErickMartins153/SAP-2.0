export default interface GrupoTerapeutico {
  id: string;
  tema: string;
  participantesId: string[];
  ministrantesId: string[];
  encontro: {
    salaId: string;
    horario: { data: string; hora: string };
  };
}

export type NewGrupoTerapeutico = Omit<GrupoTerapeutico, "id">;
