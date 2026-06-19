# @schema-forms-data/ui

> Componentes UI compartilhados (Radix UI + Tailwind CSS) para os pacotes SchemaForms.

[![npm](https://img.shields.io/npm/v/@schema-forms-data/ui)](https://www.npmjs.com/package/@schema-forms-data/ui)
[![license](https://img.shields.io/npm/l/@schema-forms-data/ui)](./LICENSE)

Primitivos Radix UI com estilização Tailwind, usados internamente pelo `renderer` e pelo `builder`. Pode ser instalado de forma standalone para quem quiser os componentes sem o form engine.

## Install

```bash
pnpm add @schema-forms-data/ui
```

Importe o CSS no entry da sua aplicação:

```ts
import '@schema-forms-data/ui/style.css';
```

## O que inclui

Componentes: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Dialog`, `Popover`, `Tooltip`, `Slider`, `Switch`, `Progress`, `ScrollArea`, `Separator`, `Label`, `Badge`, `DateInput`, `FileInput`, `IconPicker`, `StepIndicator`.

Utilitário: `cn()` — merge de classes Tailwind sem conflitos.

## Peer dependencies

```bash
pnpm add lucide-react react react-dom
```

## Dependências em outros pacotes

| Depende de | Motivo |
|---|---|
| `@schema-forms-data/templates` | Consome o `TemplateContext` para aplicar CSS variables de tema |

---

## Ordem de atualização

`ui` ocupa a **terceira posição** na cadeia:

```
core  →  templates  →  [ui]  →  renderer  →  builder  →  react
```

Ao bumpar `ui`:
1. Certifique que `@schema-forms-data/templates` (devDep) está na versão desejada
2. Bumpa e publica `ui`
3. Atualiza a referência a `ui` em `renderer`, `builder` e `react`

## Build

```bash
pnpm install
pnpm build      # tsc -> dist/
```

## Publicar

Automático: a cada **push na `main`**, o workflow (`.github/workflows/publish.yml`)
publica **somente se a versão do `package.json` ainda não existir no npm**. Push de
README/refactor não republica nada — pra lançar, basta dar bump na versão:

```bash
npm version patch        # 4.0.7 -> 4.0.8 (faz commit + tag)
git push --follow-tags   # push na main dispara o publish da nova versão
```

Requer o secret **`NPM_TOKEN`** no repositório GitHub (Settings → Secrets → Actions →
`NPM_TOKEN`). Gere um **Automation token** em npmjs.com → Account → Access Tokens.
O flag `--provenance` anexa attestation de build automaticamente (rastreabilidade de
supply chain, sem custo extra).

## Licença

[MIT](LICENSE) © schema-forms-data
