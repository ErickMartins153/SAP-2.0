export default interface Funcionario {
  id: string;
  imagemURL?: string;
  nome: string;
  sobrenome: string;
  email: string;
  isTecnico: boolean | undefined;
  ativo: boolean;
  supervisor?: { id: string; nome: string; imagemURL?: string };
}

export type newFuncionario = Omit<Funcionario, "id">;
