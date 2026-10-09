## Why

A landing page recebe tráfego pago no celular, onde cada segundo de carregamento custa lead. A linha de base medida hoje já é boa: Lighthouse mobile 99/100/100/100, mas o LCP é de 1,97 s, no limite da meta de 2,0 s. O CSS bloqueia a renderização, e o poster do vídeo baixa 61 KB sem o vídeo ser aberto.

O site também não está pronto para busca local. Faltam dados estruturados da clínica. A imagem de compartilhamento é o mascote padrão do Lumos. O título da página não é o da copy.

## What Changes

**Desempenho**

- Medir antes e depois com Lighthouse mobile no build de produção, com a mediana de 3 execuções, e registrar a tabela no `design.md`.
- CSS inline no HTML, sem folhas bloqueantes.
- Preload só da fonte Poppins 600, a do título do Hero. As fontes já usam só os pesos 400, 500 e 600, subconjunto latino, `font-display: swap` e fallback com métricas ajustadas.
- O poster do vídeo do depoimento só carrega quando o modal abre.
- A imagem do Hero passa a usar `sizes` do próprio slot: metade da tela a partir de 64rem.
- Cache longo e imutável para `/_astro/*` na Cloudflare (`public/_headers`).
- Ações avaliadas e descartadas com os números da medição, registradas no `design.md`:
  - AVIF com `<picture>`;
  - preload da imagem do Hero;
  - `content-visibility`;
  - remoção de CSS do Lumos;
  - troca do logo;
  - fachada de mapa.

**SEO local**

- JSON-LD `Dentist` na página inicial, com:
  - nome, endereço completo e telefone;
  - horários, com os intervalos de almoço;
  - URL, logo e o Instagram em `sameAs`.
- Nova `og:image` de 1200 × 630 com a identidade da clínica, no lugar do mascote do Lumos.
- Título, meta description, `og:title` e `og:description` da página inicial iguais à seção "Meta (SEO)" da copy.
- Sitemap, `robots.txt`, canonical e JSON-LD continuam derivados de `SITE_URL`. O domínio final ainda não foi definido, então o build passa a avisar enquanto `SITE_URL` for o provisório.

**Fora do escopo:** mudar textos visíveis ou layout.

## Capabilities

### New Capabilities

- `desempenho`: metas de Core Web Vitals e de peso da página, carregamento de imagens, fontes e vídeo, e cache dos assets.
- `seo-local`: dados estruturados da clínica, imagem de compartilhamento, sitemap, `robots.txt` e canonical a partir do domínio do site.

### Modified Capabilities

- `estrutura-global`: em "Idioma e metadados do site", a página sem título próprio passa a usar o título, o `og:title` e o `og:description` da seção "Meta (SEO)" da copy.

## Impact

- **Configuração:**
  - `astro.config.mjs`: `build.inlineStylesheets` e o aviso de domínio provisório.
  - `src/consts.ts`: título e textos sociais padrão da copy.
- **Código:**
  - `src/components/utility/BaseHead.astro`: preload da fonte, título e textos sociais padrão.
  - `src/components/content/TestimonialVideo.astro`: poster sob demanda.
  - `src/pages/index.astro`: JSON-LD e `sizes` da imagem do Hero.
- **Arquivos públicos:**
  - `public/_headers`: novo.
  - `public/og-image.jpg`: substituído.
- **Dependências:** nenhuma no projeto. Lighthouse e Playwright rodam fora do repositório, só para medir.
- **Publicação:** continua bloqueada até `SITE_URL` receber o domínio final.
