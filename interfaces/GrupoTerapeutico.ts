export default interface GrupoTerapeutico {
  id: string;
  tema: string;
  idDono: string;
  fichasId: string[];
  descricao?: string;
}

export type NewGrupoTerapeutico = Omit<GrupoTerapeutico, "id">;
