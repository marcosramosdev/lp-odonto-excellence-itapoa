## MODIFIED Requirements

### Requirement: Idioma e metadados do site

Todas as páginas DEVEM declarar o idioma `pt-BR` no elemento `<html>`. O nome do site DEVE ser "Odonto Excellence Itapoá". Uma página sem título e descrição próprios DEVE usar os textos da seção "Meta (SEO)" de `docs/copy-landing-page.md`: o title, a meta description, o `og:title` e o `og:description`. Uma página com título próprio DEVE usar "{título} | Odonto Excellence Itapoá" no `<title>` e no `og:title`. Todo texto visível ou lido por tecnologia assistiva DEVE estar em português, inclusive a página 404, o link de pular para o conteúdo e os rótulos de landmarks.

#### Scenario: Idioma da página

- **WHEN** qualquer página é carregada
- **THEN** o elemento `<html>` tem `lang="pt-BR"`

#### Scenario: Página sem título próprio

- **WHEN** uma página não define título nem descrição
- **THEN** o `<title>` é "Odonto Excellence Itapoá | Implantes, Ortodontia e Prótese em Itapoá - SC"
- **AND** a meta description é "Odontologia de alto padrão em Itapoá. Implantes, ortodontia, prótese e clínica geral, com avaliação sem pressa e estacionamento próprio. Agende pelo WhatsApp."
- **AND** o `og:title` é "Odonto Excellence Itapoá — Odontologia de alto padrão"
- **AND** o `og:description` é "Seis especialidades em um só endereço, com tempo para ouvir você. Agende sua avaliação pelo WhatsApp."
- **AND** o `og:site_name` é "Odonto Excellence Itapoá"

#### Scenario: Página com título próprio

- **WHEN** a página 404 é carregada
- **THEN** o `<title>` e o `og:title` são "Página não encontrada | Odonto Excellence Itapoá"

#### Scenario: Pular para o conteúdo

- **WHEN** o usuário navega por teclado e o primeiro foco cai no link de pular
- **THEN** o link diz "Pular para o conteúdo" e leva ao conteúdo principal

#### Scenario: Página 404 em português

- **WHEN** o usuário acessa uma URL que não existe
- **THEN** a página 404 tem título "Página não encontrada", o título visível "Esta página não existe", um texto explicativo em português e o botão "Voltar para o início", que leva a `/`
