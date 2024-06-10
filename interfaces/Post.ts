export default interface Post {
  id: string;
  autor: string;
  horario: Date;
  titulo: string;
  imagemURL?: string;
  conteudo: string;
}

export const POSTS: Post[] = [
  {
    id: "124",
    autor: "Alice",
    horario: new Date(),
    titulo: "Reflexões sobre a vida",
    conteudo:
      "Hoje eu gostaria de compartilhar algumas reflexões sobre a vida. Às vezes, nos encontramos em momentos de dúvida e incerteza, mas é importante lembrar que esses momentos são parte de nossa jornada. Cada desafio que enfrentamos nos ajuda a crescer e a nos tornar pessoas mais fortes. É fundamental manter a fé e a esperança, mesmo nos dias mais sombrios, pois o sol sempre volta a brilhar.",
  },
  {
    id: "125",
    autor: "Bruno",
    horario: new Date(),
    titulo: "A importância da educação",
    conteudo:
      "A educação é a base para o desenvolvimento de qualquer sociedade. Investir em educação é investir no futuro. Através do conhecimento, podemos transformar realidades, combater a desigualdade e promover a justiça social. É crucial que todos tenham acesso a uma educação de qualidade, pois somente assim conseguiremos construir um mundo mais justo e igualitário.",
  },
  {
    id: "126",
    autor: "Carla",
    horario: new Date(),
    titulo: "A magia da leitura",
    conteudo:
      "Ler é viajar sem sair do lugar. Através dos livros, podemos conhecer diferentes culturas, aprender sobre a história, explorar novos mundos e expandir nossa imaginação. A leitura é uma ferramenta poderosa que nos permite adquirir conhecimento e desenvolver empatia. Nunca subestime o poder de um bom livro!",
  },
  {
    id: "127",
    autor: "Daniel",
    horario: new Date(),
    titulo: "Tecnologia e futuro",
    conteudo:
      "Vivemos em uma era de avanços tecnológicos incríveis. A cada dia, novas inovações surgem, transformando a maneira como vivemos e trabalhamos. Desde a inteligência artificial até a biotecnologia, a tecnologia está moldando o futuro de formas que nunca imaginamos. É essencial que nos mantenhamos atualizados e abertos às mudanças, para que possamos aproveitar ao máximo as oportunidades que essas inovações trazem.",
  },
  {
    id: "128",
    autor: "Eduarda",
    horario: new Date(),
    titulo: "Sustentabilidade e meio ambiente",
    conteudo:
      "A sustentabilidade é um tema crucial nos dias de hoje. Precisamos cuidar do nosso planeta e garantir que ele seja um lugar saudável para as futuras gerações. Pequenas ações, como reduzir o consumo de plástico, reciclar e economizar água, podem fazer uma grande diferença. Cada um de nós tem um papel importante na preservação do meio ambiente. Vamos fazer nossa parte!",
  },
  {
    id: "129",
    autor: "Fernando",
    horario: new Date(),
    titulo: "A importância da saúde mental",
    conteudo:
      "Cuidar da saúde mental é tão importante quanto cuidar da saúde física. Vivemos em um mundo acelerado e cheio de pressões, o que pode afetar nosso bem-estar emocional. É essencial tirar um tempo para relaxar, praticar atividades que gostamos e buscar ajuda quando necessário. A terapia é uma ferramenta valiosa que pode nos ajudar a lidar com os desafios da vida e a encontrar equilíbrio.",
  },
  {
    id: "130",
    autor: "Gabriela",
    horario: new Date(),
    titulo: "O poder da música",
    conteudo:
      "A música tem o poder de nos emocionar, inspirar e conectar com outras pessoas. Ela pode nos ajudar a expressar sentimentos que muitas vezes não conseguimos colocar em palavras. Além disso, a música tem benefícios terapêuticos, podendo reduzir o estresse e a ansiedade. Nunca subestime o poder de uma boa canção!",
  },
  {
    id: "131",
    autor: "Henrique",
    horario: new Date(),
    titulo: "Viagens e descobertas",
    conteudo:
      "Viajar é uma das melhores maneiras de aprender e crescer como pessoa. Cada viagem nos oferece novas perspectivas, nos permite conhecer diferentes culturas e nos desafia a sair da nossa zona de conforto. Viajar é uma oportunidade de descobrir o mundo e a nós mesmos. Então, arrume suas malas e embarque nessa aventura!",
  },
];
