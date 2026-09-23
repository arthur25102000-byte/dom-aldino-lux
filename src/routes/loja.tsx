import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ProductCard, SectionTitle, ShopFilters, products } from "@/components/dom-aldino";

export const Route = createFileRoute("/loja")({
  validateSearch: (search: Record<string, unknown>): { categoria?: string; ordenar?: string } => ({
    categoria: typeof search.categoria === "string" ? search.categoria : "Todas",
    ordenar: typeof search.ordenar === "string" ? search.ordenar : "Mais vendidos",
  }),
  head: () => ({
    meta: [
      { title: "Loja – Dom Aldino Cachaça Premium" },
      {
        name: "description",
        content: "Compre cachaças premium Dom Aldino por categoria, madeira, preço e lançamentos.",
      },
      { property: "og:title", content: "Loja – Dom Aldino Cachaça Premium" },
      {
        property: "og:description",
        content: "Rótulos artesanais, kits para presente e cachaças envelhecidas em madeiras nobres.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const [selectedCategory, setSelectedCategory] = useState(search.categoria);
  const [selectedWood, setSelectedWood] = useState("Todas");
  const [sort, setSort] = useState(search.ordenar === "novidades" ? "Novidades" : search.ordenar);

  const filteredProducts = useMemo(() => {
    const list = products
      .filter((product) => selectedCategory === "Todas" || product.category === selectedCategory)
      .filter((product) => selectedWood === "Todas" || product.wood === selectedWood);

    return [...list].sort((a, b) => {
      if (sort === "Menor preço") return a.price - b.price;
      if (sort === "Maior preço") return b.price - a.price;
      if (sort === "Novidades") return Number(Boolean(b.launch)) - Number(Boolean(a.launch));
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
  }, [selectedCategory, selectedWood, sort]);

  return (
    <div className="bg-brand-black pt-36">
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionTitle
          eyebrow="Loja"
          title="Cachaças Dom Aldino"
          text="Filtros rápidos para encontrar o rótulo ideal por madeira, estilo e ocasião."
        />
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <ShopFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedWood={selectedWood}
            onWoodChange={setSelectedWood}
            sort={sort}
            onSortChange={setSort}
          />
          <div>
            <div className="mb-5 flex items-center justify-between border-b border-brand-gold/15 pb-4 text-sm text-brand-beige/70">
              <span>{filteredProducts.length} produtos encontrados</span>
              <span className="hidden uppercase tracking-[0.22em] text-brand-gold sm:inline">{selectedCategory}</span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
