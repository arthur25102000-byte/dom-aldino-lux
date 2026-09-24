import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import {
  ALL_CATEGORIES,
  ProductCard,
  SectionTitle,
  categories,
  products,
} from "@/components/dom-aldino";
import { cn } from "@/lib/utils";

type ShopSearch = {
  categoria?: string | undefined;
  madeira?: string | undefined;
  ordenar?: string | undefined;
};

const SORTS = [
  ["recomendados", "Recomendados"],
  ["menor-preco", "Menor preço"],
  ["maior-preco", "Maior preço"],
] as const;
type Sort = (typeof SORTS)[number][0];

const text = (value: unknown) => (typeof value === "string" && value.trim() ? value : undefined);

export const Route = createFileRoute("/loja")({
  // Os filtros vivem no endereço: o link filtrado pode ser compartilhado e o menu "Loja" limpa tudo.
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    categoria: text(search["categoria"]),
    madeira: text(search["madeira"]),
    ordenar: text(search["ordenar"]),
  }),
  head: () => ({
    meta: [
      { title: "Loja – Dom Aldino Cachaça Premium" },
      {
        name: "description",
        content:
          "Compre cachaças Dom Aldino envelhecidas em oito madeiras, blends, prata e kits para presente.",
      },
      { property: "og:title", content: "Loja – Dom Aldino Cachaça Premium" },
      {
        property: "og:description",
        content:
          "Rótulos artesanais, kits para presente e cachaças envelhecidas em madeiras nobres.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const category = categories.some((item) => item.name === search.categoria)
    ? search.categoria!
    : ALL_CATEGORIES;
  const sort: Sort = SORTS.some(([value]) => value === search.ordenar)
    ? (search.ordenar as Sort)
    : "recomendados";

  const inCategory = useMemo(
    () =>
      products.filter((product) => category === ALL_CATEGORIES || product.category === category),
    [category],
  );
  // O filtro de madeira só faz sentido entre as envelhecidas, onde cada rótulo tem uma madeira.
  const woods = category === "Envelhecidas" ? inCategory.map((product) => product.wood) : [];
  const wood = search.madeira && woods.includes(search.madeira) ? search.madeira : undefined;

  const list = useMemo(() => {
    const filtered = inCategory.filter((product) => !wood || product.wood === wood);
    if (sort === "menor-preco") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "maior-preco") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [inCategory, wood, sort]);

  const update = (next: Partial<ShopSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...next }), replace: true, resetScroll: false });

  const select =
    "min-h-11 rounded border border-line-strong bg-brand-black px-3 text-sm text-brand-beige hover:border-line-accent focus-visible:border-brand-gold";

  return (
    <div className="bg-brand-black pt-32">
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionTitle
          as="h1"
          title="Nossas cachaças"
          text="Envelhecidas em oito madeiras, blends, a prata e opções para presente."
        />

        <nav aria-label="Categorias" className="-mx-4 sm:mx-0">
          <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1 sm:flex-wrap sm:justify-center sm:px-0">
            {categories.map((item) => {
              const current = item.name === category;
              return (
                <li key={item.name} className="shrink-0">
                  <Link
                    to="/loja"
                    search={item.name === ALL_CATEGORIES ? {} : { categoria: item.name }}
                    replace
                    resetScroll={false}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "press inline-flex min-h-11 items-center rounded-full border px-5 text-sm transition-colors",
                      current
                        ? "border-brand-gold bg-brand-gold text-brand-black"
                        : "border-line-strong text-brand-beige hover:border-brand-gold hover:text-brand-gold",
                    )}
                  >
                    {item.name === ALL_CATEGORIES ? "Todas" : item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
          <p className="text-sm text-subtle" aria-live="polite">
            {list.length} {list.length === 1 ? "produto" : "produtos"}
          </p>
          <div className="flex flex-wrap gap-2">
            {woods.length ? (
              <label className="flex items-center gap-2 text-sm text-subtle">
                <span className="sr-only sm:not-sr-only">Madeira</span>
                <select
                  className={select}
                  value={wood ?? ""}
                  onChange={(event) => update({ madeira: event.target.value || undefined })}
                >
                  <option value="">Todas as madeiras</option>
                  {woods.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
            <label className="flex items-center gap-2 text-sm text-subtle">
              <span className="sr-only sm:not-sr-only">Ordenar</span>
              <select
                className={select}
                value={sort}
                onChange={(event) =>
                  update({
                    ordenar: event.target.value === "recomendados" ? undefined : event.target.value,
                  })
                }
              >
                {SORTS.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <h2 className="sr-only">Produtos</h2>
        {list.length ? (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((product, index) => (
              <li key={product.slug}>
                <ProductCard product={product} priority={index < 2} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-16 text-center">
            <p className="font-display text-2xl text-brand-beige">
              Nenhuma cachaça com esses filtros.
            </p>
            <Link
              to="/loja"
              className="mt-4 inline-flex min-h-11 items-center text-brand-gold underline underline-offset-4"
            >
              Ver todas as cachaças
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
