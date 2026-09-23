import cellarHero from "@/assets/dom-aldino-cellar-hero.jpg";
import amberBottle from "@/assets/dom-aldino-amber-bottle.jpg";
import alambique from "@/assets/dom-aldino-alambique.jpg";
import giftKit from "@/assets/dom-aldino-gift-kit.jpg";

export type Product = {
  slug: string;
  name: string;
  category: string;
  wood: string;
  volume: string;
  alcohol: string;
  price: number;
  oldPrice?: number;
  installment: string;
  badge?: "Novo" | "Mais vendido" | "Promoção";
  image: string;
  description: string;
  tasting: {
    aroma: string;
    flavor: string;
    finish: string;
  };
  pairing: string;
  specs: Array<[string, string]>;
  featured?: boolean;
  launch?: boolean;
};

export type CartItem = Product & { quantity: number };

export const brand = {
  name: "Dom Aldino",
  fullName: "Dom Aldino – Cachaça Premium Artesanal",
  slogan: "Tradição e qualidade desde a origem",
  whatsapp: "5511999999999",
  phone: "(11) 99999-9999",
  email: "contato@domaldino.com.br",
  address: "Estrada do Alambique, 1888 — Minas Gerais, Brasil",
  instagram: "@domaldino",
  logoUrl: "/__l5e/assets-v1/a1f6eedb-3c89-4754-baad-329d41029ba2/dom-aldino-logo.png",
};

export const heroSlides = [
  {
    title: "Cachaça premium envelhecida em madeiras nobres",
    subtitle: "Edição artesanal criada para quem valoriza origem, tempo e tradição brasileira.",
    cta: "Conheça nossas cachaças",
    href: "/loja",
    image: cellarHero,
  },
  {
    title: "Garrafas âmbar com alma de alambique",
    subtitle: "Notas douradas, textura macia e presença marcante para momentos especiais.",
    cta: "Ver lançamentos",
    href: "/loja?ordenar=novidades",
    image: amberBottle,
  },
  {
    title: "Kits para presente com acabamento nobre",
    subtitle: "Seleções elegantes para celebrar, brindar e impressionar com autenticidade.",
    cta: "Kits para presente",
    href: "/loja?categoria=Kits%20e%20Presentes",
    image: giftKit,
  },
];

export const categories = [
  { name: "Amburana", image: amberBottle, description: "Doçura aromática e especiarias brasileiras." },
  { name: "Carvalho Europeu", image: cellarHero, description: "Madeira nobre, baunilha e estrutura elegante." },
  { name: "Jequitibá", image: alambique, description: "Pureza, frescor e tradição de alambique." },
  { name: "Bálsamo", image: amberBottle, description: "Herbáceo, intenso e genuinamente nacional." },
  { name: "Prata/Cristalina", image: alambique, description: "Clareza, leveza e perfil clássico." },
  { name: "Ouro/Envelhecida", image: cellarHero, description: "Cor dourada, corpo e final persistente." },
  { name: "Licores", image: amberBottle, description: "Sabores autorais para degustação lenta." },
  { name: "Kits e Presentes", image: giftKit, description: "Caixas premium para ocasiões marcantes." },
];

export const products: Product[] = [
  {
    slug: "reserva-carvalho-europeu",
    name: "Reserva Carvalho Europeu",
    category: "Carvalho Europeu",
    wood: "Carvalho Europeu",
    volume: "700ml",
    alcohol: "40% vol",
    price: 189.9,
    oldPrice: 219.9,
    installment: "ou 3x de R$ 63,30 sem juros",
    badge: "Mais vendido",
    image: amberBottle,
    description:
      "Cachaça artesanal premium repousada em carvalho europeu, com perfil elegante, coloração âmbar intensa e equilíbrio entre dulçor, especiarias e madeira tostada.",
    tasting: {
      aroma: "Baunilha, melado claro, frutas secas e leve tostado de barrica.",
      flavor: "Entrada macia, corpo aveludado, notas de caramelo, canela e madeira nobre.",
      finish: "Longo, quente na medida e com persistência dourada.",
    },
    pairing: "Queijos curados, carnes assadas, sobremesas com doce de leite e charutos suaves.",
    specs: [
      ["Madeira", "Carvalho Europeu"],
      ["Volume", "700ml"],
      ["Teor alcoólico", "40% vol"],
      ["Perfil", "Encorpada e amadeirada"],
    ],
    featured: true,
  },
  {
    slug: "amburana-edicao-da-coroa",
    name: "Amburana Edição da Coroa",
    category: "Amburana",
    wood: "Amburana",
    volume: "700ml",
    alcohol: "39% vol",
    price: 169.9,
    installment: "ou 3x de R$ 56,63 sem juros",
    badge: "Novo",
    image: amberBottle,
    description:
      "Blend artesanal repousado em amburana, madeira brasileira que entrega especiarias doces, perfume envolvente e final macio.",
    tasting: {
      aroma: "Canela, baunilha brasileira, casca doce e mel de engenho.",
      flavor: "Aveludada, com dulçor natural, especiarias e toque de rapadura.",
      finish: "Macio, aromático e convidativo.",
    },
    pairing: "Chocolate amargo, pudim, queijos semiduros e cafés especiais.",
    specs: [
      ["Madeira", "Amburana"],
      ["Volume", "700ml"],
      ["Teor alcoólico", "39% vol"],
      ["Perfil", "Aromática e macia"],
    ],
    featured: true,
    launch: true,
  },
  {
    slug: "prata-cristalina-alambique",
    name: "Prata Cristalina do Alambique",
    category: "Prata/Cristalina",
    wood: "Inox descansada",
    volume: "700ml",
    alcohol: "40% vol",
    price: 119.9,
    installment: "ou 3x de R$ 39,97 sem juros",
    image: alambique,
    description:
      "Cachaça prata descansada, límpida e aromática, feita para coquetelaria premium e degustação pura em temperatura levemente fresca.",
    tasting: {
      aroma: "Cana fresca, flores brancas e leve mineralidade.",
      flavor: "Seca, limpa, vibrante e com doçura discreta da cana.",
      finish: "Fresco, preciso e equilibrado.",
    },
    pairing: "Caipirinhas autorais, frutos do mar, comida mineira e entradas leves.",
    specs: [
      ["Descanso", "Inox"],
      ["Volume", "700ml"],
      ["Teor alcoólico", "40% vol"],
      ["Perfil", "Cristalina e fresca"],
    ],
    featured: true,
  },
  {
    slug: "kit-presente-dom-aldino",
    name: "Kit Presente Dom Aldino",
    category: "Kits e Presentes",
    wood: "Seleção especial",
    volume: "2x 500ml",
    alcohol: "40% vol",
    price: 299.9,
    oldPrice: 349.9,
    installment: "ou 3x de R$ 99,97 sem juros",
    badge: "Promoção",
    image: giftKit,
    description:
      "Caixa premium com duas expressões Dom Aldino e copos de degustação para presentear com sofisticação brasileira.",
    tasting: {
      aroma: "Seleção de aromas amadeirados, especiados e frutados.",
      flavor: "Degustação comparativa entre perfis intensos e macios.",
      finish: "Elegante, versátil e comemorativo.",
    },
    pairing: "Jantares, celebrações corporativas, datas especiais e brindes premium.",
    specs: [
      ["Conteúdo", "2 garrafas + copos"],
      ["Volume", "2x 500ml"],
      ["Teor alcoólico", "40% vol"],
      ["Perfil", "Presenteável"],
    ],
    featured: true,
    launch: true,
  },
  {
    slug: "balsamo-nobre",
    name: "Bálsamo Nobre",
    category: "Bálsamo",
    wood: "Bálsamo",
    volume: "700ml",
    alcohol: "41% vol",
    price: 154.9,
    installment: "ou 3x de R$ 51,63 sem juros",
    image: cellarHero,
    description:
      "Cachaça de personalidade herbácea, envelhecida em bálsamo para um perfil profundo, seco e tradicional.",
    tasting: {
      aroma: "Ervas, resina nobre, especiarias secas e madeira verde.",
      flavor: "Marcante, seco, com intensidade vegetal e estrutura firme.",
      finish: "Persistente, quente e clássico.",
    },
    pairing: "Carnes de panela, torresmo, embutidos artesanais e pratos defumados.",
    specs: [
      ["Madeira", "Bálsamo"],
      ["Volume", "700ml"],
      ["Teor alcoólico", "41% vol"],
      ["Perfil", "Herbácea e intensa"],
    ],
    launch: true,
  },
  {
    slug: "ouro-envelhecida-especial",
    name: "Ouro Envelhecida Especial",
    category: "Ouro/Envelhecida",
    wood: "Blend de madeiras nobres",
    volume: "750ml",
    alcohol: "40% vol",
    price: 209.9,
    installment: "ou 3x de R$ 69,97 sem juros",
    badge: "Novo",
    image: amberBottle,
    description:
      "Edição ouro com blend de madeiras nobres, criada para degustação lenta e ocasiões de alta celebração.",
    tasting: {
      aroma: "Frutas secas, especiarias doces, caramelo e toque defumado.",
      flavor: "Complexa, redonda, com camadas de madeira, mel e tostado fino.",
      finish: "Longo, sofisticado e envolvente.",
    },
    pairing: "Costela assada, sobremesas cremosas, queijos intensos e charcutaria.",
    specs: [
      ["Madeira", "Blend nobre"],
      ["Volume", "750ml"],
      ["Teor alcoólico", "40% vol"],
      ["Perfil", "Complexa e dourada"],
    ],
    launch: true,
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
