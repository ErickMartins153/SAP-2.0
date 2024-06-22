export default interface Funcionario {
  id: string;
  imagemURL: string | undefined;
  nome: string;
  sobrenome: string;
  email: string;
  isTecnico: boolean;
}
