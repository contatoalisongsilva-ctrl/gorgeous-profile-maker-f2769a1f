import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Já tentei outros produtos e não funcionou…",
    answer: "A maioria dos produtos age na superfície. O Verisol® é a única tecnologia que leva o colágeno diretamente até a derme e estimula seu próprio corpo a produzir mais. É fundamentalmente diferente.",
  },
  {
    question: "Quanto tempo para ver resultado nas rugas?",
    answer: "Primeiras melhoras visíveis: 2 a 4 semanas. Redução real nas rugas: 4 a 8 semanas. Resultado máximo: 60 a 90 dias de uso contínuo.",
  },
  {
    question: "É seguro? Tem gosto ruim?",
    answer: "Fórmula com ingredientes naturais e testados. Zero açúcar, zero glúten, baixa caloria. O sabor é agradável — parece um suco.",
  },
  {
    question: "Funciona para rugas profundas?",
    answer: "Sim. O Ácido Hialurônico preenche as linhas de dentro, e o Verisol® estimula a regeneração progressiva até das rugas mais marcadas.",
  },
  {
    question: "Posso usar com outros produtos?",
    answer: "Sim! Toma diariamente como parte da sua rotina, sem conflitar com outros suplementos ou cremes.",
  },
  {
    question: "Quantas vezes por dia?",
    answer: "Uma vez ao dia é suficiente para resultados ótimos.",
  },
  {
    question: "Grávidas podem usar?",
    answer: "Consulte seu dermatologista ou médico primeiro.",
  },
  {
    question: "Preciso fazer dieta ou exercício junto?",
    answer: "Não. O produto atua diretamente na regeneração da pele, independente de outras rotinas.",
  },
];

const FAQSectionB = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
              Dúvidas Frequentes
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Perguntas Rápidas
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white border border-border rounded-xl px-4 data-[state=open]:ring-2 data-[state=open]:ring-primary/20"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-medium text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSectionB;
