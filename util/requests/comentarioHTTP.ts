import Comentario, { newComentario } from "@/interfaces/Comentario";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL + "/comentarios";
const POST_URL = process.env.EXPO_PUBLIC_BASE_URL + "/posts";

export async function getComentariosByPost(postId: string, token: string) {
  const response = await axios.get(`${POST_URL}/${postId}/comentarios`, {
    headers: { Authorization: "Bearer " + token },
  });
  return response.data as Comentario[];
}

export async function deleteComentario({
  comentarioId,
  token,
}: {
  comentarioId: string;
  token: string;
}) {
  const response = await axios.delete(`${BASE_URL}/delete/${comentarioId}`, {
    headers: { Authorization: "Bearer " + token },
  });
}

export async function addComentario({
  comentarioData,
  token,
}: {
  comentarioData: newComentario;
  token: string;
}) {
  const response = await axios.post(BASE_URL, comentarioData, {
    headers: { Authorization: "Bearer " + token },
  });
}
