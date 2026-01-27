import { toast } from "sonner";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'renova-be.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '24a3567538b9fcd628b114f2a5ce6274';

// Kit product with variants for 1x, 3x, 6x
export const KIT_PRODUCT = {
  productId: "gid://shopify/Product/7376358539335",
  handle: "kit-colageno-verisol",
  baseHandle: "colageno-verisol",
  variants: {
    1: { variantId: "gid://shopify/ProductVariant/42322028986439", priceCents: 11770 },
    3: { variantId: "gid://shopify/ProductVariant/42322029019207", priceCents: 26770 },
    6: { variantId: "gid://shopify/ProductVariant/42322029051975", priceCents: 47770 }
  }
};

// Mapeamento sabor → variant ID + SKU (usando nomes como chave)
export const FLAVOR_VARIANTS: Record<string, { variantId: string; sku: string; name: string }> = {
  "Cranberry": { variantId: "42319344566343", sku: "COL1.0209", name: "Cranberry" },
  "Frutas Tropicais": { variantId: "42319344697415", sku: "COL1.0118", name: "Frutas Tropicais" },
  "Limão": { variantId: "42319344664647", sku: "COL1.0210", name: "Limão" },
  "Pink Lemonade": { variantId: "42319344631879", sku: "COL1.0267", name: "Pink Lemonade" },
  "Tangerina": { variantId: "42319344599111", sku: "COL1.0211", name: "Tangerina" },
};

// Brindes (gifts) com seus variant IDs e SKUs
export const GIFT_PRODUCTS: Record<string, { variantId: string; sku: string; name: string }> = {
  retinol: { variantId: "42317284966471", sku: "CREM.0236", name: "Creme Facial Retinol" },
  serumVitaB3: { variantId: "42317297778759", sku: "SERU.0159", name: "Sérum Facial Vita B3" },
  balm: { variantId: "42317283688519", sku: "BALM.0284", name: "Balm Alívio Flex" },
};

// Qual kit recebe quais brindes
export const KIT_GIFTS: Record<number, string[]> = {
  1: ["retinol"],
  3: ["retinol", "serumVitaB3"],
  6: ["retinol", "serumVitaB3", "balm"],
};

export interface CartLine {
  merchandiseId: string;
  quantity: number;
  attributes?: CartAttribute[];
}

export interface CartAttribute {
  key: string;
  value: string;
}

export type FlavorQuantities = Record<string, number>;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Pagamento necessário", {
      description: "O acesso à API do Shopify requer um plano pago. Visite https://admin.shopify.com para atualizar."
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Erro ao chamar Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { 
          edges { 
            node { 
              id 
              merchandise { 
                ... on ProductVariant { id } 
              } 
            } 
          } 
        }
      }
      userErrors { field message }
    }
  }
`;

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function buildItensDescription(flavorQuantities: FlavorQuantities, kitQuantity: number): string {
  const items: string[] = [];

  // Add flavors
  Object.entries(flavorQuantities).forEach(([flavorName, qty]) => {
    if (qty > 0) {
      items.push(`${qty}x ${flavorName.toUpperCase()}`);
    }
  });

  // Add gifts
  const giftKeys = KIT_GIFTS[kitQuantity] || [];
  giftKeys.forEach(giftKey => {
    const gift = GIFT_PRODUCTS[giftKey];
    if (gift) {
      items.push(`1x ${gift.name}`);
    }
  });

  return items.join(", ");
}

function buildKitAttributes(flavorQuantities: FlavorQuantities, kitQuantity: number): CartAttribute[] {
  const kitVariant = KIT_PRODUCT.variants[kitQuantity as keyof typeof KIT_PRODUCT.variants];
  if (!kitVariant) return [];

  // Build base arrays from selected flavors
  const baseVariantIds: string[] = [];
  const baseSkus: string[] = [];
  const baseVariantIdQty: string[] = [];
  const baseSkuQty: string[] = [];

  Object.entries(flavorQuantities).forEach(([flavorName, qty]) => {
    if (qty > 0) {
      const flavor = FLAVOR_VARIANTS[flavorName];
      if (flavor) {
        baseVariantIds.push(flavor.variantId);
        baseSkus.push(flavor.sku);
        baseVariantIdQty.push(`${flavor.variantId}:${qty}`);
        baseSkuQty.push(`${flavor.sku}:${qty}`);
      }
    }
  });

  // Build extra arrays from gifts
  const extraVariantIds: string[] = [];
  const extraSkus: string[] = [];
  const extraVariantIdQty: string[] = [];
  const extraSkuQty: string[] = [];

  const giftKeys = KIT_GIFTS[kitQuantity] || [];
  giftKeys.forEach(giftKey => {
    const gift = GIFT_PRODUCTS[giftKey];
    if (gift) {
      extraVariantIds.push(gift.variantId);
      extraSkus.push(gift.sku);
      extraVariantIdQty.push(`${gift.variantId}:1`);
      extraSkuQty.push(`${gift.sku}:1`);
    }
  });

  // Build Itens description
  const itensDescription = buildItensDescription(flavorQuantities, kitQuantity);

  return [
    { key: "_kit", value: "true" },
    { key: "_kit_pack", value: String(kitQuantity) },
    { key: "_kit_base_handle", value: KIT_PRODUCT.baseHandle },
    { key: "_kit_product_handle", value: KIT_PRODUCT.handle },
    { key: "_kit_price_cents", value: String(kitVariant.priceCents) },
    { key: "Itens", value: itensDescription },
    { key: "_kit_base_variant_ids", value: baseVariantIds.join(",") },
    { key: "_kit_extra_variant_ids", value: extraVariantIds.join(",") },
    { key: "_kit_base_variant_id_qty", value: baseVariantIdQty.join("|") },
    { key: "_kit_extra_variant_id_qty", value: extraVariantIdQty.join("|") },
    { key: "_kit_base_skus", value: baseSkus.join(",") },
    { key: "_kit_extra_skus", value: extraSkus.join(",") },
    { key: "_kit_base_sku_qty", value: baseSkuQty.join("|") },
    { key: "_kit_extra_sku_qty", value: extraSkuQty.join("|") },
  ];
}

export async function createShopifyCheckout(
  flavorQuantities: FlavorQuantities,
  kitQuantity: number
): Promise<string | null> {
  try {
    const kitVariant = KIT_PRODUCT.variants[kitQuantity as keyof typeof KIT_PRODUCT.variants];
    
    if (!kitVariant) {
      toast.error("Kit inválido");
      return null;
    }

    const totalSelected = Object.values(flavorQuantities).reduce((sum, qty) => sum + qty, 0);
    
    if (totalSelected !== kitQuantity) {
      toast.error(`Selecione ${kitQuantity} sabor${kitQuantity !== 1 ? "es" : ""}`);
      return null;
    }

    // Build kit attributes
    const attributes = buildKitAttributes(flavorQuantities, kitQuantity);

    // Create cart with single kit variant + attributes
    const lines: CartLine[] = [{
      merchandiseId: kitVariant.variantId,
      quantity: 1,
      attributes: attributes
    }];

    const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: { 
        lines: lines.map(line => ({
          merchandiseId: line.merchandiseId,
          quantity: line.quantity,
          attributes: line.attributes
        }))
      },
    });

    if (data?.data?.cartCreate?.userErrors?.length > 0) {
      console.error('Cart creation failed:', data.data.cartCreate.userErrors);
      toast.error("Erro ao criar carrinho", {
        description: data.data.cartCreate.userErrors[0]?.message || "Tente novamente"
      });
      return null;
    }

    const cart = data?.data?.cartCreate?.cart;
    if (!cart?.checkoutUrl) {
      toast.error("Erro ao criar checkout", {
        description: "Não foi possível gerar o link de pagamento"
      });
      return null;
    }

    return formatCheckoutUrl(cart.checkoutUrl);
  } catch (error) {
    console.error('Failed to create checkout:', error);
    toast.error("Erro ao processar", {
      description: "Tente novamente em alguns instantes"
    });
    return null;
  }
}
