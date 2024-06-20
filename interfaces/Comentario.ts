export default interface Comentario {
  id: string;
  idPost: string;
  idAutor: string;
  conteudo: string;
}

export const COMENTARIOS: Comentario[] = [
  {
    id: "201",
    idPost: "124",
    idAutor: "2",
    conteudo:
      "Muito inspirador! Concordo plenamente que precisamos manter a fé e a esperança.",
  },
  {
    id: "202",
    idPost: "124",
    idAutor: "3",
    conteudo:
      "Realmente, os desafios são parte da nossa jornada e nos tornam mais fortes.",
  },
  {
    id: "203",
    idPost: "125",
    idAutor: "1",
    conteudo:
      "A educação é fundamental para um futuro melhor. Precisamos investir mais nisso.",
  },
  {
    id: "204",
    idPost: "126",
    idAutor: "4",
    conteudo:
      "A leitura realmente nos abre portas para novos mundos. Adoro ler!",
  },
  {
    id: "205",
    idPost: "126",
    idAutor: "5",
    conteudo: "Concordo, ler é uma das melhores formas de aprender e crescer.",
  },
  {
    id: "206",
    idPost: "127",
    idAutor: "6",
    conteudo:
      "A tecnologia está mudando o mundo de formas impressionantes. É fascinante!",
  },
  {
    id: "207",
    idPost: "128",
    idAutor: "7",
    conteudo:
      "Precisamos mesmo cuidar do nosso planeta. Pequenas ações fazem a diferença.",
  },
  {
    id: "208",
    idPost: "129",
    idAutor: "8",
    conteudo:
      "Saúde mental é tão importante quanto a física. Devemos cuidar disso com carinho.",
  },
];
