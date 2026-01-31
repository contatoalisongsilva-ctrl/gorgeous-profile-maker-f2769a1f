import { Clock, AlertTriangle } from "lucide-react";

const EducationSectionB = () => {
  return (
    <section className="py-10 md:py-12 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Education Block */}
          <div className="bg-white rounded-xl p-6 border border-border shadow-sm mb-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">
                  Importante saber:
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  O Colágeno Verisol® não é um produto de efeito imediato como um tensor — ele trabalha <strong className="text-foreground">regenerando sua pele por dentro</strong>, ao longo do tempo.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  Para ver redução real nas rugas, o <strong className="text-foreground">uso contínuo é essencial</strong>. Assim como você toma água todo dia para manter o corpo hidratado, o colágeno deve fazer parte da sua rotina.
                </p>
                <p className="text-primary font-semibold text-sm">
                  O resultado que você constrói, dura.
                </p>
              </div>
            </div>
          </div>

          {/* Urgency Block */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-900 text-sm font-semibold mb-2">
                  ⚠️ Cada dia sem tratamento = mais colágeno perdido e mais rugas surgindo.
                </p>
                <p className="text-amber-800 text-sm mb-1">
                  Quanto mais cedo você começar, mais rápido sua pele vai se regenerar.
                </p>
                <p className="text-amber-900 text-sm font-medium">
                  Suas rugas não vão esperar. Mas seu tratamento pode começar hoje.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSectionB;
