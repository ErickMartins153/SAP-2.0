export default interface Funcionario {
  id: string;
  imagemURL?: string;
  nome: string;
  sobrenome: string;
  email: string;
  isTecnico: boolean;
  ativo: boolean;
  supervisor?: { nome: string; imagemURL?: string };
}

export type newFuncionario = Omit<Funcionario, "id">;
