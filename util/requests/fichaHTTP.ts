import Ficha, { NewFicha } from "@/interfaces/Ficha";
import axios, { isAxiosError } from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/fichas";

export async function createFicha({
  ficha,
  token,
}: {
  ficha: NewFicha;
  token: string;
}) {
  try {
    if (ficha.idGrupoTerapeutico === "") {
      delete ficha.idGrupoTerapeutico;
    }
    console.log(BASE_URL);
    console.log(ficha);

    const response = await axios.post(`${BASE_URL}/`, ficha, {
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.toJSON());
    }
  }
}

export async function getFichasByFuncionario({
  idFuncionario,
  token,
}: {
  idFuncionario: string;
  token: string;
}) {
  try {
    const response = await axios.get(
      `${BASE_URL}/many/funcionario?uidFuncionario=${idFuncionario}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    return response.data as Ficha[];
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFicha(idFicha: string) {}

export async function deleteMultipleFichas({
  uids,
  token,
}: {
  uids: string[];
  token: string;
}) {
  try {
    const response = await axios.delete(`${BASE_URL}/many/delete/`, {
      data: uids,
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    console.log(error);
  }
}
