import Sala from "@/interfaces/Sala";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + `/sala`;

export async function getSalas() {
  try {
    const response = await axios.get(`${BASE_URL}/all`);

    return response.data as Sala[];
  } catch (error) {
    console.log(error);
  }
}

export async function getSalaByName(nome: string) {
  try {
    const response = await axios.get(`${BASE_URL}/nome/${nome}`);
    return response.data as Sala;
  } catch (error) {
    console.log(error);
  }
}
