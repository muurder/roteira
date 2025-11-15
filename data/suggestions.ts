export interface RawSuggestion {
  id: string;
  label: string;
  descricaoCurta: string;
  tipo: string;
  duracaoIdealDias: number;
}

export const allSuggestions: RawSuggestion[] = [
  {
    "id": "rio-de-janeiro-brasil",
    "label": "Rio de Janeiro, Brasil",
    "descricaoCurta": "Praias icônicas, natureza exuberante e vida noturna vibrante.",
    "tipo": "praia",
    "duracaoIdealDias": 5
  },
  {
    "id": "chapada-diamantina-brasil",
    "label": "Chapada Diamantina, Brasil",
    "descricaoCurta": "Cachoeiras deslumbrantes, trilhas e paisagens de tirar o fôlego.",
    "tipo": "natureza",
    "duracaoIdealDias": 4
  },
  {
    "id": "santiago-chile",
    "label": "Santiago, Chile",
    "descricaoCurta": "Cordilheira dos Andes, vinhos e uma cultura vibrante.",
    "tipo": "cidade",
    "duracaoIdealDias": 5
  },
  {
    "id": "buenos-aires-argentina",
    "label": "Buenos Aires, Argentina",
    "descricaoCurta": "Tango, arquitetura europeia e carnes suculentas.",
    "tipo": "cultural",
    "duracaoIdealDias": 4
  },
  {
    "id": "machu-picchu-peru",
    "label": "Machu Picchu, Peru",
    "descricaoCurta": "A mística cidade perdida dos Incas nos Andes.",
    "tipo": "histórico",
    "duracaoIdealDias": 6
  },
  {
    "id": "cartagena-colombia",
    "label": "Cartagena, Colômbia",
    "descricaoCurta": "Cores vibrantes, muralhas históricas e o mar do Caribe.",
    "tipo": "histórico",
    "duracaoIdealDias": 4
  },
  {
    "id": "amazonia-brasil",
    "label": "Amazônia, Brasil",
    "descricaoCurta": "A maior floresta tropical do mundo e sua biodiversidade única.",
    "tipo": "natureza",
    "duracaoIdealDias": 5
  },
  {
    "id": "foz-do-iguacu-brasil",
    "label": "Foz do Iguaçu, Brasil",
    "descricaoCurta": "As cataratas mais famosas e impressionantes do mundo.",
    "tipo": "natureza",
    "duracaoIdealDias": 3
  },
  {
    "id": "nova-york-eua",
    "label": "Nova York, EUA",
    "descricaoCurta": "A cidade que nunca dorme, com seus arranha-céus e museus.",
    "tipo": "cidade",
    "duracaoIdealDias": 7
  },
  {
    "id": "cancun-mexico",
    "label": "Cancún, México",
    "descricaoCurta": "Praias de areia branca, mar azul-turquesa e ruínas Maias.",
    "tipo": "praia",
    "duracaoIdealDias": 6
  },
  {
    "id": "lisboa-portugal",
    "label": "Lisboa, Portugal",
    "descricaoCurta": "História rica, bondes charmosos e gastronomia inesquecível.",
    "tipo": "histórico",
    "duracaoIdealDias": 7
  },
  {
    "id": "roma-italia",
    "label": "Roma, Itália",
    "descricaoCurta": "Um museu a céu aberto com coliseus, fontes e massas.",
    "tipo": "histórico",
    "duracaoIdealDias": 5
  },
  {
    "id": "paris-franca",
    "label": "Paris, França",
    "descricaoCurta": "A cidade do amor, da luz, dos museus e da alta culinária.",
    "tipo": "romântico",
    "duracaoIdealDias": 5
  },
  {
    "id": "amsterda-holanda",
    "label": "Amsterdã, Holanda",
    "descricaoCurta": "Canais, bicicletas e uma atmosfera liberal e artística.",
    "tipo": "cultural",
    "duracaoIdealDias": 4
  },
  {
    "id": "islandia",
    "label": "Islândia",
    "descricaoCurta": "Geleiras, vulcões, cachoeiras e a espetacular Aurora Boreal.",
    "tipo": "natureza",
    "duracaoIdealDias": 8
  },
  {
    "id": "alpes-suicos",
    "label": "Alpes Suíços",
    "descricaoCurta": "Montanhas imponentes, lagos cristalinos e vilarejos encantadores.",
    "tipo": "natureza",
    "duracaoIdealDias": 6
  },
  {
    "id": "praga-republica-tcheca",
    "label": "Praga, República Tcheca",
    "descricaoCurta": "Um conto de fadas no leste europeu com castelos e pontes.",
    "tipo": "histórico",
    "duracaoIdealDias": 3
  },
  {
    "id": "toquio-japao",
    "label": "Tóquio, Japão",
    "descricaoCurta": "A fusão perfeita entre tradições milenares e futurismo.",
    "tipo": "cultural",
    "duracaoIdealDias": 7
  },
  {
    "id": "bali-indonesia",
    "label": "Bali, Indonésia",
    "descricaoCurta": "Templos, arrozais, praias e uma espiritualidade contagiante.",
    "tipo": "praia",
    "duracaoIdealDias": 8
  },
  {
    "id": "bangkok-tailandia",
    "label": "Bangkok, Tailândia",
    "descricaoCurta": "Templos dourados, mercados de rua e uma vida noturna agitada.",
    "tipo": "cidade",
    "duracaoIdealDias": 4
  },
  {
    "id": "cairo-egito",
    "label": "Cairo, Egito",
    "descricaoCurta": "As pirâmides, o Nilo e os tesouros dos faraós.",
    "tipo": "histórico",
    "duracaoIdealDias": 5
  },
  {
    "id": "cidade-do-cabo-africa-do-sul",
    "label": "Cidade do Cabo, África do Sul",
    "descricaoCurta": "Montanhas, praias, vinícolas e uma história poderosa.",
    "tipo": "natureza",
    "duracaoIdealDias": 6
  },
  {
    "id": "sydney-australia",
    "label": "Sydney, Austrália",
    "descricaoCurta": "A icônica Opera House, praias de surf e um estilo de vida descontraído.",
    "tipo": "cidade",
    "duracaoIdealDias": 5
  },
  {
    "id": "queenstown-nova-zelandia",
    "label": "Queenstown, Nova Zelândia",
    "descricaoCurta": "A capital mundial dos esportes de aventura e paisagens épicas.",
    "tipo": "aventura",
    "duracaoIdealDias": 4
  },
  {
    "id": "marrakech-marrocos",
    "label": "Marrakech, Marrocos",
    "descricaoCurta": "Mercados exóticos, palácios e a magia do deserto.",
    "tipo": "cultural",
    "duracaoIdealDias": 4
  },
  {
    "id": "jericoacoara-brasil",
    "label": "Jericoacoara, Brasil",
    "descricaoCurta": "Dunas, lagoas de água doce e um pôr do sol espetacular.",
    "tipo": "praia",
    "duracaoIdealDias": 4
  },
  {
    "id": "bonito-brasil",
    "label": "Bonito, Brasil",
    "descricaoCurta": "Flutuação em rios de águas cristalinas e grutas azuis.",
    "tipo": "natureza",
    "duracaoIdealDias": 4
  },
  {
    "id": "ouro-preto-brasil",
    "label": "Ouro Preto, Brasil",
    "descricaoCurta": "Igrejas barrocas, ladeiras de pedra e a história do Brasil.",
    "tipo": "histórico",
    "duracaoIdealDias": 3
  },
  {
    "id": "fernando-de-noronha-brasil",
    "label": "Fernando de Noronha, Brasil",
    "descricaoCurta": "Um paraíso de praias preservadas e vida marinha abundante.",
    "tipo": "praia",
    "duracaoIdealDias": 5
  },
  {
    "id": "kyoto-japao",
    "label": "Kyoto, Japão",
    "descricaoCurta": "A antiga capital imperial com seus templos, gueixas e jardins.",
    "tipo": "cultural",
    "duracaoIdealDias": 4
  },
  {
    "id": "santorini-grecia",
    "label": "Santorini, Grécia",
    "descricaoCurta": "Casas brancas, cúpulas azuis e o pôr do sol mais famoso do mundo.",
    "tipo": "romântico",
    "duracaoIdealDias": 4
  },
  {
    "id": "havana-cuba",
    "label": "Havana, Cuba",
    "descricaoCurta": "Carros clássicos, arquitetura colonial e o ritmo da salsa.",
    "tipo": "histórico",
    "duracaoIdealDias": 5
  },
  {
    "id": "istambul-turquia",
    "label": "Istambul, Turquia",
    "descricaoCurta": "O encontro de dois continentes com mesquitas e bazares.",
    "tipo": "cultural",
    "duracaoIdealDias": 5
  },
  {
    "id": "salvador-brasil",
    "label": "Salvador, Brasil",
    "descricaoCurta": "A herança africana, o pelourinho e a culinária com dendê.",
    "tipo": "histórico",
    "duracaoIdealDias": 4
  },
  {
    "id": "gramado-brasil",
    "label": "Gramado, Brasil",
    "descricaoCurta": "O charme europeu na serra gaúcha com chocolates e vinhos.",
    "tipo": "romântico",
    "duracaoIdealDias": 4
  },
  {
    "id": "jalapao-brasil",
    "label": "Jalapão, Brasil",
    "descricaoCurta": "Dunas douradas, fervedouros e uma natureza selvagem e preservada.",
    "tipo": "aventura",
    "duracaoIdealDias": 5
  },
  {
    "id": "serra-da-canastra-brasil",
    "label": "Serra da Canastra, Brasil",
    "descricaoCurta": "Cachoeiras imponentes, queijos artesanais e o Rio São Francisco.",
    "tipo": "natureza",
    "duracaoIdealDias": 4
  },
  {
    "id": "atacama-chile",
    "label": "Deserto do Atacama, Chile",
    "descricaoCurta": "Gêiseres, vulcões, lagoas altiplânicas e o céu mais estrelado do mundo.",
    "tipo": "aventura",
    "duracaoIdealDias": 5
  },
  {
    "id": "bariloche-argentina",
    "label": "Bariloche, Argentina",
    "descricaoCurta": "Neve no inverno, lagos no verão e chocolates o ano todo.",
    "tipo": "natureza",
    "duracaoIdealDias": 6
  },
  {
    "id": "cidade-do-mexico-mexico",
    "label": "Cidade do México, México",
    "descricaoCurta": "A rica história asteca, museus de classe mundial e uma gastronomia vibrante.",
    "tipo": "cultural",
    "duracaoIdealDias": 5
  }
];
