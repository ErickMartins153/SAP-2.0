export default interface Post {
  id: string;
  idAutor: string;
  horario: Date;
  titulo: string;
  imagemURL?: string;
  conteudo: string;
}

export type newPost = Omit<Post, "id">;
