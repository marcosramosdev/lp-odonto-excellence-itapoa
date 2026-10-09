## Context

Motivação em `proposal.md`. Requisitos em `specs/landing-page/spec.md`.

Estado atual que molda a solução:

- `src/pages/index.astro` tem só `<Layout />`. Nav, rodapé, barra de CTA mobile, tokens de cor e fontes já estão prontos (mudança `identidade-visual`). `html { scroll-padding-top: var(--nav-height) }` já evita que as âncoras fiquem sob o Nav.
- Componentes do Lumos que cobrem quase tudo: `Section` (aceita `id`, `class` de utilitário e `render`), `ContentWrapper` (variantes `stack`, `columns`, `sticky-content` e `sticky-visual`), `Grid` (breakpoints 30rem, 48rem e 64rem), `Card` (variante `stacked`: foto 3:2 em cima e link no pé, com o card inteiro clicável), `Accordion`/`AccordionItem` (sobre `<details>`, funciona sem JS e por teclado), `Img`, `Button`, `ButtonWrapper`, `Eyebrow`, `Heading`, `Paragraph` e `RichText` (listas com marcador).
- No `ContentWrapper`, uma coluna que só contém `Img` vira uma "visual lock": proporção `--_visual-ratio` (3:2 por padrão, 1:1 em `sticky-*`), cantos `--radius-small` e imagem em `cover`. Um utilitário `ratio-*` na coluna (`column2Class`) troca a proporção, porque a camada `utilities` vence a `components`.
- O `Card` só recebe a imagem como fonte (`image`), não por slot. Um placeholder para um card precisa então ser um arquivo de imagem.
- `Img` aceita SVG importado (passa direto, sem otimizar). O style guide já usa assim.
- `base.css` zera listas (`list-style: none`). Não há regra para `strong`: o navegador pede peso 700, que não é carregado (na época, só Inter 400/500), e sintetiza um negrito falso.
- `base.css` já tem `@media (prefers-reduced-motion: reduce)` com `animation-duration: 0.01ms !important`. Isso **não** desliga animações ligadas à rolagem (`animation-timeline: view()`): nelas o progresso vem da rolagem, não do tempo.
- Proporções das fotos, medidas no Unsplash: Hero e A clínica 3:2, A experiência 4:3, Agende sua avaliação 4:5 (retrato), Ortodontia ~1,41:1. Todas as URLs do "Mapa de imagens" respondem 200.

## Goals / Non-Goals

**Goals:**

- Montar a página só com componentes existentes, mais um componente pequeno com CSS próprio (`CheckList`).
- Ajustar o visual por tokens e padrões globais, sem CSS na página e sem classe custom em componente de biblioteca.
- Cada placeholder trocável por foto real mudando um `import` (e o alt) num só lugar.

**Non-Goals:**

- Formulário e a passagem do serviço escolhido no card para o `select` (mudança `formulario-whatsapp`).
- Peso das imagens, `srcset`/`sizes` finos, preload e formatos AVIF/WebP (mudança `otimizar-performance`). Só o Hero recebe `loading="eager"` e `fetchPriority="high"`, que custam uma linha e já são o comportamento correto.
- Title e meta description específicos da página, JSON-LD e `og:image` (mudança `seo-local`).
- Baixar a foto "A clínica (alternativa)". Não é usada. Baixe quando for trocar.

## Decisions

### 1. Página composta de componentes; repetições viram arrays

`index.astro` monta as 12 seções em sequência, com uma linha de comentário rotulando cada uma (LUMOS.md). Itens repetidos (destaques da faixa, pilares, tratamentos, itens da experiência, passos, perguntas, cards da equipe e dos depoimentos) ficam em arrays no frontmatter da página e são renderizados com `.map()`. Assim, cada combinação de componentes e props aparece uma vez no código, e os textos ficam em dados fáceis de conferir contra a copy.

*Rejeitado:* um componente por seção (`HeroHome`, `TratamentosGrid`…). LUMOS.md só admite componente custom com CSS ou script próprio, e nenhuma seção precisa disso.

### 2. Composição de cada seção

| Seção | Fundo | Estrutura |
|---|---|---|
| Hero | branco | `ContentWrapper columns`. Coluna 1: `Eyebrow`, `Heading tag="h1"`, `Paragraph variant="large"`, `ButtonWrapper` com `Button` primário ("Agendar minha avaliação") e `Button variant="link"` ("Conhecer os tratamentos"), `CheckList` com os selos, um por linha. `Section paddingTop="small"`, para o Hero inteiro caber em 1440 × 900. Coluna 2: `Img` do Hero (3:2, `eager`, `fetchPriority="high"`). |
| Faixa de credibilidade | off-white | `Section paddingTop="small" paddingBottom="small"`, sem título. `Grid small={2} large={4}` de `ContentWrapper`, cada um com `Paragraph variant="h3"` (número ou rótulo, em estilo de título) e `Paragraph variant="small"` (legenda). Abaixo de 30rem, uma coluna: "Rede Odonto Excellence" em estilo de título não cabe em meia largura de 320 px. |
| A clínica `#clinica` | branco | `ContentWrapper columns`: coluna 1 com `Eyebrow`, `Heading`, dois `Paragraph`; coluna 2 com a foto (3:2). Abaixo, `Grid medium={3}` com os pilares: `ContentWrapper` com `Heading tag="h3" variant="h4"` e `Paragraph`. |
| Tratamentos `#tratamentos` | off-white | `ContentWrapper` (stack) com `Eyebrow`, `Heading` e a introdução (`maxWidth` em `ch`). `Grid medium={2} large={3}` com seis `Card variant="stacked"` (decisão 5). |
| A experiência | branco | `ContentWrapper sticky-visual`. Coluna 1: `Eyebrow`, `Heading` e `Grid small={2}` com os seis itens (`Heading h3/h4` + `Paragraph`). Coluna 2: a foto, 1:1, fixa ao rolar a partir de 64rem. |
| Como funciona `#como-funciona` | off-white | Cabeçalho em `ContentWrapper`. `Grid medium={2} large={4}` com os passos: `Paragraph variant="h2"` com o número ("1" a "4"), `Heading h3/h4` e `Paragraph`. `ButtonWrapper` com "Começar agora". |
| Investimento | branco | `ContentWrapper columns`. Coluna 1: `Eyebrow`, `Heading`. Coluna 2: `Paragraph`, `CheckList` (stack) e `ButtonWrapper` com "Agendar minha avaliação". |
| Equipe | (off-white) | `Section render={false}`. Cabeçalho e `Grid medium={2} large={3}` com seis `Card stacked` (placeholder de retrato, `eyebrow` "[Especialidade]", `heading` "[Nome do profissional]", `text` "CRO-SC [nº]"). |
| Depoimentos | (branco) | `Section render={false}`. Cabeçalho, `Grid large={3}` com três `Card` padrão (`heading` "[Nome], [bairro ou cidade]", `text` "“[Depoimento real]”") e `Button variant="link"` "Ver avaliações no Google" com `href` literal `[link do perfil da clínica no Google]`, para aparecer na busca por pendências. |
| Dúvidas `#duvidas` | off-white | `ContentWrapper sticky-content`. Coluna 1: `Eyebrow`, `Heading`, fixos ao rolar a partir de 64rem. Coluna 2: `Accordion` com nove `AccordionItem` (`heading` = pergunta, slot = `Paragraph` com a resposta). |
| Agende sua avaliação `#agendar` | branco | `ContentWrapper centered` (stack), sem foto, a pedido do cliente depois da implementação: `Eyebrow`, `Heading`, `Paragraph maxWidth={60}`, placeholder do formulário (decisão 6) em `Img variant="densities" width={480}` e um `<address>` com endereço, horários e o link do Instagram (`target="_blank" rel="noopener"`). O SVG `formulario.svg` tem tamanho intrínseco 480 × 480, porque `.image.densities { width: auto }` ignora o atributo `width` e usaria os 800 do arquivo. "Itapoá - SC" leva espaços inseparáveis, para "- SC" não ficar sozinho numa linha no mobile. |
| Localização `#localizacao` | off-white | `ContentWrapper columns`. Coluna 1: `Eyebrow`, `Heading`, endereço (`Paragraph`), horários (`RichText` com `<ul>`), `Button element="link" emphasis="secondary"` "Como chegar" com o link da copy, `target="_blank" rel="noopener"`. Coluna 2: placeholder "FOTO: fachada da clínica" (3:2). |

Os textos vêm literalmente da copy, colchetes incluídos. Pendências que são notas para a equipe ("— confirmar números atuais com a franqueadora", "[confirmar cidades]") aparecem como estão. É a mesma regra do "CNPJ [nº]" no rodapé: `grep "\[" dist/index.html` lista tudo o que falta antes de publicar.

### 3. Fundos alternados com o utilitário `background-2`

**Substituída depois da implementação, a pedido do cliente:** o site inteiro passa a ter fundo branco. Saem os `class="background-2"` das seções, e o rodapé passa de `var(--background-2)` para `var(--background)`. A borda superior do rodapé continua separando-o da Localização. O token `--background-2` (off-white) segue no tema para cards, campos e outros componentes. O texto abaixo registra a decisão original.

As seções em off-white recebem `class="background-2"` no `Section`. É um utilitário, permitido em instância de componente. A sequência começa pelo Hero em branco. Equipe e Depoimentos formam um par oculto, então a alternância continua certa com os dois ligados ou os dois desligados. Localização (off-white) encosta no rodapé (off-white), separados pela borda superior do rodapé.

*Rejeitado:* `main > .section:nth-of-type(even)` em `patterns.css`. Alterna sozinho, mas esconde a regra e colide com seções que usem `theme`. O utilitário explícito é mais fácil de ler.

### 4. Vermelho só em CTA e detalhe

- Botões primários (fundo #de1f26) só nos CTAs que levam a `#agendar`: "Agendar minha avaliação" (Hero e Investimento) e "Começar agora". "Conhecer os tratamentos", "Quero avaliar este tratamento" e "Ver avaliações no Google" usam `variant="link"`, cujo sublinhado fica vermelho no hover. "Como chegar" usa `emphasis="secondary"`, com contorno e sem vermelho.
- Detalhes: o marcador do `Eyebrow` passa de `currentcolor` para `var(--heading-accent)`, o vermelho escuro (#b3171d) no tema claro. É uma linha na biblioteca e marca todas as seções de forma discreta. O check do `CheckList` usa a mesma cor.
- Nenhum `theme="brand"` nem fundo vermelho em seção ou card.

### 5. Cards de Tratamentos

`Card variant="stacked"` com `heading` = título, `text` = `<strong>{benefício}</strong> {texto}`, `buttonLabel` "Quero avaliar este tratamento" e `buttonHref` `#agendar`. O benefício vira um início em destaque no mesmo parágrafo. Mantém o texto da copy e dispensa uma prop nova no `Card`.

Para o `<strong>` não sair em negrito falso, `base.css` ganha `strong, b { font-weight: var(--primary-medium); }`. A regra corrige a causa no site inteiro. `.heading-accent strong` já usa `font-weight: inherit` na camada `patterns`, que vence `base`.

Correção no `Card`, achada na implementação: no `stacked`, a altura intrínseca da foto vencia o `aspect-ratio` da `.card_visual` (o mínimo automático de altura de uma caixa com `aspect-ratio` é o conteúdo), e cada card ficava com a proporção da sua foto. A imagem passa a `position: absolute; inset: 0` dentro da `.card_visual`, como já faz a "visual lock" do `ContentWrapper`. Todas as fotos dos cards ficam em 3:2.

*Rejeitado:* benefício no `eyebrow`. O eyebrow fica acima do título e é um rótulo curto, não um subtítulo. Também rejeitado: prop `subtitle` no `Card`. Seria mudança de API da biblioteca para um uso só.

### 6. Placeholders como SVG

Quatro arquivos em `src/assets/images/placeholders/`:

| Arquivo | Rótulo | Proporção | Uso |
|---|---|---|---|
| `foto-protese.svg` | FOTO: prótese ou paciente sorrindo | 3:2 | card Prótese |
| ~~`foto-fachada.svg`~~ | FOTO: fachada da clínica | 3:2 | Localização. Substituído pela foto real `src/assets/images/faixada_itapoa.webp` (382 × 510, retrato), em 4:5 com `column2Class="ratio-4-5"`. O SVG foi apagado. |
| `foto-retrato-equipe.svg` | FOTO: retrato do profissional | 3:2 | cards da Equipe (oculta) |
| `formulario.svg` | FORMULÁRIO: nome e tratamento de interesse | 1:1 | `#agendar`, até a mudança `formulario-whatsapp` |

Cada SVG tem fundo `#ede6dd` (`--light-300`) e o rótulo centralizado em `#1c1c1a` a 70% (5,65:1 nesse fundo, conforme a tabela da `identidade-visual`), em `font-family="Poppins, system-ui, sans-serif"`. Dentro de `<img>` o SVG não carrega fontes da web e cai na sans do sistema, o que basta para um placeholder. `preserveAspectRatio="xMidYMid slice"` e rótulo curto no centro, para o corte em `cover` não cortar o texto. O `alt` repete o rótulo. Trocar pela foto real = trocar o `import` e o `alt`.

*Rejeitado:* componente `PhotoPlaceholder` com rótulo em HTML. Daria texto real, mas não entra no `Card`, que só aceita fonte de imagem, e criaria CSS novo. O SVG funciona em qualquer lugar que aceite `Img`.

### 7. `CheckList`: único componente novo

`src/components/typography/CheckList.astro`. Tem CSS próprio (ícone colorido alinhado ao texto, versão em linha), o que justifica o componente (LUMOS.md).

- Props, na ordem da biblioteca: `render`, `items: string[]`, `class`, `...rest` (`HTMLAttributes<"ul">`). Uma variante em linha chegou a existir para os selos do Hero; saiu no polimento, quando os selos passaram a ficar um por linha. Não renderiza nada com `render={false}` ou `items` vazio.
- Marcação: `<ul class="check-list_wrap">`, cada `<li class="check-list_item">` com `<span class="check-list_mark" aria-hidden="true">` contendo `<Icon src={check} variant="small" />` e o texto. A cor fica no `span` simples (`color: var(--heading-accent)`) e o ícone herda por `currentColor`. Assim nenhuma classe custom vai num componente da biblioteca.
- CSS em `<style is:global>` sob `@layer components`: lista em coluna com `gap: var(--space-3)`, ícone centrado na primeira linha (`height: 1lh`). Sem `px`.

*Rejeitado:* `RichText` com `<ul>`. Dá marcador de ponto, não de check, e não tem versão em linha. Também rejeitado: `<ul>` com utilitários. Repetiria os mesmos utilitários em cada `<li>` do Hero e do Investimento, e LUMOS.md manda transformar esse visual numa variante ou num componente.

### 8. Espaço, raio e tipografia por token

- `--radius-main`: 1rem → 0,5rem. As fotos dos cards (`Card` usa `--radius-main`) ficam com o mesmo canto discreto das fotos do `ContentWrapper` (`--radius-small`, 0,5rem).
- `--section-space-medium-max`: 112 → 128. Mais respiro entre seções no desktop, sem mexer no mobile (mínimo continua 64). O ajuste fica no token, não em `paddingTop`/`paddingBottom` repetidos em cada seção.
- `--site-gutter-min`: 16 → 24, ajuste da conferência visual. Com 16 px, os itens de texto das grades (destaques, pilares, experiência, passos) ficavam colados no mobile e no tablet. No desktop o gutter continua 32.
- Títulos de seção em `h2`. Títulos de item em `h3` com `variant="h4"`. Os títulos de card ficam em `h5`, padrão do `Card`. Família e pesos na decisão 11.
- Os valores finais saem da conferência visual em 375, 768 e 1440 px (tarefas). Qualquer ajuste vai para o token.

### 9. Animação de entrada só em CSS

Em `src/styles/patterns.css`, onde já moram os estilos de `.section`:

```css
@media screen and (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    main > .section:not(:first-child) > .container > * {
      animation: section-reveal cubic-bezier(0.16, 1, 0.3, 1) both;
      animation-timeline: view();
      animation-range: entry 0% entry 60%;
    }
  }
}

@keyframes section-reveal {
  from {
    opacity: 0;
    translate: 0 1.5rem;
  }
}
```

- Ligada à rolagem (`view()`): cada bloco entra ao aparecer na tela, sem JS e sem `IntersectionObserver`.
- `prefers-reduced-motion: no-preference` explícito, porque a regra global de `reduce` não para animações ligadas à rolagem (ver Context).
- `@supports`: sem suporte (hoje, o Firefox), o conteúdo aparece direto, sem ficar invisível.
- `screen`: na impressão, nada fica com opacidade 0.
- `:not(:first-child)` exclui o Hero. Ele não anima e a imagem LCP aparece inteira desde o início.
- Só deslocamento vertical: não cria scroll horizontal.

*Rejeitado:* animação por tempo no carregamento. Ela rodaria fora da tela, onde ninguém vê. Também rejeitado: JS com `IntersectionObserver`. O pedido é só CSS.

### 10. Fotos

Baixadas uma vez com `curl -L -o src/assets/images/<nome>.jpg "https://images.unsplash.com/photo-<ID>?w=2400&q=85&fm=jpg"`, como manda a copy:

| Arquivo | ID | Alt (pt-BR) |
|---|---|---|
| `hero-sorriso.jpg` | 1677026010083-78ec7f1b84ed | Close de um sorriso com dentes brancos e alinhados |
| `clinica-consultorio.jpg` | 1704455306251-b4634215d98f | Consultório odontológico claro, com cadeira e equipamentos |
| `experiencia-raio-x.jpg` | 1606811841689-23dfddce3e95 | Dentista mostrando uma radiografia na tela a uma paciente sentada na cadeira |
| `tratamento-implantes.jpg` | 1593022356769-11f762e25ed9 | Modelo de implante dentário entre dentes |
| `tratamento-ortodontia.jpg` | 1564420228450-d9a5bc8d6565 | Mãos segurando alinhadores transparentes e o estojo |
| `tratamento-clinico-geral.jpg` | 1606811971618-4486d14f3f99 | Exame odontológico com espelho clínico |
| `tratamento-canal.jpg` | 1588776814546-1ffcf47267a5 | Dentista analisando radiografias dentárias |
| `tratamento-gengiva.jpg` | 1606811856475-5e6fcdc6e509 | Espelho e sonda odontológicos sobre fundo branco |
| ~~`agendar-sorriso.jpg`~~ | 1548382131-e0ebb1f0cdea | Removida: a seção `#agendar` ficou sem foto, a pedido do cliente. Arquivo apagado. |

Os alts descrevem a foto, não a clínica, porque são fotos de banco. Confira cada alt abrindo a foto e corrija se ela mostrar outra coisa. A Ortodontia fica com o corte central padrão do `cover`, como pede a copy. O `Img` gera as variantes otimizadas no build e serve tudo do próprio domínio.

## Risks / Trade-offs

- [Pendências entre colchetes aparecem para o visitante] → Intencional, como o CNPJ. A publicação continua bloqueada até a clínica responder (já bloqueada por `SITE_URL` e CNPJ).
- [Fotos de banco no lugar das fotos reais da clínica] → Alts neutros, sem afirmar que é a clínica. Trocar os arquivos quando a clínica enviar as fotos.
- [Animação não roda no Firefox] → O conteúdo aparece normalmente. A animação é enfeite.
- [Conteúdo abaixo da dobra fica com opacidade 0 antes de entrar na tela] → Ao rolar, a busca do navegador ou uma âncora calcula o progresso na posição final, e o conteúdo aparece. Na impressão, a regra não vale (`screen`).
- [Alternância de fundos quebra se só uma entre Equipe e Depoimentos for ligada] → Ao ligar uma só, trocar `background-2` das seções seguintes. Fica registrado neste design.
- [Placeholder SVG usa a fonte do sistema] → Aceitável, porque é provisório.
- [Nove JPEGs de 2400 px aumentam o repositório em alguns MB] → O build gera os tamanhos menores. A mudança `otimizar-performance` revê origem e pesos.
- [`--radius-main` menor muda também os variants `contain` e `card` do `ContentWrapper`] → Nenhum deles é usado no site. O raio menor é o visual pedido.

## Migration Plan

Mudança só de frontend estático. Deploy normal pela Cloudflare. Rollback: `git revert` do commit.

## Open Questions

- **Como o card leva o serviço ao formulário** (ex.: `data-servico` no card e um listener no `#agendar`). Fica para a `formulario-whatsapp`. Os links desta mudança apontam só para `#agendar`.

### 11. Polimento visual e tipografia em Poppins

Feito depois da implementação, a pedido do cliente: polimento (`/impeccable polish`) e troca de toda a tipografia para Poppins.

**Tipografia.** Uma família só, Poppins 400/500/600, pela Fonts API do Astro (`fontProviders.google()`, subconjunto latino, fallback `sans-serif`), servida do próprio domínio. Saem a Cormorant Garamond e a Inter, e com elas os tokens `--secondary-*`. A hierarquia vem só de tamanho e peso:

| Papel | Peso | Tamanho (min → max, px) |
|---|---|---|
| display | 600 | 48 → 80 |
| h1 | 600 | 36 → 56 |
| h2 | 600 | 30 → 44 |
| h3 | 600 | 24 → 32 |
| h4 | 600 | 20 → 24 |
| h5 | 600 | 18 → 20 |
| h6 | 600 | 16 → 18 |
| texto grande | 400 | 18 → 20 |
| texto | 400 | 16 → 17 |
| texto pequeno | 400 | 14 → 15 |
| navegação, botões, eyebrow, `strong` | 500 | herdado |

- `--primary-bold` passa a 600, o peso mais forte carregado. Assim nenhum utilitário pede um 700 inexistente e o navegador não sintetiza negrito.
- Títulos com `--letter-spacing-tight` (−0,02em) e `--line-height-medium` 1,15. A Poppins é mais larga que a Cormorant, por isso a escala dos títulos encolheu.
- Corte de entrelinha medido no navegador (`measureText` com a fonte carregada): ascendente 1,05, descendente 0,35 e altura de maiúscula 0,703. Daí `--primary-trim-top` e `--primary-trim-bottom` em 0,35em.
- `strong` em 500: em 600, o início em destaque dos cards pesava mais que o título do card.
- `Button` e `Eyebrow` ganham `font-weight: var(--primary-medium)` no próprio componente.

**Polimento.**

- `Grid`: espaço entre linhas fixo em `--space-7`. Antes era o gutter, e os grupos de texto empilhados no mobile (destaques, pilares, experiência, passos) ficavam colados. O espaço entre colunas continua sendo o gutter.
- Hero: selos um por linha. Em linha, quebravam em 2 + 1 no desktop.
- Faixa de credibilidade: legenda com `margin-top-3 color-faded` (5,96:1 sobre o off-white), separada do número.
- Superfícies do navegador: `text-underline-offset: 0.25em` nos links de texto, `scrollbar-color` da paleta e `caret-color: var(--brand-600)`.
- Animação de entrada com curva de saída exponencial (`cubic-bezier(0.16, 1, 0.3, 1)`) em vez de linear.
- Mantidos, porque a copy e o pedido original os fixam: eyebrows acima dos títulos (repetem os rótulos do Nav e ajudam a orientação) e a faixa de quatro números.
