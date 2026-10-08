# estrutura-global Specification

## Purpose

Define a moldura comum a todas as páginas do site da Odonto Excellence Itapoá: idioma e metadados, Nav, barra de CTA no mobile, rodapé com os dados da clínica e o que pode ser publicado.

## Requirements

### Requirement: Idioma e metadados do site

Todas as páginas DEVEM declarar o idioma `pt-BR` no elemento `<html>`. O nome do site DEVE ser "Odonto Excellence Itapoá". A meta description padrão DEVE ser o texto da seção "Meta (SEO)" de `docs/copy-landing-page.md`. Todo texto visível ou lido por tecnologia assistiva DEVE estar em português, inclusive a página 404, o link de pular para o conteúdo e os rótulos de landmarks.

#### Scenario: Idioma da página

- **WHEN** qualquer página é carregada
- **THEN** o elemento `<html>` tem `lang="pt-BR"`

#### Scenario: Página sem título próprio

- **WHEN** uma página não define título nem descrição
- **THEN** o `<title>` e o `og:site_name` são "Odonto Excellence Itapoá"
- **AND** a meta description é "Odontologia de alto padrão em Itapoá. Implantes, ortodontia, prótese e clínica geral, com avaliação sem pressa e estacionamento próprio. Agende pelo WhatsApp."

#### Scenario: Pular para o conteúdo

- **WHEN** o usuário navega por teclado e o primeiro foco cai no link de pular
- **THEN** o link diz "Pular para o conteúdo" e leva ao conteúdo principal

#### Scenario: Página 404 em português

- **WHEN** o usuário acessa uma URL que não existe
- **THEN** a página 404 tem título "Página não encontrada", o título visível "Esta página não existe", um texto explicativo em português e o botão "Voltar para o início", que leva a `/`

### Requirement: Navegação principal

O Nav DEVE exibir o logo, os links "Tratamentos", "A clínica", "Como funciona", "Dúvidas" e "Localização" e o botão "Agendar avaliação", nessa ordem. Os destinos DEVEM ser, respectivamente, `/#tratamentos`, `/#clinica`, `/#como-funciona`, `/#duvidas`, `/#localizacao` e `/#agendar`, para funcionar a partir de qualquer página. O Nav DEVE ficar visível no topo da tela durante a rolagem.

#### Scenario: Telas largas

- **WHEN** a largura da tela é de 64rem ou mais
- **THEN** o logo, os cinco links e o botão "Agendar avaliação" aparecem numa única linha, sem botão de menu

#### Scenario: Link a partir de outra página

- **WHEN** o usuário está na página 404 e ativa "Dúvidas"
- **THEN** o navegador abre a página inicial na âncora `#duvidas`

#### Scenario: Âncora não fica escondida sob o Nav

- **WHEN** o usuário ativa um link de âncora e a página rola até a seção
- **THEN** o início da seção aparece abaixo do Nav, sem ficar coberto por ele

### Requirement: Menu mobile

Em telas com menos de 64rem, os cinco links DEVEM ficar num menu aberto por um botão. O botão DEVE informar o estado aberto ou fechado a tecnologias assistivas. O menu DEVE fechar ao ativar um link, ao pressionar Esc ou ao clicar fora dele. Sem JavaScript, os links DEVEM continuar acessíveis.

#### Scenario: Abrir e fechar o menu

- **WHEN** o usuário ativa o botão de menu
- **THEN** o menu abre com os cinco links e o botão passa a `aria-expanded="true"`
- **WHEN** o usuário ativa um link, pressiona Esc ou clica fora do menu
- **THEN** o menu fecha e o botão volta a `aria-expanded="false"`

#### Scenario: Esc devolve o foco

- **WHEN** o menu está aberto e o usuário pressiona Esc
- **THEN** o foco volta para o botão de menu

#### Scenario: Sem JavaScript

- **WHEN** o JavaScript está desativado
- **THEN** os cinco links aparecem sem precisar do botão de menu

### Requirement: Barra fixa de CTA no mobile

Em telas com menos de 64rem, uma barra com o botão "Agendar avaliação" (destino `/#agendar`) DEVE ficar fixa no rodapé da tela durante a rolagem. Nessas telas, o botão "Agendar avaliação" do Nav DEVE ficar oculto, para não haver dois CTAs iguais visíveis ao mesmo tempo. Ao fim da página, a barra NÃO DEVE cobrir o conteúdo do rodapé. Em telas de 64rem ou mais, a barra NÃO DEVE aparecer.

#### Scenario: Barra visível durante a rolagem

- **WHEN** a largura da tela é menor que 64rem e o usuário rola a página
- **THEN** a barra com "Agendar avaliação" continua visível na parte de baixo da tela

#### Scenario: Fim da página

- **WHEN** o usuário rola até o fim da página numa tela menor que 64rem
- **THEN** a última linha do rodapé fica totalmente visível, acima da barra

#### Scenario: Telas largas

- **WHEN** a largura da tela é de 64rem ou mais
- **THEN** a barra não aparece e o botão "Agendar avaliação" fica no Nav

#### Scenario: Área de toque

- **WHEN** a barra é exibida
- **THEN** o botão tem pelo menos 44×44 px de área de toque

### Requirement: Rodapé

O rodapé DEVE exibir, conforme a seção 14 de `docs/copy-landing-page.md`:

- o logo;
- "Unidade franqueada da rede Odonto Excellence.";
- o endereço "Av. Celso Ramos, 512 — Cambijú, Itapoá - SC, CEP 89249-000";
- "WhatsApp: (47) 99766-0991", com link para `https://wa.me/5547997660991`;
- "Instagram: @odontoexcellence_itapoa", com link para o perfil;
- "Responsável técnico: Dr. Renato Gonzales de Souza Forti — CRO-SC 22.911 · EPAO-SC 1.579";
- "© {ano} Odonto Excellence Itapoá · CNPJ [nº]".

Enquanto a clínica não enviar o CNPJ, o placeholder "[nº]" DEVE aparecer como está, para ficar visível na revisão.

#### Scenario: Conteúdo do rodapé

- **WHEN** qualquer página é carregada
- **THEN** o rodapé exibe todos os itens acima, com os textos da copy

#### Scenario: Contato pelo WhatsApp

- **WHEN** o usuário ativa o link do WhatsApp no rodapé
- **THEN** abre `https://wa.me/5547997660991` numa nova aba

#### Scenario: CNPJ pendente

- **WHEN** o CNPJ ainda não foi informado
- **THEN** o rodapé mostra "CNPJ [nº]"

#### Scenario: Responsável técnico (CFO)

- **WHEN** qualquer página é carregada
- **THEN** o rodapé exibe "Responsável técnico: Dr. Renato Gonzales de Souza Forti — CRO-SC 22.911 · EPAO-SC 1.579"

### Requirement: Página inicial vazia

A página inicial DEVE conter só o Nav, um conteúdo principal vazio e o rodapé, já na identidade nova, até as seções da landing page serem construídas. O style guide do Lumos NÃO DEVE aparecer.

#### Scenario: Página inicial

- **WHEN** o usuário abre `/`
- **THEN** vê o Nav, um espaço vazio sobre fundo branco e o rodapé, sem nenhum texto ou imagem do Lumos

### Requirement: Somente conteúdo público é publicado

Arquivos internos e páginas de exemplo NÃO DEVEM ser publicados. O prompt interno da assistente DEVE ficar fora do site. A página de exemplos de componentes do Lumos NÃO DEVE gerar rota nem entrar no sitemap.

#### Scenario: Prompt interno da assistente

- **WHEN** alguém acessa `/dados_atendimento_itapoa.md` no site publicado
- **THEN** recebe a página 404

#### Scenario: Página de exemplos

- **WHEN** alguém acessa `/example-components`
- **THEN** recebe a página 404
- **AND** essa URL não aparece no sitemap

#### Scenario: Sem links para a página de exemplos

- **WHEN** qualquer página é carregada
- **THEN** nem o Nav nem o rodapé têm link para `/example-components`
