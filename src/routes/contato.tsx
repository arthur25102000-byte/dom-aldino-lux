import { createFileRoute } from "@tanstack/react-router";

import { ContactCards, Newsletter, SectionTitle, brand } from "@/components/dom-aldino";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato – Dom Aldino" },
      {
        name: "description",
        content: "Fale com a Dom Aldino para comprar cachaças premium, kits para presente e receber atendimento pelo WhatsApp.",
      },
      { property: "og:title", content: "Contato – Dom Aldino" },
      {
        property: "og:description",
        content: "Atendimento Dom Aldino por WhatsApp, e-mail e canais oficiais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-brand-black pt-36">
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <SectionTitle
          eyebrow="Contato"
          title="Atendimento Dom Aldino"
          text="Tire dúvidas, solicite kits para presente ou finalize seu pedido com nossa equipe."
        />
        <ContactCards />
        <div className="mt-10 border border-brand-gold/20 bg-card p-6 text-center sm:p-10">
          <h2 className="font-display text-3xl text-brand-gold">Comprar pelo WhatsApp</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-brand-beige/75">
            Envie sua seleção, confirme o CEP e receba as opções de frete para todo o Brasil.
          </p>
          <Button asChild className="mt-6 rounded bg-primary text-primary-foreground hover:bg-brand-beige hover:text-brand-black">
            <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">Falar agora</a>
          </Button>
        </div>
      </section>
      <Newsletter />
    </div>
  );
}
