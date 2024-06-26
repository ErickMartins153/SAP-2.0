import Funcionario from "@/interfaces/Funcionario";

export const FUNCIONARIOS: Funcionario[] = [
  {
    id: "1",
    imagemURL: `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 100
    )}`,
    nome: "Erick",
    sobrenome: "Martins",
    email: "",
    isTecnico: true,
    ativo: true,
  },
  {
    id: "2",
    imagemURL: `https://avatar.iran.liara.run/public/${Math.floor(
      Math.random() * 100
    )}`,
    nome: "Ana",
    sobrenome: "Oliveira",
    email: "ana",
    isTecnico: false,
    ativo: true,
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
    ativo: true,
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
    ativo: true,
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
    ativo: true,
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
    ativo: true,
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
    ativo: true,
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
    ativo: true,
  },
];

export function getFuncionariosAtivos() {
  return FUNCIONARIOS.filter(
    (funcionarios) => funcionarios.ativo
  ) as Funcionario[];
}

export async function getFuncionarioById(funcionarioId: string) {
  const selectedPost = FUNCIONARIOS.find(
    (funcionario) => funcionario.id === funcionarioId
  );
  return selectedPost as Funcionario;
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
