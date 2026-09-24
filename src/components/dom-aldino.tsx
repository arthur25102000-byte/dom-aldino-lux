import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Barrel,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Pause,
  Play,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  Truck,
  Wine,
  X,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ALL_CATEGORIES,
  FEATURED_LIMIT,
  brand,
  categories,
  formatCurrency,
  getProduct,
  heroSlides,
  products,
  searchProducts,
  story,
  type CartItem,
  type CartLine,
  type Picture,
  type Product,
  whatsappCheckoutUrl,
} from "@/lib/dom-aldino-data";
import { cn } from "@/lib/utils";

const CART_KEY = "dom-aldino-cart";
const AGE_KEY = "dom-aldino-age-ok";

function readStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Navegação privada ou armazenamento bloqueado: o carrinho vale só para esta visita.
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

type Toast = { id: number; name: string; quantity: number };

const CartContext = createContext<{
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
} | null>(null);

export function DomAldinoShell({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(readStorage(CART_KEY) ?? "[]") as CartLine[];
      // Aceita também o formato antigo (produto inteiro); descarta produtos que saíram do catálogo.
      setLines(
        saved
          .filter((line) => getProduct(line.slug) && line.quantity > 0)
          .map((line) => ({ slug: line.slug, quantity: line.quantity })),
      );
    } catch {
      setLines([]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeStorage(CART_KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(id);
  }, [toast]);

  const value = useMemo(() => {
    const items = lines.flatMap((line) => {
      const product = getProduct(line.slug);
      return product ? [{ ...product, quantity: line.quantity }] : [];
    });
    return {
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addItem: (product: Product, quantity = 1) => {
        setLines((current) =>
          current.some((line) => line.slug === product.slug)
            ? current.map((line) =>
                line.slug === product.slug ? { ...line, quantity: line.quantity + quantity } : line,
              )
            : [...current, { slug: product.slug, quantity }],
        );
        setToast({ id: Date.now(), name: product.name, quantity });
      },
      removeItem: (slug: string) =>
        setLines((current) => current.filter((line) => line.slug !== slug)),
      updateQuantity: (slug: string, quantity: number) =>
        setLines((current) =>
          current.map((line) =>
            line.slug === slug ? { ...line, quantity: Math.max(1, quantity) } : line,
          ),
        ),
      clear: () => setLines([]),
      openCart: () => setCartOpen(true),
    };
  }, [lines]);

  return (
    <CartContext.Provider value={value}>
      <div className="min-h-screen overflow-x-clip bg-background text-foreground leather-texture">
        <a
          href="#conteudo"
          className="sr-only z-[90] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <AgeGate />
        <SiteHeader onOpenCart={() => setCartOpen(true)} />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
        <CartToast
          toast={toast}
          onOpenCart={() => {
            setToast(null);
            setCartOpen(true);
          }}
        />
        <FloatingWhatsApp />
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside DomAldinoShell");
  return context;
}

/** Imagem responsiva: o navegador escolhe entre a versão pequena e a grande conforme a largura exibida. */
export function Photo({
  picture,
  alt,
  sizes,
  className,
  priority = false,
}: {
  picture: Picture;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={picture.src}
      srcSet={picture.srcSet}
      sizes={sizes}
      alt={alt}
      width={picture.width}
      height={picture.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={className}
    />
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center rounded"
      aria-label="Dom Aldino, página inicial"
    >
      <img
        src={brand.logoUrl}
        alt=""
        className={cn("h-12 w-auto object-contain sm:h-14", className)}
        width={350}
        height={283}
      />
    </Link>
  );
}

function AgeGate() {
  const [status, setStatus] = useState<"checking" | "accepted" | "blocked" | "pending">("checking");

  useEffect(() => {
    setStatus(readStorage(AGE_KEY) === "yes" ? "accepted" : "pending");
  }, []);

  if (status === "checking" || status === "accepted") return null;

  return (
    <DialogPrimitive.Root open modal>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="glass fixed inset-0 z-[80] bg-brand-black/90 backdrop-blur-md" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-[81] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border border-line-strong bg-brand-black px-6 py-10 text-center shadow-[0_24px_80px_-24px_rgb(0_0_0/0.9)] outline-none sm:px-10"
          onEscapeKeyDown={(event) => event.preventDefault()}
          onPointerDownOutside={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <img
            src={brand.logoUrl}
            alt="Dom Aldino"
            className="mx-auto h-24 w-auto"
            width={350}
            height={283}
          />
          {status === "blocked" ? (
            <>
              <DialogPrimitive.Title className="mt-6 font-display text-3xl gold-emboss">
                Volte quando fizer 18 anos
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-4 text-body">
                A venda de bebidas alcoólicas é proibida para menores de 18 anos.
              </DialogPrimitive.Description>
              <Button
                type="button"
                variant="outline"
                className="mt-7"
                onClick={() => setStatus("pending")}
              >
                Voltar
              </Button>
            </>
          ) : (
            <>
              <DialogPrimitive.Title className="mt-6 font-display text-3xl gold-emboss">
                Você tem 18 anos ou mais?
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-4 text-body">
                Confirme sua idade para entrar na loja Dom Aldino.
              </DialogPrimitive.Description>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  autoFocus
                  onClick={() => {
                    writeStorage(AGE_KEY, "yes");
                    setStatus("accepted");
                  }}
                >
                  Sim, tenho
                </Button>
                <Button type="button" variant="outline" onClick={() => setStatus("blocked")}>
                  Não tenho
                </Button>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

const NAV_LINKS = [
  ["Início", "/"],
  ["Loja", "/loja"],
  ["Categorias", "/categorias"],
  ["Nossa História", "/nossa-historia"],
  ["Contato", "/contato"],
] as const;

function SiteHeader({ onOpenCart }: { onOpenCart: () => void }) {
  const { count } = useCart();

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line bg-brand-black/85 backdrop-blur-md">
      <div className="bg-brand-wood">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[0.7rem] uppercase tracking-caps text-brand-beige sm:px-6">
          <span className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" /> Enviamos para todo
            o Brasil
          </span>
          <a
            className="hidden items-center gap-2 hover:text-brand-gold sm:flex"
            href={`https://wa.me/${brand.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" />
            {brand.phone}
          </a>
        </div>
      </div>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <LogoMark />
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className="relative flex min-h-11 items-center px-3 text-xs font-medium uppercase tracking-caps text-brand-beige/85 transition-colors hover:text-brand-gold data-[status=active]:text-brand-gold after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand-gold after:transition-transform after:duration-300 data-[status=active]:after:scale-x-100"
              activeOptions={{ exact: to === "/" }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <SearchPanel />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={
              count > 0
                ? `Abrir carrinho, ${count} ${count === 1 ? "item" : "itens"}`
                : "Abrir carrinho, vazio"
            }
            onClick={onOpenCart}
          >
            <ShoppingBag className="!size-5" aria-hidden="true" />
            {count > 0 ? (
              <span
                key={count}
                className="cart-bump tabular absolute right-0.5 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.68rem] font-semibold text-primary-foreground"
                aria-hidden="true"
              >
                {count}
              </span>
            ) : null}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="!size-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85%] border-line-strong bg-brand-black text-brand-beige sm:max-w-sm"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="font-display text-2xl text-brand-gold">Menu</SheetTitle>
                <SheetDescription className="sr-only">Páginas da loja Dom Aldino</SheetDescription>
              </SheetHeader>
              <nav aria-label="Principal" className="mt-6 grid">
                {NAV_LINKS.map(([label, to]) => (
                  <SheetClose asChild key={to}>
                    <Link
                      to={to}
                      activeOptions={{ exact: to === "/" }}
                      className="border-b border-line py-4 font-display text-xl text-brand-beige transition-colors hover:text-brand-gold data-[status=active]:text-brand-gold"
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <a
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 flex items-center gap-3 py-2 text-sm text-body hover:text-brand-gold"
              >
                <MessageCircle className="h-5 w-5 text-brand-gold" aria-hidden="true" />{" "}
                {brand.phone}
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function SearchPanel() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchProducts(query).slice(0, 8), [query]);
  const suggestions = ["Carvalho", "Amburana", "Blend", "Kit"];

  return (
    <Sheet
      onOpenChange={(open) => {
        if (!open) setQuery("");
      }}
    >
      <SheetTrigger asChild>
        <Button type="button" variant="ghost" size="icon" aria-label="Buscar cachaças">
          <Search className="!size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          inputRef.current?.focus();
        }}
        className="max-h-[85dvh] overflow-y-auto border-line-strong bg-brand-black px-4 pb-8 pt-6 text-brand-beige sm:px-6"
      >
        <div className="mx-auto max-w-3xl">
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-2xl text-brand-gold">Buscar</SheetTitle>
            <SheetDescription className="sr-only">
              Digite o nome, a madeira ou a categoria da cachaça.
            </SheetDescription>
          </SheetHeader>
          <label htmlFor="busca" className="sr-only">
            Nome, madeira ou categoria
          </label>
          <div className="relative mt-5">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-gold"
              aria-hidden="true"
            />
            <input
              id="busca"
              ref={inputRef}
              type="search"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ex.: carvalho francês, amburana, kit"
              className="min-h-13 w-full appearance-none rounded border border-line-strong bg-brand-smoke pl-12 pr-14 text-base text-brand-beige placeholder:text-subtle focus-visible:border-brand-gold [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query ? (
              <button
                type="button"
                className="press absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-subtle hover:text-brand-gold"
                aria-label="Limpar busca"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
          {query.trim() === "" ? (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-subtle">
              <span>Sugestões:</span>
              {suggestions.map((term) => (
                <button
                  key={term}
                  type="button"
                  className="press min-h-11 rounded border border-line-strong px-4 text-brand-beige hover:border-brand-gold hover:text-brand-gold"
                  onClick={() => setQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-5" aria-live="polite">
              <p className="text-sm text-subtle">
                {results.length === 0
                  ? `Nenhuma cachaça encontrada para “${query.trim()}”.`
                  : `${results.length} ${results.length === 1 ? "resultado" : "resultados"}`}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {results.map((product) => (
                  <li key={product.slug}>
                    <SheetClose asChild>
                      <Link
                        to="/produto/$slug"
                        params={{ slug: product.slug }}
                        className="flex items-center gap-4 rounded border border-transparent p-2 transition-colors hover:border-line-strong hover:bg-brand-wood/60"
                      >
                        <Photo
                          picture={product.image}
                          alt=""
                          sizes="56px"
                          className="h-18 w-14 shrink-0 object-cover"
                        />
                        <span className="min-w-0">
                          <span className="block font-display text-lg leading-tight text-brand-gold">
                            {product.name}
                          </span>
                          <span className="block text-sm text-subtle">
                            {product.category} ·{" "}
                            <span className="tabular">{formatCurrency(product.price)}</span>
                          </span>
                        </span>
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-line-strong bg-brand-black p-0 text-brand-beige sm:max-w-md"
      >
        <SheetHeader className="border-b border-line px-6 pb-5 pt-6 text-left">
          <SheetTitle className="font-display text-2xl text-brand-gold">Carrinho</SheetTitle>
          <SheetDescription className="text-sm text-subtle">
            O pedido é finalizado pelo WhatsApp.
          </SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-brand-gold/70" aria-hidden="true" />
            <p className="mt-4 font-display text-xl text-brand-beige">Seu carrinho está vazio</p>
            <p className="mt-2 text-sm text-subtle">
              Escolha uma cachaça na loja e ela aparece aqui.
            </p>
            <SheetClose asChild>
              <Button asChild className="mt-6">
                <Link to="/loja">Ver a loja</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <li
                  key={item.slug}
                  className="grid grid-cols-[64px_1fr] gap-4 border-b border-line pb-5"
                >
                  <Photo
                    picture={item.image}
                    alt=""
                    sizes="64px"
                    className="h-[85px] w-16 object-cover"
                  />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display text-lg leading-snug text-brand-gold">
                        {item.name}
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="-mr-2 -mt-2 shrink-0 text-subtle hover:text-brand-gold"
                        onClick={() => removeItem(item.slug)}
                        aria-label={`Remover ${item.name} do carrinho`}
                      >
                        <Trash2 aria-hidden="true" />
                      </Button>
                    </div>
                    <p className="text-sm text-subtle">
                      {item.volume} · {item.alcohol}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <QuantityControl
                        label={item.name}
                        quantity={item.quantity}
                        setQuantity={(quantity) => updateQuantity(item.slug, quantity)}
                      />
                      <span className="tabular font-semibold text-brand-gold">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 pb-6 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="text-body">Subtotal</span>
                <strong className="tabular font-display text-2xl text-brand-gold">
                  {formatCurrency(subtotal)}
                </strong>
              </div>
              <p className="mt-2 text-sm text-subtle">
                {brand.shipping}: o valor do envio é combinado na conversa.
              </p>
              <Button asChild size="lg" className="mt-5 w-full">
                <a href={whatsappCheckoutUrl(items)} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" /> Finalizar pelo WhatsApp
                </a>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartToast({ toast, onOpenCart }: { toast: Toast | null; onOpenCart: () => void }) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4 lg:bottom-6"
    >
      {toast ? (
        <div
          key={toast.id}
          className="hero-in pointer-events-auto flex w-full max-w-md items-center gap-4 border border-line-strong bg-brand-smoke py-2 pl-5 pr-2 shadow-[0_18px_50px_-18px_rgb(0_0_0/0.9)]"
        >
          <p className="min-w-0 flex-1 text-sm text-brand-beige">
            <span className="text-brand-gold">{toast.name}</span>
            {toast.quantity > 1 ? ` (${toast.quantity})` : ""} foi para o carrinho.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-11 shrink-0"
            onClick={onOpenCart}
          >
            Ver carrinho
          </Button>
        </div>
      ) : null}
    </div>
  );
}

const HERO_INTERVAL = 7000;

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [holding, setHolding] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const count = heroSlides.length;
  const playing = !paused && !holding && !reducedMotion && count > 1;
  const slide = heroSlides[active] ?? heroSlides[0];

  const go = useCallback((index: number) => setActive((index + count) % count), [count]);

  // Carrega as outras fotos só depois da primeira, para não disputar banda com ela.
  useEffect(() => {
    const id = window.setTimeout(() => setShowAll(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  // O temporizador reinicia a cada troca, inclusive as feitas pelo visitante.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => go(active + 1), HERO_INTERVAL);
    return () => window.clearTimeout(id);
  }, [active, playing, go]);

  if (!slide) return null;

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques Dom Aldino"
      className="relative flex min-h-[88svh] touch-pan-y select-none flex-col overflow-hidden pt-[6.5rem]"
      onMouseEnter={() => setHolding(true)}
      onMouseLeave={() => setHolding(false)}
      onFocus={() => setHolding(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHolding(false);
      }}
      onPointerDown={(event) => {
        if (event.pointerType !== "mouse")
          pointerStart.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        const start = pointerStart.current;
        pointerStart.current = null;
        if (!start) return;
        const dx = event.clientX - start.x;
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(event.clientY - start.y))
          go(active + (dx < 0 ? 1 : -1));
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
      }}
    >
      <h1 className="sr-only">Dom Aldino, cachaça premium artesanal</h1>
      {heroSlides.map((item, index) =>
        index === 0 || showAll ? (
          <Photo
            key={item.title}
            picture={item.image}
            alt={index === active ? item.alt : ""}
            sizes="100vw"
            priority={index === 0}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out",
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null,
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/75 to-brand-black/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-16 sm:px-6">
        <div
          key={active}
          role="group"
          aria-roledescription="slide"
          aria-label={`${active + 1} de ${count}`}
          aria-live={playing ? "off" : "polite"}
          className="hero-in max-w-2xl"
        >
          <p className="font-display text-[2.6rem] font-bold leading-[1.05] gold-emboss sm:text-6xl lg:text-7xl">
            {slide.title}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">{slide.subtitle}</p>
          <Button asChild size="lg" className="mt-9">
            <Link to="/loja" search={slide.search ?? {}}>
              {slide.cta}
            </Link>
          </Button>
        </div>
      </div>

      {count > 1 ? (
        <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center gap-1 px-4 pb-6 sm:px-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => go(active - 1)}
            aria-label="Slide anterior"
          >
            <ChevronLeft className="!size-5" aria-hidden="true" />
          </Button>
          {heroSlides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className="group flex h-11 w-12 cursor-pointer items-center"
              aria-label={`Ir para o slide ${index + 1}: ${item.title}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => go(index)}
            >
              <span className="relative h-0.5 w-full overflow-hidden bg-brand-beige/25 group-hover:bg-brand-beige/45">
                {index === active ? (
                  <span
                    key={`${active}-${playing}`}
                    className="absolute inset-0 origin-left bg-brand-gold"
                    style={
                      playing
                        ? { animation: `hero-progress ${HERO_INTERVAL}ms linear both` }
                        : undefined
                    }
                  />
                ) : null}
              </span>
            </button>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => go(active + 1)}
            aria-label="Próximo slide"
          >
            <ChevronRight className="!size-5" aria-hidden="true" />
          </Button>
          {!reducedMotion ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setPaused((value) => !value)}
              aria-label={
                paused
                  ? "Retomar troca automática dos slides"
                  : "Pausar troca automática dos slides"
              }
            >
              {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            </Button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export function SectionTitle({
  title,
  text,
  as: Heading = "h2",
}: {
  title: string;
  text?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <div className="flex items-center justify-center gap-4 text-brand-gold/80" aria-hidden="true">
        <Flourish className="h-6 w-20" />
        <span className="h-2 w-2 rotate-45 border border-brand-gold" />
        <Flourish className="h-6 w-20 -scale-x-100" />
      </div>
      <Heading className="mt-5 font-display text-4xl font-bold leading-[1.1] gold-emboss sm:text-5xl">
        {title}
      </Heading>
      {text ? <p className="mt-5 text-body sm:text-lg">{text}</p> : null}
    </div>
  );
}

/**
 * Revela os filhos com escalonamento quando entram na tela. Só esconde o que o observador confirma
 * estar fora da tela; sem JavaScript (ou já visível ao carregar), tudo aparece normalmente.
 */
function useStaggerReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const children = Array.from(root.children) as HTMLElement[];
    let first = true;
    const show = () => children.forEach((child) => delete child.dataset["reveal"]);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (first && !visible) {
        children.forEach((child, index) => {
          child.classList.add("reveal");
          child.style.transitionDelay = `${index * 80}ms`;
          child.dataset["reveal"] = "hidden";
        });
      } else if (visible) {
        show();
        observer.disconnect();
      }
      first = false;
    });
    observer.observe(root);
    return () => {
      observer.disconnect();
      show();
    };
  }, []);
  return ref;
}

export function CategoryGrid() {
  const ref = useStaggerReveal<HTMLUListElement>();
  return (
    <ul ref={ref} className="flex flex-wrap justify-center gap-x-4 gap-y-8 sm:gap-x-6">
      {categories.map((category) => (
        <li
          key={category.name}
          className="w-[calc((100%-1rem)/2)] sm:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-6rem)/5)]"
        >
          <Link
            to="/loja"
            search={category.name === ALL_CATEGORIES ? {} : { categoria: category.name }}
            className="group block rounded-t-full text-center"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-t-full border border-line-strong bg-brand-wood p-1.5 transition-colors duration-300 group-hover:border-brand-gold">
              <Photo
                picture={category.image}
                alt=""
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                className="motion-zoom h-full w-full rounded-t-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <span className="mt-4 block font-display text-xl text-brand-gold transition-colors group-hover:text-brand-gold-soft">
              {category.name === ALL_CATEGORIES ? "Todas as cachaças" : category.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ProductCarousel({ title, kind }: { title: string; kind: "featured" | "launch" }) {
  const list =
    kind === "featured"
      ? products.filter((product) => product.featured).slice(0, FEATURED_LIMIT)
      : products.filter((product) => product.launch);
  if (list.length === 0) return null;
  return (
    <section className="py-12" aria-labelledby={`vitrine-${kind}`}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 id={`vitrine-${kind}`} className="font-display text-3xl text-brand-gold sm:text-4xl">
          {title}
        </h2>
        <Button asChild variant="outline" className="hidden sm:inline-flex">
          <Link to="/loja">Ver loja</Link>
        </Button>
      </div>
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
        {list.map((product) => (
          <li key={product.slug} className="w-[72%] shrink-0 snap-start sm:w-auto">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addItem } = useCart();
  return (
    <article className="group flex h-full flex-col border border-line bg-card transition-colors duration-300 hover:border-line-accent">
      <Link
        to="/produto/$slug"
        params={{ slug: product.slug }}
        tabIndex={-1}
        aria-hidden="true"
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-black">
          <Photo
            picture={product.image}
            alt=""
            priority={priority}
            sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
            className="motion-zoom h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 border border-brand-gold bg-brand-black/85 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-label text-brand-gold">
              {product.badge}
            </span>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="font-display text-lg leading-tight sm:text-2xl">
          <Link
            to="/produto/$slug"
            params={{ slug: product.slug }}
            className="rounded text-brand-gold transition-colors hover:text-brand-gold-soft"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-subtle sm:mt-2">
          {product.name.includes(product.wood)
            ? product.volume
            : `${product.wood} · ${product.volume}`}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3 sm:pt-5">
          <p className="tabular text-xl font-semibold text-brand-gold sm:text-2xl">
            {product.oldPrice ? (
              <span className="mr-2 text-base font-normal text-subtle line-through">
                {formatCurrency(product.oldPrice)}
              </span>
            ) : null}
            {formatCurrency(product.price)}
          </p>
        </div>
        <Button
          type="button"
          className="mt-3 w-full px-3 sm:mt-4"
          onClick={() => addItem(product)}
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          <ShoppingBag aria-hidden="true" /> Adicionar
          <span className="hidden sm:inline"> ao carrinho</span>
        </Button>
      </div>
    </article>
  );
}

export function Differentials() {
  const items: Array<[typeof Wine, string]> = [
    [Wine, "Produção artesanal"],
    [Barrel, "Barris de 20 a 200 litros"],
    [Truck, "Envio para todo o Brasil"],
    [MessageCircle, "Atendimento pelo WhatsApp"],
  ];
  return (
    <section aria-label="Diferenciais" className="border-y border-line bg-brand-wood/70 py-8">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-6 px-4 sm:px-6 lg:grid-cols-4">
        {items.map(([Icon, label]) => (
          <li key={label} className="flex items-center gap-3">
            <Icon
              className="h-8 w-8 shrink-0 text-brand-gold"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-xs font-medium uppercase leading-snug tracking-label text-brand-beige">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StorySection() {
  return (
    <section
      aria-labelledby="historia-titulo"
      className="bg-brand-black pb-20 pt-8 sm:pb-28 sm:pt-12"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-stretch lg:gap-16">
        <figure className="relative min-h-[360px] overflow-hidden border border-line">
          <Photo
            picture={story.image}
            alt="Garrafa Dom Aldino Barril de Carvalho e copo sobre a mesa, diante de barris da marca e alambiques de cobre"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-transparent to-transparent"
            aria-hidden="true"
          />
          <figcaption className="absolute bottom-6 left-6 right-6">
            <span className="block font-display text-2xl text-brand-gold">Desde 2023</span>
            <span className="text-sm text-body">Do barzinho na sala aos barris de 200 litros</span>
          </figcaption>
        </figure>
        <div className="flex flex-col justify-center">
          <h2
            id="historia-titulo"
            className="font-display text-4xl font-bold leading-[1.1] gold-emboss sm:text-5xl"
          >
            Como nasceu a Dom Aldino
          </h2>
          <div className="mt-7 max-w-[62ch] space-y-5 text-body">
            {story.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div>
            <Button asChild className="mt-9">
              <Link to="/nossa-historia">Ler a história completa</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FollowUs() {
  return (
    <section
      aria-labelledby="acompanhe-titulo"
      className="border-y border-line bg-brand-wood py-16"
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2
          id="acompanhe-titulo"
          className="font-display text-3xl font-bold text-brand-gold sm:text-4xl"
        >
          Acompanhe a Dom Aldino
        </h2>
        <p className="mt-4 text-body">
          As novidades aparecem no Instagram {brand.instagram}. Para encomendas e dúvidas, fale com
          a gente pelo WhatsApp.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Falar no WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer">
              <Instagram aria-hidden="true" /> Seguir no Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const link = "inline-flex min-h-8 items-center gap-2 hover:text-brand-gold";
  return (
    <footer className="bg-brand-black pb-28 pt-14 text-brand-beige lg:pb-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.1fr]">
        <div>
          <LogoMark />
          <p className="mt-4 max-w-xs text-sm text-body">{brand.slogan}.</p>
          <p className="mt-5 max-w-xs text-xs uppercase leading-relaxed tracking-label text-brand-gold">
            Aprecie com moderação. Venda proibida para menores de 18 anos.
          </p>
        </div>
        <nav aria-labelledby="rodape-paginas">
          <h2
            id="rodape-paginas"
            className="text-xs font-semibold uppercase tracking-caps text-brand-gold"
          >
            Páginas
          </h2>
          <ul className="mt-4 grid gap-1 text-sm text-body">
            {NAV_LINKS.slice(1).map(([label, to]) => (
              <li key={to}>
                <Link to={to} className={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-caps text-brand-gold">
            Pagamento e envio
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm text-body">
            {brand.payments.map((item) => (
              <li key={item} className="border border-line px-3 py-1.5">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-subtle">{brand.shipping}, para todo o Brasil.</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-caps text-brand-gold">Contato</h2>
          <ul className="mt-4 grid gap-1 text-sm text-body">
            <li>
              <a
                className={link}
                href={`https://wa.me/${brand.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4 text-brand-gold" aria-hidden="true" /> Porto Velho
                · {brand.phone}
              </a>
            </li>
            <li>
              <a
                className={link}
                href={`https://wa.me/${brand.branch.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4 text-brand-gold" aria-hidden="true" /> Goiânia ·{" "}
                {brand.branch.phone}
              </a>
            </li>
            <li>
              <a className={cn(link, "break-all")} href={`mailto:${brand.email}`}>
                <Mail className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden="true" />{" "}
                {brand.email}
              </a>
            </li>
            <li>
              <a className={link} href={brand.instagramUrl} target="_blank" rel="noreferrer">
                <Instagram className="h-4 w-4 text-brand-gold" aria-hidden="true" />{" "}
                {brand.instagram}
              </a>
            </li>
            <li>
              <a className={link} href={brand.facebookUrl} target="_blank" rel="noreferrer">
                <Facebook className="h-4 w-4 text-brand-gold" aria-hidden="true" /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const onProductPage = useRouterState({
    select: (state) => state.location.pathname.startsWith("/produto/"),
  });
  return (
    <aside aria-label="Atendimento">
      <a
        href={`https://wa.me/${brand.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar com a Dom Aldino no WhatsApp"
        className={cn(
          "press fixed bottom-5 right-4 z-40 h-13 w-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-8px_rgb(0_0_0/0.8)] hover:bg-brand-gold-soft sm:right-6",
          onProductPage ? "hidden lg:flex" : "flex",
        )}
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>
    </aside>
  );
}

export function QuantityControl({
  quantity,
  setQuantity,
  label,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
  label?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label ? `Quantidade de ${label}` : "Quantidade"}
      className="inline-flex items-center border border-line-strong"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-none"
        onClick={() => setQuantity(quantity - 1)}
        disabled={quantity <= 1}
        aria-label="Diminuir quantidade"
      >
        <Minus aria-hidden="true" />
      </Button>
      <span className="tabular w-9 text-center font-semibold" aria-live="polite">
        {quantity}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-none"
        onClick={() => setQuantity(quantity + 1)}
        aria-label="Aumentar quantidade"
      >
        <Plus aria-hidden="true" />
      </Button>
    </div>
  );
}

export function ProductTabs({ product }: { product: Product }) {
  const notes = [
    ["Aroma", product.tasting?.aroma],
    ["Sabor", product.tasting?.flavor],
    ["Final", product.tasting?.finish],
  ].filter((note): note is [string, string] => Boolean(note[1]));
  const tabs: Array<[string, string]> = [
    ["descricao", "Descrição"],
    ...(notes.length ? [["notas", "Degustação"] as [string, string]] : []),
    ...(product.pairing ? [["harmonizacao", "Harmonização"] as [string, string]] : []),
    ["ficha", "Ficha técnica"],
  ];
  const panel = "mt-0 border border-t-0 border-line bg-brand-black/50 p-6 text-body";
  return (
    <Tabs defaultValue="descricao" className="mt-12">
      <TabsList className="no-scrollbar flex h-auto w-full justify-start overflow-x-auto rounded-none border-b border-line-strong bg-transparent p-0">
        {tabs.map(([value, label]) => (
          <TabsTrigger
            key={value}
            value={value}
            className="min-h-11 shrink-0 rounded-none border-b-2 border-transparent px-4 text-sm text-subtle data-[state=active]:border-brand-gold data-[state=active]:bg-transparent data-[state=active]:text-brand-gold data-[state=active]:shadow-none"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="descricao" className={cn(panel, "space-y-4")}>
        {product.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </TabsContent>
      {notes.length ? (
        <TabsContent value="notas" className={panel}>
          <dl className="space-y-5">
            {notes.map(([title, text]) => (
              <div key={title}>
                <dt className="font-display text-xl text-brand-gold">{title}</dt>
                <dd className="mt-1">{text}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>
      ) : null}
      {product.pairing ? (
        <TabsContent value="harmonizacao" className={panel}>
          {product.pairing}
        </TabsContent>
      ) : null}
      <TabsContent value="ficha" className={panel}>
        <dl className="grid gap-x-8 sm:grid-cols-2">
          {product.specs.map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4 border-b border-line py-3">
              <dt className="text-subtle">{key}</dt>
              <dd className="text-right font-medium text-brand-beige">{value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>
    </Tabs>
  );
}

function Flourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 16c20 0 18-13 33-13 10 0 12 10 2 12-7 1-14-3-9-9 7 21 28 22 43 7 10-10 24-11 45 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M58 21c8 0 10 4 13 7 3-8 10-9 18-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { ALL_CATEGORIES, brand, categories, products, formatCurrency, getProduct };
