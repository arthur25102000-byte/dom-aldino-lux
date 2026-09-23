import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { DomAldinoShell } from "@/components/dom-aldino";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <DomAldinoShell>
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-28">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">Página indisponível</p>
          <h1 className="mt-3 font-display text-7xl gold-emboss">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Esta página não foi encontrada</h2>
          <p className="mt-2 text-sm text-brand-beige/70">
            O endereço pode ter mudado ou não existir na loja Dom Aldino.
          </p>
          <Button asChild className="mt-6 rounded bg-primary text-primary-foreground hover:bg-brand-beige hover:text-brand-black">
            <Link to="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    </DomAldinoShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <DomAldinoShell>
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-28">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">Dom Aldino</p>
          <h1 className="mt-3 font-display text-4xl gold-emboss">Esta página não carregou</h1>
          <p className="mt-4 text-sm text-brand-beige/70">
            Tente novamente ou volte para a página inicial da loja.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              className="rounded bg-primary text-primary-foreground hover:bg-brand-beige hover:text-brand-black"
              onClick={() => {
                router.invalidate();
                reset();
              }}
            >
              Tentar novamente
            </Button>
            <Button asChild variant="outline" className="rounded border-brand-gold/50 bg-transparent text-brand-gold hover:bg-brand-wood hover:text-brand-beige">
              <Link to="/">Voltar ao início</Link>
            </Button>
          </div>
        </div>
      </div>
    </DomAldinoShell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <DomAldinoShell>
        <Outlet />
      </DomAldinoShell>
    </QueryClientProvider>
  );
}
