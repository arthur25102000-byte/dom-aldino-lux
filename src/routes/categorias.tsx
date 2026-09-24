import { createFileRoute } from "@tanstack/react-router";

import { CategoryGrid, SectionTitle } from "@/components/dom-aldino";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias – Dom Aldino" },
      {
        name: "description",
        content:
          "Explore cachaças Dom Aldino por categoria: Envelhecidas, Blend, Presente e Prata.",
      },
      { property: "og:title", content: "Categorias – Dom Aldino" },
      {
        property: "og:description",
        content: "Categorias premium para escolher sua cachaça artesanal por madeira e ocasião.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="bg-brand-black pt-32">
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionTitle
          as="h1"
          title="Nossa coleção"
          text="Envelhecidas em madeiras nobres, blends autorais, a pureza da prata e opções especiais para presentear."
        />
        <CategoryGrid />
      </section>
    </div>
  );
}
