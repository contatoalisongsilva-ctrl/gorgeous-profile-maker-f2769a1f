import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Truck, CheckCircle } from "lucide-react";

const CTASection = () => {
  const guarantees = [
    { icon: Shield, text: "Compra 100% Segura" },
    { icon: Truck, text: "Frete Grátis acima R$199" },
    { icon: CheckCircle, text: "Satisfação Garantida" },
  ];

  return (
    <section className="py-20 bg-foreground text-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Comece sua transformação
            <span className="block text-primary">hoje mesmo!</span>
          </h2>
          
          <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">
            Junte-se a mais de 22.000 mulheres que já transformaram seus cabelos, 
            pele e unhas com New Hair.
          </p>

          <div className="bg-background/10 backdrop-blur-sm p-8 rounded-3xl border border-background/20 max-w-md mx-auto mb-8">
            <div className="text-sm opacity-70 line-through mb-1">De R$ 127,70</div>
            <div className="text-5xl font-bold mb-1">R$ 97,05</div>
            <div className="text-sm opacity-70 mb-6">no pix ou 6x de R$ 17,02</div>
            
            <Button className="w-full btn-primary-gradient text-lg py-6 font-semibold rounded-xl border-0">
              <Sparkles className="w-5 h-5 mr-2" />
              Comprar com Desconto
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {guarantees.map((item) => (
              <div key={item.text} className="flex items-center gap-2 opacity-80">
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;