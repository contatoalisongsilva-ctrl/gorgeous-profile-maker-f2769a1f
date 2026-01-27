import tabelaNutricional from "@/assets/tabela-nutricional.webp";

const NutritionSection = () => {
  return (
    <section className="py-10 md:py-12 bg-secondary" id="nutricional">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Tabela Nutricional
            </h2>
          </div>
          
          {/* Nutrition Table Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <img 
              src={tabelaNutricional} 
              alt="Tabela Nutricional - Informação Nutricional do Colágeno Renova Be"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionSection;
