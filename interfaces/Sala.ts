export default interface Sala {
  idSala: string;
  tipoSala: TipoSala;
}

export enum TipoSala {
  GRUPO = "grupo",
  INDIVIDUAL = "individual",
  INFANTIL = "infantil",
}

export const SALAS: Sala[] = [
  {
    idSala: "1",
    tipoSala: TipoSala.INDIVIDUAL,
  },
  {
    idSala: "2",
    tipoSala: TipoSala.INFANTIL,
  },
  {
    idSala: "3",
    tipoSala: TipoSala.INDIVIDUAL,
  },
  {
    idSala: "4",
    tipoSala: TipoSala.INDIVIDUAL,
  },
  {
    idSala: "5",
    tipoSala: TipoSala.INDIVIDUAL,
  },
  {
    idSala: "6",
    tipoSala: TipoSala.GRUPO,
  },
  {
    idSala: "7",
    tipoSala: TipoSala.INDIVIDUAL,
  },
];
