## 1. Vídeo e quadro

- [x] 1.1 Conferir `src/assets/videos/depoimento-aurea.mp4` (decisão 7). Verificar: 720 × 1280, H.264 + AAC, 30 s, no máximo 25 MiB, `moov` antes de `mdat` (faststart) e as legendas embutidas legíveis.
- [x] 1.2 Conferir `src/assets/images/depoimento-aurea-poster.jpg`. Verificar: quadro do segundo 5,4, com a paciente sorrindo e sem legenda embutida, e rosto visível no corte 4:5 do card.
- [x] 1.3 Conferir que o original não é publicado. Verificar: depois do build, `dist/` não tem arquivo acima de 25 MiB nem com "Aurea" no nome, e `grep -rn "OE-Depoimento" src` não retorna nada.
- [x] 1.4 Rodar `npm run check` e `npm run build` sem erros.

## 2. Componentes

- [x] 2.1 Revisar a variante `media` em `src/components/interactive/Modal.astro` contra a decisão 3. Verificar: as variantes `small`, `side-panel` e `full-screen` não mudam (abrir as três na página de exemplos no `astro dev`), e não há comentário fora dos permitidos pelo LUMOS.md.
- [x] 2.2 Revisar `src/components/content/TestimonialVideo.astro` contra as decisões 1, 4 e 5 e o checklist do LUMOS.md. Verificar: ordem e doc comments das props no padrão da biblioteca (`lumos-audit-props` ou conferência manual), nenhuma classe custom em componente da biblioteca, nenhum `px`, nada renderizado sem `src` ou `poster`, e CSS sob `@layer components`.
- [x] 2.3 Rodar `npm run check` e `npm run build` sem erros.

## 3. Página

- [x] 3.1 Conferir a seção Depoimentos em `src/pages/index.astro`. Verificar: aparece entre Investimento e Dúvidas, com `Section align="center"`, `ContentWrapper centered`, eyebrow e título da copy, `TestimonialVideo` com a frase, a legenda "Áurea, paciente da rede Odonto Excellence" e `duration="0:30"`, e `Grid` e `ButtonWrapper` dos depoimentos escritos com `render={false}`.
- [x] 3.2 Conferir o HTML gerado. Verificar: a ordem das seções visíveis é a do requisito "Ordem e âncoras das seções"; `dist/index.html` contém "Quem já sorri com a gente" e a frase, e não contém "Especialistas que acompanham você em cada etapa", "[Depoimento real]" nem "Ver avaliações no Google"; `grep -ciE 'gratuita|48x|12x|R\$|SPC|Serasa' dist/index.html` retorna 0.
- [x] 3.3 Rodar `npm run check` e `npm run build` sem erros.

## 4. Comportamento

- [x] 4.1 No build de produção (`npm run preview`), em 1440 × 900 e 390 × 844, ativar o card. Verificar: o modal abre centralizado sobre fundo escurecido, o vídeo toca com som e com controles, o foco vai para "Fechar", e o vídeo aparece inteiro, sem corte e sem scroll, com "Fechar" por dentro dele.
- [x] 4.2 Verificar a abertura natural no Chrome: num quadro capturado cerca de 200 ms depois do clique, o card aparece a meio caminho entre a posição original e o player.
- [x] 4.3 Fechar pelos três meios (botão "Fechar", Esc e clique fora do vídeo). Verificar: em todos, o vídeo pausa, volta ao segundo 0 e o foco volta ao card.
- [x] 4.4 Abrir pelo teclado (Tab até o card e Enter) e com `prefers-reduced-motion: reduce` emulado. Verificar: abre pelo teclado; com movimento reduzido, abre sem a expansão do card e o anel do play não pulsa.
- [x] 4.5 Verificar o carregamento sob demanda na aba Network: o `.mp4` não é pedido ao carregar a página nem ao rolar até a seção, só depois de abrir o modal.
- [x] 4.6 Rodar a auditoria de acessibilidade (axe ou Lighthouse) com o modal fechado e aberto. Verificar: nenhuma violação nova; o card é anunciado como "Assistir ao depoimento 0:30" e o diálogo como "Depoimento em vídeo de Áurea, paciente da rede Odonto Excellence".
- [x] 4.7 Rodar `npm run check` e `npm run build` sem erros.

## 5. Espaço e regressão

- [x] 5.1 Conferir os tokens de espaço da decisão 8 em `src/styles/base.css`. Verificar: em 1440 × 900, o Hero (título, subtítulo, CTAs, selos e foto) cabe sem rolar; de 320 a 1440 px não há scroll horizontal; os links do Nav continuam levando às seções, abaixo do Nav.
- [x] 5.2 Rodar o detector do Impeccable em `TestimonialVideo.astro`, `Modal.astro` e `base.css`. Verificar: nenhum achado.
- [x] 5.3 Rodar `openspec validate depoimento-video`, `npm run check` e `npm run build` sem erros.
