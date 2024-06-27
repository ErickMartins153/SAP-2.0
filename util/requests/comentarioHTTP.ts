import Comentario, { newComentario } from "@/interfaces/Comentario";

export const COMENTARIOS: Comentario[] = [
  {
    id: "201",
    idPost: "124",
    idAutor: "2",
    conteudo:
      "Muito inspirador! Concordo plenamente que precisamos manter a fé e a esperança.",
    dataPublicacao: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
  },
  {
    id: "202",
    idPost: "124",
    idAutor: "3",
    conteudo:
      "Realmente, os desafios são parte da nossa jornada e nos tornam mais fortes.",
    dataPublicacao: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
  },
  {
    id: "203",
    idPost: "125",
    idAutor: "1",
    conteudo:
      "A educação é fundamental para um futuro melhor. Precisamos investir mais nisso.",
    dataPublicacao: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
  },
  {
    id: "204",
    idPost: "126",
    idAutor: "4",
    conteudo:
      "A leitura realmente nos abre portas para novos mundos. Adoro ler!",
    dataPublicacao: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
  },
  {
    id: "205",
    idPost: "126",
    idAutor: "5",
    conteudo: "Concordo, ler é uma das melhores formas de aprender e crescer.",
    dataPublicacao: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
  },
  {
    id: "206",
    idPost: "127",
    idAutor: "6",
    conteudo:
      "A tecnologia está mudando o mundo de formas impressionantes. É fascinante!",
    dataPublicacao: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
  },
  {
    id: "207",
    idPost: "128",
    idAutor: "7",
    conteudo:
      "Precisamos mesmo cuidar do nosso planeta. Pequenas ações fazem a diferença.",
    dataPublicacao: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
  },
  {
    id: "208",
    idPost: "129",
    idAutor: "8",
    conteudo:
      "Saúde mental é tão importante quanto a física. Devemos cuidar disso com carinho.",
    dataPublicacao: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
  },
];

export function getComentariosByPost(postId: string) {
  const filteredComentarios = COMENTARIOS.filter(
    (comentario) => comentario.idPost === postId
  );
  // console.log(filteredComentarios);

  return filteredComentarios;
}

export async function deleteComentario(ComentarioId: string) {
  const updatedComentario = COMENTARIOS.filter(
    (comentario) => comentario.id !== ComentarioId
  );
  COMENTARIOS.length = 0;
  COMENTARIOS.push(...updatedComentario);
}

export async function addComentario(comentarioData: newComentario) {
  const fakeId = COMENTARIOS.length.toString();
  COMENTARIOS.push({ id: fakeId, ...comentarioData });
}
