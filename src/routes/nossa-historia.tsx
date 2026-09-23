import { Link, createFileRoute } from "@tanstack/react-router";

import { Differentials, SectionTitle, TrustStrip } from "@/components/dom-aldino";
import { Button } from "@/components/ui/button";
import { story } from "@/lib/dom-aldino-data";

export const Route = createFileRoute("/nossa-historia")({
  head: () => ({
    meta: [
      { title: "Nossa História – Dom Aldino" },
      {
        name: "description",
        content: "Conheça a história da Cachaçaria Premium Dom Aldino, contada por Aldino Brasil de Souza.",
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
        <SectionTitle eyebrow="Cachaçaria Premium Dom Aldino" title="Nossa história" />
        <div className="overflow-hidden border border-brand-gold/25">
          <img src={story.image} alt="Garrafa Dom Aldino Barril de Carvalho e copo sobre a mesa, diante de barris da marca e alambiques de cobre" className="w-full object-cover" width={1536} height={1024} />
        </div>
        <div className="mx-auto mt-12 max-w-3xl space-y-6 leading-8 text-brand-beige/80">
          {story.full.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="mx-auto mt-10 max-w-3xl border-t border-brand-gold/20 pt-6">
          <p className="font-display text-2xl text-brand-gold">{story.author}</p>
          <p className="text-xs uppercase tracking-[0.24em] text-brand-beige/60">{story.authorRole}</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3 pb-16">
          <Button asChild className="rounded bg-primary text-primary-foreground hover:bg-brand-beige hover:text-brand-black">
            <Link to="/loja">Ver nossas cachaças</Link>
          </Button>
          <Button asChild variant="outline" className="rounded border-brand-gold/50 bg-transparent text-brand-gold hover:bg-primary hover:text-primary-foreground">
            <Link to="/">Voltar ao início</Link>
          </Button>
        </div>
      </section>
      <Differentials />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <TrustStrip />
      </section>
    </div>
  );
}
