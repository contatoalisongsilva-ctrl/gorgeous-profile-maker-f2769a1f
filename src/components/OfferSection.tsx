import { useState } from "react";
import {
  Truck,
  Shield,
  Award,
  ThumbsUp,
} from "lucide-react";
import { useSelectedKit } from "@/contexts/SelectedKitContext";
import FlavorSelectionDrawer from "./FlavorSelectionDrawer";
import kit1Img from "@/assets/kit-1-unidade.png";
import kit3Img from "@/assets/kit-3-unidades.png";
import kit6Img from "@/assets/kit-6-unidades.png";

const OfferSection = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedKitForDrawer, setSelectedKitForDrawer] = useState<1 | 3 | 6>(1);
  const { selectedQuantity, setSelectedQuantity } = useSelectedKit();

  const kits = [
    {
      value: 1 as const,
      image: kit1Img,
      label: "1 unidade",
      price: "R$ 117,70",
      originalPrice: "R$ 149,90",
      priceEach: "117,70",
      discount: "21% OFF",
      badge: null,
      hasFreeShipping: false,
    },
    {
      value: 3 as const,
      image: kit3Img,
      label: "3 unidades",
      price: "R$ 267,70",
      originalPrice: "R$ 449,70",
      priceEach: "89,23",
      discount: "40% OFF",
      badge: "MAIS VENDIDO",
      hasFreeShipping: true,
    },
    {
      value: 6 as const,
      image: kit6Img,
      label: "6 unidades",
      price: "R$ 477,70",
      originalPrice: "R$ 899,40",
      priceEach: "79,61",
      discount: "46% OFF",
      badge: "MELHOR PREÇO",
      hasFreeShipping: true,
    },
  ];

  const guarantees = [
    {
      icon: Award,
      title: "Recomendado",
      description: "Por especialistas",
      emoji: "👨‍⚕️",
    },
    {
      icon: Truck,
      title: "Frete Grátis",
      description: "Acima de R$ 199",
      emoji: "🚚",
    },
    {
      icon: ThumbsUp,
      title: "+98% Clientes",
      description: "Recomendam",
      emoji: "❤️",
    },
    {
      icon: Shield,
      title: "Fórmula Exclusiva",
      description: "Verisol® + Haplex®",
      emoji: "✨",
    },
  ];

  const KitCard = ({ kit }: { kit: typeof kits[0] }) => (
    <div
      onClick={() => setSelectedQuantity(kit.value)}
      className={`relative bg-white rounded-2xl border-2 overflow-hidden text-center transition-all hover:shadow-lg cursor-pointer flex flex-col h-full ${
        selectedQuantity === kit.value
          ? "border-primary shadow-lg"
          : "border-border hover:border-primary/50"
      }`}
    >
      {/* Badge */}
      {kit.badge && (
        <div className={`absolute top-3 left-3 py-1 px-2.5 text-[10px] font-bold text-white z-10 rounded-md uppercase tracking-wide ${
          kit.badge === "MAIS VENDIDO" 
            ? "bg-primary" 
            : "bg-green-500"
        }`}>
          {kit.badge}
        </div>
      )}

      {/* Discount Badge */}
      {kit.discount && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold py-1 px-2.5 rounded-md z-10">
          {kit.discount}
        </div>
      )}

      {/* Image Section */}
      <div className="bg-muted flex-shrink-0 overflow-hidden flex items-center justify-center">
        <img
          src={kit.image}
          alt={kit.label}
          className="w-full h-52 md:h-60 object-cover object-center"
        />
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Kit Label */}
        <h3 className="font-bold text-sm text-foreground text-center mb-2">{kit.label}</h3>

        {/* Price Section - Compact */}
        <div className="text-center space-y-0.5">
          <p className="text-[10px] text-muted-foreground">R$ {kit.priceEach}/unidade</p>
          {kit.originalPrice && (
            <span className="text-[10px] text-muted-foreground/60 line-through block">{kit.originalPrice}</span>
          )}
          <span className="font-bold text-lg md:text-xl text-foreground block">{kit.price}</span>
          <p className="text-[10px] text-primary font-semibold">no pix</p>
          <p className="text-[9px] text-muted-foreground">
            5x R$ {(parseFloat(kit.price.replace('R$ ', '').replace('.', '').replace(',', '.')) / 5).toFixed(2).replace('.', ',')} s/juros
          </p>
        </div>

        {/* Free Shipping Badge */}
        {kit.hasFreeShipping && (
          <div className="flex items-center justify-center gap-1 text-green-600 text-[10px] font-medium mt-2">
            <Truck className="w-3 h-3" />
            <span>Frete Grátis</span>
          </div>
        )}

        {/* Buy Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedQuantity(kit.value);
            setSelectedKitForDrawer(kit.value);
            setDrawerOpen(true);
          }}
          className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all mt-auto ${
            selectedQuantity === kit.value
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-muted text-foreground hover:bg-primary hover:text-white"
          }`}
        >
          Comprar
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-10 md:py-12 bg-white" id="oferta">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            Oferta Exclusiva
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">
            Selecione seu Kit
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Quanto mais você compra, mais você economiza
          </p>
        </div>

        {/* Products Grid */}
        <div className="max-w-3xl mx-auto mb-10">
          {/* Top Row: 1 unit and 3 units side by side */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <KitCard kit={kits[0]} />
            <KitCard kit={kits[1]} />
          </div>

          {/* Bottom Row: 6 units centered */}
          <div className="flex justify-center">
            <div className="w-full md:w-1/2">
              <KitCard kit={kits[2]} />
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="max-w-md mx-auto mb-10">
          <div className="p-4 bg-blue-50 rounded-xl flex items-start gap-3">
            <span className="text-blue-500 text-xl">⚡</span>
            <div>
              <p className="font-semibold text-sm text-foreground">ENTREGA FULL – Envio imediato em até 24h</p>
              <p className="text-xs text-muted-foreground mt-0.5">Comprando dentro das próximas 7h 34 min</p>
            </div>
          </div>
        </div>

        {/* Guarantees Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg md:text-xl font-bold text-foreground tracking-tight">
              Compre com Confiança
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {guarantees.map((item) => (
              <div 
                key={item.title}
                className="text-center p-4 bg-secondary rounded-xl"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-xl">
                  {item.emoji}
                </div>
                <h4 className="font-semibold text-foreground text-xs mb-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 p-5 rounded-xl mt-6 text-center border border-primary/10">
            <p className="text-muted-foreground text-sm">
              Milhares de mulheres confiam no <span className="text-primary font-semibold">Colágeno Renova Be</span> para rejuvenescer sua pele!
            </p>
          </div>
        </div>
      </div>
      {/* Flavor Selection Drawer */}
      <FlavorSelectionDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        kitQuantity={selectedKitForDrawer}
        onConfirm={(flavors) => {
          // Here you can handle the checkout redirect with selected flavors
          console.log("Selected flavors:", flavors);
          // TODO: Integrate with checkout/Shopify
        }}
      />
    </section>
  );
};

export default OfferSection;
