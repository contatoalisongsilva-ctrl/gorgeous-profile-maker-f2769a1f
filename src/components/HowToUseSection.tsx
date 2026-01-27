import { Pill, Sun, Calendar, Clock, AlertCircle } from "lucide-react";
import LazyImage from "./LazyImage";
import howToUsePills from "@/assets/how-to-use-pills.png";
import howToUseWater from "@/assets/how-to-use-water.png";
const HowToUseSection = () => {
  const steps = [{
    icon: Pill,
    title: "Tome 1 cápsula",
    description: "Apenas uma por dia"
  }, {
    icon: Sun,
    title: "Pela manhã",
    description: "Após o café da manhã"
  }, {
    icon: Calendar,
    title: "Use diariamente",
    description: "Mantenha a constância"
  }, {
    icon: Clock,
    title: "Aguarde",
    description: "Resultados em 4 semanas"
  }];
  return <section className="py-12 md:py-16 bg-background" id="como-usar">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold uppercase tracking-wider mb-3">
            Modo de Uso
          </span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Como usar o New Hair?
          </h2>
        </div>

        {/* Images Side by Side */}
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-6">
          <div className="rounded-xl overflow-hidden h-32 md:h-40">
            <LazyImage alt="Cápsulas New Hair" className="w-full h-full object-cover" src="/lovable-uploads/c1f1361b-767a-414a-85d8-dbac22eb09ea.png" />
          </div>
          <div className="rounded-xl overflow-hidden h-32 md:h-40">
            <LazyImage src={howToUseWater} alt="Tomando com água" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
          {steps.map((step, index) => <div key={step.title} className="bg-card p-4 rounded-xl border border-border text-center relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#DB4987] flex items-center justify-center text-white font-bold text-xs">
                {index + 1}
              </div>
              
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 mt-2">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {step.description}
              </p>
            </div>)}
        </div>

        {/* Results Info */}
        <div className="bg-card p-4 rounded-xl border border-border max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm bg-primary/10 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-foreground text-xs md:text-sm">
              <strong>Importante:</strong> Use diariamente para melhores resultados!
            </span>
          </div>
        </div>
      </div>
    </section>;
};
export default HowToUseSection;