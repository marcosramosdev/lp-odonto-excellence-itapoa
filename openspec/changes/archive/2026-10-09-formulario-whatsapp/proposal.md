## Why

O CTA único do site é agendar a avaliação pelo WhatsApp, mas a seção `#agendar` ainda mostra um placeholder no lugar do formulário. Sem ele, nenhum botão do site gera lead. A mensagem pronta também importa: a assistente Sofia personaliza a abertura pelo serviço citado, e "Vim pelo site" identifica a origem do lead.

## What Changes

- O placeholder da seção `#agendar` dá lugar ao formulário da seção 12 de `docs/copy-landing-page.md`. Ele tem dois campos: "Seu nome" e "Tratamento de interesse", este com as 7 opções da copy. Abaixo vêm o botão "Agendar pelo WhatsApp" e a microcopy de privacidade.
- Ao enviar, o formulário abre `https://wa.me/5547997660991` numa nova aba com a mensagem da copy. Há uma versão com o serviço e outra para "Ainda não sei". O nome vai sem espaços extras.
- A validação usa as regras nativas do HTML e mostra as mensagens de erro da copy abaixo de cada campo. Cada erro fica ligado ao campo, e o foco vai para o primeiro campo inválido.
- Os outros CTAs de agendamento passam a abrir um modal com o mesmo formulário, sem tirar o visitante do ponto da página em que ele está. São eles: Nav, barra fixa no mobile, Hero, "Começar agora", Investimento e os cards de Tratamentos. Sem JavaScript, eles continuam rolando até `#agendar`.
- O link "Quero avaliar este tratamento" de cada card abre o modal com o serviço do card já selecionado.
- Se `window.dataLayer` existir, o envio registra o evento `lead_whatsapp` com o serviço escolhido. O nome nunca vai para esse evento. Nenhum script de terceiros entra no site.
- A mensagem é montada numa função pura, com um teste executável por `npm test` (`node --test`).
- Sem backend, e nada é armazenado.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

- `landing-page`:
  - "Agende sua avaliação" troca o placeholder pelo formulário.
  - "Tratamentos" passa a abrir o modal com o serviço do card selecionado.
  - "Ordem e âncoras das seções" e "Como funciona": o CTA do Nav e "Começar agora" abrem o modal.
  - "Visual de alto padrão" admite o vermelho no botão de envio e nas mensagens de erro. Os CTAs passam a levar ao modal.
  - Novos requisitos para o formulário, o modal, a validação e a mensagem enviada ao WhatsApp.

## Impact

- **Código:**
  - `src/pages/index.astro`: troca o placeholder pelo formulário, adiciona o modal e liga os CTAs e os cards a ele.
  - `src/components/global/Nav.astro` e `src/components/global/MobileCta.astro`: o botão "Agendar avaliação" também abre o modal.
  - `src/components/content/FormWhatsapp.astro`: componente novo, com CSS e script próprios.
  - `src/utils/whatsapp.ts`: número, opções e montagem da mensagem.
  - `src/utils/whatsapp.test.ts`: o teste.
  - `src/styles/patterns.css`: estilo de erro dos campos.
  - `src/styles/base.css`: o atributo `hidden` volta a esconder textos, que o leading trim exibia.
- **Assets:** sai `src/assets/images/placeholders/formulario.svg`.
- **Scripts:** `package.json` ganha `"test"`.
- **Dependências:** nenhuma.
- **Privacidade:** o nome digitado vai só para o WhatsApp da clínica, dentro da mensagem. Nada fica no site.
- **Biblioteca:** os componentes `Form`, `Input`, `Select` e `Modal` não mudam. O modal usa o gatilho `data-modal-open` que o `Modal` já tem.
