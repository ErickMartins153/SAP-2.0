export default interface GrupoEstudo {
  id: string;
  temaEstudo: string;
  idMinistrante: string;
  idParticipantes: string[];
  descricao?: string;
}

export interface newGrupoEstudo {
  temaEstudo: string;
  idMinistrante: string;
}
