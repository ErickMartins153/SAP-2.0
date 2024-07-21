import Funcionario from "./Funcionario";
import GrupoTerapeutico from "./GrupoTerapeutico";

export default interface Ficha {
  id: string;
  responsavel: Funcionario;
  grupoTerapeutico?: GrupoTerapeutico;
  nome: string;
}

export interface NewFicha {
  idResponsavel: string;
  idGrupoTerapeutico?: string;
  nome: string;
}
