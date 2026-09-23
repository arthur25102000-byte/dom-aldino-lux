# Dom Aldino – Cachaça Premium Artesanal

Loja virtual da Cachaçaria Premium Dom Aldino (Porto Velho, RO). Os pedidos são finalizados pelo WhatsApp.

Feito com [TanStack Start](https://tanstack.com/start) (React + Vite), Tailwind CSS e shadcn/ui.

## Rodar localmente

```bash
bun install        # ou: npx bun install
bun run dev        # abre em http://localhost:5173
```

Outros comandos:

| Comando | O que faz |
|---|---|
| `bun run build` | Gera a versão de produção em `.output/` |
| `bun run preview` | Serve a versão de produção localmente |
| `bun run lint` | Verifica o código |

## Onde editar

| O que | Arquivo |
|---|---|
| Produtos, preços, descrições e categorias | `src/lib/dom-aldino-data.ts` |
| Contato, WhatsApp, redes sociais e pagamento | `brand`, em `src/lib/dom-aldino-data.ts` |
| Texto da página Nossa História | `story`, em `src/lib/dom-aldino-data.ts` |
| Fotos dos produtos | `src/assets/produtos/` |
| Componentes visuais (cabeçalho, cards, rodapé…) | `src/components/dom-aldino.tsx` |
| Páginas | `src/routes/` |

**Vitrine "Mais vendidos":** marque até 3 produtos com `featured: true` em `src/lib/dom-aldino-data.ts`. A seção só aparece quando houver pelo menos um produto marcado. A vitrine "Lançamentos" funciona do mesmo jeito, com `launch: true`.

## Publicação

Por padrão, o build gera um servidor para Cloudflare Workers (`npx nitro deploy --prebuilt` depois do build). Para outro provedor, defina `NITRO_PRESET` antes do build, por exemplo `NITRO_PRESET=node-server bun run build`.
