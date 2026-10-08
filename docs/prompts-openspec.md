# Prompts OpenSpec — Landing Page Odonto Excellence Itapoá

Rode as mudanças **na ordem**. Cada uma depende da anterior.

## Fluxo de cada mudança

1. Cole o prompt com `/opsx:propose`.
2. Revise `proposal.md`, `design.md`, `specs/` e `tasks.md` em `openspec/changes/<nome>/`.
3. Rode `/opsx:apply <nome>`.
4. Confira no navegador: `astro dev --background`.
5. Rode `/opsx:archive <nome>`.

Pré-requisitos já feitos:

- Copy: `docs/copy-landing-page.md`
- Contexto do projeto: `openspec/config.yaml`

---

## 1. Identidade visual e base do site

```text
/opsx:propose identidade-visual

Aplicar a identidade visual da Odonto Excellence Itapoá ao Lumos e preparar a base do site. Leia LUMOS.md, openspec/config.yaml e docs/copy-landing-page.md antes de planejar.

Escopo:
- Tokens em src/styles/base.css:
  - Vermelho da marca #de1f26 como --brand-500, com texto branco sobre ele.
  - Um tom de hover mais escuro derivado do vermelho.
  - Branco como fundo principal e um off-white quente para alternar seções.
  - Preto do logo como neutro escuro.
  - Todas as combinações de texto e fundo com contraste WCAG AA.
- Tipografia elegante:
  - Uma serifa de display para títulos, que dialogue com o "EXCELLENCE" do logo (ex.: Cormorant Garamond ou Playfair Display).
  - Inter (já instalada) para o texto corrido.
  - Fontes self-hosted via Fonts API do Astro, só os pesos usados, subset latin.
- Logo:
  - Mover "public/logo-odonto-exellence (1).png" para src/assets/logo/ com nome sem espaços.
  - Usar o logo no Nav e no Footer.
  - Gerar favicon a partir do símbolo vermelho.
- src/consts.ts: SITE_NAME, SITE_DESCRIPTION (meta da copy), SITE_URL [domínio a definir], SITE_LOCALE "pt-BR".
- BaseLayout com lang="pt-BR".
- Nav conforme a seção 1 da copy: âncoras, botão "Agendar avaliação", menu mobile e barra fixa de CTA no mobile.
- Footer conforme a seção 14 da copy, com placeholders para responsável técnico/CRO e CNPJ.
- Mover public/dados_atendimento_itapoa.md para docs/. Arquivos em public/ são publicados no site e esse é o prompt interno da assistente.
- Renomear src/pages/example-components.astro para _example-components.astro, para tirá-lo do build.

Fora do escopo: seções da landing page, formulário, otimização de imagens.

Critério de aceite: página inicial vazia com Nav e Footer já na identidade nova, contraste AA, `npm run check` e `npm run build` sem erros.
```

---

## 2. Seções da landing page

```text
/opsx:propose landing-page-secoes

Construir a landing page em src/pages/index.astro com as seções 2 a 13 de docs/copy-landing-page.md. Use exatamente os textos da copy. Siga LUMOS.md: compor com Section, ContentWrapper, Grid, Card, Accordion, Img, Button e os demais componentes existentes; criar componente custom só quando houver CSS ou script próprio.

Requisitos:
- Ordem: Hero, Faixa de credibilidade, A clínica, Tratamentos, A experiência, Como funciona, Investimento, Equipe, Depoimentos, Dúvidas, Agende sua avaliação, Localização.
- Âncoras: #clinica, #tratamentos, #como-funciona, #duvidas, #agendar, #localizacao.
- Visual de alto padrão, inspirado em https://www.odontoexcellence.com.br/:
  - Muito espaço em branco e títulos em serifa.
  - Vermelho #de1f26 só em CTAs e detalhes de destaque, nunca em blocos grandes.
  - Fotos grandes com cantos discretos.
  - Fundos alternando entre branco e off-white.
- Imagens:
  - Baixar as fotos do "Mapa de imagens" da copy para src/assets/images/ e usar o componente Img (astro:assets).
  - Slots sem foto recebem um placeholder neutro com rótulo visível (ex.: "FOTO: fachada da clínica"), fácil de trocar depois.
  - Alt text descritivo em pt-BR.
- Equipe e Depoimentos com render={false} até haver conteúdo real. Deixar a marcação pronta.
- Dúvidas com o Accordion do Lumos.
- Seção #agendar: reservar o lugar do formulário com um placeholder. O formulário real vem na próxima mudança.
- Localização: botão "Como chegar" com o link do Google Maps da copy. Sem iframe de mapa nesta etapa.
- Animação de entrada sutil, só em CSS, desligada com prefers-reduced-motion.
- Mobile-first, sem scroll horizontal de 320px a 1440px.

Fora do escopo: lógica do formulário, otimização de performance.

Critério de aceite: todas as seções com os textos da copy, layout correto em 375px, 768px e 1440px, `npm run check` e `npm run build` sem erros.
```

Dica: depois do apply, rode `/impeccable` para um polimento visual.

---

## 3. Formulário de agendamento pelo WhatsApp

```text
/opsx:propose formulario-whatsapp

Criar o formulário de agendamento da seção #agendar, conforme a seção 12 de docs/copy-landing-page.md. Ele substitui o placeholder deixado na mudança anterior. Use os componentes de src/components/form/.

Comportamento:
- Campos:
  - Nome: obrigatório, 2 a 60 caracteres, espaços extras removidos.
  - Tratamento de interesse: select obrigatório com as 7 opções da copy.
- Ao enviar:
  - Montar a mensagem conforme o template da copy, com e sem serviço.
  - Codificar com encodeURIComponent.
  - Abrir https://wa.me/5547997660991?text=<mensagem> em nova aba.
- Preferir solução nativa: form GET para https://wa.me/5547997660991 com um input hidden "text" preenchido no submit. JS mínimo, só para compor a mensagem.
- Validação nativa do HTML com as mensagens de erro em pt-BR da copy. Foco vai para o primeiro campo inválido.
- Os links "Quero avaliar este tratamento" dos cards de Tratamentos rolam até #agendar com o serviço já selecionado.
- Acessibilidade:
  - Label visível em todo campo.
  - Erros ligados ao campo via aria-describedby.
  - Botão com área de toque de pelo menos 44×44.
- Sem backend e sem armazenar dados. Manter a microcopy de privacidade da copy.
- Opcional: se window.dataLayer existir, enviar o evento "lead_whatsapp" com o serviço escolhido. Não adicionar scripts de terceiros.

Teste: deixar a montagem da URL numa função pura com um check executável mínimo (node --test) cobrindo:
- mensagem com serviço;
- mensagem "Ainda não sei";
- nome com acentos e caracteres especiais.

Critério de aceite:
- Submeter "Maria" + "Implante dentário" abre o WhatsApp com "Olá! Meu nome é Maria. Vim pelo site e gostaria de agendar uma avaliação para implante dentário."
- Campos vazios mostram os erros da copy.
- Teste passa.
- `npm run check` e `npm run build` sem erros.
```

---

## 4. Performance

```text
/opsx:propose otimizar-performance

Otimizar a performance da landing page para Core Web Vitals. Medir antes e depois com Lighthouse em modo mobile, no build de produção (`npm run build` + `npm run preview`). Registrar os números no design.md.

Metas:
- Lighthouse mobile: Performance ≥ 95; Acessibilidade, Boas práticas e SEO = 100.
- LCP < 2,0 s com throttling 4G, CLS < 0,05, INP < 200 ms.
- JS total < 15 KB gzip. Carga inicial < 1 MB.

Ações a avaliar e aplicar:
- Imagens:
  - Picture/Img do astro:assets gerando AVIF e WebP, com srcset e sizes corretos por slot.
  - width e height explícitos em todas.
- Hero (LCP):
  - loading="eager", fetchpriority="high" e preload da imagem.
  - Imagem do hero com no máximo 120 KB no mobile.
  - Todas as outras imagens com loading="lazy" e decoding="async".
- Fontes:
  - Só os pesos usados, subset latin, font-display: swap.
  - Fallback com métricas ajustadas para evitar CLS.
  - Preload só da fonte do título do hero.
- Logo: trocar o PNG por SVG, se a clínica enviar; senão, WebP no tamanho exibido.
- CSS:
  - Usar build.inlineStylesheets "auto".
  - content-visibility: auto nas seções abaixo da dobra, com contain-intrinsic-size.
- JS: nenhum script de terceiros no carregamento; scripts dos componentes sem bloquear a renderização.
- Mapa: se houver iframe, usar fachada que só carrega o Google Maps após clique.
- Cache: arquivo public/_headers do Cloudflare com Cache-Control immutable para /_astro/*.
- Remover CSS, fontes e assets do Lumos que a página não usa.

Fora do escopo: mudar textos ou layout.

Critério de aceite: metas atingidas no Lighthouse mobile, tabela antes e depois no design.md, `npm run check` e `npm run build` sem erros.
```

---

## Opcional: SEO local

```text
/opsx:propose seo-local

Adicionar SEO local à landing page:
- JSON-LD schema.org "Dentist" com nome, endereço completo, telefone, horários (openingHoursSpecification), URL, logo e sameAs do Instagram @odontoexcellence_itapoa.
- og:image 1200×630.
- Conferir title e meta description da copy.
- Sitemap e robots.txt apontando para o domínio final.

Critério de aceite:
- JSON-LD válido no Rich Results Test.
- `npm run check` e `npm run build` sem erros.
```
