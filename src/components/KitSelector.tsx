import { Truck } from "lucide-react";
import kit1Img from "@/assets/kit-1-unidade-new.webp";
import kit3Img from "@/assets/kit-3-unidades.jpg";
import kit6Img from "@/assets/kit-6-unidades.jpg";
import { Button } from "./ui/button";

interface KitSelectorProps {
  selectedKit: "1x" | "3x" | "6x";
  onKitChange: (kit: "1x" | "3x" | "6x") => void;
  onBuyClick: (kit: "1x" | "3x" | "6x") => void;
}

const KitSelector = ({ selectedKit, onKitChange, onBuyClick }: KitSelectorProps) => {
  const kits = [
    {
      id: "1x" as const,
      units: 1,
      image: kit1Img,
      pricePerUnit: 117.7,
      totalPrice: 117.7,
      originalPrice: 149.9,
      discount: 21,
      badge: null,
      gifts: ["1x TikBalm", "1x Sérum Vitamina C"],
      hasFreeShipping: false,
    },
    {
      id: "3x" as const,
      units: 3,
      image: kit3Img,
      pricePerUnit: 89.23,
      totalPrice: 267.7,
      originalPrice: 449.7,
      discount: 40,
      badge: { text: "MAIS VENDIDO", color: "bg-primary" },
      gifts: ["1x TikBalm", "1x Sérum Vitamina C"],
      hasFreeShipping: true,
    },
    {
      id: "6x" as const,
      units: 6,
      image: kit6Img,
      pricePerUnit: 79.62,
      totalPrice: 477.7,
      originalPrice: 899.4,
      discount: 47,
      badge: { text: "MELHOR OFERTA", color: "bg-green-500" },
      gifts: ["1x TikBalm", "1x Sérum Vitamina C"],
      hasFreeShipping: true,
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground font-medium">
        Quanto mais levar, maiores os descontos e brindes!
      </p>

      {/* Top Row: 1 unit and 3 units side by side */}
      <div className="grid grid-cols-2 gap-4">
        {kits.slice(0, 2).map((kit) => (
          <div
            key={kit.id}
            onClick={() => onKitChange(kit.id)}
            className={`relative bg-white rounded-2xl border-2 overflow-hidden text-center transition-all hover:shadow-lg cursor-pointer flex flex-col h-full ${
              selectedKit === kit.id
                ? "border-primary shadow-lg"
                : "border-border hover:border-primary/50"
            }`}
          >
            {/* Badge */}
            {kit.badge && (
              <div className={`absolute top-3 left-3 py-1 px-2.5 text-[10px] font-bold text-white z-10 rounded-md uppercase tracking-wide ${kit.badge.color}`}>
                {kit.badge.text}
              </div>
            )}

            {/* Discount Badge */}
            <div className="absolute top-3 right-3 bg-destructive text-white text-[10px] font-bold py-1 px-2.5 rounded-md z-10">
              {kit.discount}% OFF
            </div>

            {/* Image Section */}
            <div className="bg-muted flex-shrink-0 overflow-hidden flex items-center justify-center">
              <img
                src={kit.image}
                alt={`${kit.units} unidade${kit.units > 1 ? 's' : ''}`}
                className="w-full h-44 md:h-52 object-cover object-center"
              />
            </div>

            {/* Content Section */}
            <div className="p-3 flex flex-col flex-grow">
              <div className="flex-grow">
                <h3 className="font-bold text-sm text-foreground text-center mb-2">
                  {kit.units} unidade{kit.units > 1 ? 's' : ''}
                </h3>

                <div className="text-center space-y-0.5">
                  <p className="text-[10px] text-muted-foreground">
                    R$ {kit.pricePerUnit.toFixed(2).replace(".", ",")}/unidade
                  </p>
                  <span className="text-[10px] text-muted-foreground/60 line-through block">
                    R$ {kit.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="font-bold text-lg md:text-xl text-foreground block">
                    R$ {kit.totalPrice.toFixed(2).replace(".", ",")}
                  </span>
                  <p className="text-[10px] text-primary font-semibold">no pix</p>
                  <p className="text-[9px] text-muted-foreground">
                    5x R$ {(kit.totalPrice / 5).toFixed(2).replace(".", ",")} s/juros
                  </p>
                </div>

                {/* Free Shipping Badge */}
                {kit.hasFreeShipping && (
                  <div className="flex items-center justify-center gap-1 text-green-600 text-[10px] font-medium mt-2">
                    <Truck className="w-3 h-3" />
                    <span>Frete Grátis</span>
                  </div>
                )}

                {/* Gifts */}
                {kit.gifts && kit.gifts.length > 0 && (
                  <div className="mt-2 text-[10px] text-muted-foreground">
                    <span className="font-medium text-foreground">Leve também:</span>
                    {kit.gifts.map((gift, index) => (
                      <span key={index} className="block">
                        🎁 {gift}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Buy Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onBuyClick(kit.id);
                }}
                className="w-full mt-3 bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-2"
              >
                Comprar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row: 6 units centered */}
      <div className="flex justify-center">
        <div className="w-full md:w-1/2">
          {(() => {
            const kit = kits[2];
            return (
              <div
                onClick={() => onKitChange(kit.id)}
                className={`relative bg-white rounded-2xl border-2 overflow-hidden text-center transition-all hover:shadow-lg cursor-pointer flex flex-col h-full ${
                  selectedKit === kit.id
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {/* Badge */}
                {kit.badge && (
                  <div className={`absolute top-3 left-3 py-1 px-2.5 text-[10px] font-bold text-white z-10 rounded-md uppercase tracking-wide ${kit.badge.color}`}>
                    {kit.badge.text}
                  </div>
                )}

                {/* Discount Badge */}
                <div className="absolute top-3 right-3 bg-destructive text-white text-[10px] font-bold py-1 px-2.5 rounded-md z-10">
                  {kit.discount}% OFF
                </div>

                {/* Image Section */}
                <div className="bg-muted flex-shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src={kit.image}
                    alt={`${kit.units} unidades`}
                    className="w-full h-52 md:h-60 object-cover object-center"
                  />
                </div>

                {/* Content Section */}
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="font-bold text-sm text-foreground text-center mb-2">
                    {kit.units} unidades
                  </h3>

                  <div className="text-center space-y-0.5">
                    <p className="text-[10px] text-muted-foreground">
                      R$ {kit.pricePerUnit.toFixed(2).replace(".", ",")}/unidade
                    </p>
                    <span className="text-[10px] text-muted-foreground/60 line-through block">
                      R$ {kit.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="font-bold text-lg md:text-xl text-foreground block">
                      R$ {kit.totalPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <p className="text-[10px] text-primary font-semibold">no pix</p>
                    <p className="text-[9px] text-muted-foreground">
                      5x R$ {(kit.totalPrice / 5).toFixed(2).replace(".", ",")} s/juros
                    </p>
                  </div>

                  {/* Free Shipping Badge */}
                  {kit.hasFreeShipping && (
                    <div className="flex items-center justify-center gap-1 text-green-600 text-[10px] font-medium mt-2">
                      <Truck className="w-3 h-3" />
                      <span>Frete Grátis</span>
                    </div>
                  )}

                  {/* Gifts */}
                  {kit.gifts && kit.gifts.length > 0 && (
                    <div className="mt-2 text-[10px] text-muted-foreground">
                      <span className="font-medium text-foreground">Leve também:</span>
                      {kit.gifts.map((gift, index) => (
                        <span key={index} className="block">
                          🎁 {gift}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Buy Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuyClick(kit.id);
                    }}
                    className="w-full mt-3 bg-primary hover:bg-primary/90 text-white font-semibold text-sm py-2"
                  >
                    Comprar
                  </Button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default KitSelector;
