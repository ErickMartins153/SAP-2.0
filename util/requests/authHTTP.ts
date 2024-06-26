import { FUNCIONARIOS, getFuncionarioById } from "./funcionarioHTTP";

export type Credentials = {
  email: string;
  senha: string;
};

export async function authenticateUser(credentials: Credentials) {
  const funcionario = FUNCIONARIOS.find(
    (funcionario) =>
      funcionario.email.toLowerCase().trim() ===
      credentials.email.toLowerCase().trim()
  );
  if (funcionario) {
    return funcionario;
  }
  throw new Error();
}
