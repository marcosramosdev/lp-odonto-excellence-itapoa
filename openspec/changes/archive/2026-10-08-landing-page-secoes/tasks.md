## 1. Imagens e placeholders

- [x] 1.1 Baixar as nove fotos da tabela da decisão 10 do design para `src/assets/images/`, com `curl -L -o src/assets/images/<nome>.jpg "https://images.unsplash.com/photo-<ID>?w=2400&q=85&fm=jpg"`. Verificar: os nove arquivos existem, abrem como JPEG e têm 2400 px de largura.
- [x] 1.2 Abrir cada foto e conferir o alt da tabela da decisão 10. Corrigir o alt no design se a foto mostrar outra coisa. Verificar: cada alt descreve o que a foto mostra, em pt-BR, sem afirmar que é a clínica de Itapoá.
- [x] 1.3 Criar os quatro SVGs de `src/assets/images/placeholders/` (decisão 6): fundo `#ede6dd`, rótulo centralizado em `#1c1c1a` com 70% de opacidade, `font-family="Inter, system-ui, sans-serif"`, `preserveAspectRatio="xMidYMid slice"`, 3:2 para as fotos e 1:1 para o formulário. Verificar: abrir cada SVG no navegador e ler o rótulo inteiro, sem corte.
- [x] 1.4 Rodar `npm run check` e `npm run build` sem erros.

## 2. Tokens, padrões e CheckList

- [x] 2.1 Em `src/styles/base.css`: `--radius-main: 0.5rem`, `--section-space-medium-max: 128` e `strong, b { font-weight: var(--primary-medium); }` (decisões 5 e 8). Verificar: `grep -n "radius-main\|section-space-medium-max\|strong" src/styles/base.css` mostra os valores novos.
- [x] 2.2 Em `src/components/typography/Eyebrow.astro`, trocar o `background-color: currentcolor` de `.eyebrow_marker` por `var(--heading-accent)` (decisão 4). Verificar no navegador: o marcador do eyebrow fica vermelho escuro e o texto continua preto.
- [x] 2.3 Criar `src/components/typography/CheckList.astro` (decisão 7): props `render`, `items`, `variant` (`stack` | `inline`), `class` e `...rest`, nessa ordem, com doc comments iguais aos dos outros componentes. `<ul class="check-list_wrap">`, `<li class="check-list_item">` com o `Icon` de `check.svg` dentro de `<span class="check-list_mark" aria-hidden="true">`, e CSS em `<style is:global>` sob `@layer components`, sem `px`. Nada é renderizado com `render={false}` ou `items` vazio. Verificar: rodar a skill `lumos-audit-props` (ou conferir à mão) e ver a ordem e as descrições das props iguais às da biblioteca.
- [x] 2.4 Adicionar a animação de entrada em `src/styles/patterns.css`, exatamente como na decisão 9 (`screen and (prefers-reduced-motion: no-preference)`, `@supports (animation-timeline: view())`, Hero excluído). Verificar: `grep -n "section-reveal" src/styles/patterns.css` mostra a regra e os keyframes.
- [x] 2.5 Rodar `npm run check` e `npm run build` sem erros.

## 3. Seções do Hero a Como funciona

- [x] 3.1 Montar o Hero em `src/pages/index.astro` (decisão 2): eyebrow, `h1`, subtítulo, "Agendar minha avaliação" → `#agendar`, "Conhecer os tratamentos" (`variant="link"`) → `#tratamentos`, `CheckList variant="inline"` com os três selos e a foto com `loading="eager"` e `fetchPriority="high"`. Verificar: em 1440 × 900, título, subtítulo, os dois CTAs e a foto aparecem sem rolar; `dist/index.html` tem exatamente um `<h1`.
- [x] 3.2 Montar a Faixa de credibilidade com `background-2`, `paddingTop="small"`, `paddingBottom="small"` e `Grid small={2} large={4}`, a partir de um array. Verificar: em 1440 px, quatro itens numa linha; em 375 px, uma coluna; a legenda da rede aparece com os colchetes da copy.
- [x] 3.3 Montar A clínica com `id="clinica"`: colunas com texto e foto, e `Grid medium={3}` com os três pilares. Verificar: textos iguais à seção 4 da copy e foto 3:2 com cantos discretos.
- [x] 3.4 Montar Tratamentos com `id="tratamentos"` e `background-2`: cabeçalho e `Grid medium={2} large={3}` com seis `Card variant="stacked"` a partir de um array (decisão 5). O card Prótese usa `foto-protese.svg`. Verificar: seis cards na ordem da copy, cada um com título, benefício em peso 500 e texto; "Quero avaliar este tratamento" leva a `#agendar`; o card inteiro é clicável.
- [x] 3.5 Montar A experiência com `ContentWrapper variant="sticky-visual"`: cabeçalho, `Grid small={2}` com os seis itens e a foto 1:1. Verificar: em 1440 px, a foto fica fixa enquanto os itens rolam; em 375 px, tudo numa coluna.
- [x] 3.6 Montar Como funciona com `id="como-funciona"` e `background-2`: cabeçalho, `Grid medium={2} large={4}` com os passos numerados de 1 a 4 e "Começar agora" → `#agendar`. Verificar: passos na ordem da copy e um por coluna em 1440 px.
- [x] 3.7 Rodar `npm run check` e `npm run build` sem erros.

## 4. Seções do Investimento à Localização

- [x] 4.1 Montar Investimento: colunas com eyebrow e título à esquerda; texto, `CheckList` e "Agendar minha avaliação" → `#agendar` à direita. Verificar: textos iguais à seção 8 da copy e nenhum preço ou forma de pagamento.
- [x] 4.2 Montar Equipe (`background-2`) e Depoimentos com `render={false}` e a marcação da decisão 2: seis cards de equipe com `foto-retrato-equipe.svg` e três cards de depoimento com os placeholders da copy. Verificar: `grep -c "Especialistas que acompanham\|Quem já sorri" dist/index.html` retorna 0. Ligar `render` temporariamente, conferir no navegador que as duas seções aparecem certas, e desligar de novo.
- [x] 4.3 Montar Dúvidas com `id="duvidas"`, `background-2` e `ContentWrapper variant="sticky-content"`: `Accordion` com as nove perguntas da copy a partir de um array. Verificar: cada pergunta abre e fecha com clique, com Enter e com Espaço, e também com o JavaScript desativado.
- [x] 4.4 Montar Agende sua avaliação com `id="agendar"` (decisão 2): colunas com `column2Class="ratio-4-5"`, `Grid medium={2}` com `formulario.svg` e o `<address>` (endereço, horários e Instagram em nova aba), e a foto em retrato. Verificar: em 768 px e 1440 px, placeholder e informações lado a lado; em 375 px, placeholder antes das informações; o Instagram abre `https://www.instagram.com/odontoexcellence_itapoa/` numa nova aba.
- [x] 4.5 Montar Localização com `id="localizacao"` e `background-2`: endereço com CEP, horários em `RichText` com `<ul>`, "Como chegar" com `emphasis="secondary"`, `target="_blank"`, `rel="noopener"` e o link da copy, e `foto-fachada.svg`. Verificar: o botão abre o Google Maps no endereço da clínica numa nova aba e `grep -c "<iframe" dist/index.html` retorna 0.
- [x] 4.6 Rodar `npm run check` e `npm run build` sem erros.

## 5. Verificação final

- [x] 5.1 Comparar o texto de cada seção com as seções 2 a 13 da copy, palavra por palavra. Verificar: nenhuma diferença; `grep -o "\[[^]]*\]" dist/index.html` lista só as pendências da copy (fora o `[\`class\`]` do script inline do `Accordion`); `grep -ciE 'gratuita|48x|12x|R\$|SPC|Serasa' dist/index.html` (aspas simples) retorna 0.
- [x] 5.2 Com `astro dev --background`, abrir `/` em 320, 375, 768, 1024 e 1440 px. Verificar: `document.documentElement.scrollWidth === window.innerWidth` em todas as larguras, uma coluna em 375 px, nada cortado ou sobreposto, fundos alternando branco e off-white e nenhum bloco vermelho fora dos botões.
- [x] 5.3 Ativar cada link do Nav e da barra de CTA mobile. Verificar: cada um leva à sua seção, com o início dela visível abaixo do Nav.
- [x] 5.4 Rolar a página no Chrome com movimento normal e depois com `prefers-reduced-motion: reduce` emulado no DevTools. Verificar: no primeiro caso, os blocos abaixo do Hero entram com fade sutil e o Hero não anima; no segundo, nada anima. No Firefox, todo o conteúdo aparece sem animação.
- [x] 5.5 Rodar a auditoria de acessibilidade do Lighthouse (ou axe) em `/` no build de produção (`npm run preview`). Verificar: nenhuma falha de contraste, de alt, de ordem de títulos ou de nome acessível; nenhuma requisição para `images.unsplash.com` ou para o Google Maps na aba Network.
- [x] 5.6 Rodar `openspec validate landing-page-secoes` sem erros.
- [x] 5.7 Rodar `npm run check` e `npm run build` sem erros.

## 6. Polimento e tipografia Poppins

- [x] 6.1 Polimento visual (decisão 11): espaço entre linhas do `Grid` em `--space-7`, selos do Hero um por linha (variante em linha do `CheckList` removida), Hero com `paddingTop="small"`, legenda da faixa em `margin-top-3 color-faded`, sublinhado, barra de rolagem e cursor da paleta, e curva de saída exponencial na animação. Verificar: em 1440 × 900, o Hero cabe sem rolar; em 390 px, os grupos de texto não ficam colados; o detector do Impeccable não acusa nada.
- [x] 6.2 Trocar toda a tipografia para Poppins 400/500/600 (decisão 11): `astro.config.mjs`, `BaseHead.astro`, tokens de `base.css` (família, pesos, escala, entrelinha, espaçamento entre letras e corte medido), peso 500 no `Button` e no `Eyebrow`, `strong` em 500 e SVGs dos placeholders. Verificar: `dist/_astro/fonts/` tem só os três arquivos da Poppins; `grep -rn "Cormorant\|font-inter\|secondary-" src astro.config.mjs` não retorna nada; nenhuma requisição a `fonts.googleapis.com` ou `fonts.gstatic.com`.
- [x] 6.3 Rodar `npm run check`, `npm run build` e `openspec validate landing-page-secoes` sem erros.
- [x] 6.4 Fundo branco no site inteiro (decisão 3, substituída): tirar `class="background-2"` das seções de `index.astro` e trocar o fundo do `Footer.astro` para `var(--background)`. Verificar: no navegador, todas as seções, o rodapé, o Nav e a barra de CTA mobile medem `rgb(255, 255, 255)`; `npm run check` e `npm run build` sem erros.
- [x] 6.5 Trocar o placeholder da fachada pela foto real `src/assets/images/faixada_itapoa.webp` na Localização, em 4:5 (`column2Class="ratio-4-5"`), com alt "Fachada da Odonto Excellence Itapoá, com o letreiro da clínica e a entrada de vidro". Apagar `foto-fachada.svg`. Verificar: o letreiro aparece inteiro em 390 px e em 1440 px; `npm run check` e `npm run build` sem erros.
- [x] 6.6 Agende sua avaliação sem foto e centralizada: `ContentWrapper centered`, placeholder do formulário com 480 px de largura máxima e informações abaixo dele, foto `agendar-sorriso.jpg` apagada e "Itapoá - SC" com espaços inseparáveis. Verificar: em 1440 px e 390 px, tudo centralizado e sem foto; sem scroll horizontal de 320 a 1440 px; `npm run check` e `npm run build` sem erros.
- [x] 6.7 Alinhar os specs às edições do cliente: legenda "+de 17 anos de história" na faixa, título "Com estacionamento próprio" na Localização (`landing-page`) e rodapé sem CNPJ (`estrutura-global`, requisito "Rodapé" modificado). Verificar: `openspec validate landing-page-secoes` sem erros.
