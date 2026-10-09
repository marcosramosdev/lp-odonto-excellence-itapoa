## Context

Motivação em `proposal.md`. Requisitos em `specs/landing-page/spec.md`.

A implementação já está no código. Ela foi feita a pedido do cliente, antes desta proposta. Este design registra as decisões tomadas, para a verificação e para quem mexer depois.

Estado de partida que moldou a solução:

- O vídeo original (`OE-Depoimento Aurea.mp4`) tem 1080 × 1920, 30 s e 48,8 MB, com legendas embutidas e logo da rede no fim. A Cloudflare limita cada arquivo estático a 25 MiB, então o original quebraria o deploy.
- O vídeo foi gravado em outra unidade: a fachada mostra `www.odontoexcellence.com.br` e o nº 3576, diferente da fachada de Itapoá.
- As legendas embutidas dão a transcrição completa: "Eu achava que nunca mais ia sorrir com confiança, até chegar na Odonto Excellence. Fiz o implante protocolo com carga imediata e no mesmo dia já saí com meu novo sorriso. Foi rápido, sem dor, e a equipe me acolheu como se eu fosse da família. Hoje eu posso comer, falar, sorrir sem medo. Mudou minha vida. Se você deseja sorrir com confiança como eu, vem para Odonto Excellence."
- O Lumos já tem `Video` (o `<video>` nativo, com proporção por variante), `Modal` (`<dialog>` nativo com abertura animada, fecha por botão, Esc e clique fora, e devolve o foco) e `Img`.
- A seção Depoimentos já existia no código com `render={false}`, com cards de texto e o link do Google como placeholders.

## Goals / Non-Goals

**Goals:**

- Seção emocional e centralizada, que convida a assistir sem confundir: um card e uma ação.
- Abertura que pareça física: o card cresce até virar o player.
- Reaproveitar `Video`, `Modal`, `Img` e `Icon`. CSS e script novos só no componente de conteúdo e numa variante do `Modal`.
- Vídeo publicável na Cloudflare e baixado só sob demanda.

**Non-Goals:**

- Legendas em faixa `<track>`. O vídeo já tem legendas embutidas.
- Fechamento com animação reversa (do player de volta ao card). O fechamento usa o fade do fundo.
- Vários vídeos ou carrossel. O componente serve um vídeo por instância.
- Formatos alternativos (WebM/AV1), `srcset` de vídeo e streaming adaptativo. Ficam para a mudança `otimizar-performance`, se os números pedirem.

## Decisions

### 1. Componente de conteúdo `TestimonialVideo`

`src/components/content/TestimonialVideo.astro`, raiz `.testimonial-video_wrap` (um `<figure>`). Ele tem CSS e script próprios, o que justifica o componente (LUMOS.md).

- Props, na ordem da biblioteca: `render`, `src` (URL do vídeo), `poster` (`ImageMetadata`), `quote`, `caption`, `duration`, `class`, `...rest`. Sem `src` ou `poster`, não renderiza nada.
- Marcação:
  - `<button class="testimonial-video_trigger">` com o quadro (`Img` com `alt=""` dentro de `<span class="testimonial-video_visual">`), o círculo de play (`Icon` dentro de `<span class="testimonial-video_play">`) e o rótulo "Assistir ao depoimento" + duração. O nome acessível vem do texto visível.
  - `<blockquote>` com a frase, em `text-style-h3`.
  - `<figcaption>` com a legenda, em `text-style-small` e `--text-2`.
  - `Modal variant="media"` com `<div class="testimonial-video_player">` em volta do `Video`.
- O `Video` usa `variant="custom" ratio="9 / 16"`, `autoplay={false}`, `muted={false}`, `loop={false}`, `controls` e `preload="none"`. O `poster` é a URL WebP de 720 px gerada com `getImage`, para o modal mostrar o mesmo quadro antes de o vídeo carregar.
- Os textos do card ("Assistir ao depoimento") ficam no componente. Frase, legenda e duração são props.

*Rejeitado:* `Button variant="play"`. Ele é um botão de alternância, com `aria-pressed`, para tocar e pausar no lugar. Aqui o botão abre um diálogo, e o card inteiro é a área de clique.

### 2. Abertura com view transition

Ao clicar, o script dá `view-transition-name: testimonial-video` ao quadro do card. Dentro de `document.startViewTransition`, tira o nome do quadro, passa para o `.testimonial-video_player`, chama `modal.showModal()` e `video.play()`. Ao fim da transição, o nome sai do player.

- `::view-transition-group(testimonial-video)`: 0,55 s, `cubic-bezier(0.22, 1, 0.36, 1)`, `border-radius` e `overflow: clip`. Os pseudo old/new usam `height: 100%; object-fit: cover`, para o card 4:5 crescer até o player 9:16 sem distorcer.
- Sem `startViewTransition` ou com `prefers-reduced-motion: reduce`, só `showModal()` e `play()`.
- O `play()` acontece dentro do gesto do usuário, então o vídeo toca com som.
- Ao fechar (evento `close` do `<dialog>`), o script pausa o vídeo e volta para `currentTime = 0`. O `<dialog>` nativo devolve o foco ao card.

*Rejeitado:* `data-modal-open` do `Modal`. Ele abre o diálogo pelo script da biblioteca, sem lugar para a view transition nem para o `play()`.

### 3. Variante `media` do `Modal`

O `Modal` ganha `variant="media"`, uma versão da biblioteca para mostrar mídia, não um seletor custom:

- `--_from: 0 0`: sem deslocamento vertical na abertura.
- `.modal_content`: `width: auto`, `max-width: 100%` e fundo transparente. Ele envolve a mídia e mantém o raio e o `overflow: hidden`.
- Aberto, sem transição de opacidade (`.modal_wrap.media[open] .modal_content { transition: none; }`). A view transition captura o estado final na hora, e o card cresce direto até o vídeo visível. Ao fechar, vale a transição de opacidade padrão, então o vídeo some em fade.
- `.modal_body` sem padding.
- `.modal_close` com fundo `--background` (via `--button-2-background` e `--button-2-border`), no canto de cima, por dentro do vídeo, visível sobre qualquer quadro.

### 4. Tamanho do player

`.testimonial-video_player { width: min(100vw - 2 × margem, (100svh - 2 × margem) × 9 / 16) }`. O vídeo ocupa 100% dessa largura com proporção 9:16, então cabe na tela em qualquer orientação. Fica com 398 × 708 em 1440 × 900 e 341 × 605 em 390 × 844, com as margens da decisão 8.

*Rejeitado:* `min(100%, …)`. O conteúdo do modal tem largura automática, então a porcentagem não tinha base fixa. O painel ficava mais largo que o vídeo, e o botão de fechar flutuava fora dele.

### 5. Card

- Largura `min(100%, 24rem)` e proporção 4:5, com a sombra suave do site, raio `--radius-main` e gradiente escuro na base para o rótulo branco.
- O play é um círculo vermelho de 4,5rem (`--button-background`), com `padding-inline-start: 0.16em` no próprio círculo, que desloca o ícone 0,08em para a direita e o centraliza opticamente sem estilizar o `Icon` da biblioteca por baixo de uma classe custom. Um anel branco pulsa a cada 2,4 s. Com movimento reduzido, a regra global zera a animação.
- Hover: o quadro cresce 4% e o play 8%, e o play passa ao vermelho escuro.
- O vermelho no play é uma exceção registrada no spec ("Visual de alto padrão"): é a ação principal desta seção, embora não leve a `#agendar`.

### 6. Textos e conformidade

- **Frase em destaque:** "Eu achava que nunca mais ia sorrir com confiança." É emocional e não promete resultado. As falas "sem dor" e "no mesmo dia" ficam só dentro do vídeo, e a autorização precisa ser confirmada (Open Questions).
- **Legenda:** "Áurea, paciente da rede Odonto Excellence". Não diz Itapoá, porque o vídeo é de outra unidade. Escolha do cliente.
- **Título:** "Quem já sorri com a gente", da copy. Os cards de texto e o link do Google ficam com `render={false}` na mesma seção.

### 7. Vídeo e quadro

- Compressão com um `ffmpeg` temporário (pacote `ffmpeg-static` instalado no scratchpad, fora do projeto): `scale=720:1280`, H.264 High, CRF 24, preset `slow`, AAC 128 kbps, `+faststart`. Resultado: `src/assets/videos/depoimento-aurea.mp4`, 8,8 MB.
- O arquivo é importado no `.astro`, e o Vite emite `/_astro/depoimento-aurea.<hash>.mp4`, com cache imutável.
- Quadro do card: o segundo 5,4, em que a paciente sorri e não há legenda embutida. Ele vira `src/assets/images/depoimento-aurea-poster.jpg`, em 1080 × 1920, e o `Img` gera as variantes otimizadas.
- O original (`src/assets/images/OE-Depoimento Aurea.mp4`) não é importado nem publicado. Ele não deve ser commitado (Open Questions).

### 8. Mais respiro no site (registro)

Feito no mesmo período, só por tokens de `base.css`, sem mudar requisito:

| Token | Antes → depois (px, min → max) |
|---|---|
| `--site-margin` | 16 → 48 · 20 → 96 |
| `--section-space-medium` | 64 → 128 · 88 → 168 |
| `--section-space-small` | 48 → 80 · 56 → 104 |
| `--space-8` | 40 → 64 · 56 → 96 |
| `--h2-margin-bottom` | `--space-5` → `--space-6` |

O conteúdo em 1440 px passa de 1344 para 1248 de largura. O Hero continua cabendo em 1440 × 900 (fim do conteúdo em 845).

## Risks / Trade-offs

- [O vídeo tem falas que soam como promessa de resultado ("sem dor", "no mesmo dia") e uma foto de antes] → A página usa só a frase emocional. A publicação depende do aval do responsável técnico e da autorização da paciente.
- [Paciente de outra unidade numa página de Itapoá] → Legenda "paciente da rede". O título da copy ("com a gente") é genérico o bastante para a rede. Trocar quando houver depoimento de Itapoá.
- [8,8 MB ainda é pesado no 4G] → `preload="none"`: só baixa quando o usuário abre. A mudança `otimizar-performance` pode baixar mais com WebM/AV1 ou CRF maior.
- [Original de 48,8 MB dentro de `src/assets/images/`] → Não vai para o build, mas pesa no git. Mover para fora do repositório ou adicionar ao `.gitignore`.
- [Sem fechamento reverso] → O fade do fundo basta. Animar a volta exigiria interceptar os três modos de fechar do `Modal`.
- [View transition sem suporte em navegadores antigos] → O modal abre do mesmo jeito, só sem a expansão.

## Migration Plan

Mudança só de frontend estático. Deploy normal pela Cloudflare. Rollback: `git revert` do commit, ou `render={false}` na seção Depoimentos para escondê-la sem deploy de código novo.

## Open Questions

- **Grafia do nome:** "Áurea" (com acento) ou "Aurea", como no nome do arquivo. Basta trocar a prop `caption`.
- **Autorização e aval:** termo de uso de imagem da paciente e aval do responsável técnico para o conteúdo do vídeo. Não muda código. Bloqueia a publicação.
- **Destino do original de 48,8 MB:** fora do repositório ou no `.gitignore`. Decisão do cliente.
