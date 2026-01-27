import { toast } from "sonner";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'renova-be.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '24a3567538b9fcd628b114f2a5ce6274';

// Variant IDs for 1 unit of each flavor - each flavor maps to its respective product
export const FLAVOR_VARIANT_IDS: Record<string, string> = {
  "cranberry": "gid://shopify/ProductVariant/42319344074823",      // Produto Cranberry - variante Cranberry
  "tangerina": "gid://shopify/ProductVariant/42319344271431",      // Produto Tangerina - variante Tangerina
  "pink-lemonade": "gid://shopify/ProductVariant/42319105491015",  // Produto Pink Lemonade - variante Pink-lemonade
  "limao": "gid://shopify/ProductVariant/42319344500807",          // Produto Limão - variante Limão
  "frutas-tropicais": "gid://shopify/ProductVariant/42319344697415", // Produto Frutas Tropicais - variante Tropical
};

// Kit Colágeno Verisol® - variantes por quantidade (produto único com brindes inclusos)
export const KIT_VARIANT_IDS: Record<number, string> = {
  3: "gid://shopify/ProductVariant/42322029019207",  // Kit 3 unidades - R$ 267,70
  6: "gid://shopify/ProductVariant/42322029051975",  // Kit 6 unidades - R$ 477,70
};

export interface CartLine {
  merchandiseId: string;
  quantity: number;
}

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

export async function createShopifyCheckout(lines: CartLine[]): Promise<string | null> {
  try {
    const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: { lines },
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
