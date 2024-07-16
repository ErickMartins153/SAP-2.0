export default interface Comentario {
  id: string;
  idPost: string;
  idAutor: string;
  conteudo: string;
  // dataPublicacao: Date;
}

export type newComentario = Omit<Comentario, "id">;
