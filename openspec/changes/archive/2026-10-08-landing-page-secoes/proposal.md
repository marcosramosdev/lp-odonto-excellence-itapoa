## Why

A página inicial está vazia: só Nav e rodapé, já na identidade da marca. Os links do Nav (`#tratamentos`, `#clinica`, `#como-funciona`, `#duvidas`, `#localizacao`, `#agendar`) ainda não levam a lugar nenhum. Esta mudança monta a landing page com os textos de `docs/copy-landing-page.md` e o visual de alto padrão da marca. Ela também reserva o lugar do formulário, que chega na mudança `formulario-whatsapp`.

## What Changes

- `src/pages/index.astro` passa a ter as seções 2 a 13 da copy, nesta ordem: Hero, Faixa de credibilidade, A clínica, Tratamentos, A experiência, Como funciona, Investimento, Equipe, Depoimentos, Dúvidas, Agende sua avaliação e Localização.
- Âncoras `#clinica`, `#tratamentos`, `#como-funciona`, `#duvidas`, `#agendar` e `#localizacao` nas seções correspondentes.
- Textos exatamente como na copy, inclusive as pendências entre `[colchetes]`, que ficam visíveis para a revisão.
- Visual de alto padrão: muito respiro, títulos em serifa, fundos alternando entre branco e off-white, fotos grandes com cantos discretos. O vermelho #de1f26 fica só nos CTAs e em detalhes pequenos, nunca em blocos grandes.
- Fotos do "Mapa de imagens" da copy baixadas do Unsplash para `src/assets/images/` e servidas pelo `Img` (`astro:assets`), com alt text descritivo em pt-BR.
- Slots sem foto (Prótese, Localização e retratos da Equipe) recebem um placeholder neutro com rótulo visível, como "FOTO: fachada da clínica". Basta trocar um arquivo para pôr a foto real.
- Equipe e Depoimentos ficam com a marcação pronta e `render={false}`, fora do HTML, até haver fotos, nomes e depoimentos reais.
- Dúvidas usa o `Accordion` do Lumos.
- `#agendar` reserva o lugar do formulário com um placeholder. A lógica do formulário fica para a mudança `formulario-whatsapp`.
- Localização com o botão "Como chegar", que abre o link do Google Maps da copy. Sem iframe de mapa.
- Animação de entrada sutil das seções ao rolar a página, só em CSS. Fica desligada com `prefers-reduced-motion: reduce` e em navegadores sem suporte.
- Layout mobile-first, sem scroll horizontal de 320 px a 1440 px.
- **BREAKING (spec):** o requisito "Página inicial vazia" de `estrutura-global` sai, porque a página inicial deixa de ser vazia.

## Capabilities

### New Capabilities

- `landing-page`: conteúdo, ordem, âncoras, imagens, placeholders, seções ocultas, animação e comportamento responsivo das seções 2 a 13 da página inicial.

### Modified Capabilities

- `estrutura-global`: remove o requisito "Página inicial vazia". A página inicial passa a ser descrita por `landing-page`.
- `identidade-visual`: "Tipografia da marca" passa a ser só Poppins, com hierarquia por tamanho e peso, no lugar de serifa nos títulos e Inter no texto. Pedido do cliente depois da implementação.

## Impact

- **Código:** `src/pages/index.astro` (todas as seções). Um componente novo, `src/components/typography/CheckList.astro`, para as listas com ícone de check do Hero e do Investimento. Ajustes pontuais de token e padrão em `src/styles/base.css` (raio, peso do `strong`, respiro das seções) e `src/styles/patterns.css` (animação de entrada). O marcador do `Eyebrow` passa a usar a cor de destaque. O `Card` `stacked` passa a manter a proporção 3:2 da foto, qualquer que seja a proporção do arquivo. Tipografia trocada para Poppins em `astro.config.mjs`, `BaseHead.astro` e nos tokens de `base.css`, com peso 500 no `Button` e no `Eyebrow`. O `Grid` ganha espaço entre linhas próprio.
- **Assets:** novas fotos em `src/assets/images/` e quatro placeholders SVG (três fotos e o formulário) em `src/assets/images/placeholders/`.
- **Dependências:** nenhuma nova.
- **Fora do escopo:** lógica do formulário (`formulario-whatsapp`) e otimização de performance (`otimizar-performance`).
- **Pendências que continuam bloqueando a publicação:** números da rede, cidades do FAQ, fotos reais da clínica e da equipe, depoimentos e o link do Google. Todas aparecem no site entre colchetes ou como placeholder.
