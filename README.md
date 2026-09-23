# Dom Aldino: A Golden Tradition

Crie um site e-commerce premium para a "Dom Aldino – Cachaça Premium Artesanal", uma cachaçaria artesanal brasileira. O visual deve ser luxuoso, escuro e dourado, com ar de tradição, no nível das grandes cachaçarias do mercado (referências: cachacasbylaardt.com.br, cachacarianacional.com.br, drinkcana.com). Todo o conteúdo em português do Brasil. Mobile-first e totalmente responsivo. As imagens anexadas são a identidade da marca (logo, paleta, tipografia) — use-as como referência fiel.

## IDENTIDADE VISUAL (seguir à risca)

Paleta de cores:
- Dourado principal: #D4AF37 (logo, títulos, botões, bordas, ícones)
- Marrom madeira: #3B2A14 (cards, fundos de seção alternados)
- Preto profundo: #111111 (fundo principal do site)
- Oliva/dourado envelhecido: #6B602F (hovers, detalhes secundários, divisores)
- Texto de apoio: bege claro #E8DCC0

Tipografia (Google Fonts):
- Playfair Display: logo, títulos e nomes de produtos
- Montserrat: textos, menus, preços e botões. Menus e subtítulos em caixa alta com letter-spacing amplo (ex: "CACHAÇA PREMIUM", "ARTESANAL")

Elementos gráficos (usar como SVG inline):
- Coroa dourada
- Brasão/escudo com as iniciais "DA"
- Ornamentos barrocos em arabesco (flourish) nas laterais dos títulos
- Divisor: linha fina dourada com um losango no centro (—◇—)
- Leves texturas de couro/madeira escura ao fundo, efeito de relevo dourado nos títulos
- Slogan: "Tradição e qualidade desde a origem"

## ESTRUTURA DAS PÁGINAS

1. Modal de verificação de idade (obrigatório, abre ao entrar no site)
Fundo preto com o brasão, a pergunta "Você tem 18 anos ou mais?" e os botões "Sim, tenho" e "Não". Salvar a confirmação para não perguntar de novo. Se a pessoa clicar em "Não", mostrar mensagem de bloqueio.

2. Header fixo
Faixa superior fina em #3B2A14 com "Frete para todo o Brasil" e o telefone/WhatsApp. Logo Dom Aldino (brasão + nome) à esquerda e menu no centro: Início, Loja, Categorias, Nossa História, Contato. À direita, ícones de busca, conta e carrinho (com contador). No mobile, menu hambúrguer com drawer lateral escuro.

3. Hero com slider de imagens (carrossel)
Slider em tela cheia com 3 a 5 slides, autoplay a cada 5s, transição fade, setas douradas e indicadores (bolinhas). Cada slide tem imagem de fundo com overlay escuro em gradiente, título em Playfair Display, subtítulo e um botão CTA dourado ("Conheça nossas cachaças", "Ver lançamentos", "Kits para presente"). Usar imagens placeholder de barris de carvalho, garrafas âmbar e alambique. As imagens e os textos dos slides devem ser editáveis pelo painel admin.

4. Compre por categoria
Título centralizado com ornamentos laterais. Grid de cards circulares ou em arco com imagem, borda dourada e nome da categoria. Categorias iniciais: Amburana, Carvalho Europeu, Jequitibá, Bálsamo, Prata/Cristalina, Ouro/Envelhecida, Licores, Kits e Presentes. Hover: zoom suave na imagem e brilho dourado na borda. Ao clicar, vai para a loja já filtrada pela categoria.

5. Vitrine de produtos (área de venda)
Seções "Mais vendidos" e "Lançamentos" em carrossel horizontal, além da página /loja completa. Card de produto com fundo #3B2A14 e borda sutil dourada contendo: foto da garrafa, selo opcional ("Novo", "Mais vendido", "Promoção"), nome (Playfair Display), madeira de envelhecimento, volume (ml) e teor alcoólico (% vol), preço em dourado (se houver promoção, preço antigo riscado), "ou 3x de R$ XX sem juros", botão "Adicionar ao carrinho". A página /loja tem filtros laterais (categoria, madeira, faixa de preço, volume) e ordenação (menor preço, maior preço, mais vendidos, novidades).

6. Página do produto
Galeria de imagens, nome, preço, seletor de quantidade, botão de comprar, e abas com Descrição, Notas de degustação (aroma, sabor, final), Harmonização e Ficha técnica. Abaixo, "Você também pode gostar".

7. Carrinho e checkout
Carrinho em drawer lateral com resumo, subtotal e campo de CEP para calcular frete (placeholder). Finalização do pedido via WhatsApp: montar uma mensagem automática com os itens, as quantidades e o total, e abrir o wa.me com o número da loja.

8. Seção "Nossa História"
Imagem de barris à esquerda e texto à direita sobre a tradição artesanal, o alambique e o envelhecimento em madeiras nobres. Botão "Conheça nossa história".

9. Diferenciais
Faixa com 4 ícones dourados: Produção artesanal, Envelhecida em madeiras nobres, Entrega para todo o Brasil, Compra segura.

10. Newsletter
"Receba lançamentos e ofertas exclusivas", com campo de e-mail e botão dourado.

11. Footer
Fundo #111111 com o logo, o slogan, links institucionais, formas de pagamento, redes sociais e endereço. Aviso legal obrigatório: "Aprecie com moderação. Venda proibida para menores de 18 anos." Botão flutuante de WhatsApp no canto inferior direito.

## PAINEL ADMINISTRATIVO (/admin)
Área protegida por login (usar Lovable Cloud/Supabase com autenticação), para eu mesmo gerenciar a loja sem mexer em código:
- CRUD de produtos: nome, descrição, categoria, madeira, volume, teor alcoólico, preço, preço promocional, estoque, selo, múltiplas fotos (upload), notas de degustação, ativo/inativo, destaque (mais vendidos/lançamentos)
- CRUD de categorias com imagem
- Gerenciar os slides do hero: imagem, título, subtítulo, texto e link do botão, ordem
- Configurações: número do WhatsApp, telefone, endereço, redes sociais
Tabela de produtos com busca, edição rápida de preço e estoque, e visual escuro/dourado consistente com o site.

## DETALHES DE UX
- Animações suaves de entrada ao rolar (fade-up)
- Hover elegante nos botões: fundo dourado com texto preto, invertendo no hover
- Botões com cantos levemente arredondados (4px), nada muito "tech"
- SEO básico: meta tags, títulos por página, alt nas imagens
- Performance: lazy loading nas imagens

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://dom-aldino-lux.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a6a15cee-1947-46ab-a79c-98ba73a5a432).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
