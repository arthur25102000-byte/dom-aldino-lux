import { Link } from "@tanstack/react-router";
import {
  Award,
  Barrel,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Facebook,
  Filter,
  Gift,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  UserRound,
  Wine,
} from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
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
import { ALL_CATEGORIES, FEATURED_LIMIT, brand, categories, formatCurrency, getProduct, heroSlides, products, story, type CartItem, type Product, whatsappCheckoutUrl } from "@/lib/dom-aldino-data";
import { cn } from "@/lib/utils";

const CartContext = createContext<{
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
} | null>(null);

export function DomAldinoShell({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("dom-aldino-cart");
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("dom-aldino-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      items,
      count,
      subtotal,
      addItem: (product: Product, quantity = 1) => {
        setItems((current) => {
          const existing = current.find((item) => item.slug === product.slug);
          if (existing) {
            return current.map((item) =>
              item.slug === product.slug ? { ...item, quantity: item.quantity + quantity } : item,
            );
          }
          return [...current, { ...product, quantity }];
        });
        setCartOpen(true);
      },
      removeItem: (slug: string) => setItems((current) => current.filter((item) => item.slug !== slug)),
      updateQuantity: (slug: string, quantity: number) => {
        setItems((current) =>
          current
            .map((item) => (item.slug === slug ? { ...item, quantity: Math.max(1, quantity) } : item))
            .filter((item) => item.quantity > 0),
        );
      },
      clear: () => setItems([]),
    };
  }, [items]);

  return (
    <CartContext.Provider value={value}>
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground leather-texture">
        <AgeGate />
        <SiteHeader onOpenCart={() => setCartOpen(true)} />
        <main>{children}</main>
        <SiteFooter />
        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
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

export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Dom Aldino - início">
      <img
        src={brand.logoUrl}
        alt="Logo Dom Aldino"
        className={cn("h-14 w-auto object-contain drop-shadow-lg", compact ? "h-11" : "sm:h-16")}
        width={240}
        height={112}
      />
    </Link>
  );
}

function AgeGate() {
  const [status, setStatus] = useState<"checking" | "accepted" | "blocked" | "pending">("checking");

  useEffect(() => {
    const saved = window.localStorage.getItem("dom-aldino-age-ok");
    setStatus(saved === "yes" ? "accepted" : "pending");
  }, []);

  if (status === "checking" || status === "accepted") return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-brand-black/95 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md border border-brand-gold/40 bg-brand-black p-8 text-center shadow-2xl shadow-brand-gold/10">
        <Crown className="mx-auto mb-4 h-10 w-10 text-brand-gold" aria-hidden="true" />
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center border border-brand-gold text-brand-gold">
          <span className="font-display text-3xl">DA</span>
        </div>
        {status === "blocked" ? (
          <>
            <h2 className="font-display text-3xl gold-emboss">Acesso bloqueado</h2>
            <p className="mt-4 text-sm leading-6 text-brand-beige/80">
              A venda de bebidas alcoólicas é proibida para menores de 18 anos.
            </p>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Cachaça Premium Artesanal</p>
            <h2 className="mt-3 font-display text-3xl gold-emboss">Você tem 18 anos ou mais?</h2>
            <p className="mt-4 text-sm leading-6 text-brand-beige/80">
              Confirme sua idade para acessar a loja Dom Aldino.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Button
                type="button"
                className="rounded bg-primary text-primary-foreground hover:bg-brand-olive hover:text-brand-beige"
                onClick={() => {
                  window.localStorage.setItem("dom-aldino-age-ok", "yes");
                  setStatus("accepted");
                }}
              >
                Sim, tenho
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded border-brand-gold/50 bg-transparent text-brand-beige hover:bg-brand-wood hover:text-brand-beige"
                onClick={() => setStatus("blocked")}
              >
                Não
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SiteHeader({ onOpenCart }: { onOpenCart: () => void }) {
  const { count } = useCart();
  const links = [
    ["Início", "/"],
    ["Loja", "/loja"],
    ["Categorias", "/categorias"],
    ["Nossa História", "/nossa-historia"],
    ["Contato", "/contato"],
  ] as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-gold/20 bg-brand-black/90 backdrop-blur-md">
      <div className="bg-brand-wood text-brand-beige">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] sm:px-6">
          <span>Frete para todo o Brasil</span>
          <a className="hidden items-center gap-2 sm:flex" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">
            <Phone className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" />
            {brand.phone}
          </a>
        </div>
      </div>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <LogoMark compact />
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-beige/80 transition-colors hover:text-brand-gold"
              activeProps={{ className: "text-brand-gold" }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-brand-gold">
          <IconButton label="Buscar">
            <Search className="h-5 w-5" />
          </IconButton>
          <IconButton label="Conta" className="hidden sm:inline-flex">
            <UserRound className="h-5 w-5" />
          </IconButton>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative rounded text-brand-gold hover:bg-brand-wood hover:text-brand-gold"
            aria-label="Abrir carrinho"
            onClick={onOpenCart}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground">
              {count}
            </span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded text-brand-gold hover:bg-brand-wood hover:text-brand-gold lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-brand-gold/30 bg-brand-black text-brand-beige">
              <SheetHeader>
                <SheetTitle className="text-brand-gold">Dom Aldino</SheetTitle>
                <SheetDescription className="text-brand-beige/70">Cachaça Premium Artesanal</SheetDescription>
              </SheetHeader>
              <div className="mt-8 grid gap-2">
                {links.map(([label, to]) => (
                  <SheetClose asChild key={to}>
                    <Link
                      to={to}
                      className="border-b border-brand-gold/15 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-brand-beige"
                    >
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function IconButton({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("rounded text-brand-gold hover:bg-brand-wood hover:text-brand-gold", className)}
      aria-label={label}
      title={label}
    >
      {children}
    </Button>
  );
}

function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const checkoutUrl = whatsappCheckoutUrl(items);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full border-brand-gold/30 bg-brand-black text-brand-beige sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-brand-gold">Carrinho</SheetTitle>
          <SheetDescription className="text-brand-beige/70">Finalize seu pedido pelo WhatsApp.</SheetDescription>
        </SheetHeader>
        <div className="mt-8 flex h-[calc(100vh-12rem)] flex-col">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center text-brand-beige/70">
              <ShoppingBag className="mb-4 h-12 w-12 text-brand-gold" />
              <p>Seu carrinho está vazio.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-auto pr-2">
                {items.map((item) => (
                  <div key={item.slug} className="grid grid-cols-[72px_1fr] gap-4 border-b border-brand-gold/15 pb-4">
                    <img src={item.image} alt={item.name} className="h-20 w-18 object-cover" loading="lazy" width={72} height={80} />
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display text-lg text-brand-gold">{item.name}</p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded text-brand-beige/70 hover:bg-brand-wood hover:text-brand-gold"
                          onClick={() => removeItem(item.slug)}
                          aria-label={`Remover ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-beige/55">{item.volume} · {item.alcohol}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <QuantityControl quantity={item.quantity} setQuantity={(qty) => updateQuantity(item.slug, qty)} />
                        <span className="font-semibold text-brand-gold">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-brand-gold/25 pt-5">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-brand-gold">
                  <Truck className="h-4 w-4" aria-hidden="true" /> {brand.shipping}
                </p>
                <p className="mt-2 text-sm text-brand-beige/65">Enviamos para todo o Brasil. O valor do frete é combinado pelo WhatsApp.</p>
                <div className="mt-5 flex items-center justify-between text-lg">
                  <span>Subtotal</span>
                  <strong className="text-brand-gold">{formatCurrency(subtotal)}</strong>
                </div>
                <Button asChild className="mt-5 w-full rounded bg-primary text-primary-foreground hover:bg-brand-olive hover:text-brand-beige">
                  <a href={checkoutUrl} target="_blank" rel="noreferrer">Finalizar pelo WhatsApp</a>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const activeSlide = heroSlides[active] ?? heroSlides[0];

  useEffect(() => {
    const id = window.setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(id);
  }, []);

  if (!activeSlide) return null;

  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-28">
      {heroSlides.map((slide, index) => (
        <img
          key={slide.title}
          src={slide.image}
          alt={slide.title}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            index === active ? "opacity-100" : "opacity-0",
          )}
          width={1920}
          height={1080}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/78 to-brand-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/30" />
      <div className="relative z-10 mx-auto flex min-h-[calc(92vh-7rem)] max-w-7xl items-center px-4 py-16 sm:px-6">
        <div className="max-w-3xl fade-up">
          <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">
            <Crown className="h-5 w-5" /> Cachaça Premium Artesanal
          </p>
          <h1 className="font-display text-5xl leading-tight gold-emboss sm:text-6xl lg:text-7xl">
            {activeSlide.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-brand-beige/82 sm:text-lg">{activeSlide.subtitle}</p>
          <HeroCta active={active} />
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
        <Button type="button" variant="ghost" size="icon" className="rounded-full border border-brand-gold/40 text-brand-gold hover:bg-brand-wood" onClick={() => setActive((active - 1 + heroSlides.length) % heroSlides.length)} aria-label="Slide anterior">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={cn("h-2.5 w-2.5 rounded-full border border-brand-gold", index === active ? "bg-brand-gold" : "bg-transparent")}
              aria-label={`Ir para slide ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <Button type="button" variant="ghost" size="icon" className="rounded-full border border-brand-gold/40 text-brand-gold hover:bg-brand-wood" onClick={() => setActive((active + 1) % heroSlides.length)} aria-label="Próximo slide">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}

function HeroCta({ active }: { active: number }) {
  const className = "mt-8 rounded bg-primary px-7 py-6 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground hover:bg-brand-beige hover:text-brand-black";
  if (active === 1) {
    return (
      <Button asChild className={className}>
        <Link to="/loja" search={{ ordenar: "novidades" }}>Ver lançamentos</Link>
      </Button>
    );
  }
  if (active === 2) {
    return (
      <Button asChild className={className}>
        <Link to="/loja" search={{ categoria: "Presente" }}>Kits para presente</Link>
      </Button>
    );
  }
  return (
    <Button asChild className={className}>
      <Link to="/loja">Conheça nossas cachaças</Link>
    </Button>
  );
}

export function SectionTitle({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center fade-up">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">{eyebrow}</p> : null}
      <div className="mt-4 flex items-center justify-center gap-4 text-brand-gold" aria-hidden="true">
        <Flourish className="h-6 w-20" />
        <span className="h-2 w-2 rotate-45 border border-brand-gold" />
        <Flourish className="h-6 w-20 -scale-x-100" />
      </div>
      <h2 className="mt-4 font-display text-4xl gold-emboss sm:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-sm leading-7 text-brand-beige/75 sm:text-base">{text}</p> : null}
    </div>
  );
}

export function CategoryGrid({ limit }: { limit?: number }) {
  const list = typeof limit === "number" ? categories.slice(0, limit) : categories;
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {list.map((category) => (
        <Link
          key={category.name}
          to="/loja"
          search={category.name === ALL_CATEGORIES ? {} : { categoria: category.name }}
          className="group w-[calc((100%-1rem)/2)] text-center sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)]"
        >
          <div className="mx-auto aspect-square overflow-hidden rounded-t-full border border-brand-gold/45 bg-brand-wood p-2 transition-all duration-300 group-hover:border-brand-gold group-hover:shadow-[0_0_28px_color-mix(in_oklch,var(--brand-gold)_20%,transparent)]">
            <img
              src={category.image}
              alt={`Categoria ${category.name}`}
              className="h-full w-full rounded-t-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              width={360}
              height={360}
            />
          </div>
          <h3 className="mt-4 font-display text-xl text-brand-gold">{category.name}</h3>
          {category.description ? <p className="mt-1 hidden text-xs leading-5 text-brand-beige/65 sm:block">{category.description}</p> : null}
        </Link>
      ))}
    </div>
  );
}

export function ProductCarousel({ title, kind }: { title: string; kind: "featured" | "launch" }) {
  const list = kind === "featured"
    ? products.filter((product) => product.featured).slice(0, FEATURED_LIMIT)
    : products.filter((product) => product.launch);
  if (list.length === 0) return null;
  return (
    <section className="py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">Vitrine</p>
          <h2 className="mt-2 font-display text-3xl text-brand-gold sm:text-4xl">{title}</h2>
        </div>
        <Button asChild variant="outline" className="hidden rounded border-brand-gold/50 bg-transparent text-brand-gold hover:bg-primary hover:text-primary-foreground sm:inline-flex">
          <Link to="/loja">Ver loja</Link>
        </Button>
      </div>
      <div className="flex snap-x gap-5 overflow-x-auto pb-4">
        {list.map((product) => (
          <div key={product.slug} className="min-w-[280px] snap-start sm:min-w-[320px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <article className="group h-full overflow-hidden border border-brand-gold/20 bg-card shadow-xl shadow-brand-black/30 transition-all duration-300 hover:border-brand-gold/70">
      <Link to="/produto/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-black">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            width={520}
            height={650}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 to-transparent" />
          {product.badge ? (
            <span className="absolute left-4 top-4 border border-brand-gold bg-brand-black/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-gold">
              {product.badge}
            </span>
          ) : null}
        </div>
      </Link>
      <div className="p-5">
        <Link to="/produto/$slug" params={{ slug: product.slug }}>
          <h3 className="font-display text-2xl text-brand-gold transition-colors group-hover:text-brand-gold-soft">{product.name}</h3>
        </Link>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-brand-beige/60">{product.wood}</p>
        <p className="mt-2 text-sm text-brand-beige/75">{product.volume} · {product.alcohol}</p>
        <div className="mt-4">
          {product.oldPrice ? <span className="mr-2 text-sm text-brand-beige/45 line-through">{formatCurrency(product.oldPrice)}</span> : null}
          <span className="text-2xl font-bold text-brand-gold">{formatCurrency(product.price)}</span>
          {product.installment ? <p className="mt-1 text-xs text-brand-beige/65">{product.installment}</p> : null}
        </div>
        <Button type="button" className="mt-5 w-full rounded bg-primary text-primary-foreground hover:bg-brand-beige hover:text-brand-black" onClick={() => addItem(product)}>
          <ShoppingBag className="h-4 w-4" /> Adicionar ao carrinho
        </Button>
      </div>
    </article>
  );
}

export function Differentials() {
  const items: Array<[typeof Wine, string]> = [
    [Wine, "Produção artesanal"],
    [Barrel, "Madeiras nobres"],
    [Truck, "Entrega para todo o Brasil"],
    [ShieldCheck, "Compra segura"],
  ] as const;
  return (
    <section className="border-y border-brand-gold/20 bg-brand-wood/70 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4">
        {items.map(([Icon, label]) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="h-9 w-9 text-brand-gold" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-beige">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StorySection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cn("bg-brand-black py-16 sm:py-24", compact && "py-12")}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative overflow-hidden border border-brand-gold/25">
          <img src={story.image} alt="Garrafa Dom Aldino Barril de Carvalho e copo sobre a mesa, diante de barris da marca e alambiques de cobre" className="h-full min-h-[360px] w-full object-cover" loading="lazy" width={900} height={720} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/65 to-transparent" />
          <div className="absolute bottom-6 left-6 border border-brand-gold/50 bg-brand-black/70 px-5 py-4 backdrop-blur">
            <p className="font-display text-2xl text-brand-gold">Desde a origem</p>
            <p className="text-xs uppercase tracking-[0.24em] text-brand-beige/70">tempo, madeira e tradição</p>
          </div>
        </div>
        <div className="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">Nossa História</p>
          <h2 className="mt-4 font-display text-4xl gold-emboss sm:text-5xl">Conheça a história da Dom Aldino</h2>
          {story.summary.map((paragraph, index) => (
            <p key={paragraph} className={cn("leading-8 text-brand-beige/78", index === 0 ? "mt-6" : "mt-4")}>{paragraph}</p>
          ))}
          <Button asChild className="mt-8 rounded bg-primary text-primary-foreground hover:bg-brand-beige hover:text-brand-black">
            <Link to="/nossa-historia">Ler a história completa</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="border-y border-brand-gold/15 bg-brand-wood py-14">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 text-center sm:px-6">
        <Crown className="mx-auto h-8 w-8 text-brand-gold" aria-hidden="true" />
        <h2 className="font-display text-3xl text-brand-gold sm:text-4xl">Receba lançamentos e ofertas exclusivas</h2>
        <form
          className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            if (email.trim()) setSent(true);
          }}
        >
          <input
            className="min-h-12 flex-1 rounded border border-brand-gold/35 bg-brand-black px-4 text-sm text-brand-beige outline-none focus:border-brand-gold"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={120}
            required
          />
          <Button className="rounded bg-primary px-7 text-primary-foreground hover:bg-brand-beige hover:text-brand-black">Cadastrar</Button>
        </form>
        {sent ? <p className="text-sm text-brand-gold">Cadastro recebido. Em breve enviaremos novidades Dom Aldino.</p> : null}
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-brand-black py-12 text-brand-beige">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <LogoMark compact />
          <p className="mt-4 max-w-sm text-sm leading-7 text-brand-beige/70">{brand.slogan}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-brand-gold">Aprecie com moderação. Venda proibida para menores de 18 anos.</p>
        </div>
          <FooterGroup />
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">Pagamento</h3>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-brand-beige/70">
            {brand.payments.map((item) => (
              <span key={item} className="border border-brand-gold/20 py-2">{item}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">Contato</h3>
          <div className="mt-4 space-y-3 text-sm text-brand-beige/70">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-gold" /> {brand.address}</p>
            <a className="block hover:text-brand-gold" href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer">{brand.phone}</a>
            <a className="block hover:text-brand-gold" href={`mailto:${brand.email}`}>{brand.email}</a>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-gold" /> {brand.branch.name}</p>
            <a className="block hover:text-brand-gold" href={`https://wa.me/${brand.branch.whatsapp}`} target="_blank" rel="noreferrer">{brand.branch.phone}</a>
            <a className="flex items-center gap-2 hover:text-brand-gold" href={brand.instagramUrl} target="_blank" rel="noreferrer"><Instagram className="h-4 w-4 text-brand-gold" /> {brand.instagram}</a>
            <a className="flex items-center gap-2 hover:text-brand-gold" href={brand.facebookUrl} target="_blank" rel="noreferrer"><Facebook className="h-4 w-4 text-brand-gold" /> Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup() {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">Institucional</h3>
      <div className="mt-4 grid gap-3 text-sm text-brand-beige/70">
        <Link to="/nossa-historia" className="hover:text-brand-gold">Nossa História</Link>
        <Link to="/loja" className="hover:text-brand-gold">Loja</Link>
        <Link to="/categorias" className="hover:text-brand-gold">Categorias</Link>
        <Link to="/contato" className="hover:text-brand-gold">Contato</Link>
      </div>
    </div>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${brand.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com Dom Aldino no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-brand-gold/25 transition-transform hover:scale-105"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}

export function QuantityControl({ quantity, setQuantity }: { quantity: number; setQuantity: (quantity: number) => void }) {
  return (
    <div className="inline-flex items-center border border-brand-gold/30">
      <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-none text-brand-gold hover:bg-brand-wood" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Diminuir quantidade">
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
      <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-none text-brand-gold hover:bg-brand-wood" onClick={() => setQuantity(quantity + 1)} aria-label="Aumentar quantidade">
        <Plus className="h-4 w-4" />
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
    ...(notes.length ? [["notas", "Notas"] as [string, string]] : []),
    ...(product.pairing ? [["harmonizacao", "Harmonização"] as [string, string]] : []),
    ["ficha", "Ficha técnica"],
  ];
  const panel = "border border-t-0 border-brand-gold/20 bg-brand-black/60 p-6";
  return (
    <Tabs defaultValue="descricao" className="mt-12">
      <TabsList className={cn("grid h-auto grid-cols-2 rounded-none border border-brand-gold/20 bg-brand-wood p-1", tabs.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4")}>
        {tabs.map(([value, label]) => (
          <TabsTrigger key={value} value={value} className="rounded data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{label}</TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="descricao" className={cn(panel, "space-y-4 leading-8 text-brand-beige/78")}>
        {product.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </TabsContent>
      {notes.length ? (
        <TabsContent value="notas" className={panel}>
          <div className={cn("grid gap-4", notes.length > 1 && "sm:grid-cols-2", notes.length > 2 && "lg:grid-cols-3")}>
            {notes.map(([title, text]) => <Note key={title} title={title} text={text} />)}
          </div>
        </TabsContent>
      ) : null}
      {product.pairing ? (
        <TabsContent value="harmonizacao" className={cn(panel, "leading-8 text-brand-beige/78")}>{product.pairing}</TabsContent>
      ) : null}
      <TabsContent value="ficha" className={panel}>
        <dl className="grid gap-3 sm:grid-cols-2">
          {product.specs.map(([key, value]) => (
            <div key={key} className="flex justify-between gap-4 border-b border-brand-gold/15 pb-3">
              <dt className="text-brand-beige/60">{key}</dt>
              <dd className="text-right font-semibold text-brand-gold">{value}</dd>
            </div>
          ))}
        </dl>
      </TabsContent>
    </Tabs>
  );
}

function Note({ title, text }: { title: string; text: string }) {
  return (
    <div className="border border-brand-gold/20 bg-brand-wood/60 p-4">
      <h4 className="font-display text-xl text-brand-gold">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-brand-beige/75">{text}</p>
    </div>
  );
}

export function ShopFilters({ selectedCategory, onCategoryChange, selectedWood, onWoodChange, sort, onSortChange }: {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedWood: string;
  onWoodChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}) {
  const woods = Array.from(new Set(products.map((product) => product.wood)));
  const prices = products.map((product) => product.price);
  const volumes = Array.from(new Set(products.map((product) => product.volume)));
  return (
    <aside className="border border-brand-gold/20 bg-brand-wood/70 p-5 lg:sticky lg:top-32 lg:self-start">
      <div className="mb-5 flex items-center gap-2 text-brand-gold">
        <Filter className="h-5 w-5" />
        <h2 className="font-display text-2xl">Filtros</h2>
      </div>
      <FilterSelect label="Categoria" value={selectedCategory} onChange={onCategoryChange} options={categories.map((category) => category.name)} />
      <FilterSelect label="Madeira" value={selectedWood} onChange={onWoodChange} options={["Todas", ...woods]} />
      <FilterSelect label="Ordenar" value={sort} onChange={onSortChange} options={["Mais vendidos", "Menor preço", "Maior preço", "Novidades"]} />
      <div className="mt-5 border-t border-brand-gold/15 pt-5">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-gold">Faixa de preço</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-brand-beige/70">
          <span className="border border-brand-gold/20 px-3 py-2">{formatCurrency(Math.min(...prices))}</span>
          <span className="border border-brand-gold/20 px-3 py-2">{formatCurrency(Math.max(...prices))}</span>
        </div>
      </div>
      <div className="mt-5 border-t border-brand-gold/15 pt-5">
        <p className="text-xs uppercase tracking-[0.22em] text-brand-gold">Volume</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {volumes.map((item) => <span key={item} className="border border-brand-gold/20 px-3 py-2 text-xs text-brand-beige/70">{item}</span>)}
        </div>
      </div>
    </aside>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="mt-5 block text-xs uppercase tracking-[0.22em] text-brand-gold">
      {label}
      <select
        className="mt-2 w-full rounded border border-brand-gold/25 bg-brand-black px-3 py-3 text-sm normal-case tracking-normal text-brand-beige outline-none focus:border-brand-gold"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function TrustStrip() {
  const items: Array<[typeof CheckCircle2, string]> = [
    [CheckCircle2, "Lotes pequenos e controle artesanal"],
    [PackageCheck, "Embalagem protegida para envio"],
    [Award, "Seleção premium para degustação"],
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map(([Icon, text]) => (
        <div key={text} className="flex items-center gap-3 border border-brand-gold/20 bg-brand-wood/45 p-4 text-sm text-brand-beige/75">
          <Icon className="h-6 w-6 shrink-0 text-brand-gold" />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}

export function ContactCards() {
  const items: Array<[typeof Phone, string, string]> = [
    [Phone, "WhatsApp", brand.phone],
    [Mail, "E-mail", brand.email],
    [MapPin, "Localização", `${brand.address} · Entregamos para todo o Brasil`],
    [MapPin, brand.branch.name, `${brand.branch.city} · ${brand.branch.phone}`],
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items.map(([Icon, title, text]) => (
        <div key={title} className="border border-brand-gold/20 bg-card p-6">
          <Icon className="h-8 w-8 text-brand-gold" />
          <h3 className="mt-4 font-display text-2xl text-brand-gold">{title}</h3>
          <p className="mt-2 text-sm text-brand-beige/70">{text}</p>
        </div>
      ))}
    </div>
  );
}

function Flourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 30" fill="none" className={className} aria-hidden="true">
      <path d="M3 16c20 0 18-13 33-13 10 0 12 10 2 12-7 1-14-3-9-9 7 21 28 22 43 7 10-10 24-11 45 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 21c8 0 10 4 13 7 3-8 10-9 18-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export { ALL_CATEGORIES, brand, categories, products, formatCurrency, getProduct };
