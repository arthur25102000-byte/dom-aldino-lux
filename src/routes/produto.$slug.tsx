import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import {
  ProductCard,
  ProductTabs,
  QuantityControl,
  SectionTitle,
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
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <div className="bg-brand-black pt-36">
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <Link to="/loja" className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold hover:text-brand-gold-soft">
          Voltar para loja
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-[96px_1fr]">
            <div className="order-2 grid grid-cols-3 gap-3 sm:order-1 sm:grid-cols-1">
              {[product.image, product.image, product.image].map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden border border-brand-gold/20 bg-card p-1">
                  <img src={image} alt={`${product.name} imagem ${index + 1}`} className="h-full w-full object-cover" loading="lazy" width={120} height={120} />
                </div>
              ))}
            </div>
            <div className="order-1 overflow-hidden border border-brand-gold/25 bg-card sm:order-2">
              <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" width={780} height={980} />
            </div>
          </div>
          <div>
            {product.badge ? <span className="border border-brand-gold bg-brand-wood px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-gold">{product.badge}</span> : null}
            <h1 className="mt-4 font-display text-4xl gold-emboss sm:text-5xl">{product.name}</h1>
            <p className="mt-3 text-sm uppercase tracking-[0.22em] text-brand-beige/60">{product.wood} · {product.volume} · {product.alcohol}</p>
            <p className="mt-6 leading-8 text-brand-beige/78">{product.description}</p>
            <div className="mt-7">
              {product.oldPrice ? <span className="mr-3 text-lg text-brand-beige/45 line-through">{formatCurrency(product.oldPrice)}</span> : null}
              <span className="text-4xl font-bold text-brand-gold">{formatCurrency(product.price)}</span>
              <p className="mt-2 text-sm text-brand-beige/65">{product.installment}</p>
            </div>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <QuantityControl quantity={quantity} setQuantity={setQuantity} />
              <Button className="min-h-12 flex-1 rounded bg-primary text-primary-foreground hover:bg-brand-beige hover:text-brand-black" onClick={() => addItem(product, quantity)}>
                Comprar agora
              </Button>
            </div>
            <ProductTabs product={product} />
          </div>
        </div>
      </section>
      <section className="bg-brand-smoke py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Sugestões" title="Você também pode gostar" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <ProductCard key={item.slug} product={item} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
