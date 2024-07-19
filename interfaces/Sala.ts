export default interface Sala {
  id: string;
  nome: string;
  tipoSala: TipoSala;
}

export enum TipoSala {
  GRUPO = "grupo",
  INDIVIDUAL = "individual",
  INFANTIL = "infantil",
  AUDITORIO = "auditório",
  TRIAGEM = "triagem",
}
