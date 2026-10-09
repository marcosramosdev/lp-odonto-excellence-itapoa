## Purpose

Define o conteúdo e o comportamento da página inicial da Odonto Excellence Itapoá: as seções 2 a 13 de `docs/copy-landing-page.md`, sua ordem, âncoras, imagens, placeholders, seções ocultas, animação de entrada e comportamento responsivo.

## ADDED Requirements

### Requirement: Ordem e âncoras das seções

A página inicial DEVE exibir, entre o Nav e o rodapé, as seções nesta ordem: Hero, Faixa de credibilidade, A clínica, Tratamentos, A experiência, Como funciona, Investimento, Equipe, Depoimentos, Dúvidas, Agende sua avaliação e Localização. As seções DEVEM ter as âncoras `#clinica` (A clínica), `#tratamentos` (Tratamentos), `#como-funciona` (Como funciona), `#duvidas` (Dúvidas), `#agendar` (Agende sua avaliação) e `#localizacao` (Localização).

#### Scenario: Ordem das seções visíveis

- **WHEN** o usuário abre `/`
- **THEN** as seções visíveis aparecem na ordem Hero, Faixa de credibilidade, A clínica, Tratamentos, A experiência, Como funciona, Investimento, Dúvidas, Agende sua avaliação e Localização

#### Scenario: Links do Nav chegam às seções

- **WHEN** o usuário ativa "Tratamentos", "A clínica", "Como funciona", "Dúvidas", "Localização" ou "Agendar avaliação" no Nav
- **THEN** a página rola até a seção correspondente, com o início dela visível abaixo do Nav

### Requirement: Textos da copy

Todo texto visível das seções DEVE ser idêntico ao das seções 2 a 13 de `docs/copy-landing-page.md`, na versão conforme do CFO (não a variante comercial), exceto dois ajustes feitos pelo cliente: a legenda "+de 17 anos de história" na Faixa de credibilidade e o título "Com estacionamento próprio" na Localização. Nenhum texto, número ou depoimento DEVE ser inventado. Os itens entre `[colchetes]` da copy DEVEM aparecer como estão, colchetes incluídos, para ficarem visíveis na revisão. A página NÃO DEVE exibir preços, gratuidade nem formas de pagamento.

#### Scenario: Pendências visíveis

- **WHEN** o revisor procura `[` no HTML gerado da página inicial
- **THEN** encontra as pendências da copy que continuam abertas, como "[confirmar cidades]"

#### Scenario: Publicidade conforme o CFO

- **WHEN** a página inicial é carregada
- **THEN** ela não contém "gratuita", "48x", "12x", "R$", "SPC" nem "Serasa"

### Requirement: Hero

O Hero DEVE exibir o eyebrow "Odonto Excellence · Itapoá, SC", o único `h1` da página ("Odontologia de alto padrão, com o tempo que o seu sorriso merece."), o subtítulo, o botão primário "Agendar minha avaliação" (destino `#agendar`), o link secundário "Conhecer os tratamentos" (destino `#tratamentos`), os três selos da copy e a foto do Hero.

#### Scenario: Primeira dobra

- **WHEN** o usuário abre `/` numa tela de 1440 × 900 px
- **THEN** vê o título, o subtítulo, o botão "Agendar minha avaliação", o link "Conhecer os tratamentos" e a foto do Hero sem rolar

#### Scenario: Título único

- **WHEN** a página inicial é carregada
- **THEN** existe exatamente um `h1`, com o texto do Hero

#### Scenario: Selos

- **WHEN** o Hero é exibido
- **THEN** aparecem "Avaliação inicial sem compromisso", "6 especialistas na equipe" e "Segunda a sábado, até 20h nos dias úteis"

### Requirement: Faixa de credibilidade

A faixa DEVE exibir, sem título, os quatro destaques da seção 3 da copy, cada um com seu número ou rótulo ("6", "6", "Seg. a sáb.", "Rede Odonto Excellence") e sua legenda. A legenda de "Rede Odonto Excellence" DEVE ser "+de 17 anos de história". Em telas de 64rem ou mais, os quatro DEVEM ficar lado a lado.

#### Scenario: Quatro destaques lado a lado

- **WHEN** a largura da tela é de 64rem ou mais
- **THEN** os quatro destaques aparecem numa única linha

### Requirement: A clínica

A seção `#clinica` DEVE exibir o eyebrow "A clínica", o título "Cada sorriso é único. O seu plano também.", os dois parágrafos, os três pilares ("Sem pressa", "Plano sob medida", "Tudo em um lugar", cada um com seu texto) e a foto do consultório.

#### Scenario: Conteúdo da seção

- **WHEN** o usuário rola até `#clinica`
- **THEN** vê os textos da seção 4 da copy, os três pilares e a foto do consultório

### Requirement: Tratamentos

A seção `#tratamentos` DEVE exibir o eyebrow, o título e a introdução da seção 5 da copy e seis cards, na ordem da copy: Implantes dentários, Ortodontia, Prótese dentária, Clínico geral, Tratamento de canal e Gengiva (periodontia). Cada card DEVE ter foto ou placeholder, título, benefício, texto e o link "Quero avaliar este tratamento", com destino `#agendar`.

#### Scenario: Seis cards

- **WHEN** o usuário rola até `#tratamentos`
- **THEN** vê os seis cards com título, benefício e texto da copy

#### Scenario: Link do card

- **WHEN** o usuário ativa "Quero avaliar este tratamento" em qualquer card
- **THEN** a página rola até `#agendar`

#### Scenario: Card sem foto

- **WHEN** o card "Prótese dentária" é exibido
- **THEN** no lugar da foto aparece um placeholder neutro com o rótulo visível "FOTO: prótese ou paciente sorrindo"

### Requirement: A experiência

A seção A experiência DEVE exibir o eyebrow "A experiência", o título "Alto padrão é ser bem cuidado do começo ao fim", os seis itens da seção 6 da copy, cada um com título e texto, e a foto do dentista explicando o raio-x.

#### Scenario: Seis itens

- **WHEN** o usuário rola até A experiência
- **THEN** vê os seis itens, de "Avaliação sem cronômetro" a "Remarcação sem custo", e a foto

### Requirement: Como funciona

A seção `#como-funciona` DEVE exibir o eyebrow, o título e os quatro passos da seção 7 da copy, numerados de 1 a 4 e na ordem da copy, e o botão "Começar agora", com destino `#agendar`.

#### Scenario: Passos em ordem

- **WHEN** o usuário rola até `#como-funciona`
- **THEN** vê os passos 1 "Conte o que você procura", 2 "Fale com a recepção no WhatsApp", 3 "Faça sua avaliação" e 4 "Receba seu plano", nessa ordem

#### Scenario: CTA da seção

- **WHEN** o usuário ativa "Começar agora"
- **THEN** a página rola até `#agendar`

### Requirement: Investimento

A seção Investimento DEVE exibir o eyebrow "Investimento", o título "Um plano que cabe no seu momento", o texto, os três itens da lista da seção 8 da copy e o botão "Agendar minha avaliação", com destino `#agendar`.

#### Scenario: Conteúdo conforme

- **WHEN** o usuário rola até Investimento
- **THEN** vê "Valor transparente antes de começar", "Condições de pagamento apresentadas na avaliação" e "Atendimento particular, com o tempo que cada caso pede"
- **AND** nenhum preço ou forma de pagamento

### Requirement: Equipe e Depoimentos ocultos até haver conteúdo real

As seções Equipe e Depoimentos DEVEM existir no código com os textos e os placeholders das seções 9 e 10 da copy, mas NÃO DEVEM aparecer no HTML publicado enquanto a clínica não enviar fotos, nomes e CRO da equipe e pelo menos três depoimentos reais autorizados. Exibir cada seção DEVE exigir só trocar o conteúdo e ligar a renderização dela.

#### Scenario: Seções fora do HTML

- **WHEN** a página inicial é gerada
- **THEN** o HTML não contém "Especialistas que acompanham você em cada etapa" nem "Quem já sorri com a gente"

### Requirement: Dúvidas frequentes

A seção `#duvidas` DEVE exibir o eyebrow "Dúvidas", o título "Dúvidas frequentes" e as nove perguntas da seção 11 da copy, na ordem da copy, num acordeão. Cada resposta DEVE começar oculta e aparecer ao ativar a pergunta. O acordeão DEVE funcionar por teclado e sem JavaScript.

#### Scenario: Abrir uma pergunta

- **WHEN** o usuário ativa "Quanto custa o tratamento?"
- **THEN** a resposta da copy aparece logo abaixo da pergunta

#### Scenario: Teclado

- **WHEN** o usuário chega a uma pergunta com Tab e pressiona Enter ou Espaço
- **THEN** a resposta abre ou fecha

#### Scenario: Sem JavaScript

- **WHEN** o JavaScript está desativado
- **THEN** as perguntas continuam abrindo e fechando

### Requirement: Agende sua avaliação

A seção `#agendar` DEVE exibir o eyebrow "Agende sua avaliação", o título "Seu novo sorriso começa com uma conversa.", o texto da seção 12 da copy, o endereço, os horários e o Instagram da clínica, sem foto. Todo o conteúdo DEVE ficar centralizado numa coluna. O lugar do formulário DEVE ser reservado por um placeholder neutro com rótulo visível, até a mudança `formulario-whatsapp` trazer o formulário.

#### Scenario: Lugar do formulário

- **WHEN** o usuário rola até `#agendar`
- **THEN** vê, centralizados e nesta ordem, o eyebrow, o título, o texto, um bloco neutro com rótulo visível indicando o formulário e as informações da clínica
- **AND** a seção não tem foto

#### Scenario: Informações da clínica

- **WHEN** o usuário rola até `#agendar`
- **THEN** vê "Av. Celso Ramos, 512 — Cambijú, Itapoá - SC", "Seg. a sex.: 9h às 20h · Sáb.: 9h às 17h" e "Instagram: @odontoexcellence_itapoa"
- **WHEN** o usuário ativa o Instagram
- **THEN** o perfil da clínica abre numa nova aba

### Requirement: Localização

A seção `#localizacao` DEVE exibir o eyebrow "Localização", o título "Com estacionamento próprio", o endereço com CEP, os três horários da seção 13 da copy, o botão "Como chegar" e a foto da fachada da clínica, com alt descritivo. O botão DEVE abrir `https://www.google.com/maps/search/?api=1&query=Av.+Celso+Ramos,+512,+Cambiju,+Itapo%C3%A1+-+SC` numa nova aba. A seção NÃO DEVE carregar mapa incorporado.

#### Scenario: Como chegar

- **WHEN** o usuário ativa "Como chegar"
- **THEN** o Google Maps abre numa nova aba com o endereço da clínica

#### Scenario: Sem mapa incorporado

- **WHEN** a página inicial é carregada
- **THEN** nenhuma requisição vai para domínios do Google Maps e a página não tem `iframe`

### Requirement: Imagens

As fotos do "Mapa de imagens" da copy DEVEM ser servidas pelo próprio site, otimizadas no build, sem requisição a `images.unsplash.com`. Toda foto DEVE ter alt text descritivo em pt-BR. Slots sem foto DEVEM exibir um placeholder neutro com rótulo visível no formato "FOTO: <descrição>", cujo alt repete o rótulo. Fotos e placeholders DEVEM ter cantos arredondados discretos.

#### Scenario: Fotos do próprio domínio

- **WHEN** a página inicial carrega em produção
- **THEN** nenhuma imagem vem de `images.unsplash.com`

#### Scenario: Alt text

- **WHEN** um leitor de tela chega a uma foto
- **THEN** anuncia uma descrição em português do que a foto mostra

#### Scenario: Placeholder

- **WHEN** um slot ainda não tem foto real
- **THEN** exibe um bloco neutro, sem vermelho, com o rótulo "FOTO: …" legível

### Requirement: Visual de alto padrão

Todas as seções e o rodapé DEVEM ter fundo branco. A separação entre seções vem do espaço em branco. O vermelho da marca DEVE aparecer só em botões de CTA, links em hover e detalhes pequenos, como marcadores e ícones. Nenhuma seção, card ou faixa DEVE ter fundo vermelho. Os botões de CTA vermelhos DEVEM levar a `#agendar`. O botão "Como chegar" DEVE usar a ênfase secundária, sem fundo vermelho.

#### Scenario: Fundo branco

- **WHEN** o usuário rola a página inicial até o rodapé
- **THEN** todas as seções e o rodapé têm fundo branco

#### Scenario: Vermelho só em destaques

- **WHEN** a página inicial é exibida
- **THEN** nenhum bloco com fundo vermelho aparece, exceto os botões de CTA

### Requirement: Animação de entrada

O conteúdo das seções abaixo do Hero DEVE entrar com uma animação sutil (fade e leve deslocamento vertical) ao aparecer na tela durante a rolagem, feita só em CSS. Com `prefers-reduced-motion: reduce`, NÃO DEVE haver animação. Em navegadores sem suporte, o conteúdo DEVE aparecer normalmente, sem animação. O Hero NÃO DEVE ser animado.

#### Scenario: Movimento reduzido

- **WHEN** o sistema do usuário pede movimento reduzido
- **THEN** todo o conteúdo aparece sem animação ao rolar

#### Scenario: Navegador sem suporte

- **WHEN** o navegador não suporta animação ligada à rolagem
- **THEN** todo o conteúdo fica visível, sem animação

#### Scenario: Sem JavaScript

- **WHEN** o JavaScript está desativado
- **THEN** a animação continua igual

### Requirement: Layout responsivo

A página DEVE ser mobile-first e NÃO DEVE ter scroll horizontal em nenhuma largura de 320 px a 1440 px. Em 375 px, cada seção DEVE ficar numa coluna. Em 1440 px, o conteúdo DEVE respeitar a largura máxima do site.

#### Scenario: Sem scroll horizontal

- **WHEN** a página inicial é aberta em 320, 375, 768, 1024 ou 1440 px
- **THEN** a largura do documento é igual à da janela

#### Scenario: Mobile

- **WHEN** a página inicial é aberta em 375 px
- **THEN** textos, fotos e cards ficam numa coluna, sem texto cortado ou sobreposto
