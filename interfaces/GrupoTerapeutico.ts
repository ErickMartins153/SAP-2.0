export default interface GrupoTerapeutico {
  id: string;
  tema: string;
  coordenador: string;
  fichasId: string[];
  descricao?: string;
}

export type NewGrupoTerapeutico = Omit<GrupoTerapeutico, "id">;
