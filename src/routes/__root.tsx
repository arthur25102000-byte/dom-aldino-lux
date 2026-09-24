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
          <p className="font-display text-7xl font-bold gold-emboss" aria-hidden="true">
            404
          </p>
          <h1 className="mt-4 font-display text-3xl text-brand-beige">
            Esta página não foi encontrada
          </h1>
          <p className="mt-3 text-body">
            O endereço pode ter mudado ou não existir na loja Dom Aldino.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/loja">Ver a loja</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Voltar ao início</Link>
            </Button>
          </div>
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
          <h1 className="font-display text-4xl font-bold gold-emboss">Esta página não carregou</h1>
          <p className="mt-4 text-body">Tente novamente ou volte para a página inicial da loja.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button
              type="button"
              onClick={() => {
                router.invalidate();
                reset();
              }}
            >
              Tentar novamente
            </Button>
            <Button asChild variant="outline">
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
      { name: "theme-color", content: "#141414" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Jost:wght@400..600&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap",
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
