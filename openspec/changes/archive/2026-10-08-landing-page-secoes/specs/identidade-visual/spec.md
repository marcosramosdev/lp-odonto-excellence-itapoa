## REMOVED Requirements

### Requirement: Tipografia da marca

**Reason**: O cliente pediu uma família só, a Poppins, com a hierarquia por tamanho e peso. Saem a serifa nos títulos e a Inter no texto.

**Migration**: Substituído pelo requisito "Tipografia em Poppins". Os cenários de fontes servidas pelo próprio site, acentos e texto visível durante o carregamento continuam lá.

## ADDED Requirements

### Requirement: Tipografia em Poppins

Todo o texto do site DEVE usar uma única família, a Poppins: títulos, texto corrido, navegação, botões, rótulos e listas. A hierarquia DEVE vir só de tamanho e peso, em três pesos: 600 para títulos (display e h1 a h6), 500 para elementos de interface e ênfase (navegação, botões, eyebrows e `strong`) e 400 para o texto corrido. A fonte DEVE ser servida pelo próprio domínio do site, só com os pesos usados e com o subconjunto latino, que cobre os acentos do português.

#### Scenario: Uma família só

- **WHEN** a página exibe qualquer texto
- **THEN** ele é renderizado na Poppins
- **AND** nenhuma outra família da web é carregada

#### Scenario: Hierarquia por tamanho e peso

- **WHEN** a página exibe um título de nível display a h6
- **THEN** ele é renderizado na Poppins com peso 600
- **WHEN** a página exibe um link da navegação, um botão ou um eyebrow
- **THEN** ele é renderizado com peso 500
- **WHEN** a página exibe um parágrafo
- **THEN** ele é renderizado com peso 400

#### Scenario: Fontes servidas pelo próprio site

- **WHEN** a página carrega em produção
- **THEN** nenhuma requisição de fonte vai para domínios de terceiros, como fonts.googleapis.com ou fonts.gstatic.com

#### Scenario: Acentos do português

- **WHEN** um texto contém "á", "ã", "ç", "é", "ê", "í", "ó", "õ" ou "ú"
- **THEN** os caracteres são renderizados na mesma fonte do restante do texto

#### Scenario: Texto visível durante o carregamento da fonte

- **WHEN** a fonte da web ainda não terminou de carregar
- **THEN** o texto já aparece numa fonte de fallback, sem ficar invisível
