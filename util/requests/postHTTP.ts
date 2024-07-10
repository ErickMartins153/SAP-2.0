import Post, { newPost } from "@/interfaces/Post";

export const POSTS: Post[] = [
  {
    id: "124",
    idAutor: "1",
    horario: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
    titulo: "Reflexões sobre a vida",
    conteudo:
      "Hoje eu gostaria de compartilhar algumas reflexões sobre a vida. Às vezes, nos encontramos em momentos de dúvida e incerteza, mas é importante lembrar que esses momentos são parte de nossa jornada. Cada desafio que enfrentamos nos ajuda a crescer e a nos tornar pessoas mais fortes. É fundamental manter a fé e a esperança, mesmo nos dias mais sombrios, pois o sol sempre volta a brilhar. Hoje eu gostaria de compartilhar algumas reflexões sobre a vida. Às vezes, nos encontramos em momentos de dúvida e incerteza, mas é importante lembrar que esses momentos são parte de nossa jornada. Cada desafio que enfrentamos nos ajuda a crescer e a nos tornar pessoas mais fortes. É fundamental manter a fé e a esperança, mesmo nos dias mais sombrios, pois o sol sempre volta a brilhar.",
    imagemURL:
      "https://img.freepik.com/fotos-premium/cachorro-pug-engracado-dando-sua-pata-e-usando-um-chapeu-de-feliz-aniversario-na-cor-rosa_273003-4071.jpg",
  },
  {
    id: "125",
    idAutor: "2",
    horario: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
    titulo: "A importância da educação",
    conteudo:
      "A educação é a base para o desenvolvimento de qualquer sociedade. Investir em educação é investir no futuro. Através do conhecimento, podemos transformar realidades, combater a desigualdade e promover a justiça social. É crucial que todos tenham acesso a uma educação de qualidade, pois somente assim conseguiremos construir um mundo mais justo e igualitário.",
    imagemURL:
      "https://i.pinimg.com/564x/df/1e/73/df1e7348e82c484d59c3b55c6034414c.jpg",
  },
  {
    id: "126",
    idAutor: "3",
    horario: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
    titulo: "A magia da leitura",
    conteudo:
      "Ler é viajar sem sair do lugar. Através dos livros, podemos conhecer diferentes culturas, aprender sobre a história, explorar novos mundos e expandir nossa imaginação. A leitura é uma ferramenta poderosa que nos permite adquirir conhecimento e desenvolver empatia. Nunca subestime o poder de um bom livro!",
    imagemURL:
      "https://i.pinimg.com/564x/4a/aa/98/4aaa9861a37fe2d7ffa95530c0fa5509.jpg",
  },
  {
    id: "127",
    idAutor: "4",
    horario: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
    titulo: "Tecnologia e futuro",
    conteudo:
      "Vivemos em uma era de avanços tecnológicos incríveis. A cada dia, novas inovações surgem, transformando a maneira como vivemos e trabalhamos. Desde a inteligência artificial até a biotecnologia, a tecnologia está moldando o futuro de formas que nunca imaginamos. É essencial que nos mantenhamos atualizados e abertos às mudanças, para que possamos aproveitar ao máximo as oportunidades que essas inovações trazem.",
    imagemURL:
      "https://i.pinimg.com/564x/9e/65/f8/9e65f88667f8357ac12b030435e18e54.jpg",
  },
  {
    id: "128",
    idAutor: "5",
    horario: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
    titulo: "Sustentabilidade e meio ambiente",
    conteudo:
      "A sustentabilidade é um tema crucial nos dias de hoje. Precisamos cuidar do nosso planeta e garantir que ele seja um lugar saudável para as futuras gerações. Pequenas ações, como reduzir o consumo de plástico, reciclar e economizar água, podem fazer uma grande diferença. Cada um de nós tem um papel importante na preservação do meio ambiente. Vamos fazer nossa parte!",
    imagemURL:
      "https://i.pinimg.com/564x/53/6e/65/536e657c2135e7debd6f6fd4b3ecca70.jpg",
  },
  {
    id: "129",
    idAutor: "1",
    horario: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
    titulo: "A importância da saúde mental",
    conteudo:
      "Cuidar da saúde mental é tão importante quanto cuidar da saúde física. Vivemos em um mundo acelerado e cheio de pressões, o que pode afetar nosso bem-estar emocional. É essencial tirar um tempo para relaxar, praticar atividades que gostamos e buscar ajuda quando necessário. A terapia é uma ferramenta valiosa que pode nos ajudar a lidar com os desafios da vida e a encontrar equilíbrio.",
    imagemURL:
      "https://i.pinimg.com/564x/f4/85/3a/f4853a553e797ab43c4914d5a27dddc0.jpg",
  },
  {
    id: "130",
    idAutor: "6",
    horario: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
    titulo: "O poder da música",
    conteudo:
      "A música tem o poder de nos emocionar, inspirar e conectar com outras pessoas. Ela pode nos ajudar a expressar sentimentos que muitas vezes não conseguimos colocar em palavras. Além disso, a música tem benefícios terapêuticos, podendo reduzir o estresse e a ansiedade. Nunca subestime o poder de uma boa canção!",
  },
  {
    id: "131",
    idAutor: "7",
    horario: new Date(
      2024,
      +(Math.random() * 10).toFixed(0),
      +(Math.random() * 10).toFixed(0)
    ),
    titulo: "Viagens e descobertas",
    conteudo:
      "Viajar é uma das melhores maneiras de aprender e crescer como pessoa. Cada viagem nos oferece novas perspectivas, nos permite conhecer diferentes culturas e nos desafia a sair da nossa zona de conforto. Viajar é uma oportunidade de descobrir o mundo e a nós mesmos. Então, arrume suas malas e embarque nessa aventura!",
  },
];

export function getPosts() {
  return POSTS as Post[];
}

export async function getPostById(postId: string) {
  const selectedPost = POSTS.find((post) => post.id === postId);
  return selectedPost as Post;
}

export async function deletePost(postId: string) {
  const updatedPost = POSTS.filter((post) => post.id !== postId);
  POSTS.length = 0;
  POSTS.push(...updatedPost);
}

export async function addPost(postData: newPost) {
  const fakeId = POSTS.length.toString();
  POSTS.push({ id: fakeId, ...postData });
  return POSTS.length - 1;
}

export async function deleteMultiplePosts(postsId: string[]) {
  postsId.map((id) => deletePost(id));
}
