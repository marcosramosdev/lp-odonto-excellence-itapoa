## Context

Motivação em `proposal.md`. Requisitos em `specs/landing-page/spec.md`.

Estado atual que molda a solução:

- `#agendar` em `src/pages/index.astro` é um `ContentWrapper centered` (stack). O placeholder do formulário é um `Img` de `src/assets/images/placeholders/formulario.svg`, com 480 de largura. Nenhum outro lugar usa esse SVG.
- `src/components/form/` tem `Form`, `Input`, `Select` e outros. O script do `Form` cancela todo envio válido. Com `action`, ele faz `fetch` e mostra notas de sucesso ou falha, com textos padrão em inglês. Com `method="get"`, o `fetch` recebe `body` e falha. Ele não serve para um envio nativo que abre uma nova aba.
- `Input` e `Select` renderizam o padrão `.field`: um `<label>` com o texto visível, o asterisco `aria-hidden` e o controle `.field-control`. Os dois repassam `...rest` para o controle, e `rest` vem depois de `autocomplete`, então o chamador pode sobrescrevê-lo. Os dois sempre renderizam `name`. O placeholder do `Select` é uma `<option value="" disabled hidden>`, então `required` bloqueia a opção vazia. Não há prop de erro.
- `patterns.css` define `.field` (coluna com `gap: var(--space-2)`), `.field-label`, `.field-star` e `.field-control`. Não há estilo de erro nem token de erro. `--heading-accent` é o vermelho escuro `#b3171d`, com contraste de 6,9:1 sobre o branco.
- `Card` repassa `...rest` para a `div.card_wrap`. No `stacked`, o `::after` do link cobre o card inteiro, então qualquer clique no card acerta o link.
- `Button` aceita `type="submit"`. O padding é `0.75em 1.5em`. Com `element="link"`, ele repassa `...rest` para o `<a>`.
- `src/components/interactive/Modal.astro` (`<dialog>` com `showModal()`):
  - abre por `[data-modal-open="<id>"]`, por `a[href="#<id>"]` ou por `?modal=<id>` na URL. O listener de clique fica no `document`, procura o gatilho com `closest` e cancela a ação padrão, então um link com o atributo não rola a página;
  - fecha com o botão "Fechar", com Esc e com clique fora;
  - trava a rolagem da página com `html:has(.modal_wrap[open])`;
  - o botão "Fechar" é o primeiro elemento focável, então `showModal()` põe o foco nele. Ao fechar, o `<dialog>` devolve o foco ao elemento que estava focado antes;
  - a variante padrão (`small`) tem largura máxima de 34rem.
- Os CTAs de agendamento são: `Button` para `/#agendar` em `Nav` e `MobileCta`; `Button` para `#agendar` no Hero, em Como funciona e no Investimento; e o link de cada card de Tratamentos.
- Node local 22.16. O `--test` dele só roda `.ts` com `--experimental-strip-types`, que imprime um aviso de recurso experimental. `@types/node` está instalado, então o `astro check` aceita `node:test`. O tsconfig já permite importar com extensão `.ts`.
- `wa.me`, testado com `curl` num número fictício:
  - `text=Ol%C3%A1%21+Meu` e `text=Ol%C3%A1!%20Meu` redirecionam para a mesma URL, então `+` e `%20` valem como espaço;
  - parâmetros desconhecidos, como `nome` e `servico`, são descartados no redirecionamento.

## Goals / Non-Goals

**Goals:**

- Envio nativo do navegador. O JavaScript só compõe a mensagem, mostra os erros e pré-seleciona o serviço.
- Uma única fonte para o número, as opções e os trechos: o mesmo módulo alimenta o `select` e a mensagem.
- Um único componente de formulário, usado duas vezes: na seção `#agendar` e no modal.
- Nenhuma mudança nos componentes `Form`, `Input`, `Select` e `Modal` da biblioteca.
- Sem JavaScript, todo CTA continua chegando ao formulário da seção.

**Non-Goals:**

- Captura de telefone, máscara ou máscara de nome.
- Instalar GTM ou qualquer script de terceiros. O evento só vai para o `dataLayer` se alguém já o tiver criado.
- Limpar o formulário depois do envio. O visitante volta para a aba do site e encontra o que digitou.
- Mensagens de erro em pt-BR sem JavaScript. Sem JS, valem as do navegador.
- Testes de navegador automatizados. A interface é conferida à mão (tarefas).

## Decisions

### 1. Form GET nativo com `text` oculto

```html
<form action="https://wa.me/5547997660991" method="get" target="_blank">
  …campos "nome" e "servico"…
  <input type="hidden" name="text" />
  <button type="submit">Agendar pelo WhatsApp</button>
</form>
```

No `submit`, o script preenche `text` com a mensagem e deixa o envio seguir. O navegador codifica o formulário (UTF-8, `application/x-www-form-urlencoded`) e abre o `wa.me` numa nova aba. Um envio de formulário com `target="_blank"` não passa pelo bloqueio de pop-ups.

- Sem `encodeURIComponent`. O navegador já codifica o valor. Codificar antes daria `%2520` na URL e `%20` literal no WhatsApp. O usuário escolheu esta opção sabendo disso.
- `nome` e `servico` também vão na URL (`?nome=…&servico=…&text=…`). O `wa.me` os descarta (ver Context), então não há truque para tirá-los. `name=""` é HTML inválido, e desabilitar os campos no envio é frágil.
- Sem JS, `text` vai vazio e o WhatsApp abre na conversa da clínica, sem mensagem.
- Sem `rel="noopener"`: os tipos de `<form>` do Astro não têm `rel`, e o `astro check` falha. A nova aba só abre o `wa.me`, um destino fixo e confiável.

*Rejeitado:* `window.open(whatsappUrl())` com `encodeURIComponent`. Funciona, mas tira o envio do navegador e exige um caminho separado para quem não tem JS. Também rejeitado: o `Form` da biblioteca com uma variante nova. Seria preciso mudar o script e as notas dele para um uso só, e o resto da página continuaria precisando de um componente com script para a mensagem.

### 2. Dados e mensagem em `src/utils/whatsapp.ts`

```ts
export const WHATSAPP_URL = "https://wa.me/5547997660991";

export const SERVICOS = [
  { value: "implante", label: "Implante dentário", trecho: "implante dentário" },
  // …as sete opções da copy, na ordem da copy
  { value: "avaliacao-geral", label: "Ainda não sei, quero uma avaliação geral", trecho: "" },
];

export function whatsappText(nome: string, servico: string): string;
```

- `whatsappText` reduz cada sequência de espaços a um só (`trim()` e `replace(/\s+/g, " ")`), busca o `trecho` pelo `value` e monta uma das duas frases da copy. Um trecho vazio, ou um serviço desconhecido, dá a frase sem serviço.
- `value` é o identificador da tabela do spec. Ele serve de valor da `<option>`, de `data-servico` no card e de `servico` no evento do `dataLayer`. Identificadores sem acento ficam estáveis se a copy mudar.
- O componente passa `SERVICOS` direto ao `Select`. `{ value, label }` já é o formato de opção que ele aceita, e o campo `trecho` a mais não atrapalha.
- Um módulo `.ts`, como os outros de `src/utils`. Não há `whatsappUrl()`: a URL é montada pelo navegador, e uma função só para o teste seria código morto.

### 3. Teste com `node --test`

`src/utils/whatsapp.test.ts`, com `node:test` e `node:assert/strict`, importando `./whatsapp.ts`:

- com serviço: `whatsappText("Maria", "implante")` dá a frase do critério de aceite;
- "Ainda não sei": `whatsappText("Maria", "avaliacao-geral")` dá a frase sem serviço;
- nome com acentos e caracteres especiais: `"  João   D'Ávila & Cia #1?+ "` vira `João D'Ávila & Cia #1?+` na frase. Em seguida, `new URLSearchParams({ text })`, que serializa como o form GET, é lido de volta pelo `URL`, e o `text` precisa voltar idêntico.

Script em `package.json`: `"test": "node --experimental-strip-types --test src/utils/whatsapp.test.ts"`. O arquivo vai explícito, sem depender da descoberta automática de `.ts`, que varia entre as versões 22.x. A flag continua aceita nas versões em que a remoção de tipos já é padrão.

### 4. Componente `FormWhatsapp`

`src/components/content/FormWhatsapp.astro`: o formulário tem CSS e script próprios, então vira um bloco de conteúdo (LUMOS.md). Os textos são iguais em qualquer página, então ficam escritos no componente. A única prop é `render`, e `class` aceita utilitários.

```astro
<form class="form-whatsapp_wrap" action={WHATSAPP_URL} method="get" target="_blank">
  <div class="field">
    <Input variant="first-name" label="Seu nome" name="nome"
      placeholder="Como podemos te chamar?" required maxlength={60}
      pattern="\s*\S.*\S\s*" />
    <p class="field-error text-style-small" id={`${id}-nome-erro`} hidden>Digite seu nome para continuar.</p>
  </div>
  <div class="field">
    <Select label="Tratamento de interesse" name="servico"
      placeholder="Selecione um tratamento" required options={SERVICOS} />
    <p class="field-error text-style-small" id={`${id}-servico-erro`} hidden>Escolha um tratamento para continuar.</p>
  </div>
  <input type="hidden" name="text" />
  <Button type="submit" class="width-full padding-block-4">Agendar pelo WhatsApp</Button>
  <Paragraph variant="small" class="color-faded">Você será direcionado…</Paragraph>
</form>
```

- `variant="first-name"` dá `autocomplete="given-name"`, o que responde a "Como podemos te chamar?".
- O padrão `.field` agrupa cada campo com o erro dele, com o mesmo espaço entre label e controle. Assim o grupo não precisa de classe própria.
- O CSS próprio cobre só `.form-whatsapp_wrap`: coluna com `gap`, `width: 100%`, `max-width: 30rem` (a largura do placeholder) e `text-align: start`. O `ContentWrapper centered` centraliza o bloco, e o conteúdo dele fica alinhado à esquerda.
- `const id = uid("form-whatsapp")`, de `@/utils/unique-id.ts`. O formulário aparece duas vezes na página, na seção e no modal, e cada erro precisa de um ID único para o `aria-describedby`.
- Altura do botão: com o padding padrão e o `text-style-trim` do `Button`, ele mede de 37 a 39 px, abaixo dos 44 px do spec. Por isso o botão leva `width-full padding-block-4`, a mesma combinação da barra fixa no mobile, e passa a medir de 53 a 62 px (medido de 320 a 1440 px).

### 5. Validação: regras nativas, mensagens da copy

- As regras ficam nos atributos, então valem também sem JS:
  - `required` nos dois campos e `maxlength="60"` no nome;
  - `pattern="\s*\S.*\S\s*"` no nome: depois do `trim`, o nome precisa ter pelo menos dois caracteres. O `pattern` vale para o valor inteiro, então `"  A  "` falha e `"Lu"` passa.
- `minlength` não serve: ele conta os espaços, e o navegador só o aplica a valores digitados pelo usuário.
- O script percorre cada `.form-whatsapp_wrap` da página e trata cada formulário só com os próprios campos.
- Com JS, o script liga `form.noValidate = true`. No `submit`, ele chama `checkValidity()` em cada campo e, para cada um:
  - **inválido:** `aria-invalid="true"`, `aria-describedby` apontando para o erro e `hidden` removido do erro;
  - **válido:** desfaz os três.

  Com algum campo inválido, o script cancela o envio e foca o primeiro. Sem erro, ele preenche `text`, envia o evento do `dataLayer`, fecha o modal em volta, se houver (`form.closest("dialog")?.close()`), e deixa o envio seguir. Fechar o `<dialog>` não tira o formulário do DOM, então o envio continua. Confirmar no navegador (tarefas).
- Depois que um campo foi marcado, `input` e `change` revalidam só esse campo, e o erro some ao corrigir.
- `aria-describedby` entra e sai junto com o erro. Um elemento `hidden` citado por `aria-describedby` continua sendo lido como descrição, então um vínculo fixo faria o leitor de tela anunciar o erro também nos campos válidos.
- `noValidate` é ligado por script, não no HTML. Sem JS, os balões nativos do navegador continuam funcionando.

*Rejeitado:* balões nativos com `setCustomValidity` em pt-BR. São o mínimo, mas não ligam o erro ao campo por `aria-describedby` nem deixam o texto visível na página, como o pedido exige.

### 6. Estilo de erro em `patterns.css`

Ao lado de `.field-label` e `.field-star`:

```css
.field-error {
  color: var(--heading-accent);
}

.field-control[aria-invalid="true"] {
  border-color: var(--heading-accent);
}
```

- O `<p>` do erro leva `text-style-small` ao lado de `.field-error`. `.field-error` não define `display`, para não vencer o atributo `hidden`.
- Achado na implementação: o leading trim de `base.css` dá `display: flow-root` a todo `p` e a todo `text-style-*`. Isso vence o `[hidden]` do navegador, e os erros apareciam já no carregamento. A causa é global, então `base.css` ganha, no reset, `[hidden]:where(:not([hidden="until-found"])) { display: none !important; }`, a regra do preflight do Tailwind. O `!important` na camada `base` faz `hidden` vencer qualquer `display` de camada posterior. Hoje só este componente usa `hidden` em elemento de texto.
- Fica no padrão global porque `.field-control` é dele, e qualquer campo futuro ganha o mesmo erro. `#b3171d` tem contraste de 6,9:1 sobre o branco.
- O spec "Visual de alto padrão" passa a admitir esse vermelho.

### 7. Modal de agendamento com o `Modal` da biblioteca

No fim de `index.astro`, depois da Localização:

```astro
<Modal id="agendamento" label="Agende sua avaliação">
  <Heading variant="h3">Seu novo sorriso começa com uma conversa.</Heading>
  <Paragraph>Informe seu nome e o tratamento de interesse. …</Paragraph>
  <FormWhatsapp class="margin-top-6" />
</Modal>
```

Cada CTA mantém o `href` para `#agendar` (ou `/#agendar`) e ganha `data-modal-open="agendamento"`:

- `Button` no Hero, em Como funciona e no Investimento;
- `Button` em `Nav` e em `MobileCta`;
- `Card` de cada tratamento. O atributo vai para a `div.card_wrap` pelo `...rest`, e o clique no link acha o gatilho por `closest`.

Comportamento:

- Com JS, o listener do `Modal` cancela a navegação e abre o `<dialog>`. Sem JS, o `href` leva à seção, que tem o próprio formulário.
- Fora da página inicial, nenhum `Modal` com esse ID existe e o atributo não faz nada, então `/#agendar` navega normalmente.
- Foco, Esc, clique fora, trava da rolagem e devolução do foco ao CTA vêm do `Modal` e do `<dialog>`.
- Título e texto são os da seção 12 da copy. O título leva `variant="h3"`, porque o modal é menor que uma seção. O `aria-label` "Agende sua avaliação" é o eyebrow da seção.
- O formulário do modal é outra instância do `FormWhatsapp`, com outros IDs. O que foi digitado fica nos campos ao fechar e abrir o modal.
- Brinde do `Modal`: `/?modal=agendamento` abre o modal ao carregar a página, o que serve para links de anúncio.

*Rejeitado:*

- Um listener próprio que intercepta todo `a[href$="#agendar"]`. Dispensaria os atributos, mas duplicaria a lógica de abertura do `Modal` e esconderia quais links abrem o modal.
- Mover um único formulário entre a seção e o modal. Os IDs ficariam únicos, mas a seção ficaria vazia enquanto o modal estivesse aberto, e o código seria mais frágil.

### 8. Pré-seleção pelo card

Cada item de `treatments` em `index.astro` ganha `servico`, e o `Card` recebe `data-servico={servico}` ao lado de `data-modal-open`. O script do `FormWhatsapp` escuta cliques no `document`:

```ts
const value = (event.target as Element).closest<HTMLElement>("[data-servico]")?.dataset.servico;
if (value) {
  // para cada formulário: servico.value = value, e revalida se o campo já mostrava erro
}
```

- O valor vai para o `select` de todos os formulários da página. Assim o modal abre já com o serviço e, sem um ID de modal fixo no componente, a seção fica igual.
- Enter num link dispara `click`, então o teclado também seleciona.
- Só o `select` muda, e o nome digitado fica.

*Rejeitado:* `?servico=implante#agendar`. Mudar a query recarrega a página. Também rejeitado: um hash por serviço. `#agendar-implante` não acha a seção, e a rolagem nativa se perde.

### 9. Evento `lead_whatsapp`

No `submit` válido:

```ts
window.dataLayer?.push({ event: "lead_whatsapp", servico: servico.value });
```

- Com `declare global { interface Window { dataLayer?: object[] } }` no script do componente.
- Só o identificador do serviço vai para o evento. O nome é dado pessoal e não vai para análise.

### 10. Placeholder sai

Sai o `Img` do placeholder em `#agendar`, junto com o `import` dele e o arquivo `src/assets/images/placeholders/formulario.svg`, que não tem outro uso. No lugar entra `<FormWhatsapp class="margin-top-7" />`, com o mesmo espaço que o placeholder tinha.

## Risks / Trade-offs

- [O `wa.me` deixar de aceitar `+` como espaço] → É a codificação padrão de formulários, e o próprio `wa.me` a usa no redirecionamento. Se mudar, troque o envio nativo por `window.open` com `encodeURIComponent`. O módulo da mensagem fica igual.
- [`nome` e `servico` aparecem na URL antes do redirecionamento] → O nome já vai dentro da mensagem para o WhatsApp da clínica, então nenhum dado novo sai do site. O `wa.me` descarta os dois.
- [Sem JS, a conversa abre sem mensagem e os erros aparecem em balões do navegador] → O visitante ainda chega à clínica pelo WhatsApp. Quase todo mundo tem JS ativo.
- [Navegadores embutidos (Instagram, Facebook) podem abrir o `wa.me` na mesma visualização] → É o comportamento normal deles. O link do WhatsApp continua funcionando.
- [A Sofia depende do texto exato da mensagem] → A mensagem sai só de `whatsappText`, e o teste trava as frases. Qualquer mudança na copy da mensagem precisa ser combinada com a configuração da Sofia.
- [`--experimental-strip-types` imprime um aviso no Node 22.16] → O aviso é inofensivo e some nas versões em que a remoção de tipos já é padrão.
- [Um `data-servico` com identificador inexistente deixa o `select` sem opção] → Os identificadores vêm da mesma tabela. A validação acusa o campo vazio no envio.
- [O formulário aparece duas vezes no HTML] → São poucos elementos, e o modal só aparece ao abrir. Os IDs vêm de `uid`, e cada formulário valida só os próprios campos.
- [`data-modal-open="agendamento"` se repete em seis lugares do código] → É o gatilho que o `Modal` já oferece, e cada CTA fica explícito. Trocar o ID do modal exige trocar esses seis lugares (`grep -rn agendamento src`).
- [O Safari não foca links ao clicar, então ao fechar o modal o foco pode voltar ao `body`] → É o comportamento nativo do `<dialog>` nesse navegador. Pelo teclado, o foco volta ao CTA.
- [O `<dialog>` foca o botão "Fechar" ao abrir, não o campo "Seu nome"] → Evita abrir o teclado do celular sem o visitante pedir. É um Tab até o primeiro campo.

## Migration Plan

Mudança só de frontend estático. Deploy normal pela Cloudflare. Rollback: `git revert` do commit, que traz o placeholder de volta.
