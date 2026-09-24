import { Link, createFileRoute } from "@tanstack/react-router";

import {
  CategoryGrid,
  Differentials,
  FollowUs,
  HeroSlider,
  ProductCarousel,
  SectionTitle,
  StorySection,
  products,
} from "@/components/dom-aldino";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dom Aldino – Cachaça Premium Artesanal" },
      {
        name: "description",
        content:
          "Cachaçaria artesanal brasileira com rótulos premium, madeiras nobres, kits para presente e compra pelo WhatsApp.",
      },
      { property: "og:title", content: "Dom Aldino – Cachaça Premium Artesanal" },
      {
        property: "og:description",
        content: "Tradição e qualidade desde a origem em cachaças premium artesanais brasileiras.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const hasShowcase = products.some((product) => product.featured || product.launch);
  return (
    <>
      <HeroSlider />
      <Differentials />
      <section className="bg-brand-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            title="Escolha pela categoria"
            text="Envelhecidas em madeiras nobres, blends autorais, a prata e opções para presentear."
          />
          <CategoryGrid />
        </div>
      </section>
      {hasShowcase ? (
        <section className="bg-brand-smoke py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ProductCarousel title="Mais vendidos" kind="featured" />
            <ProductCarousel title="Lançamentos" kind="launch" />
            <div className="mt-4 text-center sm:hidden">
              <Button asChild>
                <Link to="/loja">Ver loja completa</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}
      <StorySection />
      <FollowUs />
    </>
  );
}
