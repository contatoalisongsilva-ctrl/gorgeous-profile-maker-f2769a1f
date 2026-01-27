import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

interface ShopifyBuyButtonProps {
  kitValue: 1 | 3 | 6 | 12;
  size?: "small" | "normal";
}

const SHOPIFY_CONFIG = {
  domain: "totvsip-newhair-dc.myshopify.com",
  storefrontAccessToken: "c8dbb0f9057012cb485bf3fada35ea44",
  productId: "10207708315780",
};

const variantIds = {
  1: "51458372337796",
  3: "51458372370564",
  6: "51458372403332",
  12: "51458372436100",
};

const kitPrices = {
  1: 97.05,
  3: 173.05,
  6: 313.22,
  12: 567.70,
};

const kitNames = {
  1: "1 Unidade",
  3: "3 Unidades",
  6: "6 Unidades",
  12: "12 Unidades",
};

let shopifyScriptLoaded = false;
let shopifyScriptLoading = false;

const loadShopifyScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.ShopifyBuy) {
      resolve();
      return;
    }

    if (shopifyScriptLoaded) {
      resolve();
      return;
    }

    if (shopifyScriptLoading) {
      const checkInterval = setInterval(() => {
        if (window.ShopifyBuy) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      return;
    }

    shopifyScriptLoading = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.onload = () => {
      shopifyScriptLoaded = true;
      shopifyScriptLoading = false;
      resolve();
    };
    document.head.appendChild(script);
  });
};

const ShopifyBuyButton = ({ kitValue, size = "normal" }: ShopifyBuyButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const componentId = `shopify-buy-button-${kitValue}-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    let isMounted = true;

    const initShopify = async () => {
      await loadShopifyScript();

      if (!isMounted || !containerRef.current || !window.ShopifyBuy) return;

      // Clear any existing content
      containerRef.current.innerHTML = "";

      const client = window.ShopifyBuy.buildClient({
        domain: SHOPIFY_CONFIG.domain,
        storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        if (!isMounted || !containerRef.current) return;

        const buttonStyle = size === "small" 
          ? {
              "font-weight": "bold",
              "font-size": "12px",
              ":hover": { "background-color": "#0fa774" },
              "background-color": "#11b981",
              ":focus": { "background-color": "#0fa774" },
              "border-radius": "8px",
              "padding": "6px 12px",
              "height": "32px",
            }
          : {
              "font-weight": "bold",
              ":hover": { "background-color": "#0fa774" },
              "background-color": "#11b981",
              ":focus": { "background-color": "#0fa774" },
              "border-radius": "38px",
              "padding-left": "42px",
              "padding-right": "42px",
            };

        ui.createComponent("product", {
          id: SHOPIFY_CONFIG.productId,
          variantId: variantIds[kitValue],
          node: containerRef.current,
          moneyFormat: "R$ {{amount_with_comma_separator}}",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0",
                    "margin-bottom": "0",
                  },
                },
                button: buttonStyle,
              },
              buttonDestination: "checkout",
              contents: {
                img: false,
                title: false,
                price: false,
                options: false,
              },
              text: {
                button: size === "small" ? "Comprar" : "Comprar agora",
              },
              variantId: variantIds[kitValue],
            },
            cart: {
              styles: {
                button: {
                  "font-weight": "bold",
                  ":hover": { "background-color": "#0fa774" },
                  "background-color": "#11b981",
                  ":focus": { "background-color": "#0fa774" },
                  "border-radius": "38px",
                },
              },
              text: {
                total: "Subtotal",
                button: "Checkout",
              },
              popup: false,
            },
            toggle: {
              styles: {
                toggle: {
                  "font-weight": "bold",
                  "background-color": "#11b981",
                  ":hover": { "background-color": "#0fa774" },
                  ":focus": { "background-color": "#0fa774" },
                },
              },
            },
          },
        });

        setIsInitialized(true);
      });
    };

    initShopify();

    return () => {
      isMounted = false;
    };
  }, [kitValue, size]);

  return (
    <div 
      ref={containerRef} 
      id={componentId}
      className={`w-full ${size === "small" ? "mt-3" : "mt-2"}`}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default ShopifyBuyButton;
