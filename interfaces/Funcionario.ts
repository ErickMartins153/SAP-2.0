export default interface Funcionario {
  id: string;
  urlImagem?: string;
  nome: string;
  sobrenome: string;
  email: string;
  cargo?: "TECNICO" | "ESTAGIARIO";
  ativo: boolean;
  supervisor?: { id: string; nome: string; imagemURL?: string };
}

export type newFuncionario = Omit<Funcionario, "id">;

export interface Token {
  expiration: string;
  subject: string;
  token: string;
  tokenType: string;
  valid: boolean;
}
