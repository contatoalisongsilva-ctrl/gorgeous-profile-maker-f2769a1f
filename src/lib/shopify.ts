import { toast } from "sonner";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'renova-be.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '24a3567538b9fcd628b114f2a5ce6274';

// Variant IDs for 1 unit of each flavor - each flavor maps to its respective product
export const FLAVOR_VARIANT_IDS: Record<string, { id: string; sku: string; handle: string; name: string }> = {
  "cranberry": {
    id: "gid://shopify/ProductVariant/42319344074823",
    sku: "COL1.0209",
    handle: "colageno-verisol®-com-acido-hialuronico-frutado-cranberry",
    name: "Cranberry"
  },
  "tangerina": {
    id: "gid://shopify/ProductVariant/42319344271431",
    sku: "COL1.0207",
    handle: "colageno-verisol®-com-acido-hialuronico-frutado-tangerina",
    name: "Tangerina"
  },
  "pink-lemonade": {
    id: "gid://shopify/ProductVariant/42319105491015",
    sku: "COL1.0205",
    handle: "colageno-verisol®-com-acido-hialuronico-frutado-pink-lemonade",
    name: "Pink Lemonade"
  },
  "limao": {
    id: "gid://shopify/ProductVariant/42319344500807",
    sku: "COL1.0208",
    handle: "colageno-verisol®-com-acido-hialuronico-frutado-limao",
    name: "Limão"
  },
  "frutas-tropicais": {
    id: "gid://shopify/ProductVariant/42319344697415",
    sku: "COL1.0210",
    handle: "colageno-verisol®-com-acido-hialuronico-frutado-frutas-tropicais",
    name: "Frutas Tropicais"
  },
};

// Brindes (gifts) for kits 3 and 6
export const KIT_GIFT_VARIANTS = {
  cremeRetinol: {
    id: "gid://shopify/ProductVariant/42317284966471",
    sku: "CREM.0236",
    title: "Creme Facial Retinol Para a Noite"
  },
  serumVitaB3: {
    id: "gid://shopify/ProductVariant/42317297778759",
    sku: "SERU.0159",
    title: "Sérum Facial + Hidratante Vita B3"
  },
  balmAlivioFlex: {
    id: "gid://shopify/ProductVariant/42317283688519",
    sku: "BALM.0284",
    title: "Balm dores - Alívio Flex"
  }
};

// Kit configurations with price in cents and included gifts
export const KIT_CONFIGURATIONS: Record<number, {
  priceCents: number;
  gifts: Array<keyof typeof KIT_GIFT_VARIANTS>;
}> = {
  3: {
    priceCents: 26770, // R$ 267,70
    gifts: ["cremeRetinol", "serumVitaB3"]
  },
  6: {
    priceCents: 47770, // R$ 477,70
    gifts: ["cremeRetinol", "serumVitaB3", "balmAlivioFlex"]
  }
};

export interface CartLine {
  merchandiseId: string;
  quantity: number;
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

function buildKitAttributes(flavorQuantities: FlavorQuantities, kitQuantity: number): CartAttribute[] {
  const kitConfig = KIT_CONFIGURATIONS[kitQuantity];
  if (!kitConfig) return [];

  // Get selected flavors with their quantities
  const selectedFlavors = Object.entries(flavorQuantities)
    .filter(([, qty]) => qty > 0)
    .map(([flavorId, qty]) => ({ flavor: FLAVOR_VARIANT_IDS[flavorId], qty }));

  if (selectedFlavors.length === 0) return [];

  // Use first selected flavor as base handle (for kit identification)
  const primaryFlavor = selectedFlavors[0].flavor;

  // Build base variant IDs and SKUs (multiple flavors)
  const baseVariantIds = selectedFlavors.map(({ flavor }) => 
    flavor.id.replace('gid://shopify/ProductVariant/', '')
  ).join(',');
  
  const baseSkus = selectedFlavors.map(({ flavor }) => flavor.sku).join(',');

  const baseVariantIdQty = selectedFlavors.map(({ flavor, qty }) => 
    `${flavor.id.replace('gid://shopify/ProductVariant/', '')}:${qty}`
  ).join('|');

  const baseSkuQty = selectedFlavors.map(({ flavor, qty }) => 
    `${flavor.sku}:${qty}`
  ).join('|');

  // Build extra variant IDs and SKUs from gifts
  const extraVariantIds = kitConfig.gifts.map(giftKey => 
    KIT_GIFT_VARIANTS[giftKey].id.replace('gid://shopify/ProductVariant/', '')
  ).join(',');
  
  const extraSkus = kitConfig.gifts.map(giftKey => 
    KIT_GIFT_VARIANTS[giftKey].sku
  ).join(',');

  const extraVariantIdQty = kitConfig.gifts.map(giftKey => 
    `${KIT_GIFT_VARIANTS[giftKey].id.replace('gid://shopify/ProductVariant/', '')}:1`
  ).join('|');

  const extraSkuQty = kitConfig.gifts.map(giftKey => 
    `${KIT_GIFT_VARIANTS[giftKey].sku}:1`
  ).join('|');

  return [
    { key: "_kit", value: "true" },
    { key: "_kit_pack", value: String(kitQuantity) },
    { key: "_kit_base_handle", value: primaryFlavor.handle },
    { key: "_kit_product_handle", value: "kit-colageno-verisol®" },
    { key: "_kit_price_cents", value: String(kitConfig.priceCents) },
    { key: "_kit_base_variant_ids", value: baseVariantIds },
    { key: "_kit_extra_variant_ids", value: extraVariantIds },
    { key: "_kit_base_variant_id_qty", value: baseVariantIdQty },
    { key: "_kit_extra_variant_id_qty", value: extraVariantIdQty },
    { key: "_kit_base_skus", value: baseSkus },
    { key: "_kit_extra_skus", value: extraSkus },
    { key: "_kit_base_sku_qty", value: baseSkuQty },
    { key: "_kit_extra_sku_qty", value: extraSkuQty },
  ];
}

function buildKitCartLines(flavorQuantities: FlavorQuantities, kitQuantity: number): CartLine[] {
  const kitConfig = KIT_CONFIGURATIONS[kitQuantity];
  if (!kitConfig) return [];

  const lines: CartLine[] = [];

  // Add base products (collagen) with their quantities
  Object.entries(flavorQuantities).forEach(([flavorId, qty]) => {
    if (qty > 0) {
      const flavor = FLAVOR_VARIANT_IDS[flavorId];
      if (flavor) {
        lines.push({ merchandiseId: flavor.id, quantity: qty });
      }
    }
  });

  // Add gift products (1 each)
  kitConfig.gifts.forEach(giftKey => {
    lines.push({
      merchandiseId: KIT_GIFT_VARIANTS[giftKey].id,
      quantity: 1
    });
  });

  return lines;
}

export async function createShopifyCheckout(
  flavorQuantities: FlavorQuantities,
  kitQuantity: number
): Promise<string | null> {
  try {
    let lines: CartLine[];
    let attributes: CartAttribute[] = [];

    const isKitProduct = kitQuantity === 3 || kitQuantity === 6;
    const totalSelected = Object.values(flavorQuantities).reduce((sum, qty) => sum + qty, 0);

    if (isKitProduct) {
      // For kits 3 and 6: add base products + gifts with kit attributes
      lines = buildKitCartLines(flavorQuantities, kitQuantity);
      attributes = buildKitAttributes(flavorQuantities, kitQuantity);
    } else {
      // For single unit: just the flavor product
      const selectedFlavorId = Object.entries(flavorQuantities).find(([, qty]) => qty > 0)?.[0];
      if (!selectedFlavorId) {
        toast.error("Selecione um sabor");
        return null;
      }
      const flavor = FLAVOR_VARIANT_IDS[selectedFlavorId];
      if (!flavor) {
        toast.error("Sabor inválido");
        return null;
      }
      lines = [{ merchandiseId: flavor.id, quantity: 1 }];
    }

    if (lines.length === 0) {
      toast.error("Nenhum produto selecionado");
      return null;
    }

    const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: { 
        lines,
        attributes: attributes.length > 0 ? attributes : undefined
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
