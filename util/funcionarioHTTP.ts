import Funcionario from "@/interfaces/Funcionario";

export const FUNCIONARIOS: Funcionario[] = [
  {
    id: "1",
    imagemURL: `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 100
    )}`,
    nome: "Carlos",
    sobrenome: "Silva",
    email: "carlos.silva@upe.br",
    isTecnico: true,
  },
  {
    id: "2",
    imagemURL: `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 100
    )}`,
    nome: "Ana",
    sobrenome: "Oliveira",
    email: "ana.oliveira@upe.br",
    isTecnico: false,
  },
  {
    id: "3",
    imagemURL: `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 100
    )}`,
    nome: "Marcos",
    sobrenome: "Souza",
    email: "marcos.souza@upe.br",
    isTecnico: true,
  },
  {
    id: "4",
    imagemURL: `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 100
    )}`,
    nome: "Julia",
    sobrenome: "Ferreira",
    email: "julia.ferreira@upe.br",
    isTecnico: false,
  },
  {
    id: "5",
    imagemURL: `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 100
    )}`,
    nome: "Roberto",
    sobrenome: "Costa",
    email: "roberto.costa@upe.br",
    isTecnico: true,
  },
  {
    id: "6",
    imagemURL: `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 100
    )}`,
    nome: "Fernanda",
    sobrenome: "Ribeiro",
    email: "fernanda.ribeiro@upe.br",
    isTecnico: false,
  },
  {
    id: "7",
    imagemURL: `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 100
    )}`,
    nome: "Ricardo",
    sobrenome: "Almeida",
    email: "ricardo.almeida@upe.br",
    isTecnico: true,
  },
  {
    id: "8",
    imagemURL: `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 100
    )}`,
    nome: "Patricia",
    sobrenome: "Lima",
    email: "patricia.lima@upe.br",
    isTecnico: false,
  },
];

export function getFuncionarios() {
  return FUNCIONARIOS as Funcionario[];
}

export async function getFuncionarioById(funcionarioId: string) {
  const selectedPost = FUNCIONARIOS.find(
    (funcionario) => funcionario.id === funcionarioId
  );
  return selectedPost as Funcionario;
}

export async function deleteFuncionario(funcionarioId: string) {
  const updatedFuncionarios = FUNCIONARIOS.filter(
    (funcionario) => funcionario.id !== funcionarioId
  );
  FUNCIONARIOS.length = 0;
  FUNCIONARIOS.push(...updatedFuncionarios);
}

export async function addFuncionario(funcionarioData: Omit<Funcionario, "id">) {
  const fakeId = FUNCIONARIOS.length.toString();
  FUNCIONARIOS.push({ id: fakeId, ...funcionarioData });
  return FUNCIONARIOS.length - 1;
}
