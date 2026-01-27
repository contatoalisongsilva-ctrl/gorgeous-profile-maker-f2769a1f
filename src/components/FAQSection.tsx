import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "O que é o Colágeno Verisol®?",
      answer: "O Colágeno Verisol® é um colágeno bioativo com eficácia clinicamente comprovada, que atua de dentro para fora estimulando a produção natural de colágeno pela pele. Seus peptídeos são facilmente absorvidos e agem diretamente nas células, ajudando a reduzir rugas e linhas de expressão.",
    },
    {
      question: "Como devo usar?",
      answer: "A dose diária recomendada é de uma colher (10g) diluída em um copo d'água ou sua bebida favorita. Pode ser consumido a qualquer hora do dia, mas sugerimos pela manhã em jejum para melhor absorção.",
    },
    {
      question: "Quando verei os resultados?",
      answer: "Os primeiros resultados podem ser percebidos a partir de 2 semanas de uso contínuo, com melhora na hidratação da pele. Resultados mais significativos como redução de rugas e aumento de firmeza são observados entre 4 a 8 semanas.",
    },
    {
      question: "Tem contraindicação?",
      answer: "O produto não é recomendado para gestantes, lactantes e menores de 18 anos. Pessoas com alergia a frutos do mar ou qualquer componente da fórmula devem evitar o uso. Em caso de dúvidas, consulte seu médico.",
    },
    {
      question: "Qual a diferença entre Verisol® e outros colágenos?",
      answer: "O Verisol® é um colágeno hidrolisado com peptídeos bioativos específicos que foram clinicamente testados para eficácia na pele. Diferente de colágenos genéricos, o Verisol® tem estudos que comprovam redução de rugas e aumento de elasticidade.",
    },
    {
      question: "Posso tomar junto com outros suplementos?",
      answer: "Sim, o colágeno Renova Be pode ser combinado com outros suplementos. No entanto, recomendamos consultar um profissional de saúde para orientação personalizada sobre combinações.",
    },
    {
      question: "O produto é zero açúcar e zero lactose?",
      answer: "Sim! O Colágeno Renova Be é zero açúcar, zero lactose e não contém glúten, sendo adequado para pessoas com restrições alimentares.",
    },
    {
      question: "Qual o prazo de entrega?",
      answer: "O envio é realizado em até 24h após a confirmação do pagamento. O prazo de entrega varia de 2 a 7 dias úteis dependendo da sua região. Para compras acima de R$199, o frete é grátis.",
    },
    {
      question: "Existe garantia de satisfação?",
      answer: "Sim! Oferecemos garantia de 30 dias. Se você não estiver satisfeita com os resultados, devolvemos seu dinheiro. Entre em contato com nosso atendimento para mais informações.",
    },
    {
      question: "Quais os ingredientes do produto?",
      answer: "Peptídeos bioativos de colágeno hidrolisado com peso molecular médio de 2kDa (Verisol®), hialuronato de sódio obtido pela fermentação de streptococcus zoopdemicus (fonte de ácido hialurônico), biotina (vitamina B7), ácido ascórbico (vitamina C), acetato de tocoferol (vitamina E), bisglicnato de zinco, aroma de Cranberry, edulcorante natural stévia. NÃO CONTÉM GLÚTEN.",
    },
  ];

  return (
    <section className="py-10 md:py-12 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-widest mb-4">
            FAQ
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-secondary border-none rounded-xl px-5 data-[state=open]:bg-secondary transition-all"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-4 text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
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

export default FAQSection;
