## 1. Linha de base

- [x] 1.1 Antes de mexer no código, rodar o build e guardar, fora do repositório, a caixa de cada `section` e o texto visível da página inicial em 375 e em 1440 px (design, decisão 1). Verificar que os dois arquivos de referência foram gravados.
- [x] 1.2 Medir o INP de laboratório com a CPU 4× mais lenta, nas três interações do spec (decisão 1), e preencher a linha "INP" da coluna "Antes" da tabela do `design.md`. Verificar que a tabela tem o valor.

## 2. Desempenho

- [x] 2.1 Adicionar `build: { inlineStylesheets: "always" }` ao `astro.config.mjs` (decisão 2). Verificar que `dist/index.html` não tem `<link rel="stylesheet">`.
- [x] 2.2 Trocar o `<Font … preload />` do `BaseHead` por `preload={[{ weight: 600 }]}` (decisão 3). Verificar que `dist/index.html` tem um único `rel="preload"` de fonte e que ele aponta para o arquivo do `@font-face` de peso 600.
- [x] 2.3 Em `TestimonialVideo.astro`, tirar o `poster` do `<Video>`, guardar a URL em `data-poster` e aplicá-la no `show()` (decisão 4). Verificar no navegador:
  - carregar a página e rolar até o fim sem abrir o vídeo não pede o poster nem o vídeo;
  - ao abrir, o card se expande, o poster aparece e o vídeo toca como antes.
- [x] 2.4 Trocar o `Img` do Hero para `variant="constrained"` com o `sizes` da decisão 5. Verificar que, em 1440 px, `currentSrc` é uma variante de até cerca de 2× 572 px, e que em 412 px a foto baixada tem no máximo 120 KB.
- [x] 2.5 Criar `public/_headers` com a regra da decisão 6. Verificar com `npx wrangler dev` e `curl -I` que um arquivo de `/_astro/` volta com `Cache-Control: public, max-age=31536000, immutable` e que `/` não tem `immutable`.
- [x] 2.6 Rodar `npm run check` e `npm run build` e verificar que terminam sem erros.

## 3. SEO local

- [x] 3.1 Adicionar `SITE_TITLE`, `SITE_SOCIAL_TITLE` e `SITE_SOCIAL_DESCRIPTION` a `src/consts.ts`, com os textos da seção "Meta (SEO)" da copy, e aplicá-los no `BaseHead` (decisão 7). Verificar no HTML gerado os cenários "Página sem título próprio" (página inicial) e "Página com título próprio" (404) do spec `estrutura-global`.
- [x] 3.2 Adicionar o JSON-LD `Dentist` à página inicial (decisão 8). Verificar que `dist/index.html` tem um único `application/ld+json`, que o JSON é válido e que cada campo bate com a tabela do spec `seo-local`. Verificar também que `dist/404.html` não tem JSON-LD.
- [x] 3.3 Gerar a nova `public/og-image.jpg` (decisão 9). Verificar que o arquivo tem 1200 × 630, é JPEG, tem no máximo 300 KB e mostra o logo e a foto, abrindo a imagem.
- [x] 3.4 Adicionar o aviso de domínio provisório ao `astro.config.mjs` (decisão 10). Verificar que `npm run build` mostra o aviso e termina sem erro.
- [x] 3.5 Verificar os cenários "Sitemap" e "robots.txt": `dist/sitemap-0.xml` lista só `/`, e `dist/robots.txt` tem `User-agent: *`, `Allow: /` e `Sitemap:` no domínio de `SITE_URL`. Trocar `SITE_URL` temporariamente por outro domínio, rebuildar e conferir que canonical, sitemap, `robots.txt`, `og:image` e JSON-LD mudam juntos. Desfazer depois.
- [x] 3.6 Validar o JSON-LD no Rich Results Test do Google, colando o bloco gerado na aba "Código". Verificar que "Local business" é detectado sem erros. Se o teste não puder ser feito daqui, entregar o JSON-LD pronto para o cliente colar e registrar a pendência.
- [x] 3.7 Rodar `npm run check` e `npm run build` e verificar que terminam sem erros.

## 4. Conferência

- [x] 4.1 Rodar o Lighthouse mobile 3 vezes no build final e preencher a coluna "Depois" da tabela do `design.md` com as medianas. Verificar que todas as metas do requisito "Metas de Core Web Vitals" são atingidas. Se o LCP não ficar abaixo de 2,0 s, parar e levar a contingência do `design.md` para revisão.
- [ ] 4.2 Medir de novo o INP (decisão 1), preencher a coluna "Depois" e verificar que cada interação fica abaixo de 200 ms.
- [x] 4.3 Verificar o requisito "Peso da página": carga inicial abaixo de 1 MB, JavaScript abaixo de 15 KB com gzip, nenhum script de terceiros e nenhuma folha de estilo bloqueante. Preencher as linhas correspondentes da tabela.
- [x] 4.4 Verificar o cenário "Atributos" do requisito "Imagens" no HTML gerado: toda `<img>` tem `width`, `height` e `decoding="async"`, e só o logo do Nav e a foto do Hero não são lazy.
- [x] 4.5 Verificar "Visual inalterado" comparando com a referência da tarefa 1.1, em 375 e em 1440 px: caixas das seções e altura do documento com diferença de até 1 px, e o mesmo texto visível.
- [x] 4.6 Verificar que a página continua funcionando: as suítes da mudança `formulario-whatsapp` passam (formulário da seção, modal e CTAs), e o vídeo do depoimento abre, toca e fecha.
- [x] 4.7 Rodar `npm run check` e `npm run build` e verificar que terminam sem erros.
