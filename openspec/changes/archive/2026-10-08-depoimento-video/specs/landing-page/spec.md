## MODIFIED Requirements

### Requirement: Ordem e âncoras das seções

A página inicial DEVE exibir, entre o Nav e o rodapé, as seções nesta ordem: Hero, Faixa de credibilidade, A clínica, Tratamentos, A experiência, Como funciona, Investimento, Equipe, Depoimentos, Dúvidas, Agende sua avaliação e Localização. As seções DEVEM ter as âncoras `#clinica` (A clínica), `#tratamentos` (Tratamentos), `#como-funciona` (Como funciona), `#duvidas` (Dúvidas), `#agendar` (Agende sua avaliação) e `#localizacao` (Localização).

#### Scenario: Ordem das seções visíveis

- **WHEN** o usuário abre `/`
- **THEN** as seções visíveis aparecem na ordem Hero, Faixa de credibilidade, A clínica, Tratamentos, A experiência, Como funciona, Investimento, Depoimentos, Dúvidas, Agende sua avaliação e Localização

#### Scenario: Links do Nav chegam às seções

- **WHEN** o usuário ativa "Tratamentos", "A clínica", "Como funciona", "Dúvidas", "Localização" ou "Agendar avaliação" no Nav
- **THEN** a página rola até a seção correspondente, com o início dela visível abaixo do Nav

### Requirement: Textos da copy

Todo texto visível das seções DEVE ser idêntico ao das seções 2 a 13 de `docs/copy-landing-page.md`, na versão conforme do CFO (não a variante comercial), com estas exceções:

- dois ajustes feitos pelo cliente: a legenda "+de 17 anos de história" na Faixa de credibilidade e o título "Com estacionamento próprio" na Localização;
- na seção Depoimentos, a frase "Eu achava que nunca mais ia sorrir com confiança.", transcrita do vídeo da paciente, a legenda "Áurea, paciente da rede Odonto Excellence" e o rótulo do card "Assistir ao depoimento" com a duração "0:30".

Nenhum texto, número ou depoimento DEVE ser inventado. Frases de pacientes DEVEM ser transcrições literais de material real e autorizado. Os itens entre `[colchetes]` da copy DEVEM aparecer como estão, colchetes incluídos, para ficarem visíveis na revisão. A página NÃO DEVE exibir preços, gratuidade nem formas de pagamento.

#### Scenario: Pendências visíveis

- **WHEN** o revisor procura `[` no HTML gerado da página inicial
- **THEN** encontra as pendências da copy que continuam abertas, como "[confirmar cidades]"

#### Scenario: Publicidade conforme o CFO

- **WHEN** a página inicial é carregada
- **THEN** ela não contém "gratuita", "48x", "12x", "R$", "SPC" nem "Serasa"

### Requirement: Imagens

As fotos do "Mapa de imagens" da copy DEVEM ser servidas pelo próprio site, otimizadas no build, sem requisição a `images.unsplash.com`. Toda foto de conteúdo DEVE ter alt text descritivo em pt-BR. O quadro do vídeo dentro do botão de play do depoimento é decorativo, com alt vazio, porque o nome do botão vem do texto visível "Assistir ao depoimento". Slots sem foto DEVEM exibir um placeholder neutro com rótulo visível no formato "FOTO: <descrição>", cujo alt repete o rótulo. Fotos e placeholders DEVEM ter cantos arredondados discretos.

#### Scenario: Fotos do próprio domínio

- **WHEN** a página inicial carrega em produção
- **THEN** nenhuma imagem vem de `images.unsplash.com`

#### Scenario: Alt text

- **WHEN** um leitor de tela chega a uma foto de conteúdo
- **THEN** anuncia uma descrição em português do que a foto mostra
- **WHEN** um leitor de tela chega ao card do depoimento em vídeo
- **THEN** anuncia só o botão "Assistir ao depoimento 0:30", sem repetir a descrição do quadro

#### Scenario: Placeholder

- **WHEN** um slot ainda não tem foto real
- **THEN** exibe um bloco neutro, sem vermelho, com o rótulo "FOTO: …" legível

### Requirement: Visual de alto padrão

Todas as seções e o rodapé DEVEM ter fundo branco. A separação entre seções vem do espaço em branco. O vermelho da marca DEVE aparecer só em botões de CTA, no botão de play do depoimento em vídeo, em links em hover e em detalhes pequenos, como marcadores e ícones. Nenhuma seção, card ou faixa DEVE ter fundo vermelho. Os botões de CTA vermelhos DEVEM levar a `#agendar`. O botão de play é a única exceção: ele abre o vídeo. O botão "Como chegar" DEVE usar a ênfase secundária, sem fundo vermelho.

#### Scenario: Fundo branco

- **WHEN** o usuário rola a página inicial até o rodapé
- **THEN** todas as seções e o rodapé têm fundo branco

#### Scenario: Vermelho só em destaques

- **WHEN** a página inicial é exibida
- **THEN** nenhum bloco com fundo vermelho aparece, exceto os botões de CTA e o botão circular de play do depoimento

## REMOVED Requirements

### Requirement: Equipe e Depoimentos ocultos até haver conteúdo real

**Reason**: A seção Depoimentos passou a aparecer, com o vídeo real de uma paciente. Só a Equipe continua oculta.

**Migration**: Substituído por "Equipe oculta até haver conteúdo real" e "Depoimento em vídeo". Os cards de depoimento em texto continuam ocultos dentro da seção Depoimentos, conforme "Depoimento em vídeo".

## ADDED Requirements

### Requirement: Equipe oculta até haver conteúdo real

A seção Equipe DEVE existir no código com os textos e os placeholders da seção 9 da copy, mas NÃO DEVE aparecer no HTML publicado enquanto a clínica não enviar fotos, nomes e CRO da equipe. Exibir a seção DEVE exigir só trocar o conteúdo e ligar a renderização dela.

#### Scenario: Equipe fora do HTML

- **WHEN** a página inicial é gerada
- **THEN** o HTML não contém "Especialistas que acompanham você em cada etapa"

### Requirement: Depoimento em vídeo

A seção Depoimentos DEVE exibir, centralizados e nesta ordem:

- o eyebrow "Pacientes" e o título "Quem já sorri com a gente";
- um card com um quadro do vídeo, um botão de play e o rótulo "Assistir ao depoimento" com a duração "0:30";
- a frase "Eu achava que nunca mais ia sorrir com confiança.";
- a legenda "Áurea, paciente da rede Odonto Excellence".

A legenda NÃO DEVE afirmar que a paciente foi atendida em Itapoá, porque o vídeo foi gravado em outra unidade da rede.

Ativar o card, por clique, toque, Enter ou Espaço, DEVE abrir o vídeo num modal centralizado, sobre um fundo escurecido, tocando com som e com os controles nativos. O card DEVE se expandir até virar o player quando o navegador suportar view transitions e o usuário não pedir movimento reduzido. Nos outros casos, o modal abre sem essa animação. O vídeo DEVE caber inteiro na tela, sem corte e sem scroll. Fechar o modal (botão "Fechar", Esc ou clique fora do vídeo) DEVE pausar o vídeo, voltar ao início e devolver o foco ao card.

O vídeo DEVE ser servido pelo próprio site, num arquivo de no máximo 25 MiB, e só DEVE começar a carregar quando o usuário abrir o modal. Os cards de depoimento em texto e o link "Ver avaliações no Google" DEVEM continuar no código, fora do HTML, até a clínica enviar pelo menos três depoimentos escritos reais e autorizados.

#### Scenario: Card do depoimento

- **WHEN** o usuário rola até a seção Depoimentos
- **THEN** vê, centralizados, o título, o card com o quadro da paciente e o botão de play, a frase e a legenda

#### Scenario: Abrir o vídeo

- **WHEN** o usuário ativa o card
- **THEN** o vídeo abre centralizado sobre um fundo escurecido e começa a tocar com som
- **AND** o foco vai para o botão "Fechar"

#### Scenario: Abertura natural

- **WHEN** o navegador suporta view transitions e o usuário não pediu movimento reduzido
- **THEN** o card se expande até a posição e o tamanho do player

#### Scenario: Movimento reduzido

- **WHEN** o usuário pediu movimento reduzido
- **THEN** o modal abre sem a expansão do card e o botão de play não pulsa

#### Scenario: Teclado

- **WHEN** o usuário chega ao card com Tab e pressiona Enter
- **THEN** o vídeo abre
- **WHEN** o usuário pressiona Esc
- **THEN** o modal fecha e o foco volta ao card

#### Scenario: Fechar pausa e reinicia

- **WHEN** o usuário fecha o modal por qualquer meio
- **THEN** o vídeo para e volta ao segundo 0

#### Scenario: Vídeo cabe na tela

- **WHEN** o modal abre em 1440 × 900 ou em 390 × 844
- **THEN** o vídeo aparece inteiro, sem corte e sem scroll, com o botão "Fechar" sobre ele

#### Scenario: Carregamento sob demanda

- **WHEN** a página inicial carrega
- **THEN** o arquivo de vídeo não é baixado até o usuário abrir o modal
- **AND** o arquivo publicado tem no máximo 25 MiB

#### Scenario: Depoimentos escritos ocultos

- **WHEN** a página inicial é gerada
- **THEN** o HTML não contém "[Depoimento real]" nem "Ver avaliações no Google"
