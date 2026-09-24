import { createFileRoute } from "@tanstack/react-router";

import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";

import { SectionTitle, brand } from "@/components/dom-aldino";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato – Dom Aldino" },
      {
        name: "description",
        content:
          "Fale com a Dom Aldino para comprar cachaças premium, kits para presente e receber atendimento pelo WhatsApp.",
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
  const units = [
    { city: "Porto Velho, RO", label: "Matriz", phone: brand.phone, whatsapp: brand.whatsapp },
    {
      city: brand.branch.city,
      label: brand.branch.name,
      phone: brand.branch.phone,
      whatsapp: brand.branch.whatsapp,
    },
  ];
  const row = "flex min-h-11 items-center gap-3 hover:text-brand-gold";

  return (
    <div className="bg-brand-black pt-32">
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <SectionTitle
          as="h1"
          title="Fale com a Dom Aldino"
          text="Pedidos, kits para presente e dúvidas são atendidos pelo WhatsApp. Envie sua seleção e o CEP para combinar o frete."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {units.map((unit) => (
            <div key={unit.phone} className="flex flex-col border border-line bg-card p-7 sm:p-9">
              <p className="text-xs font-medium uppercase tracking-caps text-subtle">
                {unit.label}
              </p>
              <h2 className="mt-2 font-display text-3xl text-brand-gold">{unit.city}</h2>
              <p className="tabular mt-3 text-lg text-brand-beige">{unit.phone}</p>
              <Button asChild size="lg" className="mt-7 self-start">
                <a href={`https://wa.me/${unit.whatsapp}`} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" /> Conversar no WhatsApp
                </a>
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-caps text-brand-gold">
              Outros canais
            </h2>
            <ul className="mt-3 text-body">
              <li>
                <a className={cn(row, "break-all")} href={`mailto:${brand.email}`}>
                  <Mail className="h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
                  {brand.email}
                </a>
              </li>
              <li>
                <a className={row} href={brand.instagramUrl} target="_blank" rel="noreferrer">
                  <Instagram className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                  {brand.instagram}
                </a>
              </li>
              <li>
                <a className={row} href={brand.facebookUrl} target="_blank" rel="noreferrer">
                  <Facebook className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-caps text-brand-gold">
              Pagamento
            </h2>
            <p className="mt-4 text-body">{brand.payments.join(", ")}.</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-caps text-brand-gold">Envio</h2>
            <p className="mt-4 text-body">
              Enviamos para todo o Brasil. {brand.shipping}, conforme o CEP.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
