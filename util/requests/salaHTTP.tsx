import Sala from "@/interfaces/Sala";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + `/sala`;

export async function getSalas(token: string) {
  try {
    const response = await axios.get(`${BASE_URL}/all`, {
      headers: { Authorization: "Bearer " + token },
    });

    return response.data as Sala[];
  } catch (error) {
    console.log(error);
  }
}

export async function getSalaByName(nome: string, token: string) {
  try {
    const response = await axios.get(`${BASE_URL}/nome/${nome}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data as Sala;
  } catch (error) {
    console.log(error);
  }
}

export async function getSalaById(idSala: string, token: string) {
  try {
    const response = await axios.get(`${BASE_URL}/${idSala}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data as Sala;
  } catch (error) {
    console.log(error);
  }
}
