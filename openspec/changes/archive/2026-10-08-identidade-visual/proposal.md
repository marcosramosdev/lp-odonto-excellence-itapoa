## Why

O site ainda é o scaffold do Lumos: cores verde-limão, logo, favicon e textos do Lumos, `lang="en"` e uma página de exemplo publicada. Antes de montar as seções da landing page, a base precisa falar com a identidade da Odonto Excellence Itapoá (branco, vermelho #de1f26 e preto do logo) e estar em pt-BR. Também há um risco atual: `public/dados_atendimento_itapoa.md`, o prompt interno da assistente, seria publicado no site.

## What Changes

- Tokens de cor em `src/styles/base.css` trocados pela paleta da marca: vermelho #de1f26 (`--brand-500`) com texto branco, um vermelho mais escuro para hover e para texto de destaque, branco como fundo principal, off-white quente para alternar seções e o preto do logo como neutro escuro. Todas as combinações de texto e fundo dos temas passam em WCAG AA.
- Texto secundário (`--text-2`) mais escuro que o padrão do Lumos, que hoje fica abaixo de 4,5:1 sobre branco. Os componentes que repetem esse valor fixo passam a ler o token.
- Tipografia: serifa de display (Cormorant Garamond) nos títulos e Inter no texto corrido. As duas self-hosted pela Fonts API do Astro, só com os pesos usados e subset latin. O arquivo local `inter-regular.woff2`, sem subset, sai.
- Logo: o PNG sai de `public/` para `src/assets/logo/logo-odonto-excellence.png`, aparado das margens brancas, e entra no Nav e no Footer. O logo do Lumos sai.
- Favicon gerado a partir do símbolo vermelho do logo. Os favicons do Lumos saem.
- `src/consts.ts` com nome, descrição (meta da copy), URL provisória e locale `pt-BR` da clínica. `<html lang>` passa a `pt-BR`.
- Nav conforme a seção 1 da copy: logo, cinco âncoras, botão "Agendar avaliação", menu mobile e barra fixa de CTA no rodapé da tela em telas pequenas.
- Footer conforme a seção 14 da copy, com o responsável técnico (Dr. Renato Gonzales de Souza Forti, CRO-SC 22.911, EPAO-SC 1.579) e placeholder visível para o CNPJ.
- Página 404 traduzida para pt-BR. O site inteiro fica em português.
- Página inicial esvaziada (sem o style guide do Lumos), pronta para receber as seções.
- `public/dados_atendimento_itapoa.md` vai para `docs/`, fora do site publicado.
- `src/pages/example-components.astro` vira `_example-components.astro` e sai do build. Os links para ela no Nav e no Footer saem.

## Capabilities

### New Capabilities

- `identidade-visual`: paleta, contraste, tipografia, logo e favicon da marca aplicados ao site.
- `estrutura-global`: idioma e metadados do site (inclusive a 404), Nav com menu mobile, barra fixa de CTA no mobile, rodapé com os dados da clínica e o que pode ou não ser publicado em `public/` e nas rotas.

### Modified Capabilities

Nenhuma. Não há specs em `openspec/specs/`.

## Impact

- **Código:** `src/styles/base.css`, `astro.config.mjs`, `src/consts.ts`, `src/layouts/BaseLayout.astro`, `src/components/utility/BaseHead.astro`, `src/components/global/Nav.astro`, `Footer.astro`, `SkipLink.astro`, um novo componente global para a barra de CTA mobile, `src/pages/index.astro`, `src/pages/404.astro`. Troca pontual de cor fixa por `var(--text-2)` em `Dropdown.astro`, `Tabs.astro` e `RichText.astro`.
- **Assets:** entram `src/assets/logo/logo-odonto-excellence.png`, `public/favicon.png` e `public/apple-touch-icon.png`. Saem `src/assets/logo/logo.svg`, `src/assets/fonts/inter-regular.woff2`, `public/favicon.svg`, `public/favicon.ico` e o PNG do logo em `public/`.
- **Arquivos movidos:** `public/dados_atendimento_itapoa.md` → `docs/`. `src/pages/example-components.astro` → `src/pages/_example-components.astro`.
- **Build:** a Fonts API baixa as fontes do Google no build e as serve do próprio domínio. O build precisa de rede na primeira vez (depois usa o cache).
- **Dependências:** nenhuma nova. O favicon é gerado uma vez com o `sharp`, que já vem com o Astro.
- **Pendências que bloqueiam a publicação:** domínio final (`SITE_URL`) e CNPJ.
