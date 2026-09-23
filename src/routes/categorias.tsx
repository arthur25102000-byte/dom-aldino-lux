import { createFileRoute } from "@tanstack/react-router";

import { CategoryGrid, SectionTitle } from "@/components/dom-aldino";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias – Dom Aldino" },
      {
        name: "description",
        content: "Explore cachaças Dom Aldino por Amburana, Carvalho Europeu, Jequitibá, Bálsamo, Prata, Ouro, Licores e Kits.",
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
    <div className="bg-brand-black pt-36">
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionTitle
          eyebrow="Categorias"
          title="Escolha pelo caráter da madeira"
          text="Da pureza cristalina ao envelhecimento dourado, cada categoria revela uma forma de apreciar a tradição Dom Aldino."
        />
        <CategoryGrid />
      </section>
    </div>
  );
}
