## 1. Mensagem e teste

- [x] 1.1 Criar `src/utils/whatsapp.ts` com `WHATSAPP_URL`, `SERVICOS` (as sete opções da copy, na ordem da copy, com `value`, `label` e `trecho`) e `whatsappText(nome, servico)` (design, decisão 2). Verificar, lado a lado com a seção 12 de `docs/copy-landing-page.md`, que cada `label` e cada `trecho` são idênticos à copy e que os `value` são os do spec.
- [x] 1.2 Criar `src/utils/whatsapp.test.ts` com os três casos da decisão 3 e adicionar `"test": "node --experimental-strip-types --test src/utils/whatsapp.test.ts"` ao `package.json`. Verificar que `npm test` passa e que falha se um trecho for alterado de propósito (desfazer depois).
- [x] 1.3 Rodar `npm run check` e `npm run build` e verificar que terminam sem erros.

## 2. Formulário na seção

- [x] 2.1 Adicionar a `src/styles/patterns.css`, ao lado de `.field-star`, as regras `.field-error` e `.field-control[aria-invalid="true"]` com `var(--heading-accent)` (decisão 6). Verificar que `.field-error` não define `display`.
- [x] 2.2 Criar `src/components/content/FormWhatsapp.astro` com o markup e o CSS da decisão 4, os textos da seção 12 da copy, a prop `render` e os IDs de erro gerados por `uid`. Verificar com `astro dev --background` que os labels, os placeholders, as sete opções, o botão e a microcopy aparecem com o texto exato da copy, sem nenhum campo preenchido.
- [x] 2.3 Escrever o script do componente (decisões 1, 5 e 9), percorrendo cada `.form-whatsapp_wrap`:
  - `noValidate`, validação no `submit`, `aria-invalid` e `aria-describedby` entrando e saindo junto com o erro, e foco no primeiro inválido;
  - revalidação no `input` e no `change` de um campo já marcado;
  - `text` preenchido com `whatsappText`, o push opcional no `dataLayer` e `form.closest("dialog")?.close()`.

  Verificar no navegador os cenários "Campos vazios", "Só o serviço faltando", "Nome curto ou só com espaços" e "Erro some ao corrigir" do spec.
- [x] 2.4 Em `src/pages/index.astro`, trocar o `Img` do placeholder por `<FormWhatsapp class="margin-top-7" />`, remover o `import` de `formularioPlaceholder` e apagar `src/assets/images/placeholders/formulario.svg`. Verificar que `grep -rn "formulario.svg" src` não acha nada e que `dist/index.html` não contém "FORMULÁRIO:".
- [x] 2.5 Rodar `npm run check` e `npm run build` e verificar que terminam sem erros.

## 3. Modal e CTAs

- [x] 3.1 Adicionar ao fim de `src/pages/index.astro` o `<Modal id="agendamento" label="Agende sua avaliação">` com título, texto e `FormWhatsapp` (decisão 7). Verificar que o HTML gerado tem dois formulários, sem IDs repetidos (`aria-describedby` de cada campo aponta para o erro do próprio formulário).
- [x] 3.2 Adicionar `data-modal-open="agendamento"` aos `Button` do Hero, de Como funciona e do Investimento, e aos de `src/components/global/Nav.astro` e `src/components/global/MobileCta.astro`, mantendo os `href`. Verificar os cenários "CTA abre o modal", "Todos os CTAs" (com a barra mobile em 375 px e o Nav em 1440 px), "Fechar o modal" e "CTA do Nav".
- [x] 3.3 Em `src/pages/index.astro`, adicionar `servico` a cada item de `treatments`, conforme a tabela do requisito "Tratamentos", e passar `data-modal-open="agendamento"` e `data-servico={servico}` ao `Card`. Adicionar ao script do `FormWhatsapp` o listener de clique da decisão 8. Verificar os cenários "Link do card" e "Trocar de card", por clique e por Enter. Verificar também que um erro de serviço já visível some quando o card seleciona o serviço.
- [x] 3.4 Verificar "Envio pelo modal" e "Erro no modal": o envio válido abre o WhatsApp numa nova aba e fecha o modal; o envio vazio mantém o modal aberto com os erros e o foco em "Seu nome". Se fechar o `<dialog>` no `submit` cancelar o envio em algum navegador, fechar logo depois, com `setTimeout`, e registrar no design.
- [x] 3.5 Verificar "Seção continua com o formulário": rolar até `#agendar` mostra o formulário da seção sem abrir o modal, e enviar por ele funciona igual.
- [x] 3.6 Rodar `npm run check` e `npm run build` e verificar que terminam sem erros.

## 4. Conferência

- [x] 4.1 Critério de aceite, pelo formulário da seção e pelo do modal: enviar "Maria" com "Implante dentário". Verificar que abre uma nova aba em `wa.me/5547997660991`, que o `text` decodificado é "Olá! Meu nome é Maria. Vim pelo site e gostaria de agendar uma avaliação para implante dentário." e que a aba do site continua aberta.
- [x] 4.2 Verificar os cenários "Mensagem sem serviço", "Nome com espaços extras" e "Acentos e caracteres especiais", conferindo o `text` decodificado da URL aberta.
- [x] 4.3 Verificar "Nome longo": colar 61 caracteres em "Seu nome" e conferir que só 60 ficam no campo.
- [x] 4.4 Verificar "Evento de lead": rodar `window.dataLayer = []` no console e enviar com "Ortodontia (aparelho ou alinhadores)". O último item deve ser `{ event: "lead_whatsapp", servico: "ortodontia" }`, sem o nome. Verificar também "Sem dataLayer": recarregar e enviar sem criar o `dataLayer`, e o console fica sem erro.
- [x] 4.5 Verificar acessibilidade, na seção e no modal:
  - na árvore de acessibilidade do DevTools, cada campo tem o nome do label visível e está marcado como obrigatório;
  - num campo inválido, a descrição é a mensagem de erro, e num campo válido não há descrição;
  - o modal tem o nome "Agende sua avaliação", e o foco fica dentro dele enquanto está aberto;
  - o formulário inteiro funciona só com Tab, setas e Enter;
  - em 375 px, o botão "Agendar pelo WhatsApp" mede pelo menos 44 × 44 px.
- [x] 4.6 Verificar "Sem JavaScript" e "Modal sem JavaScript" com o JS desativado no DevTools:
  - cada CTA da lista rola até `#agendar`;
  - com os campos vazios, o navegador bloqueia o envio;
  - com os campos preenchidos, o WhatsApp da clínica abre numa nova aba.
- [x] 4.7 Verificar "Nada armazenado". Na aba Network, o envio não gera requisição ao próprio domínio. Em Application, nenhum cookie nem item de `localStorage` foi criado.
- [x] 4.8 Verificar o layout em 320, 375, 768 e 1440 px:
  - o formulário fica centralizado em `#agendar`, com labels, campos e erros alinhados à esquerda;
  - os textos da seção continuam centralizados;
  - o modal cabe na tela e rola por dentro quando os erros aparecem;
  - a página não tem scroll horizontal;
  - a barra de CTA mobile não cobre o campo focado depois de um erro.
- [x] 4.9 Rodar `npm test`, `npm run check` e `npm run build` e verificar que os três terminam sem erros.
