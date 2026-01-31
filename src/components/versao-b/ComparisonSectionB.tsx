import collagenGif from "@/assets/collagen-absorption.gif";
import logoVerisol from "@/assets/logo-verisol.png";
import logoHaplex from "@/assets/logo-haplex-plus.webp";
import logoVitaminC from "@/assets/vitamin-c-logo.webp";

const ingredients = [
  {
    logo: logoVerisol,
    name: "Verisol®",
    description: "Colágeno hidrolisado patenteado que estimula a produção natural de colágeno na derme, onde as rugas nascem.",
    logoClass: "max-w-full max-h-full object-contain",
  },
  {
    logo: logoHaplex,
    name: "Haplex® Plus",
    description: "Ácido hialurônico de alta absorção que hidrata profundamente e preenche a pele de dentro para fora.",
    logoClass: "w-full h-full object-contain scale-110",
  },
  {
    logo: logoVitaminC,
    name: "Vitamina C",
    description: "Potente antioxidante que potencializa a síntese de colágeno e protege contra o envelhecimento precoce.",
    logoClass: "w-full h-full object-contain scale-110",
  },
];

const ComparisonSectionB = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-semibold uppercase tracking-wider mb-3">
              Fórmula Exclusiva
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Tripla ação para rejuvenescer sua pele
            </h2>
            <p className="text-muted-foreground text-sm">
              Ingredientes premium que trabalham juntos para resultados visíveis
            </p>
          </div>

          {/* GIF + Ingredients */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* GIF */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 p-4">
              <img 
                src={collagenGif} 
                alt="Absorção do colágeno na pele"
                className="w-full h-auto rounded-xl"
              />
              <p className="text-center text-xs text-muted-foreground mt-3">
                Visualização da absorção do colágeno nas camadas da pele
              </p>
            </div>

            {/* Ingredients List */}
            <div className="space-y-4">
              {ingredients.map((item, index) => (
                <div 
                  key={index}
                  className="bg-secondary/30 rounded-xl p-4 flex items-start gap-4"
                >
                  <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg">
                    <img 
                      src={item.logo} 
                      alt={item.name}
                      className={item.logoClass}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSectionB;
