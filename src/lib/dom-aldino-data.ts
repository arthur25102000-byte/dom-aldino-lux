import logo from "@/assets/dom-aldino-logo.webp";
import sceneBarricaria from "@/assets/cena-barricaria.jpg";
import sceneCaixaDeMadeira from "@/assets/cena-caixa-de-madeira.jpg";
import sceneKitExperiencia from "@/assets/cena-kit-experiencia.jpg";
import cenaBarrilGarrafa from "@/assets/cena-barril-garrafa.jpg";
import amburanaBrasileira from "@/assets/produtos/amburana-brasileira.jpg";
import amendoimDoCampo from "@/assets/produtos/amendoim-do-campo.jpg";
import balsamoBrasileiro from "@/assets/produtos/balsamo-brasileiro.jpg";
import blend4Madeiras from "@/assets/produtos/blend-4-madeiras.jpg";
import caixaDeMadeira from "@/assets/produtos/caixa-de-madeira.jpg";
import carvalhoAmericano from "@/assets/produtos/carvalho-americano.jpg";
import carvalhoEuropeu from "@/assets/produtos/carvalho-europeu.jpg";
import carvalhoFrances from "@/assets/produtos/carvalho-frances.jpg";
import garrafaSacoVeludo from "@/assets/produtos/garrafa-saco-veludo.jpg";
import jequitibaRosa from "@/assets/produtos/jequitiba-rosa.jpg";
import justaEPerfeita from "@/assets/produtos/justa-e-perfeita.jpg";
import kitExperiencia from "@/assets/produtos/kit-experiencia-dom-aldino.jpg";
import landmarks from "@/assets/produtos/landmarks.jpg";
import prataInNatura from "@/assets/produtos/prata-in-natura.jpg";
import sassafras from "@/assets/produtos/sassafras.jpg";

export type Product = {
  slug: string;
  name: string;
  category: string;
  wood: string;
  volume: string;
  alcohol: string;
  price: number;
  oldPrice?: number;
  installment?: string;
  badge?: "Novo" | "Mais vendido" | "Promoção";
  image: string;
  /** Primeiro parágrafo, exibido no topo da página do produto. */
  summary: string;
  /** Texto completo da aba "Descrição", um item por parágrafo. */
  description: string[];
  tasting?: {
    aroma?: string;
    flavor?: string;
    finish?: string;
  };
  pairing?: string;
  specs: Array<[string, string]>;
  featured?: boolean;
  launch?: boolean;
};

export type CartItem = Product & { quantity: number };

export const brand = {
  name: "Dom Aldino",
  fullName: "Dom Aldino – Cachaça Premium Artesanal",
  slogan: "Tradição e qualidade desde a origem",
  whatsapp: "5569992912092",
  phone: "+55 69 99291-2092",
  email: "cachacaria.dom.aldino@gmail.com",
  address: "Porto Velho, RO",
  branch: {
    name: "Filial Goiânia",
    city: "Goiânia, GO",
    phone: "+55 62 99805-9242",
    whatsapp: "5562998059242",
  },
  instagram: "@dom.aldino",
  instagramUrl: "https://www.instagram.com/dom.aldino/",
  facebookUrl: "https://www.facebook.com/profile.php?id=61586859806641",
  payments: ["Crédito", "Débito", "PIX"],
  shipping: "Frete a combinar",
  logoUrl: logo,
};

export const story = {
  image: cenaBarrilGarrafa,
  summary: [
    "Tudo começou em 2023, quando reformei um apartamento maior e combinei com a minha esposa fazer um barzinho na sala. Seria um espaço para guardar bebidas e ter algo para oferecer aos amigos, aos irmãos de maçonaria e às visitas.",
    "Foi ali que me apaixonei pelo mundo do whisky. Estudei, fiz cursos de degustação e cheguei ao ponto de desenvolver o meu próprio blend. Até que, no início de 2024, descobri a cachaça: mesmo processo de fabricação, mesmos barris, com a vantagem de poder usar a madeira brasileira, mais de trinta opções diferentes para envelhecer.",
    "O primeiro barril de carvalho americano rendeu 60 garrafas, levadas de presente a irmãos maçons em Manaus. O retorno foi tão bom que os pedidos não pararam mais. Hoje a Dom Aldino tem barris de 20 a 200 litros em carvalho francês, europeu, americano, amburana, bálsamo, jequitibá rosa, sassafrás e amendoim do campo, e já está no seu terceiro rótulo.",
  ],
  full: [
    "A história da cachaça Dom Aldino começa em meados do ano de 2023, quando eu adquiri e comecei a reformar um apartamento maior. Fiz um acordo com a minha esposa de fazer um barzinho ou adega na sala. Seria um espaço para guardar bebidas e ter algo para oferecer aos amigos, irmãos de maçonaria e visitas. Foi assim quando fiz os móveis planejados.",
    "A partir daí comecei a adquirir algumas bebidas: gin, vodka, licores, bitters, cachaças e whisky. Me apaixonei pelo mundo do whisky, comecei a adquirir vários exemplares de diferentes marcas e me dediquei a estudar sobre o assunto.",
    "Alguns canais do YouTube foram excelentes parceiros. Descobri o Rodrigo, da Jornada do Whisky (aquele do \"limpe a sua taça\"), depois o Tierri, do Tierri Whisky, em seguida o Patrick Goularte, do Porção dos Anjos. Estudei bastante, fiz cursos de degustação e, principalmente, estudei sobre a produção do whisky. Cheguei ao ponto de desenvolver o meu próprio blend.",
    "Por volta de janeiro ou fevereiro de 2024 eu descobri o mundo da cachaça e vi que o processo de fabricação era o mesmo do whisky. Mudava, lógico, a matéria-prima. O processo de envelhecimento também era igual ao do whisky, inclusive podendo usar os mesmos barris que se usam para envelhecer o whisky, e com a facilidade de que, no caso da cachaça, se pode usar a madeira brasileira, que tem uma diversidade de mais de 30 opções diferentes para se envelhecer a cachaça. Me apaixonei pelo universo da cachaça.",
    "Fato esse que me levou a escolher a cachaça como um presente para ofertar a alguns Grão-Mestres, ex-Grão-Mestres, irmãos e amigos durante a Assembleia Geral Ordinária da Confederação da Maçonaria Simbólica do Brasil, que ocorreria em julho de 2025 em Manaus-AM. Adentrei no segundo segmento da cachaça, que é o envelhecimento, a finalização e o envasamento. Não produzia a cachaça branca: comprava e colocava para envelhecer. Daí surgiu a cachaça, primeiramente em barril de carvalho americano, com um rótulo com a minha foto, próprio para um presente personalizado.",
    "Com a ideia de fazer essa cachaça para o encontro de Grão-Mestres da maçonaria em julho de 2025 em Manaus, Amazonas, em janeiro de 2024 eu comprei meu primeiro barril de 20 litros de carvalho americano e comecei a envelhecer cachaça até julho. Quando fui para Manaus, consegui produzir 60 garrafas. Fiz um rótulo com o meu rosto, o primeiro rótulo, e levei para dar de presente.",
    "O retorno foi muito bom, começaram a me pedir mais e aí veio aquele start: não posso ficar produzindo cachaça para presentear infinitamente, pois o custo é caro: cachaça de alambique, garrafa, tampa, lacre, rótulo, barril, mão de obra etc. A partir de então comecei a cobrar apenas o preço de custo e, daí para frente, não parou mais: os pedidos só aumentaram. Maçons do Brasil inteiro começaram a pedir e eu comecei a despachar para todo o país. Daí mudei o rótulo, fiz o meu segundo rótulo já tirando o meu rosto, pois o primeiro era um presente específico e agora eu já estava vendendo.",
    "Ao tempo que fui fazendo os cursos e me aprofundando nos conhecimentos específicos do mundo da cachaça, também comecei a investir na produção. Comprei mais barris de 20 litros: carvalho europeu, bálsamo, amburana e jequitibá rosa.",
    "Com o tempo fui comprando mais barris e, devagarinho, comprei barris maiores. Hoje eu já estou com três barris de 200 litros (carvalho francês, carvalho americano virgem, carvalho americano ex-bourbon), quatro barris de 100 litros (carvalho europeu, carvalho europeu ex-malt whisky, amburana, carvalho francês), quatro barris de 80 litros (bálsamo, jequitibá rosa, carvalho europeu, sassafrás) e quatro de 50 litros (amendoim do campo, carvalho americano, carvalho francês, carvalho europeu). Ou seja, eu tenho barris de todas as cachaças que estou produzindo.",
    "A diversidade dos tamanhos dos barris decorre do tempo de envelhecimento: quanto maior o barril, mais tempo demora para atingir a maturação ideal. No barril de 700 litros é no mínimo um ano para se chamar de cachaça premium, e acima de 3 anos para ser extra premium. Nos barris menores existe o cálculo para fazer a similaridade do tempo, para ver com quanto tempo você tira do barril, sempre levando em conta o trabalho do sommelier de provar e testar antes. Por isso a importância da diversidade de barris.",
    "Hoje a Cachaçaria Premium Dom Aldino já está no seu terceiro e atual rótulo, atuando de forma mais comercial.",
    "Nesse processo de evolução, foi natural adentrar no mundo digital. Hoje temos Instagram, Facebook, site com e-commerce, catálogo digital etc. Nos procure nas redes sociais e faça parte dessa família.",
    "E não esqueça: a cachaça é feita para ser apreciada. Com moderação, desfrute cada gole.",
  ],
  author: "Aldino Brasil de Souza",
  authorRole: "CEO da Dom Aldino",
};

export const heroSlides = [
  {
    title: "Cachaça premium envelhecida em madeiras nobres",
    subtitle: "Edição artesanal criada para quem valoriza origem, tempo e tradição brasileira.",
    cta: "Conheça nossas cachaças",
    href: "/loja",
    image: sceneBarricaria,
  },
  {
    title: "Garrafas âmbar com alma de alambique",
    subtitle: "Notas douradas, textura macia e presença marcante para momentos especiais.",
    cta: "Ver lançamentos",
    href: "/loja?ordenar=novidades",
    image: sceneCaixaDeMadeira,
  },
  {
    title: "Kits para presente com acabamento nobre",
    subtitle: "Seleções elegantes para celebrar, brindar e impressionar com autenticidade.",
    cta: "Kits para presente",
    href: "/loja?categoria=Presente",
    image: sceneKitExperiencia,
  },
];

export type Category = { name: string; image: string; description?: string };

// "Todos" não filtra a loja; as demais correspondem a Product.category.
export const ALL_CATEGORIES = "Todos";

export const categories: Category[] = [
  { name: ALL_CATEGORIES, image: cenaBarrilGarrafa },
  { name: "Envelhecidas", image: carvalhoAmericano },
  { name: "Blend", image: landmarks },
  { name: "Presente", image: kitExperiencia },
  { name: "Prata", image: prataInNatura },
];

// Vitrine "Mais vendidos" da página inicial: marque até 3 produtos com `featured: true`.
export const FEATURED_LIMIT = 3;

const INGREDIENTS = "Mosto fermentado de caldo de cana-de-açúcar";

function specs(wood: string, volume: string): Array<[string, string]> {
  return [
    ["Madeira", wood],
    ["Volume", volume],
    ["Teor alcoólico", "38% vol"],
    ["Ingredientes", INGREDIENTS],
  ];
}

export const products: Product[] = [
  // Envelhecidas
  {
    slug: "carvalho-americano",
    name: "Carvalho Americano",
    category: "Envelhecidas",
    wood: "Carvalho Americano",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: carvalhoAmericano,
    summary:
      "O Carvalho Americano, predominantemente proveniente de regiões como o estado do Kentucky nos EUA, é amplamente utilizado na indústria global de destilados, em especial na produção dos destilados dos Estados Unidos, a exemplo do bourbon.",
    description: [
      "O Carvalho Americano, predominantemente proveniente de regiões como o estado do Kentucky nos EUA, é amplamente utilizado na indústria global de destilados, em especial na produção dos destilados dos Estados Unidos, a exemplo do bourbon.",
      "Complexidade: O Carvalho Americano, devido à sua estrutura porosa e ao perfil aromático marcante, acrescenta múltiplas camadas de complexidade à cachaça.",
    ],
    tasting: {
      aroma:
        "Aromas de baunilha, coco queimado e caramelo. Esse tipo de carvalho tem poros mais largos e, por isso, proporciona uma troca mais intensa com o destilado. Além desses aromas principais, é possível identificar notas sutis de especiarias e um toque levemente tostado.",
      flavor:
        "A cachaça apresenta uma doçura suave, com destaque para sabores de coco queimado, baunilha e caramelo. A textura pode ser ligeiramente oleosa, proporcionando uma sensação aveludada e envolvente no paladar. Especiarias como canela e noz-moscada também podem ser percebidas.",
    },
    pairing:
      "Harmoniza bem com pratos ricos e robustos como carnes vermelhas grelhadas, molhos agridoces ou caramelizados, e sobremesas à base de creme ou baunilha.",
    specs: specs("Carvalho Americano", "750ml"),
  },
  {
    slug: "carvalho-frances",
    name: "Carvalho Francês",
    category: "Envelhecidas",
    wood: "Carvalho Francês",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: carvalhoFrances,
    summary:
      "O Carvalho Francês é renomado globalmente por seu uso em destilados finos e na produção de vinhos de alta qualidade. Na cachaça, o uso de barris novos de Carvalho Francês é uma inovação que busca elevar o padrão e a sofisticação da bebida, alinhando-a com padrões internacionais de envelhecimento e sabor.",
    description: [
      "O Carvalho Francês é renomado globalmente por seu uso em destilados finos e na produção de vinhos de alta qualidade. Na cachaça, o uso de barris novos de Carvalho Francês é uma inovação que busca elevar o padrão e a sofisticação da bebida, alinhando-a com padrões internacionais de envelhecimento e sabor.",
      "Complexidade: Além das características primárias da madeira, o processo de tosta do barril agrega camadas adicionais de sabor e aroma. A interação entre a bebida e a madeira resulta em um destilado que é tanto robusto quanto delicado, convidando o degustador a uma jornada de descoberta a cada gole.",
    ],
    tasting: {
      aroma:
        "Aromas ricos e delicados, que incluem notas sutis de baunilha, toques florais, especiarias como cravo e canela, e uma certa cremosidade que lembra manteiga. Adicionalmente, é possível identificar nuances de frutas secas e um leve toque tostado, proveniente da tosta da madeira.",
      flavor:
        "Revela um paladar elegante e sofisticado. Os sabores são refinados, destacando-se a baunilha, caramelo, e um toque de frutas amarelas.",
      finish: "A bebida apresenta uma textura sedosa, com um final ligeiramente adocicado e persistente.",
    },
    pairing:
      "A cachaça envelhecida em Carvalho Francês Virgem é versátil e se destaca em harmonizações gastronômicas. Combina bem com pratos finos, como pato assado com molho de frutas vermelhas, queijos de média maturação, e sobremesas cremosas, como crème brûlée.",
    specs: [
      ["Madeira", "Carvalho Francês"],
      ["Volume", "750ml"],
      ["Teor alcoólico", "38% vol"],
    ],
  },
  {
    slug: "carvalho-europeu",
    name: "Carvalho Europeu",
    category: "Envelhecidas",
    wood: "Carvalho Europeu",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: carvalhoEuropeu,
    summary:
      "A sofisticação desta madeira reflete-se na qualidade e na delicadeza dos aromas da cachaça. No Brasil, atualmente, o carvalho europeu está entre as madeiras mais utilizadas na produção de cachaças que buscam experimentar e diversificar os perfis sensoriais da bebida.",
    description: [
      "A sofisticação desta madeira reflete-se na qualidade e na delicadeza dos aromas da cachaça. No Brasil, atualmente, o carvalho europeu está entre as madeiras mais utilizadas na produção de cachaças que buscam experimentar e diversificar os perfis sensoriais da bebida.",
      "A interação entre a bebida e a madeira ao longo do tempo resulta em uma multiplicidade de aromas e sabores. Essa diversidade sensorial faz com que cada gole seja uma descoberta, tornando a experiência de degustação profundamente rica e variada.",
    ],
    tasting: {
      aroma:
        "O carvalho europeu traz à cachaça nuances aromáticas sofisticadas. Entre elas, notas com toques sutis de frutas secas e, em alguns casos, um leve aroma tostado ou defumado. A complexidade aromática que essa madeira proporciona torna a cachaça uma experiência olfativa rica e envolvente.",
      flavor: "O sabor é caracterizado por seu secor, elegância e traz uma textura sedosa, mais agradável ao paladar.",
    },
    pairing:
      "A cachaça armazenada em carvalho europeu é versátil quando se trata de harmonização. Combina muito bem com pratos mais refinados, como carnes vermelhas assadas, queijos curados e até mesmo chocolates de maior teor de cacau. Além disso, sua complexidade aromática e palativa também a torna uma excelente opção para ser degustada pura, após uma boa refeição.",
    specs: specs("Carvalho Europeu", "750ml"),
  },
  {
    slug: "amburana-brasileira",
    name: "Amburana Brasileira",
    category: "Envelhecidas",
    wood: "Amburana",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: amburanaBrasileira,
    summary:
      "A utilização da Amburana, também conhecida como cerejeira, é uma tradição brasileira, e sua escolha na produção de cachaças é uma maneira de valorizar e respeitar o patrimônio cultural e os métodos tradicionais do país.",
    description: [
      "A utilização da Amburana, também conhecida como cerejeira, é uma tradição brasileira, e sua escolha na produção de cachaças é uma maneira de valorizar e respeitar o patrimônio cultural e os métodos tradicionais do país.",
      "Complexidade: Enquanto muitas madeiras adicionam profundidade à cachaça, a Amburana traz um buquê de aromas e sabores que enriquece a bebida, tornando-a mais complexa e multifacetada.",
    ],
    tasting: {
      aroma:
        "A Amburana confere à cachaça notas adocicadas e aromáticas, lembrando mel, cravo, canela e até mesmo um toque de azeitona. Seu aroma é intensamente característico e facilmente reconhecível.",
      flavor:
        "As cachaças envelhecidas em Amburana possuem um paladar amadeirado levemente adocicado, proporcionando uma experiência sensorial rica e única.",
    },
    pairing:
      "Devido às suas características distintas, as cachaças envelhecidas em Amburana harmonizam bem com pratos mais adocicados, como sobremesas à base de leite, doces típicos brasileiros, queijos maturados e pratos gordurosos.",
    specs: specs("Amburana", "750ml"),
  },
  {
    slug: "balsamo-brasileiro",
    name: "Bálsamo Brasileiro",
    category: "Envelhecidas",
    wood: "Bálsamo",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: balsamoBrasileiro,
    summary:
      "O Bálsamo é uma madeira brasileira tradicionalmente usada no armazenamento de cachaça na região norte de Minas Gerais. A sua utilização remonta às origens da produção da cachaça, oferecendo uma identidade singular e autêntica à bebida.",
    description: [
      "O Bálsamo é uma madeira brasileira tradicionalmente usada no armazenamento de cachaça na região norte de Minas Gerais. A sua utilização remonta às origens da produção da cachaça, oferecendo uma identidade singular e autêntica à bebida.",
    ],
    tasting: {
      aroma: "Notas de ervas frescas, eucalipto, anis e um toque balsâmico que remete a ambientes florestais e naturais.",
      flavor:
        "No paladar, a influência do Bálsamo é marcante e característica. A cachaça adquire um sabor refrescante com notas que remetem ao anis, com nuances herbáceas e uma ponta de amargor agradável. Esse perfil de sabor a torna única, diferente das cachaças envelhecidas em madeiras mais doces.",
    },
    pairing:
      "Devido ao seu perfil distinto, a cachaça envelhecida em Bálsamo harmoniza bem com pratos da culinária brasileira, como carnes de panela, feijoada e pratos à base de ervas. Também combina com queijos mais curados e azeitados. Em contextos mais casuais, pode ser apreciada com petiscos como azeitonas e embutidos. Por sua natureza refrescante, também é uma excelente escolha para ser degustada pura em dias mais quentes.",
    specs: specs("Bálsamo", "750ml"),
  },
  {
    slug: "jequitiba-rosa",
    name: "Jequitibá Rosa",
    category: "Envelhecidas",
    wood: "Jequitibá Rosa",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: jequitibaRosa,
    summary:
      "O Jequitibá é uma madeira genuinamente brasileira, utilizada especialmente para cachaças que se querem mais neutras em sabor e mantendo um paladar aveludado original da aguardente.",
    description: [
      "O Jequitibá é uma madeira genuinamente brasileira, utilizada especialmente para cachaças que se querem mais neutras em sabor e mantendo um paladar aveludado original da aguardente.",
    ],
    tasting: {
      aroma:
        "O Jequitibá é conhecido por sua sutileza ao interferir no aroma da cachaça. Ao contrário de madeiras mais aromáticas, o Jequitibá realça o aroma natural da cachaça sem sobrecarregá-la com notas amadeiradas intensas. Isso resulta em uma bebida com nuances frescas, levemente frutadas, e com a essência pura da cana-de-açúcar.",
      flavor:
        "O sabor da cachaça armazenada em Jequitibá é suave. A madeira confere uma leve suavidade à bebida, tornando-a mais macia e aveludada ao paladar, sem introduzir sabores muito intensos. Isso permite que a cachaça mantenha suas características principais.",
    },
    pairing:
      "Por ser uma cachaça com perfil mais neutro e delicado, harmoniza bem com pratos leves, como peixes, frutos do mar e saladas frescas. Também é uma ótima opção para coquetéis como as caipirinhas, pois sua sutileza permite que outros ingredientes brilhem sem competir com a base alcoólica.",
    specs: specs("Jequitibá Rosa", "750ml"),
  },
  {
    slug: "sassafras",
    name: "Sassafrás",
    category: "Envelhecidas",
    wood: "Sassafrás",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: sassafras,
    summary:
      "A cachaça envelhecida ou armazenada em barris de canela-sassafrás, uma madeira rara da Mata Atlântica, é uma bebida rara e muito aromática. A bebida apresenta um perfil sensorial exótico. A madeira transfere para o destilado notas adocicadas de canela, hortelã e cardamomo, deixando um final macio, refrescante e um visual amarelado brilhante.",
    description: [
      "A cachaça envelhecida ou armazenada em barris de canela-sassafrás, uma madeira rara da Mata Atlântica, é uma bebida rara e muito aromática. A bebida apresenta um perfil sensorial exótico. A madeira transfere para o destilado notas adocicadas de canela, hortelã e cardamomo, deixando um final macio, refrescante e um visual amarelado brilhante.",
      "O sassafrás (Ocotea odorifera) é uma árvore nativa da Mata Atlântica. Quando utilizada para estagiar a cachaça (geralmente por um período de 1 a 2 anos), ela resulta em um destilado com propriedades muito singulares.",
      "Na tradição e medicina popular: além do uso comercial na cachaça, o sassafrás possui um longo histórico de usos na medicina popular, sendo muito associado a propriedades depurativas, diuréticas e no tratamento de dores reumáticas. É comum encontrar \"garrafadas\" de cachaça com lascas de sassafrás feitas de forma artesanal.",
    ],
    tasting: {
      aroma:
        "Marcante e muito especiado (condimentado, com sabor ou aroma de especiarias, como: canela, cravo, pimenta, gengibre e noz-moscada), com notas evidentes de canela e toques florais ou herbáceos.",
      flavor:
        "Suave, levemente adocicado, com um frescor herbal e uma picância inicial muito agradável. Dulçor natural com refrescância, sem deixar a bebida amarga.",
    },
    pairing:
      "Por possuir um buquê rico e aromático, é uma cachaça muito versátil para acompanhar momentos especiais: carnes de porco, embutidos e pratos condimentados. Queijos de sabor mais forte e marcante, como gorgonzola. Excelente para acompanhar sorvetes, frutas tropicais e pratos agridoces. Também é ótima para ser consumida pura (em temperatura ambiente), com gelo (on the rocks) ou até mesmo para flambar carnes e embutidos.",
    specs: specs("Sassafrás", "750ml"),
  },
  {
    slug: "amendoim-do-campo",
    name: "Amendoim do Campo",
    category: "Envelhecidas",
    wood: "Amendoim do Campo",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: amendoimDoCampo,
    summary:
      "A cachaça envelhecida ou armazenada em amendoim-do-campo (também conhecido como amendoim-bravo) é uma das mais valorizadas pelos apreciadores que buscam preservar a identidade sensorial da cana-de-açúcar.",
    description: [
      "A cachaça envelhecida ou armazenada em amendoim-do-campo (também conhecido como amendoim-bravo) é uma das mais valorizadas pelos apreciadores que buscam preservar a identidade sensorial da cana-de-açúcar.",
      "Diferente de madeiras intensas como o carvalho ou a amburana, o amendoim é uma madeira nobre brasileira considerada \"neutra\" ou \"discreta\". Ela reduz a acidez e traz maciez à bebida sem transformar radicalmente o seu sabor original.",
      "Cor: Geralmente mantém a cachaça límpida e transparente (cachaça prata ou clássica). Se passar muito tempo em barris pequenos e novos, pode adquirir um tom amarelo bem claro e suave.",
      "Consumo: Excelente para ser degustada pura, preferencialmente gelada.",
    ],
    tasting: {
      aroma: "Realça notas frescas, frutadas e adocicadas da própria cana de açúcar.",
      flavor: "Confere extrema maciez, suavidade e equilíbrio no paladar.",
    },
    pairing:
      "Caipirinhas: é considerada a madeira perfeita para preparar caipirinhas cítricas, pois não briga com o sabor do limão. Gastronomia: harmoniza perfeitamente com pratos leves, como aves, peixes, frutos do mar e frutas secas.",
    specs: specs("Amendoim do Campo", "750ml"),
  },

  // Blend
  {
    slug: "justa-e-perfeita",
    name: "Justa e Perfeita",
    category: "Blend",
    wood: "Blend de 5 madeiras",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: justaEPerfeita,
    summary:
      "Um blend de cinco madeiras que cria uma cachaça de extrema complexidade, equilibrando notas doces, herbais e especiarias. Cada madeira contribui com uma característica sensorial específica.",
    description: [
      "Um blend de cinco madeiras — Amburana, Bálsamo, Jequitibá Rosa, Amendoim e Sassafrás — cria uma cachaça de extrema complexidade, equilibrando notas doces, herbais e especiarias. Cada madeira contribui com uma característica sensorial específica:",
      "Amburana: traz doçura intensa, notas de baunilha e canela.",
      "Bálsamo: adiciona frescor herbal, notas de cravo e anis.",
      "Jequitibá Rosa: preserva o sabor da cana e reduz a acidez.",
      "Amendoim: confere maciez e um toque levemente frutado/amendoado.",
      "Sassafrás: entrega aroma exótico, picante e cor levemente avermelhada.",
      "Por que essa combinação funciona? Equilíbrio de doçura: a Amburana adoça enquanto o Bálsamo \"quebra\" o excesso com seu toque seco. Textura: o Amendoim e o Jequitibá Rosa garantem uma bebida aveludada, sem queimar a garganta. Aroma único: o Sassafrás atua como um \"tempero\" final, dando uma identidade olfativa rara.",
    ],
    specs: specs("Amburana, Bálsamo, Jequitibá Rosa, Amendoim e Sassafrás", "750ml"),
  },
  {
    slug: "landmarks",
    name: "Landmarks",
    category: "Blend",
    wood: "Blend de 3 carvalhos",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: landmarks,
    summary:
      "Cachaça Landmarks é um verdadeiro marco na terra. É um Blend de 3 madeiras: Carvalhos Americano, Francês e Europeu que oferecem complexidade, unindo a baunilha e coco (Americano) com especiarias, estrutura tânica (Europeu) e sutileza (Francês).",
    description: [
      "Cachaça Landmarks é um verdadeiro marco na terra. É um Blend de 3 madeiras: Carvalhos Americano, Francês e Europeu que oferecem complexidade, unindo a baunilha e coco (Americano) com especiarias, estrutura tânica (Europeu) e sutileza (Francês).",
      "Carvalho Americano (Quercus alba): Poros mais largos, madeira mais densa e resistente, envelhece mais rápido. Intenso em baunilha, coco, doce de leite, caramelo e notas de café/fumaça. Adiciona dulçor e suavidade rapidamente.",
      "Carvalho Francês (Quercus robur/petraea): Poros mais finos, madeira menos densa. Notas delicadas de especiarias (canela, cravo), tostados suaves, cacau e café. Proporciona taninos finos e complexidade estrutural.",
      "Carvalho Europeu (Quercus robur): Grão médio a grosso. Notas amadeiradas mais robustas, especiarias e perfil mais seco ou tânico. Adiciona estrutura e profundidade ao blend.",
      "O resultado é equilíbrio entre dulçor e tanino, complexidade sensorial, textura sedosa. Cor amarela-âmbar, textura macia e final persistente.",
    ],
    tasting: {
      finish: "Cor amarela-âmbar, textura macia e final persistente.",
    },
    pairing: "Harmonização perfeita com sobremesas à base de chocolate, carnes nobres e queijos curados.",
    specs: [
      ["Madeira", "Carvalho Americano, Francês e Europeu"],
      ["Volume", "750ml"],
      ["Teor alcoólico", "38% vol"],
    ],
  },
  {
    slug: "blend-4-madeiras",
    name: "Blend de 4 Madeiras",
    category: "Blend",
    wood: "Blend de 4 madeiras",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: blend4Madeiras,
    summary:
      "A cachaça blend de 4 madeiras (Carvalho Americano, Europeu, Bálsamo e Amburana) é uma bebida sofisticada que combina o perfil adocicado e de baunilha dos carvalhos com as notas exóticas de especiarias e coco das madeiras brasileiras, resultando em uma experiência suave, complexa e rica em aromas e sabores, com cor dourada e final persistente, ideal para degustação pura ou harmonizações.",
    description: [
      "A cachaça blend de 4 madeiras (Carvalho Americano, Europeu, Bálsamo e Amburana) é uma bebida sofisticada que combina o perfil adocicado e de baunilha dos carvalhos com as notas exóticas de especiarias e coco das madeiras brasileiras, resultando em uma experiência suave, complexa e rica em aromas e sabores, com cor dourada e final persistente, ideal para degustação pura ou harmonizações.",
      "Carvalho Americano: Traz notas de baunilha, coco, caramelo e um toque levemente picante, conferindo suavidade e um final longo.",
      "Carvalho Europeu: Adiciona elegância com notas de frutas secas, amêndoas, chocolate amargo e especiarias doces, equilibrando o perfil.",
      "Amburana: Madeira brasileira que adiciona dulçor natural, notas de especiarias (cravo, canela) e um aroma exótico, muitas vezes lembrando coco.",
      "Bálsamo: Madeira nobre brasileira que confere aroma marcante e complexo, com notas amadeiradas e de especiarias suaves, como cravo e canela.",
      "Cor: Dourada intensa e brilhante.",
    ],
    tasting: {
      aroma: "Rico em baunilha, coco, chocolate, amêndoas, frutas vermelhas e especiarias doces.",
      flavor: "Equilibrado, suave aveludado, com um mix de notas doces do carvalho e exóticas das madeiras brasileiras.",
      finish: "Longa e persistente, com camadas de sabor que evoluem a cada gole.",
    },
    specs: [
      ["Madeira", "Carvalho Americano, Carvalho Europeu, Bálsamo e Amburana"],
      ["Volume", "750ml"],
      ["Teor alcoólico", "38% vol"],
    ],
  },

  // Presente
  {
    slug: "kit-experiencia-dom-aldino",
    name: "Kit Experiência Dom Aldino",
    category: "Presente",
    wood: "Seleção de 10 sabores",
    volume: "10 frascos de 50ml",
    alcohol: "38% vol",
    price: 140,
    image: kitExperiencia,
    summary:
      "Uma experiência completa para quem deseja conhecer a linha Dom Aldino. O kit reúne 10 sabores disponíveis da nossa cachaça artesanal, permitindo comparar e descobrir qual madeira mais agrada ao seu paladar.",
    description: [
      "Uma experiência completa para quem deseja conhecer a linha Dom Aldino. O kit reúne 10 sabores disponíveis da nossa cachaça artesanal, permitindo comparar e descobrir qual madeira mais agrada ao seu paladar.",
      "Acompanha caixa personalizada com a logo Dom Aldino, tornando também uma excelente opção para presente.",
      "Sabores incluídos: Carvalho Americano, Carvalho Europeu, Carvalho Francês, Amburana Brasileira, Bálsamo Brasileiro, Jequitibá Rosa, Prata (In Natura), Blend de 4 Madeiras, LandMarks e Sassafrás.",
      "Perfeito para experimentar, presentear ou compartilhar bons momentos.",
    ],
    specs: [
      ["Conteúdo", "10 frascos de 50ml"],
      ["Embalagem", "Caixa personalizada Dom Aldino"],
      ["Teor alcoólico", "38% vol"],
    ],
  },
  {
    slug: "caixa-de-madeira",
    name: "Caixa de Madeira",
    category: "Presente",
    wood: "Sabor à sua escolha",
    volume: "750ml",
    alcohol: "38% vol",
    price: 140,
    image: caixaDeMadeira,
    summary:
      "Este é um item para presentear, cuidadosamente elaborado e preparado pela Cachaçaria Premium Dom Aldino. A caixa é em MDF personalizado para a Dom Aldino.",
    description: [
      "Este é um item para presentear, cuidadosamente elaborado e preparado pela Cachaçaria Premium Dom Aldino. A caixa é em MDF personalizado para a Dom Aldino.",
      "Para o conteúdo da caixa, você escolhe uma de nossas garrafas com o sabor de sua preferência: Carvalho Americano, Carvalho Francês, Carvalho Europeu, Quatro Madeiras, Landmarks, Amburana, Bálsamo, Jequitibá Rosa ou a Prata.",
    ],
    specs: [
      ["Embalagem", "Caixa em MDF personalizada"],
      ["Sabor", "À sua escolha"],
      ["Volume", "750ml"],
      ["Teor alcoólico", "38% vol"],
    ],
  },
  {
    slug: "garrafa-saco-veludo",
    name: "Garrafa Quadrada em Saco de Veludo",
    category: "Presente",
    wood: "Carvalho Americano",
    volume: "500ml",
    alcohol: "38% vol",
    price: 140,
    image: garrafaSacoVeludo,
    summary:
      "Este é um excelente item para presentear, cuidadosamente elaborado pela Cachaçaria Premium Dom Aldino. A embalagem é um saco de veludo personalizado com a marca Dom Aldino e a garrafa é diferenciada, pensada anatomicamente.",
    description: [
      "Este é um excelente item para presentear, cuidadosamente elaborado pela Cachaçaria Premium Dom Aldino. A embalagem é um saco de veludo personalizado com a marca Dom Aldino e a garrafa é diferenciada, pensada anatomicamente. O conteúdo é cachaça envelhecida em barris de Carvalho Americano, predominantemente proveniente de regiões como o Kentucky nos EUA.",
      "Complexidade: O Carvalho Americano, devido à estrutura porosa e perfil aromático marcante, acrescenta múltiplas camadas de complexidade.",
    ],
    tasting: {
      aroma:
        "Aromas de baunilha, coco queimado e caramelo. Este tipo de carvalho tem poros mais largos e proporciona troca mais intensa com o destilado.",
      flavor:
        "A cachaça apresenta doçura suave, com destaque para sabores de coco queimado, baunilha e caramelo. A textura é ligeiramente oleosa, proporcionando sensação aveludada no paladar.",
    },
    pairing:
      "Harmoniza bem com pratos ricos e robustos, carnes vermelhas grelhadas, pratos com molhos agridoces ou caramelizados, e sobremesas à base de creme ou baunilha.",
    specs: [
      ["Madeira", "Carvalho Americano"],
      ["Embalagem", "Saco de veludo personalizado"],
      ["Volume", "500ml"],
      ["Teor alcoólico", "38% vol"],
      ["Ingredientes", INGREDIENTS],
    ],
  },

  // Prata
  {
    slug: "prata-in-natura",
    name: "Prata (In Natura)",
    category: "Prata",
    wood: "Inox (sem madeira)",
    volume: "750ml",
    alcohol: "38% vol",
    price: 75,
    image: prataInNatura,
    summary:
      "Nosso rótulo prata, não envelhecida em barris de madeira, traz a pureza da cachaça de Alambique, branquinha e pura, \"in natura\".",
    description: [
      "Nosso rótulo prata, não envelhecida em barris de madeira, traz a pureza da cachaça de Alambique, branquinha e pura, \"in natura\".",
      "Descansa durante 3 anos em tanques de aço inoxidável. Isso garante ainda mais maciez e suavidade ao paladar. O uso de tanques de inox para o armazenamento de cachaça é uma prática mais moderna que preserva a pureza original da cachaça, garantindo uma bebida que reflete o sabor obtido em todo o processo de produção.",
    ],
    tasting: {
      aroma:
        "A cachaça mantém seu aroma primário e fresco, com destaque para as características diretas da cana-de-açúcar. Pode-se perceber notas suaves e delicadas, refletindo o processo de fermentação e destilação sem a influência da madeira.",
      flavor:
        "Sabor puro, onde a essência da cana-de-açúcar é a protagonista. O resultado é uma cachaça limpa, cristalina e direta em seu perfil de sabor.",
    },
    pairing:
      "A cachaça prata é extremamente versátil em termos de harmonização. É ideal para coquetéis, uma vez que não compete com outros ingredientes. Quando se trata de gastronomia, combina bem com pratos leves e refrescantes como ceviches, ostras ou frutas frescas.",
    specs: [
      ["Descanso", "3 anos em tanques de inox"],
      ["Volume", "750ml"],
      ["Teor alcoólico", "38% vol"],
      ["Ingredientes", INGREDIENTS],
    ],
  },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function whatsappCheckoutUrl(items: CartItem[]) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const lines = items.map(
    (item) => `• ${item.quantity}x ${item.name} — ${formatCurrency(item.price * item.quantity)}`,
  );
  const message = [
    "Olá, Dom Aldino! Quero finalizar meu pedido:",
    ...lines,
    `Total: ${formatCurrency(total)}`,
    "CEP para frete: ",
  ].join("\n");
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
}
