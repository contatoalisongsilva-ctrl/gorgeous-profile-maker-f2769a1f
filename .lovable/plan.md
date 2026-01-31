
# Plano: Trocar Kit Product para a Versão B

## Objetivo
Fazer com que a página `/versao-b` use o produto **Kit Colágeno Verisol® - B1** (ID: 7415497916487) em vez do produto padrão, mantendo a página principal (`/`) com o produto atual.

## Dados do Novo Produto (já validado na Shopify)

| Variante | Variant ID | Preço |
|----------|------------|-------|
| 1 unidade | 42450247352391 | R$ 117,70 |
| 3 unidades | 42450247385159 | R$ 267,70 |
| 6 unidades | 42450247417927 | R$ 477,70 |

- **Product ID:** 7415497916487
- **Handle:** kit-colageno-verisol®-b1-lovable-rugas

## Estratégia de Implementação

A melhor abordagem é criar uma configuração separada para o produto B1 e passar via props, evitando duplicação de código e mantendo a manutenibilidade.

## Mudanças Necessárias

### 1. Criar configuração do Kit B1 em `src/lib/shopify.ts`
Adicionar um novo objeto `KIT_PRODUCT_B1` com os IDs corretos:
```typescript
export const KIT_PRODUCT_B1 = {
  productId: "gid://shopify/Product/7415497916487",
  handle: "kit-colageno-verisol-b1-lovable-rugas",
  baseHandle: "colageno-verisol-b1",
  variants: {
    1: { variantId: "gid://shopify/ProductVariant/42450247352391", priceCents: 11770 },
    3: { variantId: "gid://shopify/ProductVariant/42450247385159", priceCents: 26770 },
    6: { variantId: "gid://shopify/ProductVariant/42450247417927", priceCents: 47770 }
  }
};
```

### 2. Modificar função `createShopifyCheckout` em `src/lib/shopify.ts`
Adicionar parâmetro opcional para receber o kit product:
```typescript
export async function createShopifyCheckout(
  flavorQuantities: FlavorQuantities,
  kitQuantity: number,
  kitProduct = KIT_PRODUCT  // valor padrão mantém compatibilidade
): Promise<string | null>
```

### 3. Modificar função `buildKitAttributes` em `src/lib/shopify.ts`
Adicionar parâmetro para receber o kit product:
```typescript
function buildKitAttributes(
  flavorQuantities: FlavorQuantities, 
  kitQuantity: number,
  kitProduct = KIT_PRODUCT
): CartAttribute[]
```

### 4. Atualizar `OfferSection` para aceitar props opcionais
Adicionar prop `kitProduct` com valor padrão:
```typescript
interface OfferSectionProps {
  kitProduct?: typeof KIT_PRODUCT;
}

const OfferSection = ({ kitProduct = KIT_PRODUCT }: OfferSectionProps) => {
  // ... passar kitProduct para createShopifyCheckout
}
```

### 5. Atualizar `IndexB.tsx` para passar o produto B1
```typescript
import { KIT_PRODUCT_B1 } from "@/lib/shopify";
// ...
<OfferSection kitProduct={KIT_PRODUCT_B1} />
```

## Arquivos a Modificar
1. `src/lib/shopify.ts` - Adicionar KIT_PRODUCT_B1 e modificar funções
2. `src/components/OfferSection.tsx` - Aceitar kitProduct via props
3. `src/pages/IndexB.tsx` - Passar KIT_PRODUCT_B1 para OfferSection

## Resultado Esperado
- Página `/` continuará usando o produto original (7376358539335)
- Página `/versao-b` usará o produto B1 (7415497916487)
- Vendas na versão B serão rastreadas separadamente no painel Shopify

## Detalhes Técnicos

As funções internas que usam `KIT_PRODUCT` diretamente serão atualizadas para receber o parâmetro:
- `buildKitAttributes()` → recebe `kitProduct` 
- `createShopifyCheckout()` → recebe `kitProduct` e passa para `buildKitAttributes()`

Isso garante que os metadados do checkout (`_kit_base_handle`, `_kit_product_handle`, variant IDs) sejam corretos para cada versão.
