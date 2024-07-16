export default interface Post {
  id: string;
  idAutor: string;
  dataPublicacao: Date;
  titulo: string;
  imagemPost?: string;
  conteudo?: string;
}

export type newPost = Omit<Post, "id">;
