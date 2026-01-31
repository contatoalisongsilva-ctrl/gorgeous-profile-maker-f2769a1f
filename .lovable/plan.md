
# Plano: Trocar Kit Product para a Versão A (página principal)

## Objetivo
Atualizar a página principal (`/`) para usar o produto **Kit Colágeno Verisol® - A1** (ID: 7415497883719), substituindo o produto padrão atual. Isso completa o setup de A/B testing com produtos separados.

## Dados do Produto A1 (validado na Shopify)

| Variante | Variant ID | Preço |
|----------|------------|-------|
| 1 unidade | 42450247254087 | R$ 117,70 |
| 3 unidades | 42450247286855 | R$ 267,70 |
| 6 unidades | 42450247319623 | R$ 477,70 |

- **Product ID:** 7415497883719
- **Handle:** kit-colageno-verisol-a1-lovable-rugas
- **Base Handle:** colageno-verisol-a1

## Mudanças Necessárias

### 1. Atualizar `KIT_PRODUCT` em `src/lib/shopify.ts`
Substituir os IDs do produto padrão pelos IDs do produto A1:

```typescript
export const KIT_PRODUCT = {
  productId: "gid://shopify/Product/7415497883719",
  handle: "kit-colageno-verisol-a1-lovable-rugas",
  baseHandle: "colageno-verisol-a1",
  variants: {
    1: { variantId: "gid://shopify/ProductVariant/42450247254087", priceCents: 11770 },
    3: { variantId: "gid://shopify/ProductVariant/42450247286855", priceCents: 26770 },
    6: { variantId: "gid://shopify/ProductVariant/42450247319623", priceCents: 47770 }
  }
};
```

## Arquivo a Modificar
1. `src/lib/shopify.ts` - Atualizar `KIT_PRODUCT` com os novos IDs

## Resultado Esperado

Após a implementação:
- **Página `/`** → Produto A1 (7415497883719)
- **Página `/versao-b`** → Produto B1 (7415497916487)

Isso permite rastrear vendas de cada versão separadamente no painel Shopify, facilitando a análise do A/B test.

## Resumo dos Produtos

| Página | Produto | Product ID | Rastreamento |
|--------|---------|------------|--------------|
| `/` (Versão A) | Kit Colágeno Verisol® - A1 | 7415497883719 | Separado |
| `/versao-b` | Kit Colágeno Verisol® - B1 | 7415497916487 | Separado |
