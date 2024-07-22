import GrupoTerapeutico from "./GrupoTerapeutico";

export default interface Ficha {
  id: string;
  idResponsavel: string;
  idGrupoTerapeutico?: GrupoTerapeutico;
  nome: string;
}

export interface NewFicha {
  idResponsavel: string;
  idGrupoTerapeutico?: string | null;
  nome: string;
}
