import { Link, createFileRoute } from "@tanstack/react-router";

import { Differentials, Photo, SectionTitle } from "@/components/dom-aldino";
import { Button } from "@/components/ui/button";
import { story } from "@/lib/dom-aldino-data";

export const Route = createFileRoute("/nossa-historia")({
  head: () => ({
    meta: [
      { title: "Nossa História – Dom Aldino" },
      {
        name: "description",
        content:
          "Conheça a história da Cachaçaria Premium Dom Aldino, contada por Aldino Brasil de Souza.",
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
  const [lede, ...rest] = story.full;
  const closing = rest.pop();
  return (
    <div className="bg-brand-black pt-32">
      <article className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <SectionTitle as="h1" title="Nossa história" />
        <figure className="overflow-hidden border border-brand-gold/20">
          <Photo
            picture={story.image}
            alt="Garrafa Dom Aldino Barril de Carvalho e copo sobre a mesa, diante de barris da marca e alambiques de cobre"
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority
            className="w-full object-cover"
          />
        </figure>
        <div className="mx-auto mt-14 max-w-[64ch]">
          <p className="font-display text-2xl leading-snug text-brand-beige sm:text-[1.7rem]">
            {lede}
          </p>
          <div className="mt-8 space-y-6 text-body">
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {closing ? (
            <p className="mt-10 border-y border-brand-gold/20 py-8 text-center font-display text-2xl italic leading-snug text-brand-gold">
              {closing}
            </p>
          ) : null}
          <footer className="mt-8">
            <p className="font-display text-2xl text-brand-gold">{story.author}</p>
            <p className="text-sm text-subtle">{story.authorRole}</p>
          </footer>
        </div>
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/loja">Ver nossas cachaças</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contato">Falar com a Dom Aldino</Link>
          </Button>
        </div>
      </article>
      <Differentials />
    </div>
  );
}
