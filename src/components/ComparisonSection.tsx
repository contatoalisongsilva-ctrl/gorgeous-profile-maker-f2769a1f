import iconRugas from "@/assets/icon-rugas.png";
import iconFirmeza from "@/assets/icon-firmeza.png";
import iconHidratacao from "@/assets/icon-hidratacao.png";
import iconCansado from "@/assets/icon-cansado.png";

const benefits = [
  {
    icon: iconRugas,
    title: "Suaviza rugas e linhas de expressão",
    description: "Reduz visivelmente os sinais de envelhecimento já nas primeiras semanas"
  },
  {
    icon: iconFirmeza,
    title: "Mais firmeza e elasticidade da pele",
    description: "Recupera a estrutura da pele para um aspecto mais jovem"
  },
  {
    icon: iconHidratacao,
    title: "Hidratação profunda e duradoura",
    description: "Ácido hialurônico que retém água nas camadas da pele"
  },
  {
    icon: iconCansado,
    title: "Melhora o aspecto cansado",
    description: "Revigora a aparência deixando você mais disposta"
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-10 md:py-12 bg-secondary" id="beneficios">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            Benefícios
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">
            O que o Renova Be faz por você
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Benefícios comprovados para rejuvenescer sua pele de dentro para fora
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="bg-white rounded-2xl p-5 shadow-sm border border-border hover:shadow-md transition-shadow flex items-start gap-4 min-h-[120px]"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 p-2.5">
                  <img 
                    src={benefit.icon} 
                    alt={benefit.title}
                    className="w-9 h-9 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1.5 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
