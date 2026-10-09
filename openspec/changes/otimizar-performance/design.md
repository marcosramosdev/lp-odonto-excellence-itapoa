## Context

Motivação em `proposal.md`. Requisitos em `specs/desempenho/spec.md`, `specs/seo-local/spec.md` e `specs/estrutura-global/spec.md`.

### Linha de base (medida em 2026-10-09, antes da mudança)

Lighthouse 12.8.2 com Chrome 154, em modo mobile padrão:

- celular emulado de 412 × 823 px, DPR 1,75;
- 4G lento simulado: RTT de 150 ms e 1,6 Mbps;
- CPU 4× mais lenta;
- build de produção servido por `astro preview` em `localhost:4322`;
- valor = mediana de 3 execuções.

| Métrica | Meta | Antes | Depois |
|---|---|---|---|
| Performance | ≥ 95 | 99 | 100 |
| Acessibilidade | 100 | 100 | 100 |
| Boas práticas | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 |
| FCP | — | 0,91 s | 1,06 s |
| LCP | < 2,0 s | **1,97 s** | **1,43 s** |
| TBT | < 200 ms | 0 ms | 0 ms |
| CLS | < 0,05 | 0 | 0 |
| Speed Index | — | 0,91 s | 1,06 s |
| INP (CPU 4×): abrir modal por CTA | < 200 ms | 160 ms (136–192) | **168 / 232 / 160 ms** em 3 rodadas (faixa 48–264); não fica estável abaixo da meta |
| INP (CPU 4×): abrir modal pelo card | < 200 ms | 104 ms (104–112) | 136 / 128 ms em 2 rodadas (faixa 112–160) |
| INP (CPU 4×): enviar vazio | < 200 ms | 40 ms (40–56) | 48 / 48 ms em 2 rodadas (faixa 32–72) |
| Carga inicial | < 1 MB | 189 KB | 127 KB |
| JavaScript (gzip) | < 15 KB | 1,9 KB (6 scripts inline) | 1,9 KB (6 scripts inline) |
| CSS bloqueante | 0 | 2 arquivos, 12 KB | 0 (inline no HTML) |

O que a medição mostra:

- **O elemento de LCP é o texto do `h1`, não a foto do Hero.** Fases do LCP:
  - TTFB: 454 ms;
  - atraso de renderização: 1.507 ms;
  - carga da imagem: 0, porque o LCP não é imagem.

  A FCP sai em 0,91 s, e o LCP vem 1 s depois, quando o `h1` é repintado com a Poppins 600.
- **O que segura essa repintura:**
  - duas folhas de estilo bloqueantes (`ContentWrapper.*.css`, 8,5 KB, e `index.*.css`, 3,2 KB, com gzip). O Lighthouse estima 190 ms de ganho sem elas;
  - três preloads de fonte de 8 KB cada (400, 500 e 600), que disputam banda com a foto do Hero, de prioridade alta.
- **Peso inicial:** 189 KB.
  - imagens: 137 KB. A maior é o poster do vídeo, com 61 KB. O `<video poster>` está dentro do modal fechado, e o navegador baixa o poster mesmo assim;
  - depois das imagens: fontes (24 KB), CSS (12 KB), HTML (10 KB) e favicon (6 KB).
- **JavaScript:** 1,9 KB com gzip, inline e em módulos, que não bloqueiam a renderização. Nenhum script de terceiros.
- **Imagens:** todas já têm `width`, `height` e `decoding="async"`. Só o logo do Nav e o Hero carregam de imediato. As fotos lazy usam `sizes="auto"`.
  - O Hero (`eager`) usa `sizes="100vw"`. Em 1440 px, a coluna dele mede 572 px e cresce até 668 px, mas ele baixa a variante da tela inteira.
  - O Lighthouse aponta 42 KB de "imagens maiores que o exibido". Ele compara com o tamanho em CSS px, sem o DPR 1,75. As variantes de 640 px servidas cobrem 360 × 1,75 = 630 px.
- **Já está certo e não precisa de ação:**
  - fontes: só Poppins 400/500/600, latina, `font-display: swap` e fallback "Arial" com `size-adjust` e `*-override`, gerados pela Fonts API do Astro;
  - logo: WebP no tamanho exibido (76 e 120 px, 1× e 2×), gerado de PNG pelo `astro:assets`;
  - sem `iframe` de mapa;
  - `unused-css-rules` e `unused-javascript` com nota 1.
- **SEO:**
  - `public/og-image.jpg` tem 1200 × 630, mas é o mascote padrão do Lumos;
  - `<title>` da página inicial: "Odonto Excellence Itapoá", sem o complemento da copy;
  - `og:title` e `og:description`: os mesmos do title e da description, não os da copy;
  - `robots.txt` (`src/pages/robots.txt.ts`), sitemap (`@astrojs/sitemap`) e canonical já derivam de `SITE_URL`, em `src/consts.ts`, ainda `https://example.com`.
- **Fonts API do Astro:** o `<Font preload>` aceita um filtro: `preload={[{ weight: 600 }]}`.
- **`build.inlineStylesheets`:** o padrão já é `"auto"`, que só põe inline folhas de até 4 KB.

## Goals / Non-Goals

**Goals:**

- Folga no LCP, abaixo de 2,0 s com margem, atacando o que a medição mostrou: CSS bloqueante, disputa de fontes e peso que não é usado.
- Toda ação pedida decidida com número: aplicada ou descartada com o motivo.
- SEO local pronto, com o domínio num lugar só.

**Non-Goals:**

- Mudar textos visíveis ou layout.
- Definir o domínio final. Fica `example.com` até o cliente decidir.
- Medir no Safari ou no Firefox. As metas valem para o Lighthouse mobile, no Chrome.
- Medir INP de campo (CrUX). Sem domínio publicado, só há medida de laboratório.

## Decisions

### 1. Medir fora do repositório

Lighthouse e Playwright rodam numa pasta temporária, com `npm i lighthouse playwright-core` e o Chrome instalado (`channel: "chrome"`), sem entrar no `package.json`. Os comandos ficam aqui para quem repetir:

```sh
npm run build && npx astro preview --port 4322
CHROME_PATH=".../chrome.exe" lighthouse http://localhost:4322/ --output=json \
  --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo
# 3 execuções; vale a mediana de cada métrica
```

INP de laboratório: Playwright no celular emulado (412 × 823, DPR 1,75), com `Emulation.setCPUThrottlingRate({ rate: 4 })` e um `PerformanceObserver` de `event` (`durationThreshold: 16`).

- Em cada execução, a medição faz as três interações do spec e guarda a maior duração de cada uma.
- A medida oscila muito: o CTA já deu de 128 a 280 ms em execuções seguidas. Por isso vale a mediana de 5 execuções, com a faixa ao lado.
- **Achado da tarefa 1.2:** ao abrir o modal pelo CTA, o handler do `Modal` gasta cerca de 100 ms (com CPU 4×), quase todo num recálculo de estilo do documento inteiro. O recálculo é forçado por `scroll.scrollTop = 0` antes do `showModal()`.
- **O custo vem dos 13 seletores com `:has()` do Lumos.** Sem eles, a interação cai para 88 ms estáveis. Hoje a mediana já fica abaixo da meta, então nada muda aqui. Se a tarefa 4.2 passar de 200 ms, esse é o ponto a atacar, e a decisão volta para revisão antes.

Layout: antes de mexer no código, um script guarda a caixa (`getBoundingClientRect`) de cada `section` e o texto visível em 375 e em 1440 px. O mesmo script compara depois.

### 2. CSS inline: `build.inlineStylesheets: "always"`

O pedido citava `"auto"`, mas `"auto"` já é o padrão e é o que gera as duas folhas bloqueantes. Ele só põe inline folhas de até 4 KB, e as do site têm 50 KB e 13 KB antes do gzip. Com `"always"`, o CSS (12 KB com gzip) vai no HTML: some uma ida e volta antes da primeira pintura.

- **Custo:** o HTML passa de 10 para cerca de 22 KB com gzip, e o CSS deixa de ir para o cache entre páginas. O site tem uma página indexável, então o custo não pesa.
- *Rejeitado:* manter `"auto"`, que é não fazer nada. Também rejeitado: CSS crítico separado à mão. São 12 KB no total, e a separação seria frágil.

### 3. Preload só da Poppins 600

```astro
<Font cssVariable="--font-poppins" preload={[{ weight: 600 }]} />
```

- O peso 600 é o do `h1`, e é a repintura com ele que marca o LCP.
- Os pesos 400 e 500 continuam no `@font-face` inline e são descobertos logo, porque o CSS agora está no HTML.
- O fallback com métricas ajustadas, que já existe, segura o CLS.

### 4. Poster do vídeo só ao abrir

Em `TestimonialVideo`, o `poster` sai do `<Video>` e vai para um `data-poster` no `<figure>`. No `show()`, antes do `showModal()`, o script faz `video.poster ||= wrap.dataset.poster`.

- Saem 61 KB da carga inicial, um terço do total.
- A miniatura do card não muda: continua sendo um `Img` lazy.

### 5. `sizes` do Hero pelo slot

```astro
<Img src={heroImage} variant="constrained"
  sizes="(min-width: 64rem) min(40vw, 42rem), 100vw" loading="eager" fetchPriority="high" … />
```

- **Por que esses valores:** 64rem é o ponto em que o `ContentWrapper columns` vira duas colunas. 40vw e o teto de 42rem saem das larguras medidas: 401 px em 1024, 572 px em 1440 e 668 px em 1920.
- **Mobile:** continua 100vw, como hoje.
- **Por que `constrained`:** a variante `full-width` do `Img` não aceita `sizes`, e a `constrained` aceita.
- **Risco de layout:** a foto fica numa coluna de "visual lock", com `position: absolute` e 100% de largura e altura. A troca de variante não deve mexer nela. A comparação de layout (decisão 1) confirma.

### 6. Cache em `public/_headers`

```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
```

O Worker de assets da Cloudflare lê `_headers` da pasta publicada (`dist/`). O HTML fica com o cache padrão da Cloudflare. Verificação local: `npx wrangler dev`, que já está nas devDependencies, mais `curl -I`.

### 7. Metadados padrão da copy

`src/consts.ts` ganha `SITE_TITLE`, `SITE_SOCIAL_TITLE` e `SITE_SOCIAL_DESCRIPTION`, com os textos da seção "Meta (SEO)". No `BaseHead`:

```ts
const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_TITLE;
const socialTitle = title ? pageTitle : SITE_SOCIAL_TITLE;
const socialDescription = Astro.props.description ?? SITE_SOCIAL_DESCRIPTION;
```

- `og:title` e `twitter:title` usam `socialTitle`.
- `og:description` e `twitter:description` usam `socialDescription`.
- A meta description continua `description ?? SITE_DESCRIPTION`.
- A 404, que tem título e descrição próprios, não muda.

### 8. JSON-LD no `<head>` da página inicial

Em `index.astro`, pelo slot `head` do layout:

```astro
<script type="application/ld+json" slot="head" set:html={JSON.stringify(clinic)} />
```

- **Os dados:** `clinic` é um objeto no frontmatter, com os valores da tabela do spec.
- **As URLs:** saem de `Astro.site`, que vem de `SITE_URL`:
  - `url`: `new URL("/", Astro.site)`;
  - `logo`: `new URL(logoPng.src, Astro.site)`, com o PNG original importado de `src/assets/logo/`;
  - `image`: `new URL("/og-image.jpg", Astro.site)`.
- **Horários:** quatro entradas de `OpeningHoursSpecification`. Duas cobrem segunda a sexta (09:00–12:00 e 14:00–20:00), e duas cobrem o sábado (09:00–12:00 e 13:00–17:00).
- **Sem componente:** é dado, não comportamento. O `is:inline` explícito evita que o Astro processe o script e tira a dica do `astro check`.
- **Validação (tarefa 3.6):**
  - O Schema Markup Validator (validator.schema.org) detectou `Dentist` com 0 erros e 0 avisos.
  - O Rich Results Test respondeu "Something went wrong — Log in and try again" no navegador automatizado. Fica pendente para alguém com conta Google: copiar o bloco `<script type="application/ld+json">` de `dist/index.html`, colar na aba "Code" do Rich Results Test e conferir "Local business" sem erros.

### 9. Nova `og:image`

`public/og-image.jpg` é gerada uma vez com `sharp`, que já vem com o Astro, e o arquivo vai para o repositório:

- tela de 1200 × 630;
- metade esquerda branca, com o logo PNG centralizado no tamanho nativo (339 × 272), sem ampliar;
- metade direita com a foto do Hero cortada em `cover`;
- JPEG com qualidade 82 e no máximo 300 KB.

Sem texto na imagem, porque o título e a descrição vêm das metatags. Isso também evita depender de fonte instalada no `sharp`. O script fica fora do repositório. Para trocar a imagem, basta trocar o arquivo.

### 10. Aviso de domínio provisório

Em `astro.config.mjs`:

```js
if (new URL(SITE_URL).hostname === "example.com")
  console.warn("[site] SITE_URL ainda é provisório (src/consts.ts). Defina o domínio final antes de publicar.");
```

- O aviso não quebra o build, para não travar o desenvolvimento.
- `robots.txt`, sitemap e canonical já leem `site`, então não mudam.

### 11. Avaliado e descartado

| Ação pedida | Decisão | Motivo |
|---|---|---|
| AVIF + WebP com `<picture>` | Descartada | As fotos não são o LCP. Sem o poster, o peso de imagem inicial fica em cerca de 76 KB, e o AVIF pouparia algo como 20 KB. O `<picture>` põe um elemento entre a caixa e a `<img>`, o que quebra seletores de filho direto como `.card_visual > .image` e a "visual lock" do `ContentWrapper`: muda o layout, que está fora do escopo. |
| Preload da imagem do Hero | Descartada | O LCP é o `h1`. Um preload a mais disputa banda com a fonte 600, que é o que marca o LCP. O Hero já tem `fetchpriority="high"` e pesa 19 KB no mobile, abaixo dos 120 KB. |
| `content-visibility: auto` nas seções | Descartada | TBT 0 ms: o gargalo é rede, não renderização. Ela conflita com a animação de entrada por `view()` e com saltos de âncora para seções ainda não renderizadas. |
| Remover CSS do Lumos sem uso | Descartada | `unused-css-rules` tem nota 1. Remover regras exigiria um purgador (dependência nova) ou corte manual frágil das utilidades. |
| Remover fontes e assets do Lumos | Nada a fazer | Só a Poppins é carregada. `lumos-background.svg` e `logo-icon.svg` só aparecem na página de exemplos, que não gera rota e não entra no `dist/`. |
| Logo em SVG ou WebP | Nada a fazer agora | O WebP no tamanho exibido já é gerado (3 KB). O SVG entra quando a clínica enviar. |
| Fachada de mapa | Nada a fazer | O site não tem `iframe` de mapa. "Como chegar" é um link. |
| JS sem bloquear e sem terceiros | Nada a fazer | São 1,9 KB inline, em módulos. |
| Larguras menores no `srcset` (42 KB do Lighthouse) | Descartada | O apontamento ignora o DPR. As variantes servidas já são as certas para 1,75×. |

## Risks / Trade-offs

- [O LCP continua perto de 2,0 s por variação do Lighthouse] → Valem as medianas de 3 execuções. Se ainda passar, o próximo passo é `font-display: optional` só para o peso 600: o `h1` fica no fallback na primeira visita lenta, sem repintura. Essa mudança volta para revisão antes de ser aplicada, porque muda o visual nesse caso.
- [CSS inline não vai para o cache] → Só uma página é indexável, e são 12 KB com gzip.
- [O poster aparece com atraso ao abrir o vídeo] → O vídeo começa a tocar logo em seguida, e o quadro de capa só cobre esse intervalo. Conferir a abertura no navegador (tarefas).
- [`og:image` com foto de banco] → É o que existe em resolução suficiente, já que a foto da fachada tem 382 px. Trocar o arquivo quando a clínica enviar fotos reais.
- [`_headers` só vale na Cloudflare] → O `astro preview` ignora o arquivo. A verificação usa `wrangler dev`.
- [O Rich Results Test exige navegador e conta Google] → O teste usa a aba "Código", colando o JSON-LD gerado, porque o site não está publicado. Se não der para automatizar, fica como verificação manual do cliente, com o JSON-LD pronto para colar.
- [Domínio indefinido] → O build avisa. Publicar sem trocar `SITE_URL` gera canonical e sitemap errados.

## Migration Plan

Mudança só de frontend estático. Deploy normal pela Cloudflare. Rollback: `git revert` do commit. A antiga `og-image.jpg` é o padrão do Lumos e não precisa voltar.
