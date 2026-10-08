## Context

Motivação em `proposal.md`. Requisitos em `specs/identidade-visual/spec.md` e `specs/estrutura-global/spec.md`.

Estado atual que molda a solução:

- `src/styles/base.css` define swatches (`--light-*`, `--dark-*`, `--brand-500`, `--brand-text`) e três temas (`:root`/`.theme-light`, `.theme-dark`, `.theme-brand`). Os componentes só leem os tokens dos temas (`--background`, `--text`, `--text-2`, `--button-*`, `--link-*`). Trocar swatches e o mapeamento dos temas basta para recolorir o site.
- O tema claro usa hoje `--background: var(--light-300)` (#d9d9d9) e `--text-2` com 60% de opacidade. Medido sobre branco, 60% dá 4,48:1 e falha AA. `Nav`, `Dropdown`, `Tabs`, `RichText` e o placeholder do `select` em `base.css` repetem esse 60% fixo em vez de ler `--text-2`.
- O logo é um PNG de 447×447, **opaco** (sem canal alfa), com fundo branco e cerca de 55 px de margem. É um logo empilhado: símbolo em cima, "ODONTO EXCELLENCE" embaixo. Cores amostradas: vermelho `#de1f26`, preto `#1c1c1a`. O quadrado vermelho fica em x 152–284, y 98–223.
- `astro.config.mjs` carrega só Inter 400 de um arquivo local de 115 KB, sem subset. Nav e Footer já usam peso 500 (`--primary-medium`), que hoje cai no 400.
- `Nav.astro` já tem menu mobile com botão, `aria-expanded`, fechamento por link, Esc e clique fora, e fallback sem JS. Muda para o breakpoint de 48rem.
- `Grid` declara os breakpoints 30rem, 48rem e 64rem.
- `sharp` está instalado como dependência do Astro.

## Goals / Non-Goals

**Goals:**

- Recolorir e retipografar o Lumos só por tokens, sem CSS novo nos componentes de biblioteca.
- Reaproveitar o Nav, o script do menu e os componentes `Img` e `Button` existentes.
- Deixar contraste AA verificável por números (tabela abaixo).

**Non-Goals:**

- Vetorizar ou redesenhar o logo. Usar o PNG como está até a clínica enviar o SVG.
- Ajustar o tamanho das fontes, o espaçamento ou o raio do Lumos. Fica para a mudança das seções, se necessário.
- Trocar `public/og-image.jpg`. Fica para a mudança `seo-local`.
- Contraste de 3:1 das bordas de campos de formulário (WCAG 1.4.11). Fica para a mudança `formulario-whatsapp`.

## Decisions

### 1. Paleta e contraste

Swatches em `base.css`:

| Token | Valor | Papel |
|---|---|---|
| `--light-100` | `#ffffff` | fundo principal |
| `--light-200` | `#f7f3ee` | off-white quente, fundo alternativo |
| `--light-300` | `#ede6dd` | terceiro fundo (hover de card, campos) |
| `--dark-900` | `#1c1c1a` | preto do logo, texto principal |
| `--dark-800` | `#2b2a27` | fundo 2 do tema escuro |
| `--dark-700` | `#3d3b37` | fundo 3 do tema escuro |
| `--brand-500` | `#de1f26` | vermelho da marca |
| `--brand-600` | `#b3171d` | hover e texto de destaque |
| `--brand-text` | `var(--light-100)` | texto sobre o vermelho |

Contraste medido (fórmula WCAG 2.x, script descartável):

| Texto | Fundo | Razão |
|---|---|---|
| `#1c1c1a` | branco / `#f7f3ee` / `#ede6dd` | 17,07 / 15,45 / 13,79 |
| texto-2 (70%) | branco / `#f7f3ee` / `#ede6dd` | 6,30 / 5,96 / 5,65 |
| branco | `#de1f26` (botão) | 4,85 |
| branco | `#b3171d` (botão hover) | 6,87 |
| `#b3171d` | branco / `#f7f3ee` | 6,87 / 6,22 |
| `#de1f26` | `#f7f3ee` | **4,39 — reprovado** |
| texto-2 (60%, padrão Lumos) | branco | **4,48 — reprovado** |
| branco / texto-2 (70%) | `#1c1c1a` | 17,07 / 8,88 |
| `#ef8f93` (destaque escuro) | `#1c1c1a` / `#2b2a27` / `#3d3b37` | ≥ 4,5 nos três |
| branco | `#de1f26` / `#c92525` / `#b52824` (fundos 1–3 do tema da marca) | 4,85 / 5,56 / 6,38 |

Mapeamento dos temas:

- **Claro:** `--background` → `--light-100`, `--background-2` → `--light-200`, `--background-3` → `--light-300`. A ordem inverte a do Lumos, que tinha o cinza como fundo principal. `--text-2` passa a 70%. `--heading-accent` → `var(--brand-600)`. `--button-background-hover` e `--button-border-hover` → `var(--brand-600)`, `--button-text-hover` → `var(--brand-text)`.
- **Escuro:** `--text-2` a 70%. `--heading-accent` → `color-mix(in srgb, var(--brand-500), white 50%)` (≈ `#ef8f93`), porque o vermelho puro dá 3,52:1 sobre o preto. Com 35% de branco, ainda falhava sobre `--dark-700` (3,69:1). Botão igual ao claro.
- **Marca:** `--text-2` → `var(--text)`, porque branco a 85% sobre o vermelho já dá 3,80:1. `--background-2` e `--background-3` passam a misturar o vermelho com `--dark-900` em vez do branco: clarear o vermelho derrubava o texto branco para 4,02:1 e 3,37:1. O resto fica como está: texto branco, botão branco com texto vermelho.

Regra de uso para as próximas mudanças: `#de1f26` é cor de **preenchimento** (botões, detalhes). Vermelho como **texto** usa sempre `--brand-600` ou `--heading-accent`.

As cores fixas de 60% em `Nav`, `Dropdown`, `Tabs`, `RichText` e no `select` de `base.css` passam a `var(--text-2)`. Isso corrige o problema na origem, em vez de componente por componente.

*Alternativa rejeitada:* um off-white mais claro (`#faf7f2`), em que o `#de1f26` passaria raspando (4,54:1). Fica frágil e quase indistinguível do branco. Usar `--brand-600` para texto resolve em qualquer fundo.

### 2. Tipografia

- **Serifa de display: Cormorant Garamond, peso 500.** As maiúsculas romanas clássicas conversam com o "EXCELLENCE" do logo, e o desenho leve reforça o "muito respiro". *Rejeitada:* Playfair Display. É mais pesada e de contraste alto, mais editorial ou de moda, e brigaria com o wordmark.
- Serifa em display e h1 a h4. A Cormorant fica fina demais em 16–24 px, então h5 e h6 ficam em Inter 500.
- **Inter 400 e 500.** São os pesos que o Lumos usa (`--primary-regular`, `--primary-medium`). `--primary-bold` (700) só aparece no utilitário `.text-weight-bold`, que não está em uso. Se uma seção precisar, adicione o peso.
- **Provider:** `fontProviders.google()` da Fonts API do Astro para as duas fontes, com `weights`, `subsets: ["latin"]` e `fallbacks` terminando em família genérica (`["serif"]`, `["sans-serif"]`). Assim o Astro gera fallbacks com métricas ajustadas, contra CLS. O Astro baixa os arquivos no build e os serve de `/_astro/fonts/`, sem requisição ao Google em produção, e usa `font-display: swap` por padrão. O `inter-regular.woff2` local, de 115 KB e sem subset, sai. *Rejeitada:* manter o provider local e subsetar arquivos à mão. Dá mais trabalho e não traz ganho.
- **Tokens:** novos `--secondary-family: var(--font-cormorant, Georgia, serif)`, `--secondary-medium: 500`, `--secondary-trim-top` e `--secondary-trim-bottom`. `--display-*` e `--h1-*` a `--h4-*` passam a ler `--secondary-*` em família, peso e trim. Nesses níveis, `letter-spacing` vai a `--letter-spacing-normal`, porque o −0,03em fecha demais uma serifa, e `line-height` vai a `--line-height-medium`, porque a Cormorant tem ascendentes altas.
- Os valores de trim da Cormorant são ajustados no navegador. O topo da maiúscula e a linha de base devem encostar nas bordas da caixa do título, como já acontece com a Inter.
- `BaseHead` ganha `<Font cssVariable="--font-cormorant" preload />` ao lado da Inter. A mudança `otimizar-performance` revisa o que vale pré-carregar.

### 3. Logo

- O PNG é aparado uma vez com `sharp(...).trim()` para remover a margem branca e salvo em `src/assets/logo/logo-odonto-excellence.png`. O arquivo de `public/` sai. O `logo.svg` do Lumos sai. `logo-icon.svg` e `lumos-background.svg` ficam, porque `_example-components.astro` ainda os importa e o `astro check` valida esse arquivo.
- O logo é renderizado com o `Img` do Lumos (`transparent`, `loading="eager"` no Nav) dentro do link já existente. O nome acessível vem do `alt` "Odonto Excellence Itapoá". O `aria-label` duplicado do link sai.
- **Fundo branco do PNG no off-white:** `mix-blend-mode: multiply` na imagem. Em multiply, o branco assume a cor do fundo e o vermelho e o preto quase não mudam. É uma linha de CSS e funciona em qualquer fundo claro. *Rejeitada:* gerar um PNG com alfa ("color to alpha"). O processamento é maior e dá serrilhado nas bordas, e o SVG da clínica vai substituir o PNG de qualquer forma. Limite: o multiply não serve em fundo escuro. O logo nunca deve ir para o tema escuro ou da marca.
- **Tamanho:** no Nav, altura de cerca de 3,75rem numa barra de `--nav-height` 5rem. No rodapé, cerca de 6rem. Os valores finais saem do ajuste visual.
- **Links:** o link do logo aponta para `/#`. Na página inicial, rola ao topo sem recarregar. Nas outras páginas, abre o topo da inicial.

### 4. Favicon

Script descartável com `sharp`, rodado uma vez e não versionado. Ele recorta o quadrado vermelho do PNG original (x 152–284, y 98–223) e o completa até um quadrado com o próprio vermelho (`fit: "contain"`, fundo `#de1f26`). Saídas:

- `public/favicon.png`, 96×96 (múltiplo de 48, como o Google pede);
- `public/apple-touch-icon.png`, 180×180.

`BaseHead` passa a linkar `<link rel="icon" type="image/png" href="/favicon.png">` e `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`. Saem `public/favicon.svg` e `public/favicon.ico`, que são do Lumos. *Rejeitado:* gerar um `.ico`. O `sharp` não escreve ICO, e os navegadores atuais usam o `<link rel="icon">`. Gere o `.ico` só se algum cliente que dependa dele aparecer.

### 5. Consts e idioma

`src/consts.ts`:

- `SITE_NAME = "Odonto Excellence Itapoá"`;
- `SITE_DESCRIPTION` = a meta description da copy;
- `SITE_LOCALE = "pt-BR"`;
- `SITE_URL = "https://example.com"`, domínio reservado que nunca resolve. O doc comment marca o valor como provisório.

`BaseLayout` usa `<html lang={SITE_LOCALE}>`, que deixa o locale numa fonte só. `SkipLink` passa ao rótulo padrão "Pular para o conteúdo". O `aria-label` do `<nav>` passa a "Principal".

A página 404 mantém a estrutura do Lumos e só troca os textos, a pedido da clínica de ter o site inteiro em português. A copy não tem texto para a 404, então os textos são a tradução direta dos originais:

- título: "Página não encontrada";
- descrição: "A página que você procura não existe.";
- h1: "Esta página não existe";
- parágrafo: "A página que você procura pode ter mudado de endereço, ou o link que trouxe você até aqui está desatualizado.";
- botão: "Voltar para o início".

### 6. Nav

Mantém o markup, o script e o fallback sem JS. Mudanças:

- Links via `NavLink`: `/#tratamentos`, `/#clinica`, `/#como-funciona`, `/#duvidas`, `/#localizacao`. O caminho absoluto `/` faz as âncoras funcionarem na 404. O `aria-current` do `NavLink` compara só o pathname, então nenhum link fica marcado como página atual. Está correto para âncoras.
- O botão "Agendar avaliação" (`Button element="link" href="/#agendar"`) fica num `<div class="nav_cta">` próprio do Nav. Esse div permite escondê-lo abaixo de 64rem sem pôr classe custom no `Button`.
- Breakpoint de 48rem para **64rem**, no CSS e no `matchMedia` do script. Logo, cinco links e botão não cabem em 768 px. 64rem é o breakpoint `lg` do `Grid`.
- `.nav_link` lê `var(--text-2)` em vez do 60% fixo.
- Âncoras sob o Nav sticky: `html { scroll-padding-top: var(--nav-height); }` em `base.css`. É nativo e vale para toda âncora, sem JS.

### 7. Barra de CTA no mobile

Novo componente `src/components/global/MobileCta.astro`, raiz `.mobile-cta_wrap`, renderizado no `BaseLayout` **depois** do `<Footer />`. Ele tem CSS próprio, o que justifica o componente (LUMOS.md).

- `position: sticky; bottom: 0`. Como último filho do `body`, fica preso ao pé da tela durante a rolagem e, no fim da página, assenta depois do rodapé, sem cobri-lo. *Rejeitada:* `position: fixed` com `padding-bottom` no `body`. Acopla a altura da barra a outro elemento e exige mexer no `body` a partir de um componente.
- Fundo `var(--background)` e borda superior `var(--border)`. Padding `var(--space-2) var(--site-margin)`. O `Button` recebe o utilitário `width-full`. Com 0,75em de padding e line-height 1,2, o botão tem cerca de 45 px de altura, acima do mínimo de 44 px.
- `display: none` a partir de 64rem. `z-index` abaixo do Nav (100), para o menu aberto ficar por cima.
- Props: só `render`. O texto e o destino são iguais em toda página e ficam escritos no componente.

### 8. Rodapé

`Footer.astro` reescrito com a seção 14 da copy:

- fundo `var(--background-2)` (off-white);
- logo com multiply;
- texto da franquia;
- `<address>` com endereço, WhatsApp (`https://wa.me/5547997660991`) e Instagram (`https://www.instagram.com/odontoexcellence_itapoa/`). Os links externos abrem com `target="_blank" rel="noopener"`;
- "Responsável técnico: Dr. Renato Gonzales de Souza Forti — CRO-SC 22.911 · EPAO-SC 1.579", dados enviados pela clínica e já registrados na seção 14 da copy;
- copyright com o placeholder literal do CNPJ.

O ano continua como hoje: gerado no build e atualizado pelo script existente. O `<nav>` de links do rodapé sai, porque a copy não prevê links ali. Os textos ficam no componente: são iguais em toda página e não há segundo uso que justifique tirá-los de lá.

### 9. Página inicial e higiene de rotas

- `index.astro` fica só com `<Layout />`, sem tema forçado e sem os imports do style guide.
- `git mv src/pages/example-components.astro src/pages/_example-components.astro`. O Astro ignora páginas com prefixo `_` no roteamento, então a página também sai do sitemap.
- `git mv public/dados_atendimento_itapoa.md docs/dados_atendimento_itapoa.md`.

## Risks / Trade-offs

- [Wordmark pequeno no Nav: o logo empilhado em ~3,75rem deixa "EXCELLENCE" com ~7 px de altura de maiúscula] → O símbolo continua reconhecível. Trocar por versão horizontal ou SVG quando a clínica enviar (já está nas pendências da copy).
- [`apple-touch-icon` ampliado de ~133 px para 180 px fica levemente suave] → Aceitável por ora. Regenerar a partir do SVG.
- [O build depende de rede para baixar as fontes na primeira vez] → O Astro guarda os arquivos em cache local. O build da Cloudflare tem rede.
- [`mix-blend-mode: multiply` só funciona em fundo claro] → O logo fica restrito ao Nav (branco) e ao rodapé (off-white). Documentado na decisão 3.
- [`SITE_URL` provisório gera canonical e sitemap apontando para example.com] → Não publicar em domínio definitivo antes de trocar. Listado como pendência.
- [Placeholder "CNPJ [nº]" visível no rodapé] → Intencional, para não publicar sem o dado. Bloqueia a publicação até a clínica responder.- [Trim da Cormorant ajustado a olho] → Conferir display, h1 e h2 lado a lado com um parágrafo no navegador antes de fechar a tarefa.

## Migration Plan

Mudança só de frontend estático, sem dados. Deploy normal pela Cloudflare. Rollback: `git revert` do commit.

## Open Questions

- **Domínio final** para `SITE_URL`. Trocar a constante quando estiver definido.
- **Versão horizontal ou SVG do logo.** Se a clínica ou a franqueadora tiver, substitui o PNG sem mudar a estrutura.
- **`og-image.jpg`** ainda é a imagem do Lumos. Será trocada na mudança `seo-local`.
