## Purpose

Garante que o site use a identidade da Odonto Excellence Itapoá (branco, vermelho #de1f26 e preto do logo, serifa elegante nos títulos, logo e favicon oficiais) com contraste WCAG AA em todo texto.

## ADDED Requirements

### Requirement: Paleta da marca

O site DEVE usar a paleta da marca em todas as superfícies:

- vermelho #de1f26 nas ações primárias, com texto branco;
- um vermelho mais escuro, derivado do #de1f26, no hover das ações primárias;
- branco como fundo principal da página;
- um off-white quente como fundo alternativo de seções;
- o preto do logo (#1c1c1a) como cor de texto principal e neutro escuro.

Nenhuma cor do Lumos (verde-limão #c6fb50, cinza #d9d9d9 como fundo) DEVE aparecer nas páginas.

#### Scenario: Botão primário

- **WHEN** a página exibe um botão primário, como "Agendar avaliação"
- **THEN** o fundo do botão é #de1f26 e o texto é branco

#### Scenario: Hover do botão primário

- **WHEN** o usuário passa o ponteiro sobre um botão primário
- **THEN** o fundo muda para o vermelho mais escuro da paleta e o texto continua branco

#### Scenario: Fundos de seção

- **WHEN** uma seção usa o fundo padrão
- **THEN** o fundo é branco
- **WHEN** uma seção usa o fundo alternativo
- **THEN** o fundo é o off-white quente da paleta

### Requirement: Contraste WCAG AA

Toda combinação de texto e fundo definida pelos temas do site DEVE ter contraste de pelo menos 4,5:1, incluindo texto secundário, texto de destaque e texto de botão nos estados normal e hover. O vermelho #de1f26 NÃO DEVE ser usado como cor de texto sobre o off-white, onde fica abaixo de 4,5:1. Texto de destaque em vermelho DEVE usar o vermelho mais escuro da paleta.

#### Scenario: Texto principal e secundário em fundos claros

- **WHEN** texto principal ou secundário aparece sobre branco, off-white ou o terceiro fundo claro
- **THEN** o contraste medido é de pelo menos 4,5:1

#### Scenario: Texto de destaque em vermelho

- **WHEN** um título usa a cor de destaque sobre qualquer fundo claro da paleta
- **THEN** a cor é o vermelho escuro e o contraste é de pelo menos 4,5:1

#### Scenario: Temas escuro e da marca

- **WHEN** uma seção usa o tema escuro ou o tema da marca (fundo vermelho)
- **THEN** texto principal, texto secundário, destaque e botões nesses temas também medem pelo menos 4,5:1

### Requirement: Tipografia da marca

Os títulos de destaque (display e h1 a h4) DEVEM usar uma serifa de display elegante. O texto corrido, a navegação, os botões e os títulos menores (h5 e h6) DEVEM usar a Inter. As fontes DEVEM ser servidas pelo próprio domínio do site, só com os pesos usados e com o subconjunto latino, que cobre os acentos do português.

#### Scenario: Títulos em serifa

- **WHEN** a página exibe um título de nível display, h1, h2, h3 ou h4
- **THEN** ele é renderizado na serifa de display

#### Scenario: Texto corrido em Inter

- **WHEN** a página exibe um parágrafo, um link da navegação ou um botão
- **THEN** ele é renderizado na Inter

#### Scenario: Fontes servidas pelo próprio site

- **WHEN** a página carrega em produção
- **THEN** nenhuma requisição de fonte vai para domínios de terceiros, como fonts.googleapis.com ou fonts.gstatic.com

#### Scenario: Acentos do português

- **WHEN** um texto contém "á", "ã", "ç", "é", "ê", "í", "ó", "õ" ou "ú"
- **THEN** os caracteres são renderizados na mesma fonte do restante do texto

#### Scenario: Texto visível durante o carregamento da fonte

- **WHEN** a fonte da web ainda não terminou de carregar
- **THEN** o texto já aparece numa fonte de fallback, sem ficar invisível

### Requirement: Logo oficial

O Nav e o rodapé DEVEM exibir o logo oficial da Odonto Excellence. O logo DEVE ser um link para o topo da página inicial, com nome acessível "Odonto Excellence Itapoá". O logo do Lumos NÃO DEVE aparecer em nenhuma página.

#### Scenario: Logo no Nav

- **WHEN** qualquer página é carregada
- **THEN** o Nav exibe o logo da Odonto Excellence, sem borda branca visível em volta

#### Scenario: Logo no rodapé sobre o off-white

- **WHEN** o rodapé é exibido sobre o fundo off-white
- **THEN** o logo aparece sem um retângulo branco em volta

#### Scenario: Logo leva ao topo

- **WHEN** o usuário ativa o logo
- **THEN** o navegador vai para o topo da página inicial

#### Scenario: Leitor de tela

- **WHEN** um leitor de tela chega ao link do logo
- **THEN** ele anuncia "Odonto Excellence Itapoá"

### Requirement: Favicon da marca

O site DEVE ter favicon e ícone para a tela inicial do iOS gerados a partir do símbolo vermelho do logo. Os ícones do Lumos NÃO DEVEM ser publicados.

#### Scenario: Aba do navegador

- **WHEN** o site é aberto num navegador
- **THEN** a aba mostra o símbolo vermelho da Odonto Excellence

#### Scenario: Atalho no iOS

- **WHEN** o usuário adiciona o site à tela inicial do iPhone
- **THEN** o ícone é o símbolo vermelho da Odonto Excellence
