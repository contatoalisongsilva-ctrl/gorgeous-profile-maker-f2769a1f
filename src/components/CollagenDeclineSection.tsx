import collagenChart from "@/assets/collagen-chart.png";
import collagenSkin from "@/assets/collagen-skin.png";

const CollagenDeclineSection = () => {
  return (
    <section className="py-10 md:py-12 bg-white" id="declinio">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
              A ciência por trás
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Por que você está perdendo colágeno?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              A partir dos <span className="font-semibold text-primary">25 anos</span>, o corpo começa a reduzir a produção natural de colágeno em cerca de <span className="font-semibold text-foreground">1% ao ano</span>.
            </p>
          </div>

          {/* Stats highlight */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10">
            <div className="bg-secondary rounded-2xl p-6 md:p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">-25%</div>
              <p className="text-sm text-muted-foreground">aos <span className="font-medium text-foreground">35 anos</span></p>
            </div>
            <div className="bg-secondary rounded-2xl p-6 md:p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">-50%</div>
              <p className="text-sm text-muted-foreground">aos <span className="font-medium text-foreground">45 anos</span></p>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            {/* Chart */}
            <div className="bg-secondary rounded-2xl p-5 md:p-8">
              <img 
                src={collagenChart} 
                alt="Gráfico mostrando a redução de colágeno por idade" 
                className="w-full h-auto rounded-xl"
              />
              <p className="text-xs text-center text-muted-foreground mt-4 tracking-wide">
                Quantidade de colágeno (%) x Idade (Anos)
              </p>
            </div>

            {/* Skin illustration */}
            <div className="bg-secondary rounded-2xl p-5 md:p-8">
              <img 
                src={collagenSkin} 
                alt="Ilustração da redução de fibras de colágeno na pele" 
                className="w-full h-auto rounded-xl"
              />
              <p className="text-xs text-center text-muted-foreground mt-4 tracking-wide">
                Redução das fibras de colágeno causa linhas de expressão e flacidez
              </p>
            </div>
          </div>

          {/* Bottom text */}
          <div className="mt-10 text-center">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Sem reposição adequada, a pele perde <span className="font-semibold text-foreground">firmeza, elasticidade e viço</span>, 
              resultando em rugas e flacidez visíveis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollagenDeclineSection;
