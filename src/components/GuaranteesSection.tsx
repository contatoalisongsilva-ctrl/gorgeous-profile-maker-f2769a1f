import { Shield, Truck, ThumbsUp, Award, Star } from "lucide-react";

const GuaranteesSection = () => {
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
      description: "12 vitaminas + 5 minerais",
      emoji: "✨",
    },
  ];

  return (
    <section className="py-10 md:py-14 bg-background" id="garantias">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold uppercase tracking-wider mb-3">
            Garantias
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Compre com Confiança
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
          {guarantees.map((item) => (
            <div 
              key={item.title}
              className="text-center p-4 bg-card rounded-xl border border-border"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 text-lg">
                {item.emoji}
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-0.5">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card p-4 rounded-xl border border-border max-w-xl mx-auto text-center mb-8">
          <p className="text-muted-foreground text-sm">
            Milhares de mulheres confiam em <span className="text-[#DB4987] font-bold">New Hair</span> para fortalecer seus cabelos!
          </p>
        </div>

        {/* Sales & Reviews Section */}
        <div className="max-w-2xl mx-auto bg-background border border-border rounded-2xl p-5 md:p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-sm md:text-base font-semibold text-[#DB4987]">+387.690 vendas</span>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#DB4987] text-[#DB4987]" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(88.354)</span>
            </div>
          </div>
          
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
            A primeira fórmula que une a redução da queda com a potência do Ácido Hialurônico. O tratamento que nutre e hidrata desde a raiz às pontas.
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#DB4987] text-[#DB4987]" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground ml-1">4.8/5</span>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <span className="text-xs bg-[#DB4987]/10 text-[#DB4987] px-2 py-1 rounded-full">Reduz Queda</span>
              <span className="text-xs bg-[#DB4987]/10 text-[#DB4987] px-2 py-1 rounded-full">Fortalece Unhas</span>
              <span className="text-xs bg-[#DB4987]/10 text-[#DB4987] px-2 py-1 rounded-full">Hidrata Pele</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;
