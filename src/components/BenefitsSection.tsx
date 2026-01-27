import { Sparkles, Droplets, Heart, Sun } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      number: "1",
      title: "Reduz rugas",
      description: "Suaviza marcas e linhas de expressão com efeito visível",
      icon: Sparkles,
    },
    {
      number: "2",
      title: "Aumenta a firmeza",
      description: "Recupera firmeza e elasticidade com ação profunda",
      icon: Heart,
    },
    {
      number: "3",
      title: "Hidrata de verdade",
      description: "Devolve o viço, maciez e brilho natural da pele em semanas",
      icon: Droplets,
    },
    {
      number: "4",
      title: "Ativa o colágeno",
      description: "Estimula o colágeno perdido de dentro pra fora",
      icon: Sun,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#f8f4f0] to-white" id="beneficios">
      <div className="container mx-auto px-4">
        {/* Benefits Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#333333] mb-4">
            O que o colágeno vai fazer por você
          </h2>
        </div>

        {/* Benefits Grid - Image placeholders with overlay */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {benefits.map((benefit) => (
            <div 
              key={benefit.title}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#f5ebe0] to-[#e8ddd0] aspect-[3/4] group"
            >
              {/* Placeholder for image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <benefit.icon className="w-16 h-16 text-[#E91E8C]/30" />
              </div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent">
                <h3 className="font-bold text-[#333333] text-sm md:text-base mb-1">
                  {benefit.number}. {benefit.title}
                </h3>
                <p className="text-xs text-[#666666]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-border p-6 text-center">
            <div className="text-3xl mb-3">💕</div>
            <h3 className="font-bold text-[#333333] mb-2">Quando você verá resultados?</h3>
            <p className="text-sm text-[#666666]">
              Os primeiros resultados aparecem em 1 semana, mas é com o uso contínuo que você experimenta a transformação completa na sua pele!
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-border p-6 text-center">
            <div className="text-3xl mb-3">ℹ️</div>
            <h3 className="font-bold text-[#333333] mb-2">Importante</h3>
            <p className="text-sm text-[#666666]">
              Use diariamente para melhores resultados. Incorporar o colágeno à sua rotina diária potencializa seus benefícios e reforça o cuidado de dentro para fora.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;