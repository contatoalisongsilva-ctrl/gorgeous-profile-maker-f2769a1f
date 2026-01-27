import { useState, useEffect, useCallback } from "react";
import { Star, ShoppingCart, Truck, Clock, Gift, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelectedKit } from "@/contexts/SelectedKitContext";

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    gtag: (...args: any[]) => void;
  }
}

const COUNTDOWN_DURATION = 90; // 1 minuto e 30 segundos
const COUPON_CODE = "desconto10";

const StickyBuyButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_DURATION);
  const [showCoupon, setShowCoupon] = useState(false);
  const [copied, setCopied] = useState(false);
  const { selectedQuantity } = useSelectedKit();

  const quantities = [
    {
      value: 1 as const,
      label: "30 dias",
      sublabel: "1 Unidade",
      price: 97.05,
      originalPrice: null,
      reviews: "16.512",
    },
    {
      value: 3 as const,
      label: "3 meses",
      sublabel: "3 Unidades",
      price: 173.05,
      originalPrice: 227.7,
      reviews: "33.840",
      discount: "15% OFF",
      popular: true,
    },
    {
      value: 6 as const,
      label: "6 meses",
      sublabel: "6 Unidades",
      price: 313.22,
      originalPrice: 627.7,
      reviews: "38.002",
      discount: "25% OFF",
      bestValue: true,
    },
    {
      value: 12 as const,
      label: "12 meses",
      sublabel: "12 Unidades",
      price: 567.70,
      originalPrice: 1164.00,
      reviews: "5.800",
      discount: "51% OFF",
    },
  ];

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const selectedKit = quantities.find((q) => q.value === selectedQuantity);

  // Countdown timer
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowCoupon(true); // Mostra o cupom quando termina
          return 0; // Para em 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  useEffect(() => {
    const checkPrimaryButtonVisibility = () => {
      const primaryButton = document.getElementById("primary-buy-button");
      if (primaryButton) {
        const rect = primaryButton.getBoundingClientRect();
        setIsVisible(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", checkPrimaryButtonVisibility);
    checkPrimaryButtonVisibility();
    return () => window.removeEventListener("scroll", checkPrimaryButtonVisibility);
  }, []);

  const checkoutUrls = {
    1: "https://seguro.newhair.com.br/r/PQ783GIIJC",
    3: "https://seguro.newhair.com.br/b/IMY736TK32O8",
    6: "https://seguro.newhair.com.br/b/MGC781QXZFKG",
    12: "https://seguro.newhair.com.br/b/AAG63FNQ2H44",
  };

  const handlePurchase = () => {
    if (!selectedKit) return;

    // Meta Pixel - AddToCart
    if (typeof window.fbq === "function") {
      window.fbq("track", "AddToCart", {
        content_type: "product",
        content_ids: [`kit-${selectedKit.value}`],
        value: selectedKit.price,
        currency: "BRL",
      });
    }

    // GA4 - add_to_cart
    if (typeof window.gtag === "function") {
      window.gtag("event", "add_to_cart", {
        currency: "BRL",
        value: selectedKit.price,
        items: [
          {
            item_id: `kit-${selectedKit.value}`,
            item_name: `New Hair - ${selectedKit.sublabel}`,
            price: selectedKit.price,
            quantity: 1,
          },
        ],
      });
    }

    const checkoutUrl = checkoutUrls[selectedKit.value as keyof typeof checkoutUrls];

    // Aguarda os pixels dispararem antes de redirecionar
    setTimeout(() => {
      window.open(checkoutUrl, "_blank");
    }, 300);
  };

  const handleCopyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const progressPercentage = showCoupon ? 0 : (timeLeft / COUNTDOWN_DURATION) * 100;

  // Floating Coupon - always visible at bottom when coupon is active (even if sticky bar is hidden)
  const FloatingCoupon = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
      <div className="py-4 px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2" style={{ color: "#FF4289" }}>
            <Gift className="w-4 h-4" />
            <span className="text-sm font-medium">Parabéns! Ganhe 10% OFF agora:</span>
          </div>
          <button
            onClick={handleCopyCoupon}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-all"
            style={{
              borderColor: "#FF4289",
              backgroundColor: copied ? "rgba(255, 66, 137, 0.15)" : "white",
            }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" style={{ color: "#FF4289" }} />
                <span className="font-bold text-sm" style={{ color: "#FF4289" }}>
                  Cupom copiado, aplique no checkout
                </span>
              </>
            ) : (
              <>
                <span className="font-bold tracking-wider" style={{ color: "#FF4289" }}>
                  {COUPON_CODE}
                </span>
                <Copy className="w-4 h-4" style={{ color: "#FF4289" }} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Show only the floating coupon if sticky bar is hidden but coupon is active
  if (!isVisible) {
    if (showCoupon) {
      return <FloatingCoupon />;
    }
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        {/* Frete Grátis banner - only for 6 potes */}
        {selectedQuantity === 6 && (
          <div className="bg-emerald-50 py-2 text-center border-b border-emerald-100">
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <Truck className="w-4 h-4" />
              <span className="text-sm font-semibold">Frete Grátis</span>
            </div>
          </div>
        )}

        {/* Countdown Timer Bar OR Coupon */}
        {showCoupon ? (
          <div className="bg-white py-3 px-4 border-b border-gray-100">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2" style={{ color: "#FF4289" }}>
                <Gift className="w-4 h-4" />
                <span className="text-sm font-medium">Parabéns! Ganhe 10% OFF agora:</span>
              </div>
              <button
                onClick={handleCopyCoupon}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-all"
                style={{
                  borderColor: "#FF4289",
                  backgroundColor: copied ? "rgba(255, 66, 137, 0.15)" : "white",
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" style={{ color: "#FF4289" }} />
                    <span className="font-bold text-sm" style={{ color: "#FF4289" }}>
                      Cupom copiado, aplique no checkout
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-bold tracking-wider" style={{ color: "#FF4289" }}>
                      {COUPON_CODE}
                    </span>
                    <Copy className="w-4 h-4" style={{ color: "#FF4289" }} />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white py-1.5 px-4 border-b border-gray-100">
            <div className="flex items-center justify-center gap-2" style={{ color: "#FF4289" }}>
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Oferta expira em:</span>
              <span
                className="font-bold text-base px-2.5 py-0.5 rounded"
                style={{ backgroundColor: "rgba(255, 66, 137, 0.15)" }}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
            {/* Progress bar */}
            <div
              className="mt-1.5 h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(255, 66, 137, 0.2)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercentage}%`, backgroundColor: "#FF4289" }}
              />
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-2.5 pb-[max(12px,env(safe-area-inset-bottom))]">
          <div className="flex items-center justify-between gap-4">
            {/* Product Info */}
            <div className="flex-shrink-0 min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-bold text-foreground text-base">4.9</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({selectedKit?.reviews})</span>
              </div>
              <div className="text-sm text-muted-foreground truncate mb-0.5">
                {selectedKit?.sublabel} -{" "}
                {selectedKit?.value === 1
                  ? "Rotina Inicial"
                  : selectedKit?.value === 3
                    ? "Mais Vendido"
                    : "Mais em Conta"}
              </div>
              <div className="flex items-center gap-2">
                {selectedKit?.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(selectedKit.originalPrice)}
                  </span>
                )}
                <span className="font-bold text-lg text-foreground">{formatPrice(selectedKit?.price || 0)}</span>
              </div>
            </div>

            {/* Buy Button - Larger and more prominent */}
            <Button
              onClick={handlePurchase}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-7 rounded-full shadow-xl flex items-center gap-2.5 justify-center text-base animate-pulse hover:animate-none"
              style={{
                boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)",
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyBuyButton;
