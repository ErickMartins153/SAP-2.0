import Funcionario from "@/interfaces/Funcionario";

export const FUNCIONARIOS: Funcionario[] = [
  {
    id: "1",
    imagemURL: `https://avatar.iran.liara.run/public/1`,
    nome: "Erick",
    sobrenome: "Martins",
    email: "",
    isTecnico: true,
    ativo: true,
  },
  {
    id: "2",
    imagemURL: `https://avatar.iran.liara.run/public/2`,
    nome: "Ana",
    sobrenome: "Oliveira",
    email: "ana",
    isTecnico: false,
    ativo: true,
    supervisor: {
      id: "1",
      nome: "Erick Martins",
      imagemURL: `https://avatar.iran.liara.run/public/1`,
    },
  },
  {
    id: "3",
    imagemURL: `https://avatar.iran.liara.run/public/3`,
    nome: "Marcos",
    sobrenome: "Souza",
    email: "marcos.souza@upe.br",
    isTecnico: true,
    ativo: true,
  },
  {
    id: "4",
    imagemURL: `https://avatar.iran.liara.run/public/4`,
    nome: "Julia",
    sobrenome: "Ferreira",
    email: "julia.ferreira@upe.br",
    isTecnico: false,
    ativo: true,
    supervisor: {
      id: "3",
      nome: "Marcos Souza",
      imagemURL: `https://avatar.iran.liara.run/public/3`,
    },
  },
  {
    id: "5",
    imagemURL: `https://avatar.iran.liara.run/public/5`,
    nome: "Roberto",
    sobrenome: "Costa",
    email: "roberto.costa@upe.br",
    isTecnico: true,
    ativo: true,
  },
  {
    id: "6",
    imagemURL: `https://avatar.iran.liara.run/public/6`,
    nome: "Fernanda",
    sobrenome: "Ribeiro",
    email: "fernanda.ribeiro@upe.br",
    isTecnico: false,
    ativo: true,
    supervisor: {
      id: "5",
      nome: "Roberto Costa",
      imagemURL: `https://avatar.iran.liara.run/public/5`,
    },
  },
  {
    id: "7",
    imagemURL: `https://avatar.iran.liara.run/public/7`,
    nome: "Ricardo",
    sobrenome: "Almeida",
    email: "ricardo.almeida@upe.br",
    isTecnico: true,
    ativo: true,
  },
  {
    id: "8",
    imagemURL: `https://avatar.iran.liara.run/public/8`,
    nome: "Patricia",
    sobrenome: "Lima",
    email: "patricia.lima@upe.br",
    isTecnico: false,
    ativo: true,
    supervisor: {
      id: "7",
      nome: "Ricardo Almeida",
      imagemURL: `https://avatar.iran.liara.run/public/7`,
    },
  },
];

export function getFuncionariosAtivos() {
  return FUNCIONARIOS.filter(
    (funcionarios) => funcionarios.ativo
  ) as Funcionario[];
}

export async function getFuncionarioById(funcionarioId: string) {
  const selectedFuncionario = FUNCIONARIOS.find(
    (funcionario) => funcionario.id === funcionarioId
  );
  return selectedFuncionario as Funcionario;
}

export async function deleteFuncionario(funcionarioId: string) {
  const funcionarioIndex = FUNCIONARIOS.findIndex(
    (funcionario) => funcionario.id === funcionarioId
  );
  FUNCIONARIOS[funcionarioIndex].ativo = false;
}

export async function addFuncionario(funcionarioData: Omit<Funcionario, "id">) {
  const fakeId = FUNCIONARIOS.length.toString();
  FUNCIONARIOS.push({ id: fakeId, ...funcionarioData });
  return FUNCIONARIOS.length - 1;
}

export async function getTecnicos() {
  return FUNCIONARIOS.filter(
    (funcionario) => funcionario.isTecnico === true && funcionario.ativo
  );
}

export async function getSupervisionados(supervisorId: string) {
  return FUNCIONARIOS.filter(
    (funcionario) => funcionario.supervisor?.id === supervisorId
  );
}

export function getFuncionariosByIds(ids: string[]): Funcionario[] {
  return ids
    .map((id) => FUNCIONARIOS.find((funcionario) => funcionario.id === id))
    .filter((funcionario) => funcionario !== undefined) as Funcionario[];
}
