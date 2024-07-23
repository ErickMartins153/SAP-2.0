export default interface Sala {
  uid: string;
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
