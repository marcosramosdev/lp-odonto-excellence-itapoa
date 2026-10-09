## ADDED Requirements

### Requirement: Formulário de agendamento

A seção `#agendar` e o modal de agendamento DEVEM ter, cada um, o mesmo formulário, com os textos da seção 12 de `docs/copy-landing-page.md`, nesta ordem:

- o campo de texto "Seu nome", com o placeholder "Como podemos te chamar?";
- o campo de seleção "Tratamento de interesse", com o placeholder "Selecione um tratamento" e as sete opções da copy;
- o botão "Agendar pelo WhatsApp";
- logo abaixo do botão, a microcopy "Você será direcionado ao WhatsApp da clínica, (47) 99766-0991. Seus dados não ficam armazenados neste site."

As opções DEVEM aparecer nesta ordem, cada uma com o identificador abaixo:

| Opção | Identificador |
|---|---|
| Implante dentário | `implante` |
| Prótese dentária | `protese` |
| Ortodontia (aparelho ou alinhadores) | `ortodontia` |
| Clínico geral (limpeza, restauração, cárie) | `clinico-geral` |
| Tratamento de canal | `canal` |
| Gengiva (periodontia) | `gengiva` |
| Ainda não sei, quero uma avaliação geral | `avaliacao-geral` |

Os dois campos DEVEM ter label visível ligado ao campo e DEVEM ser marcados como obrigatórios. Cada formulário DEVE validar e enviar só os próprios campos. O formulário DEVE funcionar só com o teclado. O botão DEVE ter área de toque de pelo menos 44 × 44 px. O site NÃO DEVE ter backend para o formulário, e NÃO DEVE guardar o que foi digitado em cookie, `localStorage` ou servidor.

#### Scenario: Campos e textos

- **WHEN** o usuário rola até `#agendar`
- **THEN** vê o campo "Seu nome", o campo "Tratamento de interesse", o botão "Agendar pelo WhatsApp" e a microcopy de privacidade, com os textos da copy
- **AND** nenhum campo vem preenchido

#### Scenario: Opções do serviço

- **WHEN** o usuário abre "Tratamento de interesse"
- **THEN** vê as sete opções da copy, na ordem da copy, de "Implante dentário" a "Ainda não sei, quero uma avaliação geral"

#### Scenario: Labels

- **WHEN** um leitor de tela chega a cada campo
- **THEN** anuncia o label visível do campo e que ele é obrigatório

#### Scenario: Área de toque

- **WHEN** o formulário é exibido em 375 px
- **THEN** o botão "Agendar pelo WhatsApp" mede pelo menos 44 px de altura e 44 px de largura

#### Scenario: Teclado

- **WHEN** o usuário preenche os campos e chega ao botão só com Tab
- **AND** pressiona Enter no botão
- **THEN** o formulário é enviado

#### Scenario: Nada armazenado

- **WHEN** o usuário envia o formulário
- **THEN** o site não faz requisição ao próprio domínio nem grava o nome ou o serviço em cookie ou `localStorage`

### Requirement: Modal de agendamento

Com JavaScript ativo, os CTAs de agendamento fora da seção `#agendar` DEVEM abrir um modal de agendamento em vez de rolar a página:

- o botão "Agendar avaliação" do Nav;
- o botão "Agendar avaliação" da barra fixa no mobile;
- "Agendar minha avaliação" no Hero e no Investimento;
- "Começar agora" em Como funciona;
- "Quero avaliar este tratamento" nos cards de Tratamentos.

O modal DEVE ficar centralizado, sobre um fundo escurecido, e DEVE exibir:

- o título "Seu novo sorriso começa com uma conversa.";
- o texto da seção 12 da copy;
- o formulário de agendamento.

O modal DEVE ter o nome acessível "Agende sua avaliação". Ao abrir, o foco DEVE ir para dentro do modal, e a página atrás dele NÃO DEVE rolar. Fechar o modal (botão "Fechar", Esc ou clique fora dele) DEVE devolver o foco ao CTA que o abriu. Depois de um envio válido, o modal DEVE fechar, e o WhatsApp abre numa nova aba. O que foi digitado no modal DEVE continuar nos campos se ele for aberto de novo.

Sem JavaScript, os mesmos CTAs DEVEM levar à seção `#agendar`. Fora da página inicial, os CTAs do Nav e da barra mobile DEVEM continuar levando a `/#agendar`.

#### Scenario: CTA abre o modal

- **WHEN** o usuário ativa "Agendar minha avaliação" no Hero, por clique, toque ou Enter
- **THEN** o modal abre com o título, o texto e o formulário
- **AND** a página continua na mesma posição atrás do modal

#### Scenario: Todos os CTAs

- **WHEN** o usuário ativa qualquer CTA da lista, em qualquer largura de tela em que ele aparece
- **THEN** o mesmo modal abre

#### Scenario: Fechar o modal

- **WHEN** o modal está aberto e o usuário pressiona Esc, ativa "Fechar" ou clica fora do modal
- **THEN** o modal fecha, e o foco volta ao CTA que o abriu

#### Scenario: Envio pelo modal

- **WHEN** o usuário envia um formulário válido pelo modal
- **THEN** o WhatsApp abre numa nova aba com a mensagem da copy
- **AND** o modal fecha na aba do site

#### Scenario: Erro no modal

- **WHEN** o usuário envia o formulário do modal com os campos vazios
- **THEN** o modal continua aberto, com os erros da copy, e o foco vai para "Seu nome"

#### Scenario: Seção continua com o formulário

- **WHEN** o usuário rola até `#agendar`
- **THEN** vê o formulário na própria seção, sem abrir o modal

#### Scenario: Modal sem JavaScript

- **WHEN** o JavaScript está desativado e o usuário ativa um CTA da lista
- **THEN** a página rola até `#agendar`

### Requirement: Validação do formulário

O formulário DEVE validar os campos com as regras nativas do HTML antes de abrir o WhatsApp:

- "Seu nome" é obrigatório e, sem os espaços do início e do fim, DEVE ter de 2 a 60 caracteres;
- "Tratamento de interesse" é obrigatório.

Com JavaScript ativo, cada campo inválido DEVE mostrar, logo abaixo dele, a mensagem de erro da copy:

- "Seu nome": "Digite seu nome para continuar.";
- "Tratamento de interesse": "Escolha um tratamento para continuar."

A mensagem DEVE estar ligada ao campo por `aria-describedby`, e o campo DEVE ser marcado com `aria-invalid="true"`. O foco DEVE ir para o primeiro campo inválido. A mensagem de um campo DEVE sumir assim que ele ficar válido. Sem JavaScript, o navegador DEVE continuar bloqueando o envio com as mesmas regras.

#### Scenario: Campos vazios

- **WHEN** o usuário ativa "Agendar pelo WhatsApp" com os dois campos vazios
- **THEN** o WhatsApp não abre
- **AND** aparecem "Digite seu nome para continuar." abaixo de "Seu nome" e "Escolha um tratamento para continuar." abaixo de "Tratamento de interesse"
- **AND** o foco vai para "Seu nome"

#### Scenario: Erro anunciado

- **WHEN** o foco vai para um campo inválido
- **THEN** o leitor de tela anuncia o label do campo e a mensagem de erro dele

#### Scenario: Só o serviço faltando

- **WHEN** o usuário envia com o nome preenchido e sem serviço
- **THEN** só "Escolha um tratamento para continuar." aparece, e o foco vai para "Tratamento de interesse"

#### Scenario: Nome curto ou só com espaços

- **WHEN** o usuário envia com o nome "A", ou "  A  ", ou só espaços
- **THEN** aparece "Digite seu nome para continuar." e o WhatsApp não abre

#### Scenario: Nome longo

- **WHEN** o usuário digita ou cola mais de 60 caracteres em "Seu nome"
- **THEN** o campo aceita só os 60 primeiros

#### Scenario: Erro some ao corrigir

- **WHEN** um campo mostra erro e o usuário o preenche com um valor válido
- **THEN** a mensagem de erro dele some, e o campo deixa de estar marcado como inválido

#### Scenario: Sem JavaScript

- **WHEN** o JavaScript está desativado e o usuário envia com os campos vazios
- **THEN** o navegador bloqueia o envio e aponta o primeiro campo vazio

### Requirement: Mensagem enviada ao WhatsApp

Ao enviar um formulário válido, o site DEVE abrir `https://wa.me/5547997660991` numa nova aba, com a mensagem no parâmetro `text`, codificada para URL. A mensagem DEVE seguir o template da copy, com `{nome}` igual ao nome digitado, sem os espaços do início e do fim e com cada sequência de espaços reduzida a um só:

- para um serviço: `Olá! Meu nome é {nome}. Vim pelo site e gostaria de agendar uma avaliação para {trecho}.`;
- para "Ainda não sei, quero uma avaliação geral": `Olá! Meu nome é {nome}. Vim pelo site e gostaria de agendar uma avaliação.`

O `{trecho}` de cada opção DEVE ser o da copy:

| Opção | Trecho |
|---|---|
| Implante dentário | implante dentário |
| Prótese dentária | prótese dentária |
| Ortodontia (aparelho ou alinhadores) | ortodontia (aparelho ou alinhadores) |
| Clínico geral (limpeza, restauração, cárie) | clínico geral (limpeza, restauração ou cárie) |
| Tratamento de canal | tratamento de canal |
| Gengiva (periodontia) | tratamento de gengiva |

Acentos e caracteres especiais do nome, como `&`, `#`, `?`, `+` e `'`, DEVEM chegar ao WhatsApp exatamente como foram digitados. A página do site DEVE continuar aberta na aba original.

Se `window.dataLayer` existir, o envio DEVE adicionar a ele `{ event: "lead_whatsapp", servico: "<identificador>" }`, com o identificador da opção escolhida. O nome NÃO DEVE ir para o `dataLayer`. O site NÃO DEVE carregar script de terceiros para isso. Se `window.dataLayer` não existir, o envio DEVE funcionar igual, sem erro.

#### Scenario: Mensagem com serviço

- **WHEN** o usuário envia "Maria" com "Implante dentário"
- **THEN** abre numa nova aba o WhatsApp da clínica, (47) 99766-0991, com a mensagem "Olá! Meu nome é Maria. Vim pelo site e gostaria de agendar uma avaliação para implante dentário."

#### Scenario: Mensagem sem serviço

- **WHEN** o usuário envia "Maria" com "Ainda não sei, quero uma avaliação geral"
- **THEN** a mensagem é "Olá! Meu nome é Maria. Vim pelo site e gostaria de agendar uma avaliação."

#### Scenario: Nome com espaços extras

- **WHEN** o usuário envia "  Ana   Paula  " com "Tratamento de canal"
- **THEN** a mensagem é "Olá! Meu nome é Ana Paula. Vim pelo site e gostaria de agendar uma avaliação para tratamento de canal."

#### Scenario: Acentos e caracteres especiais

- **WHEN** o usuário envia "João D'Ávila & Cia #1?" com "Gengiva (periodontia)"
- **THEN** a mensagem é "Olá! Meu nome é João D'Ávila & Cia #1?. Vim pelo site e gostaria de agendar uma avaliação para tratamento de gengiva."

#### Scenario: Evento de lead

- **WHEN** a página tem `window.dataLayer` e o usuário envia o formulário com "Ortodontia (aparelho ou alinhadores)"
- **THEN** o último item do `dataLayer` é `{ event: "lead_whatsapp", servico: "ortodontia" }`
- **AND** nenhum item do `dataLayer` contém o nome digitado

#### Scenario: Sem dataLayer

- **WHEN** a página não tem `window.dataLayer` e o usuário envia o formulário
- **THEN** o WhatsApp abre normalmente e o console não mostra erro

#### Scenario: Teste da mensagem

- **WHEN** o desenvolvedor roda `npm test`
- **THEN** os testes da mensagem passam: com serviço, com "Ainda não sei" e com nome que tem acentos e caracteres especiais

## MODIFIED Requirements

### Requirement: Agende sua avaliação

A seção `#agendar` DEVE exibir, nesta ordem:

- o eyebrow "Agende sua avaliação";
- o título "Seu novo sorriso começa com uma conversa.";
- o texto da seção 12 da copy;
- o formulário de agendamento;
- o endereço, os horários e o Instagram da clínica.

A seção NÃO DEVE ter foto. Eyebrow, título, texto e informações da clínica DEVEM ficar centralizados numa coluna. O formulário DEVE ficar no centro dessa coluna, com os labels, os campos e os erros alinhados à esquerda. O placeholder do formulário NÃO DEVE mais aparecer.

#### Scenario: Lugar do formulário

- **WHEN** o usuário rola até `#agendar`
- **THEN** vê, nesta ordem, o eyebrow, o título, o texto, o formulário e as informações da clínica
- **AND** a seção não tem foto nem o rótulo "FORMULÁRIO: nome e tratamento de interesse"

#### Scenario: Informações da clínica

- **WHEN** o usuário rola até `#agendar`
- **THEN** vê "Av. Celso Ramos, 512 — Cambijú, Itapoá - SC", "Seg. a sex.: 9h às 20h · Sáb.: 9h às 17h" e "Instagram: @odontoexcellence_itapoa"
- **WHEN** o usuário ativa o Instagram
- **THEN** o perfil da clínica abre numa nova aba

### Requirement: Tratamentos

A seção `#tratamentos` DEVE exibir o eyebrow, o título e a introdução da seção 5 da copy e seis cards, na ordem da copy: Implantes dentários, Ortodontia, Prótese dentária, Clínico geral, Tratamento de canal e Gengiva (periodontia). Cada card DEVE ter foto ou placeholder, título, benefício, texto e o link "Quero avaliar este tratamento", com destino `#agendar`.

Com JavaScript ativo, ativar o link de um card DEVE abrir o modal de agendamento com a opção do card já selecionada em "Tratamento de interesse":

| Card | Opção selecionada |
|---|---|
| Implantes dentários | Implante dentário |
| Ortodontia | Ortodontia (aparelho ou alinhadores) |
| Prótese dentária | Prótese dentária |
| Clínico geral | Clínico geral (limpeza, restauração, cárie) |
| Tratamento de canal | Tratamento de canal |
| Gengiva (periodontia) | Gengiva (periodontia) |

A seleção NÃO DEVE apagar o nome já digitado. Sem JavaScript, o link leva a `#agendar`, sem selecionar o serviço.

#### Scenario: Seis cards

- **WHEN** o usuário rola até `#tratamentos`
- **THEN** vê os seis cards com título, benefício e texto da copy

#### Scenario: Link do card

- **WHEN** o usuário ativa "Quero avaliar este tratamento" no card "Implantes dentários", por clique, toque ou Enter
- **THEN** o modal de agendamento abre
- **AND** "Tratamento de interesse" mostra "Implante dentário"

#### Scenario: Trocar de card

- **WHEN** o usuário fecha o modal e ativa o link de outro card
- **THEN** o modal abre de novo, e "Tratamento de interesse" mostra a opção do último card ativado
- **AND** o nome digitado antes continua no campo

#### Scenario: Card sem foto

- **WHEN** o card "Prótese dentária" é exibido
- **THEN** no lugar da foto aparece um placeholder neutro com o rótulo visível "FOTO: prótese ou paciente sorrindo"

### Requirement: Ordem e âncoras das seções

A página inicial DEVE exibir, entre o Nav e o rodapé, as seções nesta ordem: Hero, Faixa de credibilidade, A clínica, Tratamentos, A experiência, Como funciona, Investimento, Equipe, Depoimentos, Dúvidas, Agende sua avaliação e Localização. As seções DEVEM ter as âncoras `#clinica` (A clínica), `#tratamentos` (Tratamentos), `#como-funciona` (Como funciona), `#duvidas` (Dúvidas), `#agendar` (Agende sua avaliação) e `#localizacao` (Localização).

#### Scenario: Ordem das seções visíveis

- **WHEN** o usuário abre `/`
- **THEN** as seções visíveis aparecem na ordem Hero, Faixa de credibilidade, A clínica, Tratamentos, A experiência, Como funciona, Investimento, Depoimentos, Dúvidas, Agende sua avaliação e Localização

#### Scenario: Links do Nav chegam às seções

- **WHEN** o usuário ativa "Tratamentos", "A clínica", "Como funciona", "Dúvidas" ou "Localização" no Nav
- **THEN** a página rola até a seção correspondente, com o início dela visível abaixo do Nav

#### Scenario: CTA do Nav

- **WHEN** o usuário ativa "Agendar avaliação" no Nav da página inicial
- **THEN** o modal de agendamento abre
- **WHEN** o JavaScript está desativado e o usuário ativa "Agendar avaliação"
- **THEN** a página rola até `#agendar`, com o início da seção visível abaixo do Nav

### Requirement: Como funciona

A seção `#como-funciona` DEVE exibir o eyebrow, o título e os quatro passos da seção 7 da copy, numerados de 1 a 4 e na ordem da copy, e o botão "Começar agora", com destino `#agendar`. Com JavaScript ativo, o botão DEVE abrir o modal de agendamento.

#### Scenario: Passos em ordem

- **WHEN** o usuário rola até `#como-funciona`
- **THEN** vê os passos 1 "Conte o que você procura", 2 "Fale com a recepção no WhatsApp", 3 "Faça sua avaliação" e 4 "Receba seu plano", nessa ordem

#### Scenario: CTA da seção

- **WHEN** o usuário ativa "Começar agora"
- **THEN** o modal de agendamento abre
- **WHEN** o JavaScript está desativado e o usuário ativa "Começar agora"
- **THEN** a página rola até `#agendar`

### Requirement: Visual de alto padrão

Todas as seções e o rodapé DEVEM ter fundo branco. A separação entre seções vem do espaço em branco. O vermelho da marca DEVE aparecer só nestes lugares:

- botões de CTA;
- o botão de play do depoimento em vídeo;
- links em hover;
- mensagens de erro do formulário e a borda do campo inválido;
- detalhes pequenos, como marcadores e ícones.

Nenhuma seção, card ou faixa DEVE ter fundo vermelho. Os botões de CTA vermelhos DEVEM levar ao agendamento: abrir o modal de agendamento ou, sem JavaScript, rolar até `#agendar`. Há duas exceções: o botão de play, que abre o vídeo, e o botão "Agendar pelo WhatsApp", que envia o formulário. O botão "Como chegar" DEVE usar a ênfase secundária, sem fundo vermelho. Texto vermelho sobre o branco DEVE ter contraste de pelo menos 4,5:1.

#### Scenario: Fundo branco

- **WHEN** o usuário rola a página inicial até o rodapé
- **THEN** todas as seções e o rodapé têm fundo branco

#### Scenario: Vermelho só em destaques

- **WHEN** a página inicial é exibida
- **THEN** nenhum bloco com fundo vermelho aparece, exceto os botões de CTA, o botão "Agendar pelo WhatsApp" e o botão circular de play do depoimento

#### Scenario: Erro legível

- **WHEN** uma mensagem de erro do formulário aparece
- **THEN** o texto vermelho tem contraste de pelo menos 4,5:1 com o fundo
