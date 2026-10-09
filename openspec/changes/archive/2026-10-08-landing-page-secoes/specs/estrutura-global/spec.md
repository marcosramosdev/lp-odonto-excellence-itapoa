## REMOVED Requirements

### Requirement: Página inicial vazia

**Reason**: A página inicial passa a ter as seções da landing page. O requisito descrevia um estado provisório, entre a mudança `identidade-visual` e esta.

**Migration**: O conteúdo da página inicial passa a ser definido pela capability `landing-page`. O style guide do Lumos continua fora do site pelo requisito "Somente conteúdo público é publicado".

## MODIFIED Requirements

### Requirement: Rodapé

O rodapé DEVE exibir, conforme a seção 14 de `docs/copy-landing-page.md`:

- o logo;
- "Unidade franqueada da rede Odonto Excellence.";
- o endereço "Av. Celso Ramos, 512 — Cambijú, Itapoá - SC, CEP 89249-000";
- "WhatsApp: (47) 99766-0991", com link para `https://wa.me/5547997660991`;
- "Instagram: @odontoexcellence_itapoa", com link para o perfil;
- "Responsável técnico: Dr. Renato Gonzales de Souza Forti — CRO-SC 22.911 · EPAO-SC 1.579";
- "© {ano} Odonto Excellence Itapoá".

O CNPJ fica fora do rodapé, a pedido do cliente, até ser informado. Nenhum placeholder de CNPJ DEVE aparecer.

#### Scenario: Conteúdo do rodapé

- **WHEN** qualquer página é carregada
- **THEN** o rodapé exibe todos os itens acima, com os textos da copy

#### Scenario: Contato pelo WhatsApp

- **WHEN** o usuário ativa o link do WhatsApp no rodapé
- **THEN** abre `https://wa.me/5547997660991` numa nova aba

#### Scenario: CNPJ pendente

- **WHEN** o CNPJ ainda não foi informado
- **THEN** o rodapé termina em "© {ano} Odonto Excellence Itapoá", sem "CNPJ" nem "[nº]"

#### Scenario: Responsável técnico (CFO)

- **WHEN** qualquer página é carregada
- **THEN** o rodapé exibe "Responsável técnico: Dr. Renato Gonzales de Souza Forti — CRO-SC 22.911 · EPAO-SC 1.579"
