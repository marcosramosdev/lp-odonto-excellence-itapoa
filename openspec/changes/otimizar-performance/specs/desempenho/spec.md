## Purpose

Define as metas de velocidade e de peso da página inicial da Odonto Excellence Itapoá no celular e como imagens, fontes, vídeo, scripts e assets são carregados e guardados em cache, sem mudar textos nem layout.

## ADDED Requirements

### Requirement: Metas de Core Web Vitals

A página inicial DEVE ser medida com o Lighthouse em modo mobile, na configuração padrão (celular emulado, 4G lento simulado e CPU 4× mais lenta). A medição usa o build de produção, servido por `npm run preview`, e vale a mediana de 3 execuções. Nessa medição, a página DEVE atingir:

- Performance ≥ 95;
- Acessibilidade, Boas práticas e SEO iguais a 100;
- LCP < 2,0 s;
- CLS < 0,05;
- Total Blocking Time < 200 ms.

Com a CPU 4× mais lenta, cada interação principal DEVE responder em menos de 200 ms (INP):

- abrir o modal por um CTA;
- abrir o modal pelo card de um tratamento;
- enviar o formulário vazio e ver os erros.

#### Scenario: Lighthouse mobile

- **WHEN** o Lighthouse mobile roda 3 vezes contra o build de produção
- **THEN** as medianas atingem todas as metas acima

#### Scenario: Interações

- **WHEN** o usuário faz cada interação principal com a CPU 4× mais lenta
- **THEN** a próxima pintura acontece em menos de 200 ms

### Requirement: Peso da página

Sem nenhuma interação, a carga inicial da página inicial DEVE somar menos de 1 MB transferido. O JavaScript total da página DEVE ter menos de 15 KB com gzip. A página NÃO DEVE carregar script de terceiros nem folha de estilo que bloqueie a renderização.

#### Scenario: Carga inicial

- **WHEN** a página inicial carrega no celular, sem rolagem nem clique
- **THEN** o total transferido é menor que 1 MB

#### Scenario: JavaScript

- **WHEN** a página inicial carrega
- **THEN** todo o JavaScript vem do próprio domínio e soma menos de 15 KB com gzip

#### Scenario: Sem CSS bloqueante

- **WHEN** a página inicial carrega
- **THEN** nenhuma requisição de folha de estilo atrasa a primeira pintura

### Requirement: Imagens

As fotos DEVEM ser servidas em formato otimizado, gerado no build, com `srcset` e com `sizes` adequado à largura que a foto ocupa na página. Toda imagem DEVE ter `width` e `height`. Só o logo do Nav e a foto do Hero DEVEM carregar de imediato. A foto do Hero DEVE ter prioridade alta e, num celular de 412 px de largura, NÃO DEVE passar de 120 KB. As demais imagens DEVEM usar `loading="lazy"` e `decoding="async"`.

#### Scenario: Atributos

- **WHEN** a página inicial é gerada
- **THEN** toda `<img>` tem `width`, `height` e `decoding="async"`
- **AND** só o logo do Nav e a foto do Hero não têm `loading="lazy"`

#### Scenario: Foto do Hero

- **WHEN** a página inicial abre num celular de 412 px de largura
- **THEN** a foto do Hero baixa com prioridade alta e tem no máximo 120 KB

#### Scenario: Foto do Hero no desktop

- **WHEN** a página inicial abre em 1440 px
- **THEN** a foto do Hero baixada é a variante mais próxima da largura da coluna dela, não a da tela inteira

### Requirement: Fontes

A página DEVE usar só a família Poppins, nos pesos 400, 500 e 600, no subconjunto latino e servida pelo próprio domínio. As fontes DEVEM usar `font-display: swap` e um fallback com métricas ajustadas, para o texto não pular quando a fonte chega. Só o peso 600, usado no título do Hero, DEVE ter preload.

#### Scenario: Preload

- **WHEN** a página inicial é gerada
- **THEN** o `<head>` tem um único preload de fonte, o da Poppins 600

#### Scenario: Troca de fonte sem salto

- **WHEN** as fontes chegam depois da primeira pintura
- **THEN** o CLS da página continua menor que 0,05

### Requirement: Vídeo do depoimento sob demanda

Nem o vídeo do depoimento nem o quadro de capa do player DEVEM ser baixados antes de o usuário abrir o modal do vídeo. A miniatura do card continua carregando como imagem lazy.

#### Scenario: Página carregada sem abrir o vídeo

- **WHEN** a página inicial carrega e o usuário rola até o fim, sem abrir o vídeo
- **THEN** nenhuma requisição vai para o arquivo de vídeo nem para o quadro de capa do player

#### Scenario: Abrir o vídeo

- **WHEN** o usuário abre o modal do vídeo
- **THEN** o vídeo começa a carregar e toca como antes

### Requirement: Cache dos assets

Os arquivos de `/_astro/*`, que têm hash no nome, DEVEM ser servidos com `Cache-Control: public, max-age=31536000, immutable`. O HTML NÃO DEVE receber esse cache longo.

#### Scenario: Asset com hash

- **WHEN** o navegador pede um arquivo de `/_astro/` no site publicado
- **THEN** a resposta tem `Cache-Control: public, max-age=31536000, immutable`

#### Scenario: HTML

- **WHEN** o navegador pede `/`
- **THEN** a resposta não tem `immutable`

### Requirement: Visual inalterado

As otimizações NÃO DEVEM mudar textos visíveis nem layout. Em 375 px e em 1440 px, cada seção da página inicial DEVE ter a mesma posição e o mesmo tamanho de antes, com tolerância de 1 px.

#### Scenario: Comparação com a linha de base

- **WHEN** a página inicial é aberta em 375 px e em 1440 px, antes e depois da mudança
- **THEN** a altura do documento e a caixa de cada seção diferem em no máximo 1 px
- **AND** o texto visível é o mesmo
