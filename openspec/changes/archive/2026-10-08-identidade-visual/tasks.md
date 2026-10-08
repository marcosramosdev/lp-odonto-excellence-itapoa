## 1. Base do site e higiene de arquivos

- [x] 1.1 `git mv public/dados_atendimento_itapoa.md docs/dados_atendimento_itapoa.md`. Verificar: o arquivo existe em `docs/` e não existe em `public/`.
- [x] 1.2 `git mv src/pages/example-components.astro src/pages/_example-components.astro` e remover os links para `/example-components` do Nav e do Footer. Verificar: `grep -rn "example-components" src` só encontra o próprio arquivo renomeado.
- [x] 1.3 Atualizar `src/consts.ts` (decisão 5 do design): `SITE_NAME`, `SITE_DESCRIPTION` com a meta da copy, `SITE_URL = "https://example.com"` marcado como provisório no doc comment e `SITE_LOCALE = "pt-BR"`. Trocar `lang="en"` por `lang={SITE_LOCALE}` no `BaseLayout`. Verificar: `dist/index.html` tem `<html lang="pt-BR"`, `<title>Odonto Excellence Itapoá</title>` e a meta description da copy.
- [x] 1.4 Mudar o rótulo padrão do `SkipLink` para "Pular para o conteúdo". Verificar: o texto aparece em `dist/index.html`.
- [x] 1.5 Esvaziar `src/pages/index.astro`: só `<Layout />`, sem `theme`, sem os imports do style guide. Verificar: `dist/index.html` tem `<main id="main" tabindex="-1">` sem filhos.
- [x] 1.6 Traduzir os textos de `src/pages/404.astro` conforme a decisão 5 do design, e os rótulos acessíveis padrão em inglês do `Button`, `Marquee`, `Slider` e `Tabs` (Play, Pause, Close, Previous, Next, Marquee, Slider, "1 of N", "Go to slide", rotação automática) para pt-BR. Os padrões dos campos de formulário ficam para a mudança `formulario-whatsapp`. Verificar: `dist/404.html` tem "Página não encontrada", "Esta página não existe" e "Voltar para o início", e nenhum texto em inglês.
- [x] 1.7 Rodar `npm run check` e `npm run build` sem erros. Verificar: não existem `dist/dados_atendimento_itapoa.md` nem `dist/example-components/`, e `example-components` não aparece em `dist/sitemap-0.xml`.

## 2. Cores e contraste

- [x] 2.1 Trocar os swatches em `src/styles/base.css` pelos valores da tabela da decisão 1 e adicionar `--brand-600: #b3171d`, com `--brand-text: var(--light-100)`. Verificar: `grep -n "c6fb50" src/styles/base.css` não retorna nada.
- [x] 2.2 Remapear os temas (decisão 1). Claro: fundos branco, off-white e `--light-300`; `--text-2` a 70%; `--heading-accent: var(--brand-600)`; hover do botão em `--brand-600` com texto `--brand-text`. Escuro: `--text-2` a 70%; destaque em `color-mix(in srgb, var(--brand-500), white 35%)`; botão igual ao claro. Marca: `--text-2: var(--text)`. Verificar no navegador: botão primário vermelho com texto branco e hover em vermelho escuro.
- [x] 2.3 Trocar o `color-mix(in lab, currentcolor 60%, transparent)` fixo por `var(--text-2)` em `Nav.astro` (`.nav_link`), `Dropdown.astro`, `Tabs.astro`, `RichText.astro` e no `select` de `base.css`. Verificar: `grep -rn "currentcolor 60%" src` não retorna nada.
- [x] 2.4 Adicionar `html { scroll-padding-top: var(--nav-height); }` em `base.css`. Verificar no navegador: com uma âncora de teste, o alvo para logo abaixo do Nav. Remover a âncora de teste depois.
- [x] 2.5 Medir o contraste com os valores finais (script descartável com a fórmula WCAG ou DevTools) para texto, texto-2, destaque e botão (normal e hover) nos três temas e nos três fundos claros. Verificar: tudo ≥ 4,5:1 e igual à tabela do design.
- [x] 2.6 Rodar `npm run check` e `npm run build` sem erros.

## 3. Tipografia

- [x] 3.1 Em `astro.config.mjs`, trocar a Inter local por `fontProviders.google()` com `weights: [400, 500]`, `subsets: ["latin"]` e `fallbacks: ["sans-serif"]`. Adicionar a Cormorant Garamond (`cssVariable: "--font-cormorant"`, `weights: [500]`, `subsets: ["latin"]`, `fallbacks: ["serif"]`). Apagar `src/assets/fonts/inter-regular.woff2`. Verificar: depois do build, `dist/_astro/fonts/` só tem arquivos dos pesos configurados.
- [x] 3.2 Adicionar `<Font cssVariable="--font-cormorant" preload />` no `BaseHead`. Verificar: `dist/index.html` tem `@font-face` das duas famílias e nenhuma URL com `fonts.googleapis.com` ou `fonts.gstatic.com`.
- [x] 3.3 Em `base.css`, criar `--secondary-family`, `--secondary-medium`, `--secondary-trim-top` e `--secondary-trim-bottom`. Apontar `--display-*` e `--h1-*` a `--h4-*` para eles em família, peso e trim, com `letter-spacing` em `--letter-spacing-normal` e `line-height` em `--line-height-medium`. h5 e h6 ficam em Inter. Verificar no DevTools: um h2 renderiza em Cormorant Garamond e um parágrafo em Inter (painel "Rendered Fonts").
- [x] 3.4 Ajustar `--secondary-trim-top` e `--secondary-trim-bottom` no navegador, com um título display, um h1 e um h2 de teste ao lado de um parágrafo, inclusive com acentos ("Ação, ímã, você"). Verificar: o topo da maiúscula e a linha de base encostam na caixa do texto, como na Inter, e os acentos não são cortados. Remover o markup de teste depois.
- [x] 3.5 Rodar `npm run check` e `npm run build` sem erros.

## 4. Logo e favicon

- [x] 4.1 Com um script `sharp` descartável (fora do repo), aplicar `trim()` ao PNG do logo e salvar em `src/assets/logo/logo-odonto-excellence.png`. Remover `public/logo-odonto-exellence (1).png` com `git rm`. Verificar: a imagem nova tem cerca de 339×272 px, sem margem branca, e não existe mais PNG de logo em `public/`.
- [x] 4.2 Com o mesmo script, recortar o quadrado vermelho do PNG original (x 152–284, y 98–223), completar até um quadrado com `#de1f26` e gerar `public/favicon.png` (96×96) e `public/apple-touch-icon.png` (180×180). Apagar `public/favicon.svg` e `public/favicon.ico`. Verificar: abrir os dois PNGs e conferir o símbolo vermelho centralizado, sem branco nas bordas.
- [x] 4.3 Trocar os links de ícone do `BaseHead` por `<link rel="icon" type="image/png" href="/favicon.png" />` e `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`. Verificar: a aba do navegador mostra o símbolo vermelho.
- [x] 4.4 Rodar `npm run check` e `npm run build` sem erros.

## 5. Nav, barra de CTA mobile e rodapé

- [x] 5.1 Atualizar o `Nav.astro` (decisão 6). Logo com `Img` (`alt` "Odonto Excellence Itapoá", `transparent`, `loading="eager"`, altura de ~3,75rem) num link para `/#`, sem `aria-label`. Cinco `NavLink` com `/#tratamentos`, `/#clinica`, `/#como-funciona`, `/#duvidas` e `/#localizacao`. Botão "Agendar avaliação" (`/#agendar`) dentro de `<div class="nav_cta">`, oculto abaixo de 64rem. `aria-label="Principal"`. Breakpoint de 48rem para 64rem no CSS e no `matchMedia`. Verificar em 375 px: logo e botão de menu; o menu abre com os cinco links, fecha com link, Esc (o foco volta ao botão) e clique fora. Verificar em 1024 px e 1440 px: logo, links e botão numa linha, sem botão de menu. Com JS desativado, os links aparecem.
- [x] 5.2 Criar `src/components/global/MobileCta.astro` (decisão 7). Raiz `.mobile-cta_wrap`, só a prop `render`, `Button element="link" href="/#agendar" class="width-full"` com o texto "Agendar avaliação", `position: sticky; bottom: 0`, `display: none` a partir de 64rem. Renderizar no `BaseLayout` depois do `<Footer />`. Verificar em 375 px: a barra fica no pé da tela durante a rolagem e, no fim da página, a última linha do rodapé aparece inteira acima dela; o botão tem ≥ 44 px de altura. Em 1024 px, a barra não aparece.
- [x] 5.3 Reescrever o `Footer.astro` (decisão 8): fundo `var(--background-2)`, logo com `mix-blend-mode: multiply` num link para `/#`, "Unidade franqueada da rede Odonto Excellence.", `<address>` com endereço, WhatsApp e Instagram (links externos com `target="_blank" rel="noopener"`), "Responsável técnico: Dr. Renato Gonzales de Souza Forti — CRO-SC 22.911 · EPAO-SC 1.579" e "© {ano} Odonto Excellence Itapoá · CNPJ [nº]", mantendo o script do ano. Remover o `<nav>` do rodapé. Verificar: os textos batem com a seção 14 da copy, o logo não mostra retângulo branco sobre o off-white e o link do WhatsApp abre `https://wa.me/5547997660991` numa nova aba.
- [x] 5.4 Apagar `src/assets/logo/logo.svg`. Verificar: `grep -rn "logo.svg" src` não retorna nada.
- [x] 5.5 Rodar `npm run check` e `npm run build` sem erros.

## 6. Verificação final

- [x] 6.1 Com `astro dev --background`, abrir `/` em 375, 768 e 1440 px. Verificar: Nav, área vazia em fundo branco e rodapé em off-white, sem nada do Lumos e sem scroll horizontal.
- [x] 6.2 Rodar a auditoria de acessibilidade do Lighthouse (ou axe) em `/` no build de produção (`npm run preview`). Verificar: nenhuma falha de `color-contrast`, de `html-has-lang` ou de nome acessível em links e botões.
- [x] 6.3 Abrir `/dados_atendimento_itapoa.md` e `/example-components` no preview. Verificar: as duas URLs retornam a página 404.
- [x] 6.4 Na página 404, ativar "Dúvidas" no Nav. Verificar: abre `/#duvidas` na página inicial.
- [x] 6.5 Rodar `openspec validate identidade-visual` sem erros.
- [x] 6.6 Rodar `npm run check` e `npm run build` sem erros.
