import { Check, X } from "lucide-react";

const comparisonData = [
  {
    aspect: "Ação",
    cream: "Só hidratam a superfície",
    verisol: "Estimula colágeno próprio por dentro",
  },
  {
    aspect: "Efeito nas rugas",
    cream: "Não reduz",
    verisol: "Preenche e reduz rugas",
  },
  {
    aspect: "Onde age",
    cream: "Na camada externa",
    verisol: "Vai até a derme (onde as rugas nascem)",
  },
  {
    aspect: "Resultado",
    cream: "Temporário",
    verisol: "Progressivo e duradouro",
  },
  {
    aspect: "Praticidade",
    cream: "Aplicação 2x/dia na pele",
    verisol: "Uma vez ao dia, toma como suco",
  },
];

const ComparisonSectionB = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Por que o Colágeno Verisol® é diferente?
            </h2>
          </div>

          {/* Mobile: Cards */}
          <div className="md:hidden space-y-4">
            {comparisonData.map((item, index) => (
              <div key={index} className="bg-secondary/30 rounded-xl p-4">
                <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                  {item.aspect}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-muted-foreground text-xs">Cremes:</span>
                      <p className="text-muted-foreground">{item.cream}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-primary text-xs font-medium">Verisol®:</span>
                      <p className="text-foreground font-medium">{item.verisol}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Aspecto
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                    Cremes e Hidratantes
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-primary">
                    Colágeno Verisol® Renova Be
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr 
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-secondary/20"}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-foreground">
                      {item.aspect}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-400" />
                        {item.cream}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground font-medium">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        {item.verisol}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSectionB;
