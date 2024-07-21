import { NewFicha } from "@/interfaces/Ficha";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/ficha";

export async function createFicha(ficha: NewFicha) {}

export async function getFichaByFuncionario(idFuncionario: string) {}

export async function deleteFicha(idFicha: string) {}
