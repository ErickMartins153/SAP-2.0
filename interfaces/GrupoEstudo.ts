export default interface GrupoEstudo {
  id: string;
  temaEstudo: string;
  ministrantesId: string[];
  participantesId: string[];
  encontro: {
    salaId: string;
    horario: { data: string; hora: string };
  };
}
