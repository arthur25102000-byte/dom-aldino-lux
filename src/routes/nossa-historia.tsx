import { createFileRoute } from "@tanstack/react-router";

import { Differentials, SectionTitle, StorySection, TrustStrip } from "@/components/dom-aldino";

export const Route = createFileRoute("/nossa-historia")({
  head: () => ({
    meta: [
      { title: "Nossa História – Dom Aldino" },
      {
        name: "description",
        content: "Conheça a tradição artesanal, o alambique e o envelhecimento em madeiras nobres da Dom Aldino.",
      },
      { property: "og:title", content: "Nossa História – Dom Aldino" },
      {
        property: "og:description",
        content: "A origem da cachaça premium Dom Aldino, feita com tempo, tradição e qualidade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <div className="bg-brand-black pt-28">
      <section className="mx-auto max-w-5xl px-4 pt-12 sm:px-6">
        <SectionTitle
          eyebrow="Tradição e qualidade desde a origem"
          title="Uma cachaçaria brasileira com espírito nobre"
          text="Da seleção da cana ao repouso nas barricas, cada etapa honra o tempo necessário para uma bebida premium."
        />
      </section>
      <StorySection compact />
      <Differentials />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <TrustStrip />
      </section>
    </div>
  );
}
