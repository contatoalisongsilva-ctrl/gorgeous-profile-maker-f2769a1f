import { Shield, Check } from "lucide-react";

const GuaranteeSectionB = () => {
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-8 border border-primary/20 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              GARANTIA TOTAL DE 30 DIAS
            </h3>
            
            <p className="text-muted-foreground text-sm md:text-base mb-4 leading-relaxed">
              Experimente sem risco. Se não ver resultados visíveis nas suas rugas, <strong className="text-foreground">devolvemos 100% do seu dinheiro</strong>.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-sm">
              <div className="flex items-center gap-2 text-foreground">
                <Check className="w-4 h-4 text-primary" />
                <span>Sem perguntas</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Check className="w-4 h-4 text-primary" />
                <span>Sem burocracia</span>
              </div>
            </div>
            
            <p className="mt-4 text-primary font-semibold text-sm">
              O risco é todo nosso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSectionB;
