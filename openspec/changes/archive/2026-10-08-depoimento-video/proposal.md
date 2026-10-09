## Why

A seção Depoimentos estava oculta à espera de três depoimentos reais. A clínica enviou um vídeo real de uma paciente da rede (Áurea, 30 s, vertical, com legendas embutidas). Ele dá à página a prova social e o tom emocional que faltavam. A seção foi construída antes desta proposta, a pedido do cliente. Esta mudança registra o comportamento nos specs e define como verificar o que já está no código.

## What Changes

- A seção Depoimentos passa a aparecer na página, centralizada, entre Investimento e Dúvidas. Ela traz o eyebrow "Pacientes" e o título "Quem já sorri com a gente" da copy, um card com um quadro do vídeo e o botão de play, a frase real da paciente "Eu achava que nunca mais ia sorrir com confiança." e a legenda "Áurea, paciente da rede Odonto Excellence".
- Ao ativar o card, o vídeo abre num modal centralizado. O card se expande até virar o player (view transition, quando o navegador suporta) e o vídeo toca com som e controles. Fechar pausa o vídeo, volta ao início e devolve o foco ao card.
- O vídeo é servido pelo próprio site, comprimido para caber no limite de 25 MiB por arquivo da Cloudflare. O original de 48,8 MB fica fora do build.
- Os cards de depoimento em texto e o link "Ver avaliações no Google" continuam no código, ocultos, até haver três depoimentos escritos reais.
- O `Modal` do Lumos ganha a variante `media`: sem painel, do tamanho da mídia, com o botão de fechar visível sobre ela.
- Novo componente de conteúdo `TestimonialVideo`, com CSS e script próprios.
- Mais respiro em todo o site, só por tokens: margens laterais, espaço entre seções e entre título e conteúdo. É visual, sem mudança de requisito.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `landing-page`: a ordem das seções visíveis inclui Depoimentos. "Equipe e Depoimentos ocultos" vira "Equipe oculta" mais o novo requisito "Depoimento em vídeo". "Textos da copy" aceita a frase e a legenda do vídeo. "Imagens" trata o quadro do vídeo no botão como decorativo. "Visual de alto padrão" admite o botão de play vermelho, que não leva a `#agendar`.

## Impact

- **Código:** `src/pages/index.astro` (seção Depoimentos), `src/components/content/TestimonialVideo.astro` (novo), `src/components/interactive/Modal.astro` (variante `media`), `src/styles/base.css` (tokens de espaço).
- **Assets:** `src/assets/videos/depoimento-aurea.mp4` (720 × 1280, 8,8 MB) e `src/assets/images/depoimento-aurea-poster.jpg`. O original `src/assets/images/OE-Depoimento Aurea.mp4` não é importado nem publicado, mas entra no git se for commitado.
- **Dependências:** nenhuma no projeto. A compressão usou um `ffmpeg` temporário, fora do repositório.
- **Conformidade (CFO):** o vídeo contém "sem dor", "no mesmo dia" e uma foto de antes do tratamento. O texto da página usa só a frase emocional. A autorização da paciente e o aval do responsável técnico precisam ser confirmados antes de publicar.
