export default interface Funcionario {
  id: string;
  imagemURL: string | null;
  nome: string;
  sobrenome: string;
  email: string;
  isTecnico: boolean;
}

export const FUNCIONARIOS: Funcionario[] = [
  {
    id: "1",
    imagemURL: null,
    nome: "Carlos",
    sobrenome: "Silva",
    email: "carlos.silva@upe.br",
    isTecnico: true,
  },
  {
    id: "2",
    imagemURL: null,
    nome: "Ana",
    sobrenome: "Oliveira",
    email: "ana.oliveira@upe.br",
    isTecnico: false,
  },
  {
    id: "3",
    imagemURL: null,
    nome: "Marcos",
    sobrenome: "Souza",
    email: "marcos.souza@upe.br",
    isTecnico: true,
  },
  {
    id: "4",
    imagemURL: null,
    nome: "Julia",
    sobrenome: "Ferreira",
    email: "julia.ferreira@upe.br",
    isTecnico: false,
  },
  {
    id: "5",
    imagemURL: null,
    nome: "Roberto",
    sobrenome: "Costa",
    email: "roberto.costa@upe.br",
    isTecnico: true,
  },
  {
    id: "6",
    imagemURL: null,
    nome: "Fernanda",
    sobrenome: "Ribeiro",
    email: "fernanda.ribeiro@upe.br",
    isTecnico: false,
  },
  {
    id: "7",
    imagemURL: null,
    nome: "Ricardo",
    sobrenome: "Almeida",
    email: "ricardo.almeida@upe.br",
    isTecnico: true,
  },
  {
    id: "8",
    imagemURL: null,
    nome: "Patricia",
    sobrenome: "Lima",
    email: "patricia.lima@upe.br",
    isTecnico: false,
  },
];
