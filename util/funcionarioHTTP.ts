import Funcionario, { FUNCIONARIOS } from "@/interfaces/Funcionario";

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
  FUNCIONARIOS.filter((funcionario) => funcionario.id === funcionarioId);
}

export async function addFuncionario(funcionarioData: Omit<Funcionario, "id">) {
  const fakeId = FUNCIONARIOS.length.toString();
  FUNCIONARIOS.push({ id: fakeId, ...funcionarioData });
  return FUNCIONARIOS.length - 1;
}
