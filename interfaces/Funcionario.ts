export default interface Funcionario {
  id: string;
  imagemURL?: string | undefined;
  nome: string;
  sobrenome: string;
  email: string;
  isTecnico: boolean;
  ativo: boolean;
}

export type newFuncionario = Omit<Funcionario, "id">;
