import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { ChevronRight, MessageCircle, ShoppingBag } from "lucide-react";

import {
  Photo,
  ProductCard,
  ProductTabs,
  QuantityControl,
  SectionTitle,
  brand,
  formatCurrency,
  getProduct,
  products,
  useCart,
} from "@/components/dom-aldino";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    const title = product ? `${product.name} – Dom Aldino` : "Produto não encontrado – Dom Aldino";
    const description = product
      ? `${product.name}: cachaça premium ${product.wood}, ${product.volume}, ${product.alcohol}.`
      : "Produto Dom Aldino não encontrado.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const others = products.filter((item) => item.slug !== product.slug);
  const related = [
    ...others.filter((item) => item.category === product.category),
    ...others.filter((item) => item.category !== product.category),
  ].slice(0, 4);
  const add = () => addItem(product, quantity);

  return (
    <div className="bg-brand-black pt-32">
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <nav aria-label="Você está em">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-subtle">
            <li>
              <Link to="/loja" className="inline-flex min-h-11 items-center hover:text-brand-gold">
                Loja
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link
                to="/loja"
                search={{ categoria: product.category }}
                className="inline-flex min-h-11 items-center hover:text-brand-gold"
              >
                {product.category}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="text-brand-beige">
              {product.name}
            </li>
          </ol>
        </nav>
        <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-14">
          <div className="overflow-hidden border border-brand-gold/20 bg-card lg:sticky lg:top-32">
            <Photo
              picture={product.image}
              alt={`Garrafa ${product.name} Dom Aldino`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            {product.badge ? (
              <span className="border border-brand-gold bg-brand-wood px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-label text-brand-gold">
                {product.badge}
              </span>
            ) : null}
            <h1 className="mt-2 font-display text-4xl font-bold leading-[1.08] gold-emboss sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-subtle">
              {product.name.includes(product.wood) ? "" : `${product.wood} · `}
              {product.volume} · {product.alcohol}
            </p>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-body">{product.summary}</p>
            <p className="tabular mt-8 font-display text-4xl font-bold text-brand-gold">
              {product.oldPrice ? (
                <span className="mr-3 text-xl font-normal text-subtle line-through">
                  {formatCurrency(product.oldPrice)}
                </span>
              ) : null}
              {formatCurrency(product.price)}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantityControl
                label={product.name}
                quantity={quantity}
                setQuantity={(value) => setQuantity(Math.max(1, value))}
              />
              <Button size="lg" className="flex-1" onClick={add}>
                <ShoppingBag aria-hidden="true" /> Adicionar ao carrinho
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-subtle">
              <MessageCircle className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />
              Pedido finalizado pelo WhatsApp. {brand.shipping}.
            </p>
            <ProductTabs product={product} />
          </div>
        </div>
      </section>
      <section className="bg-brand-smoke py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle title="Você também pode gostar" />
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Barra de compra fixa no celular: preço e ação sempre ao alcance do polegar. */}
      <div className="glass fixed inset-x-0 bottom-0 z-40 border-t border-brand-gold/20 bg-brand-black/90 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-subtle">{product.name}</p>
            <p className="tabular font-display text-xl font-bold text-brand-gold">
              {formatCurrency(product.price * quantity)}
            </p>
          </div>
          <Button size="lg" onClick={add}>
            <ShoppingBag aria-hidden="true" /> Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
