## Purpose

Define como a página inicial da Odonto Excellence Itapoá se apresenta a buscadores e redes sociais: dados estruturados da clínica, imagem de compartilhamento e endereços de sitemap, `robots.txt` e canonical a partir do domínio do site.

## ADDED Requirements

### Requirement: Dados estruturados da clínica

A página inicial DEVE ter um único bloco JSON-LD do tipo `Dentist` (schema.org) com:

| Propriedade | Valor |
|---|---|
| `name` | Odonto Excellence Itapoá |
| `url` | a raiz do domínio do site |
| `telephone` | +55 47 99766-0991 |
| `address` | `PostalAddress`: `streetAddress` "Av. Celso Ramos, 512 - Cambijú", `addressLocality` "Itapoá", `addressRegion` "SC", `postalCode` "89249-000", `addressCountry` "BR" |
| `openingHoursSpecification` | segunda a sexta, 09:00–12:00 e 14:00–20:00; sábado, 09:00–12:00 e 13:00–17:00 |
| `logo` | URL absoluta do logo da clínica |
| `image` | URL absoluta da imagem de compartilhamento |
| `sameAs` | `https://www.instagram.com/odontoexcellence_itapoa/` |

Os horários DEVEM ser os da seção 13 de `docs/copy-landing-page.md`. Domingo fica fora, porque a clínica fecha. As URLs DEVEM usar o domínio do site. O bloco NÃO DEVE ter preço nem avaliação.

#### Scenario: JSON-LD válido

- **WHEN** o JSON-LD gerado é testado no Rich Results Test do Google
- **THEN** o item "Local business" (Dentist) é detectado sem erros

#### Scenario: Dados conferem com a copy

- **WHEN** o JSON-LD da página inicial é lido
- **THEN** nome, endereço, telefone, horários e Instagram são os da tabela acima

#### Scenario: Só na página inicial

- **WHEN** a página 404 é carregada
- **THEN** ela não tem JSON-LD

### Requirement: Imagem de compartilhamento

O `og:image` e o `twitter:image` padrão DEVEM apontar para uma imagem JPEG de 1200 × 630 px, servida pelo domínio do site. A imagem DEVE ter no máximo 300 KB e mostrar a identidade da clínica, com o logo. Ela NÃO DEVE ser a imagem padrão do Lumos.

#### Scenario: Compartilhar o link

- **WHEN** o link da página inicial é compartilhado no WhatsApp ou no Instagram
- **THEN** a prévia mostra a imagem da clínica, em 1200 × 630, com o título e a descrição sociais da copy

### Requirement: Domínio do site

Canonical, sitemap, `robots.txt` e as URLs absolutas de `og:image` e do JSON-LD DEVEM ser montados a partir de um único valor de domínio do site. O sitemap DEVE listar só as páginas indexáveis, hoje apenas `/`. O `robots.txt` DEVE liberar todo o site e apontar para o sitemap nesse domínio. Enquanto o domínio for o provisório (`example.com`), o build DEVE avisar que o site não está pronto para publicar.

#### Scenario: Sitemap

- **WHEN** o site é gerado
- **THEN** o sitemap lista só a página inicial, no domínio do site, sem a 404

#### Scenario: robots.txt

- **WHEN** alguém pede `/robots.txt`
- **THEN** recebe `User-agent: *`, `Allow: /` e a linha `Sitemap:` com a URL do sitemap no domínio do site

#### Scenario: Domínio provisório

- **WHEN** o build roda com o domínio ainda provisório
- **THEN** o terminal mostra um aviso de que o domínio final precisa ser definido antes de publicar
- **AND** o build termina sem erro

#### Scenario: Troca do domínio

- **WHEN** o domínio final é definido no único lugar previsto
- **THEN** canonical, sitemap, `robots.txt`, `og:image` e JSON-LD passam a usar o novo domínio no próximo build, sem outra edição
