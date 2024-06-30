export default interface Sala {
  id: string;
  tipoSala: TipoSala;
  nome: string;
}

export enum TipoSala {
  GRUPO = "grupo",
  INDIVIDUAL = "individual",
  INFANTIL = "infantil",
}

export const SALAS: Sala[] = [
  {
    id: "1",
    nome: "Sala 1",
    tipoSala: TipoSala.INDIVIDUAL,
  },
  {
    id: "2",
    nome: "Sala 2",
    tipoSala: TipoSala.INFANTIL,
  },
  {
    id: "3",
    nome: "Sala 3",
    tipoSala: TipoSala.INDIVIDUAL,
  },
  {
    id: "4",
    nome: "Sala 4",
    tipoSala: TipoSala.INDIVIDUAL,
  },
  {
    id: "5",
    nome: "Sala 5",
    tipoSala: TipoSala.INDIVIDUAL,
  },
  {
    id: "6",
    nome: "Sala 6 (grupo)",
    tipoSala: TipoSala.GRUPO,
  },
  {
    id: "7",
    nome: "Sala 7",
    tipoSala: TipoSala.INDIVIDUAL,
  },
];
